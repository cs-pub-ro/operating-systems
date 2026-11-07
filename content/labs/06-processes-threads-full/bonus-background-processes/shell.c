// SPDX-License-Identifier: BSD-3-Clause

/*
 * A shell that can run a command in the background.  End a line with `&` and
 * the shell starts the command without waiting, handing the prompt back at
 * once.  Finished background children are collected before every prompt, so
 * none is left as a zombie for long.
 *
 *     minish> sleep 5 &
 *     [started 12345]
 *     minish> echo meanwhile
 *     meanwhile
 *     minish>
 *     [12345 finished]
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

#define LINE_LEN	1024
#define MAX_TOKENS	64

/*
 * Print the prompt and read one line from standard input into `line`,
 * dropping the newline.  Returns 0 on success and -1 at end of input
 * (Ctrl-D).  Already written.
 */
static int read_line(char *line, size_t len)
{
	printf("minish> ");
	fflush(stdout);

	if (fgets(line, len, stdin) == NULL)
		return -1;

	line[strcspn(line, "\n")] = '\0';

	return 0;
}

/*
 * Split `line` into words separated by spaces or tabs, in place, and leave
 * the array ending in a NULL pointer so it can serve as an argv.  Returns
 * the number of words, at most `max`.  Already written.
 */
static int tokenize(char *line, char *tokens[], int max)
{
	int count = 0;
	char *word;

	word = strtok(line, " \t");
	while (word != NULL && count < max) {
		tokens[count++] = word;
		word = strtok(NULL, " \t");
	}
	tokens[count] = NULL;

	return count;
}

/*
 * Handle the commands the shell runs itself: `cd` and `exit`.  Returns 1 if
 * `argv` was a builtin, 0 otherwise.  From the previous exercise.
 */
static int run_builtin(char *argv[])
{
	if (strcmp(argv[0], "exit") == 0)
		exit(0);

	if (strcmp(argv[0], "cd") == 0) {
		const char *dir = argv[1] ? argv[1] : getenv("HOME");

		if (dir == NULL)
			dir = "/";
		if (chdir(dir) < 0)
			perror("cd");
		return 1;
	}

	return 0;
}

/*
 * Collect the background children that have finished since the last prompt,
 * without waiting for the ones still running.
 *
 * A child that has finished stays in the process table as a zombie until its
 * parent asks for its status, so waiting is not optional; only the blocking
 * is.  waitpid() with WNOHANG and -1 ("any child") returns a finished child
 * if there is one and 0 if there is not, so a loop collects them all and
 * stops at once when there are none.
 */
static void reap_background(void)
{
	pid_t pid;

	while ((pid = waitpid(-1, NULL, WNOHANG)) > 0)
		fprintf(stderr, "[%d finished]\n", (int) pid);
}

/*
 * Run the command in `argv` (a NULL-terminated array).  In the foreground,
 * wait for it.  In the background, print the child's PID and return at once;
 * reap_background() collects it later.
 */
static void run_command(char *argv[], int background)
{
	pid_t pid;

	pid = fork();
	if (pid < 0) {
		perror("fork");
		return;
	}

	if (pid == 0) {
		execvp(argv[0], argv);
		perror(argv[0]);
		exit(127);
	}

	if (background) {
		fprintf(stderr, "[started %d]\n", (int) pid);
		return;
	}

	if (waitpid(pid, NULL, 0) < 0)
		perror("waitpid");
}

int main(void)
{
	char line[LINE_LEN];
	char *tokens[MAX_TOKENS + 1];
	int ntokens;
	int background;

	for (;;) {
		reap_background();
		if (read_line(line, sizeof(line)) < 0)
			break;

		ntokens = tokenize(line, tokens, MAX_TOKENS);
		if (ntokens == 0)
			continue;
		if (run_builtin(tokens))
			continue;

		/* A trailing `&` means: start the command, do not wait. */
		background = 0;
		if (strcmp(tokens[ntokens - 1], "&") == 0) {
			background = 1;
			tokens[--ntokens] = NULL;
		}
		if (ntokens == 0)
			continue;

		run_command(tokens, background);
	}

	if (feof(stdin))
		printf("\n");

	return 0;
}

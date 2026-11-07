// SPDX-License-Identifier: BSD-3-Clause

/*
 * A shell that can run a command in the background.  End a line with `&` and
 * the shell starts the command without waiting, handing the prompt back at
 * once.  Finished background children are collected before every prompt.
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
 * without waiting for the ones still running.  main() calls it before every
 * prompt.
 */
static void reap_background(void)
{
	/*
	 * TODO 1: a child that has finished stays around as a zombie until its
	 * parent waits for it, so waiting is not optional -- only the blocking
	 * is.  waitpid() has a flag for that, WNOHANG, and a first argument of
	 * -1 that means "any child".  Call it in a loop: it returns a finished
	 * child's PID while there is one to collect, and 0 when there is not.
	 * Print a line for each child it returns.
	 */
}

/*
 * Run the command in `argv` (a NULL-terminated array).  In the foreground,
 * wait for it.  In the background, return at once without waiting;
 * reap_background() collects the child later.
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

	/*
	 * TODO 2: when `background` is set, print the child's PID on stderr
	 * and return without waiting.  Otherwise wait for it, as before.
	 */

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

		/*
		 * TODO 3: detect a trailing `&`.  When the last word is "&",
		 * set `background` and drop that word from the array (set it to
		 * NULL and shorten the count) so it is not passed to the
		 * program.  Otherwise run in the foreground.
		 */
		background = 0;

		run_command(tokens, background);
	}

	if (feof(stdin))
		printf("\n");

	return 0;
}

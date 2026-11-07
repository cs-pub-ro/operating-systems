// SPDX-License-Identifier: BSD-3-Clause

/*
 * A shell with builtin commands.  `cd` and `exit` are run by the shell
 * itself, in its own process, because a child could not do them for it.
 *
 *     minish> cd /tmp
 *     minish> pwd
 *     /tmp
 *     minish> exit
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
 * Handle the commands the shell has to run itself.
 *
 * `cd` and `exit` change the shell's own state -- its working directory, or
 * whether it keeps running -- so they cannot run in a child: a child's
 * chdir() would die with the child and leave the shell where it was.
 * Returns 1 if `argv` was a builtin (and ran it), 0 if it is an ordinary
 * command for run_command() to start.
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

/* Run the command in `argv` (a NULL-terminated array) and wait for it. */
static void run_command(char *argv[])
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

	if (waitpid(pid, NULL, 0) < 0)
		perror("waitpid");
}

int main(void)
{
	char line[LINE_LEN];
	char *tokens[MAX_TOKENS + 1];
	int ntokens;

	while (read_line(line, sizeof(line)) == 0) {
		ntokens = tokenize(line, tokens, MAX_TOKENS);
		if (ntokens == 0)
			continue;
		if (run_builtin(tokens))
			continue;

		run_command(tokens);
	}

	if (feof(stdin))
		printf("\n");

	return 0;
}

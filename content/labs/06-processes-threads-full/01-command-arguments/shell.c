// SPDX-License-Identifier: BSD-3-Clause

/*
 * A shell that runs a command with its arguments: read a line, split it into
 * words, and run the first word as a program with the rest as its arguments.
 *
 *     minish> ls -l /tmp
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
 * Split `line` into words separated by spaces or tabs, in place: each word
 * gets a terminating '\0' and a pointer to it is stored in `tokens`, which
 * is left ending in a NULL pointer so it can serve as an argv.  Returns the
 * number of words, at most `max`.  Already written.
 *
 *     "ls -l /tmp"  ->  "ls", "-l", "/tmp", NULL
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

/* Run the command in `argv` (a NULL-terminated array) and wait for it. */
static void run_command(char *argv[])
{
	pid_t pid;

	/* A copy of the shell, as in the demo. */
	pid = fork();
	if (pid < 0) {
		perror("fork");
		return;
	}

	if (pid == 0) {
		/*
		 * The child.  execvp() takes the whole argv[] array: argv[0]
		 * is the program to look up in PATH, and the array is what the
		 * program receives as its own argv.  It only returns on failure.
		 */
		execvp(argv[0], argv);
		perror(argv[0]);
		exit(127);
	}

	/* The parent waits, then goes back to the prompt. */
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
		if (strcmp(tokens[0], "exit") == 0)
			break;

		run_command(tokens);
	}

	if (feof(stdin))
		printf("\n");

	return 0;
}

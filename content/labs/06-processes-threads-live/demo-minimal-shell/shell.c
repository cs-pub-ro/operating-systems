// SPDX-License-Identifier: BSD-3-Clause

/*
 * A minimal shell: read a command name, run it as a new process, wait for
 * it to finish, repeat.  A command is one word with no arguments.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

#define LINE_LEN	256

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

/* Run `command` as a new process and wait for it to finish. */
static void run_command(const char *command)
{
	pid_t pid;

	/*
	 * TODO 1: create a second process, a copy of this one, with fork().
	 * It returns twice: once in each process, with a different value.
	 * `man 2 fork` says which value goes where, and what a negative one
	 * means.
	 */

	/*
	 * TODO 2: in the child only, replace the program with `command`.
	 * execlp() looks the command up in PATH, the way a shell does, and
	 * takes the command's name twice: once as the program to run, once
	 * as its argv[0].  The argument list ends with a NULL pointer.
	 *
	 * A successful exec never returns, so anything written after it runs
	 * only when it failed: report why, then leave the child.
	 */

	/*
	 * TODO 3: in the parent only, wait for the child to finish, with
	 * waitpid(), before going back to the prompt.
	 */
}

int main(void)
{
	char line[LINE_LEN];

	while (read_line(line, sizeof(line)) == 0) {
		if (line[0] == '\0')
			continue;
		if (strcmp(line, "exit") == 0)
			break;

		run_command(line);
	}

	if (feof(stdin))
		printf("\n");

	return 0;
}

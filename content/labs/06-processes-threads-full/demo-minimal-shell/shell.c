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

	/* Step 1: create a second process, a copy of this one. */
	pid = fork();
	if (pid < 0) {
		perror("fork");
		return;
	}

	if (pid == 0) {
		/*
		 * Step 2: the child.  Replace its program with `command`.
		 * execlp() looks the command up in PATH, and only returns
		 * if it could not run it.
		 */
		execlp(command, command, (char *) NULL);
		perror(command);
		exit(127);
	}

	/* Step 3: the parent.  Wait for the child, then go back to the prompt. */
	if (waitpid(pid, NULL, 0) < 0)
		perror("waitpid");
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

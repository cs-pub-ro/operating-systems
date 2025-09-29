// SPDX-License-Identifier: BSD-3-Clause

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/wait.h>
#include <unistd.h>

#include "utils/utils.h"

#define BUFSIZE 131072
#define PIPE_READ	0
#define PIPE_WRITE	1

static void child_loop(int readfd)
{
	char output[BUFSIZE];
	int rc;

	while (1) {
		rc = read(readfd, output, BUFSIZE);
		DIE(rc < 0, "read");

		/* TODO: Close the pipe head used for reading if the other pipe was closed (HINT: EOF) */

		printf("[Child received]: %s\n", output);
		fflush(stdout);
	}

	return;
}

static void parent_loop(int writefd)
{
	char input[BUFSIZE];
	int rc;

	while (1) {
		memset(input, 0, BUFSIZE);
		fgets(input, BUFSIZE, stdin);
		// Remove trailing newline
		if (input[strlen(input) - 1] == '\n')
			input[strlen(input) - 1] = '\0';

		/* TODO: Close the pipe head if message is 'exit` */

		rc = write(writefd, input, BUFSIZE);
		DIE(rc < 0, "write");
	}

	return;
}

static void wait_for_input(const char *msg)
{
	char buf[32];

	fprintf(stderr, " * %s\n", msg);
	fprintf(stderr, " -- Press ENTER to continue ...");
	fgets(buf, 32, stdin);
}

int main(void)
{
	pid_t pid;
	int rc;
	/* TODO: Define an array with size 2 to store the pipe heads */

	/* TODO: Create the pipe and print its file descriptors */

	wait_for_input("pipe created");

	pid = fork();
	switch (pid)
	{
	case -1: /* Fork failed, cleaning up. */
		/* TODO: Close both heads of the pipe. */
		DIE(pid, "fork");
		return EXIT_FAILURE;

	case 0: /* Child process. */
		/* TODO: Close unused pipe head by child. */

		/* TODO: Call child loop and pass pipe head used for reading. */

		break;

	default: /* Parent process. */
		/* TODO: Close unused pipe head by parent. */

		/* TODO: Call parent loop and pass pipe head used for writing. */

		/* Wait for child process to finish. */
		wait(NULL);

		break;
	}

	return 0;
}

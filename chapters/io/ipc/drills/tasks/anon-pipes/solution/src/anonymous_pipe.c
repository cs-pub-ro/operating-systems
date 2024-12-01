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

		/* TODO 7: Close the pipe head used for reading if the other pipe was closed (HINT: EOF) */
		if (rc == 0)
		{
			rc = close(readfd);
			DIE(rc < 0, "close");

			break;
		}

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

		/* TODO 7: Close the pipe head if message is 'exit` */
		if (strcmp(input, "exit") == 0 || strlen(input) == 0)
		{
			rc = close(writefd);
			DIE(rc < 0, "close");

			break;
		}

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
	/* TODO 1: Define an array with size 2 to store the pipe heads */
	int pipe_des[2];

	/* TODO 3: Create the pipe and print its file descriptors */
	rc = pipe(pipe_des);
	DIE(rc < 0, "pipe");
	printf("pipe_des[0] = %d; pipe_des[1] = %d\n", pipe_des[PIPE_READ], pipe_des[PIPE_WRITE]);

	wait_for_input("pipe created");

	pid = fork();
	switch (pid)
	{
	case -1: /* Fork failed, cleaning up. */
		/* TODO 5: Close both heads of the pipe. */
		rc = close(pipe_des[PIPE_READ]);
		DIE(rc < 0, "close");
		rc = close(pipe_des[PIPE_WRITE]);
		DIE(rc < 0, "close");

		DIE(pid, "fork");
		return EXIT_FAILURE;

	case 0: /* Child process. */
		/* TODO 2: Close unused pipe head by child. */
		rc = close(pipe_des[PIPE_WRITE]);
		DIE(rc < 0, "close");

		/* TODO 1: Call child loop and pass pipe head used for reading. */
		child_loop(pipe_des[0]);

		break;

	default: /* Parent process. */
		/* TODO 2: Close unused pipe head by parent. */
		rc = close(pipe_des[PIPE_READ]);
		DIE(rc < 0, "close");

		/* TODO 1: Call parent loop and pass pipe head used for writing. */
		parent_loop(pipe_des[PIPE_WRITE]);

		/* Wait for child process to finish. */
		wait(NULL);

		break;
	}

	return 0;
}

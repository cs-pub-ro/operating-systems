// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

#include "utils/utils.h"

#ifndef BUFSIZ
#define BUFSIZ		256
#endif

static char *argv[] = { "./send_fd_14", NULL };  // args for execve()

int main(void)
{
	int pipefd[2];
	char buf[BUFSIZ];
	int rc, pid;

	/**
	 * The `./send_fd_14` binary writes the flag to the file descriptor 14.
	 * We will create a pipe whose write end is on file descriptor 14, then
	 * we will create the child process. We will get the flag from the read
	 * end of the pipe.
	 */

	/* TODO: Create a pipe. */

	log_info("Created pipe with descriptors %d and %d.\n", pipefd[0],
		pipefd[1]);

	/* TODO: Create the child process. */

	if (pid == 0) { /* Child process */
		/* TODO: Redirect the write end of the pipe `pipefd[1]` to fd 14. */

		/* TODO: Run the `./send_fd_14` binary. */
		/* Never reached. */
	}

	/* TODO: Read the flag from the read end of the pipe `pipefd[0]`. */

	printf("Flag is: %s\n", buf);

	/* Wait for child process. */
	wait(NULL);

	return 0;
}

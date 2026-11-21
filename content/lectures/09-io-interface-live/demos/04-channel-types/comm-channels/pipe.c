// SPDX-License-Identifier: BSD-3-Clause

/*
 * A pipe has no name.  The process that creates it gets both ends as file
 * descriptors, and the only way another process gets one is to inherit it:
 * the child made by fork() has a copy of the parent's descriptor table.
 */

#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

#include "utils.h"

static const char message[] = "Hello, pipe!\n";

int main(void)
{
	char buffer[256];
	int pipe_fds[2];
	ssize_t n;
	pid_t pid;
	int rc;

	rc = pipe(pipe_fds);
	DIE(rc < 0, "pipe");
	printf("[%d] pipe() = read end %d, write end %d\n", getpid(),
	       pipe_fds[0], pipe_fds[1]);

	/* Nothing may wait in the buffer of stdout: the child would copy it. */
	fflush(stdout);

	pid = fork();
	DIE(pid < 0, "fork");

	if (pid == 0) {
		/* Child: it reads, so it does not need the write end. */
		close(pipe_fds[1]);

		n = read(pipe_fds[0], buffer, sizeof(buffer) - 1);
		DIE(n < 0, "read");
		buffer[n] = '\0';
		printf("[%d] read(%d) = %zd: %s", getpid(), pipe_fds[0], n,
		       buffer);

		close(pipe_fds[0]);

		return 0;
	}

	/* Parent: it writes, so it does not need the read end. */
	close(pipe_fds[0]);

	n = write(pipe_fds[1], message, sizeof(message) - 1);
	DIE(n < 0, "write");
	printf("[%d] write(%d) = %zd\n", getpid(), pipe_fds[1], n);

	close(pipe_fds[1]);
	wait(NULL);

	return 0;
}

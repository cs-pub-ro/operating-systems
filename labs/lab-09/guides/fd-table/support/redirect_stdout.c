// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>

#include "utils/utils.h"

#define FILENAME "file.txt"

/**
 * This looks like a good idea, but the change to the file descriptor table is not atomic.
 * If another thread is running in parallel, it can call open and get file descriptor 1 before us.
 */
void naive_redirect_stdout(void)
{
	int fd, rc;

	// Free the file descriptor 1.
	rc = close(STDOUT_FILENO);
	DIE(rc == -1, "close");

	// Open a file and get **the first** available file descriptor.
	fd = open(FILENAME, O_WRONLY | O_CREAT | O_TRUNC, 0644);
	DIE(fd == -1, "open");
}

/**
 * dup2 will close the file descriptor 1 and open a new file on the same file descriptor, atomically.
 */
void redirect_stdout(void)
{
	int fd, rc;

	// Open a file and get **the first** available file descriptor.
	fd = open(FILENAME, O_WRONLY | O_CREAT | O_TRUNC, 0644);
	DIE(fd == -1, "open");

	// Close the file descriptor 1 and open a new file on the same file descriptor, atomically.
	rc = dup2(fd, STDOUT_FILENO);
	DIE(rc == -1, "dup2");

	// We don't need the old file descriptor anymore.
	rc = close(fd);
	DIE(rc == -1, "close");
}

/**
 * We propose to redirect the standard output to a file.
 * We will do this without changing the code of the main function.
 *
 * By default, printf writes to the standard output i.e. the file descriptor 1.
 * So, we will close file descriptor 1 and open a new file on the same file descriptor.
 */
int main(void)
{
	redirect_stdout();
	printf("Hello, world!\n");

	return 0;
}

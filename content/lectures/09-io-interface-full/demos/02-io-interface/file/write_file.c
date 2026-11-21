// SPDX-License-Identifier: BSD-3-Clause

/*
 * Create a file, open a channel to it, write a message through the channel
 * and close it.  Every call is printed with what it returned.
 */

#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

#include "utils.h"

static const char file_path[] = "file_channel";
static const char message[] = "Hello, file!\n";

int main(void)
{
	ssize_t n;
	int fd;
	int rc;

	/* Create the file if it is not there, and open a channel to it. */
	fd = open(file_path, O_WRONLY | O_CREAT | O_TRUNC, 0644);
	DIE(fd < 0, "open");
	printf("open(\"%s\", O_WRONLY | O_CREAT | O_TRUNC) = %d\n", file_path, fd);

	/* The file descriptor is all that write() is told about the file. */
	n = write(fd, message, sizeof(message) - 1);
	DIE(n < 0, "write");
	printf("write(%d, message, %zu) = %zd\n", fd, sizeof(message) - 1, n);

	rc = close(fd);
	DIE(rc < 0, "close");
	printf("close(%d) = %d\n", fd, rc);

	return 0;
}

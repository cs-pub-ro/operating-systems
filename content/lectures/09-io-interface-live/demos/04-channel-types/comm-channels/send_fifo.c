// SPDX-License-Identifier: BSD-3-Clause

/*
 * Open a channel to a FIFO that exists, write a message to whoever reads at
 * the other end, and close the channel.  Every call is printed with what it
 * returned.
 */

#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

#include "utils.h"

static const char fifo_path[] = "fifo_channel";
static const char message[] = "Hello, FIFO!\n";

int main(void)
{
	ssize_t n;
	int fd;
	int rc;

	/* The FIFO is created by the receiver; it has to be there. */
	fd = open(fifo_path, O_WRONLY);
	DIE(fd < 0, "open");
	printf("open(\"%s\", O_WRONLY) = %d\n", fifo_path, fd);

	n = write(fd, message, sizeof(message) - 1);
	DIE(n < 0, "write");
	printf("write(%d, message, %zu) = %zd\n", fd, sizeof(message) - 1, n);

	rc = close(fd);
	DIE(rc < 0, "close");
	printf("close(%d) = %d\n", fd, rc);

	return 0;
}

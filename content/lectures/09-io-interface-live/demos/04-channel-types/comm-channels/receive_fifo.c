// SPDX-License-Identifier: BSD-3-Clause

/*
 * Create a FIFO, open a channel to it, read a message from whoever writes
 * at the other end, and close the channel.  Every call is printed with what
 * it returned.
 */

#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <sys/stat.h>
#include <unistd.h>

#include "utils.h"

static const char fifo_path[] = "fifo_channel";

int main(void)
{
	char buffer[256];
	ssize_t n;
	int fd;
	int rc;

	/* Create the FIFO: a name in the file system, with no data behind it. */
	rc = mkfifo(fifo_path, 0644);
	DIE(rc < 0 && errno != EEXIST, "mkfifo");
	printf("mkfifo(\"%s\") done\n", fifo_path);

	/* Opening for reading waits until somebody opens for writing. */
	printf("open(\"%s\", O_RDONLY) ...\n", fifo_path);
	fd = open(fifo_path, O_RDONLY);
	DIE(fd < 0, "open");
	printf("open(\"%s\", O_RDONLY) = %d\n", fifo_path, fd);

	n = read(fd, buffer, sizeof(buffer) - 1);
	DIE(n < 0, "read");
	buffer[n] = '\0';
	printf("read(%d, buffer, %zu) = %zd: %s", fd, sizeof(buffer) - 1, n,
	       buffer);

	/* The sender closed its end: there will never be more. */
	n = read(fd, buffer, sizeof(buffer) - 1);
	DIE(n < 0, "read");
	printf("read(%d, buffer, %zu) = %zd: the other end was closed\n", fd,
	       sizeof(buffer) - 1, n);

	rc = close(fd);
	DIE(rc < 0, "close");
	printf("close(%d) = %d\n", fd, rc);

	return 0;
}

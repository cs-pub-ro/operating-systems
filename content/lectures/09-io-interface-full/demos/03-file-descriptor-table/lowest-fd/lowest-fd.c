// SPDX-License-Identifier: BSD-3-Clause

/*
 * Which entry of the file descriptor table does a new channel get?  Open a
 * few, close one in the middle, open again, and watch the numbers.
 */

#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

#include "utils.h"

static int open_one(void)
{
	int fd;

	fd = open("/dev/null", O_RDONLY);
	DIE(fd < 0, "open");
	printf("open()    = %d\n", fd);

	return fd;
}

static void close_one(int fd)
{
	int rc;

	rc = close(fd);
	DIE(rc < 0, "close");
	printf("close(%d)\n", fd);
}

int main(void)
{
	int a, b, c;

	a = open_one();
	b = open_one();
	c = open_one();

	/* An entry in the middle becomes free ... */
	close_one(b);
	/* ... and the next open() takes it. */
	b = open_one();

	/* Standard input is entry 0, and an entry like any other. */
	close_one(0);
	open_one();

	close_one(a);
	close_one(c);

	return 0;
}

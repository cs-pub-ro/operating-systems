// SPDX-License-Identifier: BSD-3-Clause

/*
 * Open the same file again and again, never closing anything, until open()
 * refuses.  Every open() takes a new entry in the file descriptor table of
 * the process, and the table has a maximum size.
 */

#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <sys/resource.h>

#include "utils.h"

int main(void)
{
	struct rlimit limit;
	int first = -1, last = -1;
	long count = 0;
	int fd;
	int rc;

	rc = getrlimit(RLIMIT_NOFILE, &limit);
	DIE(rc < 0, "getrlimit");
	printf("limit of open file descriptors: %lu\n",
	       (unsigned long)limit.rlim_cur);

	while (1) {
		fd = open("/dev/null", O_RDONLY);
		if (fd < 0)
			break;
		if (first < 0)
			first = fd;
		last = fd;
		count++;
	}

	printf("open() failed: %s\n", strerror(errno));
	printf("opened %ld file descriptors, from %d to %d\n", count, first,
	       last);

	return 0;
}

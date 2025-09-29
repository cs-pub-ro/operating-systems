// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <sys/stat.h>

#include "utils/utils.h"

#define SRC_FILENAME	"in.dat"
#define DST_FILENAME	"out.dat"

#define diff_us(ta, tb)		\
	(((ta).tv_sec - (tb).tv_sec) * 1000 * 1000 + \
	 ((ta).tv_nsec - (tb).tv_nsec) / 1000)

int main(void)
{
	int src_fd, dst_fd;
	void *src_p, *dst_p;
	struct stat statbuf;
	int rc;
	struct timespec time_before, time_after;

	src_fd = open(SRC_FILENAME, O_RDONLY);
	DIE(src_fd < 0, "open");

	dst_fd = open(DST_FILENAME, O_RDWR | O_CREAT | O_TRUNC, 0644);
	DIE(dst_fd < 0, "open");

	rc = fstat(src_fd, &statbuf);
	DIE(rc < 0, "fstat");

	/* Truncate destination file. */
	rc = ftruncate(dst_fd, statbuf.st_size);
	DIE(rc < 0, "fstat");

	if (statbuf.st_size == 0) {
		/* Nothing to copy. */
		close(src_fd);
		close(dst_fd);
		return 0;
	}

	/* TODO: Map files using mmap */

	clock_gettime(CLOCK_REALTIME, &time_before);
	/* TODO: Do the copying */
	clock_gettime(CLOCK_REALTIME, &time_after);
	printf("time passed %ld microseconds\n", diff_us(time_after, time_before));

	/* TODO: Unmap files. */

	close(src_fd);
	close(dst_fd);

	return 0;
}

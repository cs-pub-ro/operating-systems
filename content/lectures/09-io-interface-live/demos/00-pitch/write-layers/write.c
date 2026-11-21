// SPDX-License-Identifier: BSD-3-Clause

/*
 * Write NUM_RECORDS records to a file with write(), one system call for
 * each.  The flags the file is opened with decide how far a record has gone
 * by the time write() returns:
 *
 *   (nothing)                  into the kernel's buffer cache, in memory
 *   -DEXTRA_FLAGS=O_DIRECT     past the cache, handed to the disk
 *   ... O_DIRECT | O_SYNC      on the disk, and the disk said so
 */

#define _GNU_SOURCE	/* for O_DIRECT */

#include <fcntl.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include "utils.h"
#include "write.h"

#ifndef EXTRA_FLAGS
#define EXTRA_FLAGS	0
#endif

#ifndef NAME
#define NAME		"write"
#endif

#define ALIGNMENT	4096

int main(void)
{
	double start, stop;
	char *record;
	ssize_t n;
	int fd;
	int rc;
	int i;

	/*
	 * O_DIRECT wants the buffer to start at a multiple of the disk's
	 * block size; the other builds do not care.
	 */
	rc = posix_memalign((void **)&record, ALIGNMENT, RECORD_SIZE);
	DIE(rc != 0, "posix_memalign");
	memset(record, 0, RECORD_SIZE);

	fd = open(FILE_NAME, O_WRONLY | O_CREAT | O_TRUNC | EXTRA_FLAGS, 0644);
	DIE(fd < 0, "open");

	start = now_ms();
	for (i = 0; i < NUM_RECORDS; i++) {
		n = write(fd, record, RECORD_SIZE);
		DIE(n != RECORD_SIZE, "write");
	}
	stop = now_ms();

	report(NAME, stop - start);

	close(fd);
	free(record);

	return 0;
}

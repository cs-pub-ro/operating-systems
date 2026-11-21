// SPDX-License-Identifier: BSD-3-Clause

/*
 * Make a file of 20 GiB without writing a byte, then write one byte in the
 * middle of it.  The size of a file is a number kept with the file; the
 * space it takes on the disk is another.
 */

#include <fcntl.h>
#include <stdio.h>
#include <sys/stat.h>
#include <unistd.h>

#include "utils.h"

#define FILE_NAME	"fake-gargantua.dat"
#define SIZE		(20UL * 1024 * 1024 * 1024)	/* 20 GiB */

static void show(int fd, const char *what)
{
	struct stat info;
	int rc;

	rc = fstat(fd, &info);
	DIE(rc < 0, "fstat");

	/* st_blocks counts units of 512 bytes, whatever the file system. */
	printf("%-28s  size: %11ld bytes   on disk: %ld bytes\n", what,
	       (long)info.st_size, (long)info.st_blocks * 512);
}

int main(void)
{
	ssize_t n;
	off_t pos;
	int fd;
	int rc;

	fd = open(FILE_NAME, O_WRONLY | O_CREAT | O_TRUNC, 0644);
	DIE(fd < 0, "open");
	show(fd, "open(O_CREAT | O_TRUNC)");

	rc = ftruncate(fd, SIZE);
	DIE(rc < 0, "ftruncate");
	show(fd, "ftruncate(20 GiB)");

	pos = lseek(fd, SIZE / 2, SEEK_SET);
	DIE(pos < 0, "lseek");
	n = write(fd, "x", 1);
	DIE(n < 0, "write");
	show(fd, "write(1) at 10 GiB");

	close(fd);

	return 0;
}

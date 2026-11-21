// SPDX-License-Identifier: BSD-3-Clause

/*
 * Try to open a file in each of the three access modes, and say which the
 * kernel allows.  What is allowed depends on the permissions of the file in
 * the file system; what is asked for becomes the permissions of the
 * channel.
 *
 *     ./open-perm <file>
 */

#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <sys/stat.h>
#include <unistd.h>

#include "utils.h"

static void try_open(const char *path, int flags, const char *name)
{
	int fd;

	fd = open(path, flags);
	if (fd < 0) {
		printf("  open(%-8s)  refused: %s\n", name, strerror(errno));
		return;
	}

	printf("  open(%-8s)  = %d\n", name, fd);
	close(fd);
}

int main(int argc, char *argv[])
{
	struct stat info;
	int rc;

	if (argc != 2) {
		fprintf(stderr, "Usage: %s <file>\n", argv[0]);
		return 1;
	}

	rc = stat(argv[1], &info);
	DIE(rc < 0, "stat");
	printf("%s has permissions %03o in the file system\n", argv[1],
	       (unsigned int)(info.st_mode & 0777));

	try_open(argv[1], O_RDONLY, "O_RDONLY");
	try_open(argv[1], O_WRONLY, "O_WRONLY");
	try_open(argv[1], O_RDWR, "O_RDWR");

	return 0;
}

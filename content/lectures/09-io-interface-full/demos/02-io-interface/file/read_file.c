// SPDX-License-Identifier: BSD-3-Clause

/*
 * Open a channel to a file that exists, ask about the file, read from it
 * and close the channel.  Every call is printed with what it returned.
 */

#include <fcntl.h>
#include <stdio.h>
#include <sys/stat.h>
#include <unistd.h>

#include "utils.h"

static const char file_path[] = "file_channel";

int main(void)
{
	char buffer[256];
	struct stat info;
	ssize_t n;
	int fd;
	int rc;

	fd = open(file_path, O_RDONLY);
	DIE(fd < 0, "open");
	printf("open(\"%s\", O_RDONLY) = %d\n", file_path, fd);

	/* stat: information about what is at the other end of the channel. */
	rc = fstat(fd, &info);
	DIE(rc < 0, "fstat");
	printf("fstat(%d) = %d: a file of %ld bytes\n", fd, rc,
	       (long)info.st_size);

	n = read(fd, buffer, sizeof(buffer) - 1);
	DIE(n < 0, "read");
	buffer[n] = '\0';
	printf("read(%d, buffer, %zu) = %zd: %s", fd, sizeof(buffer) - 1, n,
	       buffer);

	/* There is nothing left: the file does not grow while we wait. */
	n = read(fd, buffer, sizeof(buffer) - 1);
	DIE(n < 0, "read");
	printf("read(%d, buffer, %zu) = %zd: the end of the file\n", fd,
	       sizeof(buffer) - 1, n);

	rc = close(fd);
	DIE(rc < 0, "close");
	printf("close(%d) = %d\n", fd, rc);

	return 0;
}

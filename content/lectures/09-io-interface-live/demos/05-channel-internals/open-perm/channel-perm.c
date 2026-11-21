// SPDX-License-Identifier: BSD-3-Clause

/*
 * The permissions of a channel are fixed when it is opened, and they are
 * not the permissions of the file.
 *
 *   1. A file that anybody may write, opened for reading only: write()
 *      through that channel is refused.
 *   2. A file opened for reading and writing, then made untouchable with
 *      chmod(): the channel that is already open goes on working, and
 *      only a new open() is refused.
 */

#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <sys/stat.h>
#include <unistd.h>

#include "utils.h"

#define FILE_NAME	"notes.txt"

static void try_write(int fd)
{
	ssize_t n;

	n = write(fd, "abc\n", 4);
	if (n < 0)
		printf("  write(%d)  refused: %s\n", fd, strerror(errno));
	else
		printf("  write(%d)  = %zd\n", fd, n);
}

static void try_open(int flags, const char *name)
{
	int fd;

	fd = open(FILE_NAME, flags);
	if (fd < 0) {
		printf("  open(%s)  refused: %s\n", name, strerror(errno));
		return;
	}

	printf("  open(%s)  = %d\n", name, fd);
	close(fd);
}

int main(void)
{
	int fd;
	int rc;

	/* Start from a file that its owner may read and write. */
	unlink(FILE_NAME);
	fd = open(FILE_NAME, O_WRONLY | O_CREAT, 0644);
	DIE(fd < 0, "open");
	close(fd);

	printf("1. the file is 644, the channel is opened O_RDONLY\n");
	fd = open(FILE_NAME, O_RDONLY);
	DIE(fd < 0, "open");
	try_write(fd);
	close(fd);

	printf("2. the file is 644, the channel is opened O_RDWR\n");
	fd = open(FILE_NAME, O_RDWR);
	DIE(fd < 0, "open");
	try_write(fd);

	printf("3. chmod 000: nobody may open the file any more\n");
	rc = chmod(FILE_NAME, 0000);
	DIE(rc < 0, "chmod");
	try_open(O_RDONLY, "O_RDONLY");

	printf("4. the channel opened at step 2 is still here\n");
	try_write(fd);
	close(fd);

	unlink(FILE_NAME);

	return 0;
}

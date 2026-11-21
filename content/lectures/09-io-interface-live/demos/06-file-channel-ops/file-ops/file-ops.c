// SPDX-License-Identifier: BSD-3-Clause

/*
 * One file, one channel, and the operations that change them.  After every
 * step the program prints the two numbers that matter: the file pointer,
 * which belongs to the channel, and the size, which belongs to the file.
 *
 *     ./file-ops         run through
 *     ./file-ops step    wait for ENTER after every step, so that the
 *                        process can be looked at from another terminal
 */

#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <sys/stat.h>
#include <unistd.h>

#include "utils.h"

#define FILE_NAME	"f.txt"

static char buffer[1024];
static int step;

/* Print where the channel and the file are, and wait if asked to. */
static void show(int fd, const char *what)
{
	struct stat info;
	off_t pointer;
	int rc;

	pointer = lseek(fd, 0, SEEK_CUR);
	DIE(pointer < 0, "lseek");
	rc = fstat(fd, &info);
	DIE(rc < 0, "fstat");

	printf("%-28s  pointer: %4ld   size: %4ld\n", what, (long)pointer,
	       (long)info.st_size);

	if (step) {
		printf("    press ENTER to continue ...");
		fflush(stdout);
		while (getchar() != '\n')
			;
	}
}

int main(int argc, char *argv[])
{
	char what[64];
	ssize_t n;
	off_t pos;
	int fd;
	int rc;

	step = argc > 1 && strcmp(argv[1], "step") == 0;
	memset(buffer, 'A', sizeof(buffer));

	printf("process %d\n", getpid());

	fd = open(FILE_NAME, O_RDWR | O_CREAT | O_TRUNC, 0644);
	DIE(fd < 0, "open");
	snprintf(what, sizeof(what), "open() = %d", fd);
	show(fd, what);

	n = write(fd, buffer, 1024);
	DIE(n < 0, "write");
	snprintf(what, sizeof(what), "write(1024) = %zd", n);
	show(fd, what);

	pos = lseek(fd, -512, SEEK_CUR);
	DIE(pos < 0, "lseek");
	snprintf(what, sizeof(what), "lseek(-512, SEEK_CUR) = %ld", (long)pos);
	show(fd, what);

	n = read(fd, buffer, 256);
	DIE(n < 0, "read");
	snprintf(what, sizeof(what), "read(256) = %zd", n);
	show(fd, what);

	rc = ftruncate(fd, 256);
	DIE(rc < 0, "ftruncate");
	snprintf(what, sizeof(what), "ftruncate(256) = %d", rc);
	show(fd, what);

	/* The pointer is past the end now: there is nothing to read. */
	n = read(fd, buffer, 256);
	DIE(n < 0, "read");
	snprintf(what, sizeof(what), "read(256) = %zd", n);
	show(fd, what);

	/* Writing there is allowed, and the file grows to reach it. */
	n = write(fd, buffer, 16);
	DIE(n < 0, "write");
	snprintf(what, sizeof(what), "write(16) = %zd", n);
	show(fd, what);

	rc = close(fd);
	DIE(rc < 0, "close");
	printf("close() = %d\n", rc);

	return 0;
}

// SPDX-License-Identifier: BSD-3-Clause

#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#include "utils/utils.h"

#define BUF_SIZE 128

/**
 * rread() - Always read the number of bytes we expect or all the bytes available.
 *
 * Remember that syscalls can fail, so we should always check their return values.
 * read() returns the number of bytes read, or -1 if an error occurred.
 * Watch out for partial reads, which can happen if the read is interrupted by a signal.
 *
 * HINT: Use a while loop to keep reading until we have read the number of bytes we expect.
 */
size_t rread(int fd, void *buf, size_t size)
{
	/* TODO: Read the entire file and print it to stdout */
}

/**
 * wwrite() - Always write the number of bytes we expect.
 *
 * Remember that syscalls can fail, so we should always check their return values.
 * write() returns the number of bytes written, or -1 if an error occurred.
 * Watch out for partial writes, which can happen if the write is interrupted by a signal.
 *
 * HINT: Use a while loop to keep writing until we have written the number of bytes we expect.
 */
size_t wwrite(int fd, const void *buf, size_t size)
{
	/* TODO: Read the entire file and print it to stdout */
	/* return 0; */
}

void cat(const char *filename)
{
	char buf[BUF_SIZE];
	int fd, bytes_read;
	int rc;

	/* TODO: Open the file in read-only mode */


	/* TODO: Read the entire file and print it to stdout */
	rc = close(fd);
	DIE(rc < 0, "close");
}

int main(int argc, char *argv[])
{
	if (argc < 2) {
		printf("Usage: %s <file1> <file2> ... <fileN>\n", argv[0]);
		exit(0);
	}

	for (int i = 1; i < argc; i++)
		cat(argv[i]);

	return 0;
}

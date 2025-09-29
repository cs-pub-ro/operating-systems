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
	/* TODO 18: Read the entire file and print it to stdout */
	int bytes_read = 0;
	size_t total_bytes_read = 0;

	while (true) {
		bytes_read = read(fd, buf + total_bytes_read, size - total_bytes_read);
		DIE(bytes_read < 0, "read");

		if (bytes_read == 0)
			break;

		total_bytes_read += bytes_read;
		if (total_bytes_read == size)
			break;
	}

	return total_bytes_read;
	/* REPLACE 1 */
	/* return 0; */
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
	/* TODO 14: Read the entire file and print it to stdout */
	int bytes_written = 0;
	size_t total_bytes_written = 0;

	while (true) {
		bytes_written = write(fd, buf + total_bytes_written, size - total_bytes_written);
		DIE(bytes_written < 0, "write");

		total_bytes_written += bytes_written;
		if (total_bytes_written == size)
			break;
	}

	return total_bytes_written;
	/* REPLACE 1 */
	/* return 0; */
}

void cat(const char *filename)
{
	char buf[BUF_SIZE];
	int fd, bytes_read;
	int rc;

	/* TODO 2: Open the file in read-only mode */
	fd = open(filename, O_RDONLY);
	DIE(fd < 0, "open");


	/* TODO 8: Read the entire file and print it to stdout */
	while (true) {
		bytes_read = rread(fd, buf, sizeof(buf));
		if (bytes_read == 0)
			break;

		wwrite(STDOUT_FILENO, buf, bytes_read);
	}

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

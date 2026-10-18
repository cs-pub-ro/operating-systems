// SPDX-License-Identifier: BSD-3-Clause

/*
 * reverse_lines: print the lines of a file last to first, like tac(1).
 *
 * The whole file is read into one buffer and the buffer is walked backwards.
 * The reading and the walking are written; you provide the buffer.  It is as
 * large as the file -- a size known only at run time, and possibly hundreds
 * of megabytes -- and it is needed only until the output has been written.
 *
 * Build:  make
 * Run:    ./reverse_lines <file>
 */
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/stat.h>

/*
 * Read exactly `size` bytes from `fd` into `buf`.  read() may return fewer
 * bytes than asked for, so keep going until everything is in, or until the
 * file ends early or an error occurs.  Returns 0 on success, -1 otherwise.
 */
static int read_all(int fd, char *buf, size_t size)
{
	size_t done = 0;

	while (done < size) {
		ssize_t n = read(fd, buf + done, size - done);

		if (n < 0) {
			perror("read");
			return -1;
		}
		if (n == 0) {
			fprintf(stderr, "read: file shrank while reading\n");
			return -1;
		}
		done += (size_t)n;
	}

	return 0;
}

/*
 * Walk the buffer from the end and print each line as it is found.
 * A line is everything up to and including its '\n'; the last line of the
 * file may lack one, in which case it is printed without one, like tac does.
 */
static void print_reversed(const char *buf, size_t size)
{
	size_t line_end = size;
	size_t i = size;

	while (i-- > 0) {
		if (buf[i] == '\n' && i + 1 < size) {
			fwrite(buf + i + 1, 1, line_end - (i + 1), stdout);
			line_end = i + 1;
		}
	}
	fwrite(buf, 1, line_end, stdout);
}

int main(int argc, char *argv[])
{
	char *buf;
	size_t size;
	int fd;

	if (argc != 2) {
		fprintf(stderr, "Usage: %s <file>\n", argv[0]);
		return EXIT_FAILURE;
	}

	fd = open(argv[1], O_RDONLY);
	if (fd < 0) {
		perror("open");
		return EXIT_FAILURE;
	}

	/*
	 * TODO 1: the buffer has to hold the whole file, so find out how large
	 * the file is.  The descriptor is already open; there is a system call
	 * that answers the question for an open file.
	 */

	/*
	 * TODO 2: obtain the buffer from the kernel: `size` bytes, as an
	 * anonymous mapping that this program can read and write.
	 *
	 * Think about what happens here when the file is empty, and about the
	 * value mmap() returns when it fails.
	 */

	if (read_all(fd, buf, size) < 0) {
		/* Leave nothing behind on this path either. */
		close(fd);
		return EXIT_FAILURE;
	}
	close(fd);

	print_reversed(buf, size);

	/* TODO 3: the buffer has done its job. */

	return EXIT_SUCCESS;
}

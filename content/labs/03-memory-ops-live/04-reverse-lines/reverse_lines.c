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
	struct stat st;
	char *buf = NULL;
	size_t size;
	int fd;

	if (argc != 2) {
		fprintf(stderr, "Usage: %s <file>\n", argv[0]);
		exit(EXIT_FAILURE);
	}

	fd = open(argv[1], O_RDONLY);
	if (fd < 0) {
		perror("open");
		goto fail;
	}

	/*
	 * The buffer has to be as large as the file.
	 * The file size is saved in the "size" variable.
	 */
	if (fstat(fd, &st) < 0) {
		perror("fstat");
		goto fail_fd;
	}
	size = (size_t)st.st_size;

	if (size == 0) {
		close(fd);
		return 0;
	}

	/*
	 * TODO 1: obtain the buffer from the kernel using mmap: `size` bytes,
	 * as an anonymous mapping that this program can read and write.
	 *
	 * Think about the value mmap() returns when it fails, and about where
	 * a failing run leaves from.
	 */

	if (read_all(fd, buf, size) < 0)
		goto fail_buf;
	close(fd);

	print_reversed(buf, size);

	/* TODO 2: the buffer has done its job. */

	return 0;

fail_buf:
	/* TODO 2: the buffer is still there on this path too. */
fail_fd:
	close(fd);
fail:
	return -1;
}

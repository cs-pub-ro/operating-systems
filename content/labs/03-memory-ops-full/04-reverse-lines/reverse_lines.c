// SPDX-License-Identifier: BSD-3-Clause

/*
 * reverse_lines: print the lines of a file last to first, like tac(1).
 *
 * The whole file is read into one buffer and the buffer is walked backwards.
 * That buffer is as large as the file -- a size known only at run time, and
 * possibly hundreds of megabytes -- and it is needed only until the output
 * has been written.  It is obtained from the kernel directly, as an anonymous
 * mapping, and given back with munmap() the moment it is done with.
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
	char *buf;
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

	/* The buffer has to be as large as the file: ask how large that is. */
	if (fstat(fd, &st) < 0) {
		perror("fstat");
		goto fail_fd;
	}
	size = (size_t)st.st_size;

	/* An empty file has no lines; it also cannot back a mapping of 0 bytes. */
	if (size == 0) {
		close(fd);
		return 0;
	}

	/*
	 * One anonymous mapping of exactly the file's size (rounded up to whole
	 * pages by the kernel): private, readable and writable, no file behind
	 * it.  This is the size for which malloc() would call mmap() anyway;
	 * calling it here keeps the allocator out of the way and guarantees the
	 * memory goes straight back to the kernel at munmap().
	 */
	buf = mmap(NULL, size, PROT_READ | PROT_WRITE,
		   MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
	if (buf == MAP_FAILED) {
		perror("mmap");
		goto fail_fd;
	}

	if (read_all(fd, buf, size) < 0)
		goto fail_buf;
	close(fd);

	print_reversed(buf, size);

	/* Done with the buffer: the area disappears from the address space. */
	munmap(buf, size);

	return 0;

fail_buf:
	munmap(buf, size);
fail_fd:
	close(fd);
fail:
	return -1;
}

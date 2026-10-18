// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>

#define BUFFER_SIZE (1 * 1024 * 1024)  /* 1 MiB */

int main(int argc, char *argv[])
{
	const char *src_path;
	const char *dst_path;
	size_t bytes_read;
	FILE *src;
	FILE *dst;

	if (argc != 3) {
		fprintf(stderr, "Usage: %s <source> <destination>\n", argv[0]);
		exit(EXIT_FAILURE);
	}

	src_path = argv[1];
	dst_path = argv[2];

	/*
	 * TODO 1: obtain the copy buffer from the kernel: `buffer`, BUFFER_SIZE
	 * bytes, with mmap().  There is no file behind this memory, so it is an
	 * anonymous mapping, private to this process, and it has to be both
	 * readable and writable.  `man 2 mmap` has the flags, and the return
	 * value that means failure, which is not NULL.
	 *
	 * From this line on, the area is yours to give back, with munmap(),
	 * on every way out of main().  Look at the labels at the end of the
	 * function: which ways out do they already cover?
	 */

	/* Open source file for reading. */
	src = fopen(src_path, "rb");
	if (!src) {
		perror("fopen");
		goto fail_buffer;
	}

	/* Open destination file for writing (create/truncate). */
	dst = fopen(dst_path, "wb");
	if (!dst) {
		perror("fopen");
		goto fail_src;
	}

	/* Read a block from the source into the buffer, write it out, repeat. */
	while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, src)) > 0) {
		/*
		 * TODO 2: write the `bytes_read` bytes now in `buffer` to `dst`.
		 * fwrite() may write fewer than asked (a full disk, for one);
		 * treat that as an error, and leave through the label that
		 * undoes what is open at this point.
		 */
	}

	if (ferror(src)) {
		perror("fread");
		goto fail_dst;
	}

	fclose(dst);
	fclose(src);

	/* TODO 3: give the area back. */

	printf("Copied '%s' -> '%s'\n", src_path, dst_path);

	return 0;

fail_dst:
	fclose(dst);
fail_src:
	fclose(src);
fail_buffer:
	munmap(buffer, BUFFER_SIZE);
fail:
	return -1;
}

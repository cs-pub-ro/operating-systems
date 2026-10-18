// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>

#define BUFFER_SIZE (1 * 1024 * 1024)  /* 1 MiB */

int main(int argc, char *argv[])
{
	if (argc != 3) {
		fprintf(stderr, "Usage: %s <source> <destination>\n", argv[0]);
		return EXIT_FAILURE;
	}

	const char *src_path = argv[1];
	const char *dst_path = argv[2];

	/*
	 * TODO 1: obtain the copy buffer from the kernel: `buffer`, BUFFER_SIZE
	 * bytes, with mmap().  There is no file behind this memory, so it is an
	 * anonymous mapping, private to this process, and it has to be both
	 * readable and writable.  `man 2 mmap` has the flags, and the return
	 * value that means failure, which is not NULL.
	 *
	 * From this line on, the area is yours to give back, with munmap(),
	 * on every way out of main().
	 */

	/* Open source file for reading. */
	FILE *src = fopen(src_path, "rb");

	if (!src) {
		perror("fopen source");
		/* TODO 2: this is one way out. */
		return EXIT_FAILURE;
	}

	/* Open destination file for writing (create/truncate). */
	FILE *dst = fopen(dst_path, "wb");

	if (!dst) {
		perror("fopen destination");
		fclose(src);
		/* TODO 3: and another. */
		return EXIT_FAILURE;
	}

	/* Read a block from the source into the buffer, write it out, repeat. */
	size_t bytes_read;

	while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, src)) > 0) {
		/*
		 * TODO 4: write the `bytes_read` bytes now in `buffer` to `dst`.
		 * fwrite() may write fewer than asked (a full disk, for one);
		 * treat that as an error, and leave nothing open or mapped
		 * behind you.
		 */
	}

	if (ferror(src)) {
		perror("fread");
		fclose(src);
		fclose(dst);
		/* TODO 5: and another. */
		return EXIT_FAILURE;
	}

	fclose(src);
	fclose(dst);

	/* TODO 6: give the area back. */

	printf("Copied '%s' -> '%s'\n", src_path, dst_path);
	return EXIT_SUCCESS;
}

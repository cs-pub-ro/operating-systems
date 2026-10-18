// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>

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
	 * TODO 1: obtain the copy buffer from the heap: `buffer`, BUFFER_SIZE
	 * bytes, with malloc().  The request can fail; decide what the program
	 * does then.
	 *
	 * From this line on, the buffer is yours to give back, on every way
	 * out of main().  Count those ways as you go.
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
		 * treat that as an error, and leave nothing open or allocated
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

	/* TODO 6: the way out everybody remembers. */

	printf("Copied '%s' -> '%s'\n", src_path, dst_path);
	return EXIT_SUCCESS;
}

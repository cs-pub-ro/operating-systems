// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>

#define BUFFER_SIZE (1 * 1024 * 1024)  /* 1 MiB */

int main(int argc, char *argv[])
{
	/*
	 * TODO 1: declare the copy buffer the loop below reads into and writes
	 * from: `buffer`, BUFFER_SIZE bytes, here, as a local variable.
	 *
	 * A local lives in the stack frame of its function: it appears when
	 * main() is entered and is gone when main() returns, with no call to
	 * allocate or release it.  The stack is not large, though.  `ulimit -s`
	 * prints its limit; compare it with BUFFER_SIZE.
	 */

	if (argc != 3) {
		fprintf(stderr, "Usage: %s <source> <destination>\n", argv[0]);
		return EXIT_FAILURE;
	}

	const char *src_path = argv[1];
	const char *dst_path = argv[2];

	/* Open source file for reading. */
	FILE *src = fopen(src_path, "rb");

	if (!src) {
		perror("fopen source");
		return EXIT_FAILURE;
	}

	/* Open destination file for writing (create/truncate). */
	FILE *dst = fopen(dst_path, "wb");

	if (!dst) {
		perror("fopen destination");
		fclose(src);
		return EXIT_FAILURE;
	}

	/* Read a block from the source into the buffer, write it out, repeat. */
	size_t bytes_read;

	while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, src)) > 0) {
		/*
		 * TODO 2: write the `bytes_read` bytes now in `buffer` to `dst`.
		 * fwrite() may write fewer than asked (a full disk, for one);
		 * treat that as an error, and leave no file open behind you.
		 */
	}

	if (ferror(src)) {
		perror("fread");
		fclose(src);
		fclose(dst);
		return EXIT_FAILURE;
	}

	fclose(src);
	fclose(dst);

	/* Nothing to release: the buffer goes away with main()'s frame. */

	printf("Copied '%s' -> '%s'\n", src_path, dst_path);
	return EXIT_SUCCESS;
}

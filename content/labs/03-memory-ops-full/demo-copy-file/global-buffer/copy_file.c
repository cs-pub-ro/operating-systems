// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>

#define BUFFER_SIZE (1 * 1024 * 1024)  /* 1 MiB */

/*
 * The copy buffer: a static global array.  Zero-initialised, so it lands in
 * the BSS segment: the executable records its size and nothing else, and the
 * memory exists from before main() until the process exits.
 */
static char buffer[BUFFER_SIZE];

int main(int argc, char *argv[])
{
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
		size_t bytes_written = fwrite(buffer, 1, bytes_read, dst);

		if (bytes_written != bytes_read) {
			fprintf(stderr, "fwrite: short write\n");
			fclose(src);
			fclose(dst);
			return EXIT_FAILURE;
		}
	}

	if (ferror(src)) {
		perror("fread");
		fclose(src);
		fclose(dst);
		return EXIT_FAILURE;
	}

	fclose(src);
	fclose(dst);

	/* Nothing to release: the buffer was never allocated. */

	printf("Copied '%s' -> '%s'\n", src_path, dst_path);
	return EXIT_SUCCESS;
}

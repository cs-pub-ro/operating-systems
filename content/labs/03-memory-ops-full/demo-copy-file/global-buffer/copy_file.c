// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFFER_SIZE (1 * 1024 * 1024)  /* 1 MiB */

/* Static global buffer used for copying file contents. */
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

	/* Read source into global buffer, then write buffer to destination. */
	size_t bytes_read;
	while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, src)) > 0) {
		/* Copy is implicit: buffer already holds the data.
		 * Use memcpy to move data to a local staging variable
		 * to illustrate memcpy usage (destination == buffer here). */
		char local[BUFFER_SIZE];

		memcpy(local, buffer, bytes_read);

		size_t bytes_written = fwrite(local, 1, bytes_read, dst);
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

	printf("Copied '%s' -> '%s'\n", src_path, dst_path);
	return EXIT_SUCCESS;
}

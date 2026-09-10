// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFFER_SIZE (1 * 1024 * 1024)  /* 1 MiB */

int main(int argc, char *argv[])
{
	if (argc != 3) {
		fprintf(stderr, "Usage: %s <source> <destination>\n", argv[0]);
		return EXIT_FAILURE;
	}

	const char *src_path = argv[1];
	const char *dst_path = argv[2];

	/* Allocate a buffer on the heap using malloc(). */
	char *buffer = malloc(BUFFER_SIZE);
	if (!buffer) {
		perror("malloc");
		return EXIT_FAILURE;
	}

	/* Open source file for reading. */
	FILE *src = fopen(src_path, "rb");
	if (!src) {
		perror("fopen source");
		free(buffer);
		return EXIT_FAILURE;
	}

	/* Open destination file for writing (create/truncate). */
	FILE *dst = fopen(dst_path, "wb");
	if (!dst) {
		perror("fopen destination");
		fclose(src);
		free(buffer);
		return EXIT_FAILURE;
	}

	/* Read source into heap buffer, copy with memcpy, write to destination. */
	size_t bytes_read;
	while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, src)) > 0) {
		/* Allocate a temporary write buffer and copy into it. */
		char *write_buf = malloc(bytes_read);
		if (!write_buf) {
			perror("malloc write_buf");
			fclose(src);
			fclose(dst);
			free(buffer);
			return EXIT_FAILURE;
		}

		memcpy(write_buf, buffer, bytes_read);

		size_t bytes_written = fwrite(write_buf, 1, bytes_read, dst);
		free(write_buf);

		if (bytes_written != bytes_read) {
			fprintf(stderr, "fwrite: short write\n");
			fclose(src);
			fclose(dst);
			free(buffer);
			return EXIT_FAILURE;
		}
	}

	if (ferror(src)) {
		perror("fread");
		fclose(src);
		fclose(dst);
		free(buffer);
		return EXIT_FAILURE;
	}

	fclose(src);
	fclose(dst);
	free(buffer);

	printf("Copied '%s' -> '%s'\n", src_path, dst_path);
	return EXIT_SUCCESS;
}

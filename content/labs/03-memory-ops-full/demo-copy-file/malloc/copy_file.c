// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>

#define BUFFER_SIZE (1 * 1024 * 1024)  /* 1 MiB */

int main(int argc, char *argv[])
{
	unsigned char *buffer;
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
	 * The copy buffer: a heap block obtained from the allocator at run
	 * time.  From here on every way out of main() has to free it, and the
	 * labels at the end of main() are where the failing ways do that.
	 */
	buffer = malloc(BUFFER_SIZE);
	if (!buffer) {
		perror("malloc");
		goto fail;
	}

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
		size_t bytes_written;

		bytes_written = fwrite(buffer, 1, bytes_read, dst);
		if (bytes_written != bytes_read) {
			fprintf(stderr, "fwrite: short write\n");
			goto fail_dst;
		}
	}

	if (ferror(src)) {
		perror("fread");
		goto fail_dst;
	}

	fclose(dst);
	fclose(src);

	/* The one release everybody remembers. */
	free(buffer);

	printf("Copied '%s' -> '%s'\n", src_path, dst_path);

	return 0;

fail_dst:
	fclose(dst);
fail_src:
	fclose(src);
fail_buffer:
	free(buffer);
fail:
	return -1;
}

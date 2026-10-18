// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>

#define BUFFER_SIZE (1 * 1024 * 1024)  /* 1 MiB */

/*
 * The copy buffer: a static global array.  Zero-initialised, so it lands in
 * the BSS segment: the executable records its size and nothing else, and the
 * memory exists from before main() until the process exits.
 */
static unsigned char buffer[BUFFER_SIZE];

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

	/* Open source file for reading. */
	src = fopen(src_path, "rb");
	if (!src) {
		perror("fopen");
		goto fail;
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

	/* Nothing to release: the buffer lives until the process exits. */

	printf("Copied '%s' -> '%s'\n", src_path, dst_path);

	return 0;

fail_dst:
	fclose(dst);
fail_src:
	fclose(src);
fail:
	return -1;
}

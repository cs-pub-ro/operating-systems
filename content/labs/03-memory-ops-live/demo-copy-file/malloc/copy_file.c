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

	/* TODO 1: Allocate a buffer of BUFFER_SIZE bytes on the heap using
	 * malloc().  malloc() requests memory from the OS at runtime and
	 * returns a pointer to the allocated region, or NULL on failure.
	 *
	 *   char *buffer = malloc(BUFFER_SIZE);
	 *   if (!buffer) { perror("malloc"); return EXIT_FAILURE; }
	 */

	/* Open source file for reading. */
	FILE *src = fopen(src_path, "rb");
	if (!src) {
		perror("fopen source");
		/* TODO 2: Free `buffer` before returning to avoid a memory leak. */
		return EXIT_FAILURE;
	}

	/* Open destination file for writing (create/truncate). */
	FILE *dst = fopen(dst_path, "wb");
	if (!dst) {
		perror("fopen destination");
		fclose(src);
		/* TODO 3: Free `buffer` before returning. */
		return EXIT_FAILURE;
	}

	size_t bytes_read;
	while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, src)) > 0) {
		/* TODO 4: Allocate a temporary write buffer of `bytes_read`
		 * bytes with malloc() and use memcpy() to copy the data from
		 * `buffer` into it.
		 *
		 *   char *write_buf = malloc(bytes_read);
		 *   if (!write_buf) { perror("malloc"); ... return EXIT_FAILURE; }
		 *   memcpy(write_buf, buffer, bytes_read);
		 */

		/* TODO 5: Write `bytes_read` bytes from `write_buf` to `dst`
		 * with fwrite(), free `write_buf`, and check for a short write.
		 *
		 *   size_t bytes_written = fwrite(write_buf, 1, bytes_read, dst);
		 *   free(write_buf);
		 *   if (bytes_written != bytes_read) { ... return EXIT_FAILURE; }
		 */
	}

	if (ferror(src)) {
		perror("fread");
		fclose(src);
		fclose(dst);
		/* TODO 6: Free `buffer` before returning. */
		return EXIT_FAILURE;
	}

	fclose(src);
	fclose(dst);

	/* TODO 7: Free `buffer` now that we are done with it.
	 * Every malloc() must be paired with a free() to avoid memory leaks.
	 *
	 *   free(buffer);
	 */

	printf("Copied '%s' -> '%s'\n", src_path, dst_path);
	return EXIT_SUCCESS;
}

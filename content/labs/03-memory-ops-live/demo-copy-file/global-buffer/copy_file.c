// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFFER_SIZE (1 * 1024 * 1024)  /* 1 MiB */

/* TODO 1: Declare a static global char array named `buffer` of size
 * BUFFER_SIZE.  A static global variable is allocated in the BSS segment
 * (zero-initialised) and lives for the entire lifetime of the process —
 * no explicit allocation or deallocation is needed.
 *
 *   static char buffer[BUFFER_SIZE];
 */

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

	size_t bytes_read;
	while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, src)) > 0) {
		/* TODO 2: Declare a local char array `local` of size BUFFER_SIZE
		 * and use memcpy() to copy `bytes_read` bytes from `buffer`
		 * into `local`.
		 *
		 * memcpy(dst_ptr, src_ptr, n) copies n bytes from src_ptr to
		 * dst_ptr.  The source and destination must NOT overlap.
		 *
		 *   char local[BUFFER_SIZE];
		 *   memcpy(local, buffer, bytes_read);
		 */

		/* TODO 3: Write `bytes_read` bytes from `local` to the
		 * destination file using fwrite(), and handle a short-write
		 * error.
		 *
		 *   size_t bytes_written = fwrite(local, 1, bytes_read, dst);
		 *   if (bytes_written != bytes_read) { ... }
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

	printf("Copied '%s' -> '%s'\n", src_path, dst_path);
	return EXIT_SUCCESS;
}

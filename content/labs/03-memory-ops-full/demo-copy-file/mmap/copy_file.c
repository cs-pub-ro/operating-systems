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
	 * The copy buffer: an anonymous mapping, asked from the kernel
	 * directly.  No file behind it (MAP_ANONYMOUS, fd -1), private to this
	 * process, readable and writable, zero-filled.  From here on every way
	 * out of main() has to unmap it.
	 */
	char *buffer = mmap(NULL, BUFFER_SIZE, PROT_READ | PROT_WRITE,
			    MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);

	if (buffer == MAP_FAILED) {
		perror("mmap");
		return EXIT_FAILURE;
	}

	/* Open source file for reading. */
	FILE *src = fopen(src_path, "rb");

	if (!src) {
		perror("fopen source");
		munmap(buffer, BUFFER_SIZE);
		return EXIT_FAILURE;
	}

	/* Open destination file for writing (create/truncate). */
	FILE *dst = fopen(dst_path, "wb");

	if (!dst) {
		perror("fopen destination");
		fclose(src);
		munmap(buffer, BUFFER_SIZE);
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
			munmap(buffer, BUFFER_SIZE);
			return EXIT_FAILURE;
		}
	}

	if (ferror(src)) {
		perror("fread");
		fclose(src);
		fclose(dst);
		munmap(buffer, BUFFER_SIZE);
		return EXIT_FAILURE;
	}

	fclose(src);
	fclose(dst);

	/* Give the area back to the kernel. */
	munmap(buffer, BUFFER_SIZE);

	printf("Copied '%s' -> '%s'\n", src_path, dst_path);
	return EXIT_SUCCESS;
}

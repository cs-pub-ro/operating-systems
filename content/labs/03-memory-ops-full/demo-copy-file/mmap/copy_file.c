// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/stat.h>
#include <sys/mman.h>

int main(int argc, char *argv[])
{
	if (argc != 3) {
		fprintf(stderr, "Usage: %s <source> <destination>\n", argv[0]);
		return EXIT_FAILURE;
	}

	const char *src_path = argv[1];
	const char *dst_path = argv[2];

	/* Open source file. */
	int src_fd = open(src_path, O_RDONLY);
	if (src_fd < 0) {
		perror("open source");
		return EXIT_FAILURE;
	}

	/* Determine source file size. */
	struct stat st;
	if (fstat(src_fd, &st) < 0) {
		perror("fstat");
		close(src_fd);
		return EXIT_FAILURE;
	}
	size_t file_size = (size_t)st.st_size;

	/* Map source file into memory (read-only). */
	void *src_map = mmap(NULL, file_size, PROT_READ, MAP_PRIVATE, src_fd, 0);
	if (src_map == MAP_FAILED) {
		perror("mmap source");
		close(src_fd);
		return EXIT_FAILURE;
	}
	close(src_fd);  /* fd can be closed after mmap */

	/* Open/create destination file and set its size. */
	int dst_fd = open(dst_path, O_RDWR | O_CREAT | O_TRUNC, 0644);
	if (dst_fd < 0) {
		perror("open destination");
		munmap(src_map, file_size);
		return EXIT_FAILURE;
	}

	/* Extend destination file to match source size. */
	if (ftruncate(dst_fd, (off_t)file_size) < 0) {
		perror("ftruncate");
		close(dst_fd);
		munmap(src_map, file_size);
		return EXIT_FAILURE;
	}

	/* Map destination file into memory (read-write). */
	void *dst_map = mmap(NULL, file_size, PROT_READ | PROT_WRITE,
			     MAP_SHARED, dst_fd, 0);
	if (dst_map == MAP_FAILED) {
		perror("mmap destination");
		close(dst_fd);
		munmap(src_map, file_size);
		return EXIT_FAILURE;
	}
	close(dst_fd);

	/* Copy contents using memcpy on the memory-mapped regions. */
	memcpy(dst_map, src_map, file_size);

	/* Flush destination mapping to disk. */
	if (msync(dst_map, file_size, MS_SYNC) < 0)
		perror("msync");  /* non-fatal */

	munmap(src_map, file_size);
	munmap(dst_map, file_size);

	printf("Copied '%s' -> '%s' (%zu bytes)\n", src_path, dst_path,
	       file_size);
	return EXIT_SUCCESS;
}

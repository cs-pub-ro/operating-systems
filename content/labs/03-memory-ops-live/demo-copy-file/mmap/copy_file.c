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

	/* TODO 1: Map the source file into memory for reading.
	 * Use mmap() with:
	 *   - addr  = NULL  (let the kernel choose the address)
	 *   - length = file_size
	 *   - prot  = PROT_READ            (read-only)
	 *   - flags = MAP_PRIVATE           (private copy-on-write mapping)
	 *   - fd    = src_fd
	 *   - offset = 0
	 * Check for MAP_FAILED and handle the error.
	 *
	 *   void *src_map = mmap(NULL, file_size, PROT_READ, MAP_PRIVATE, src_fd, 0);
	 *   if (src_map == MAP_FAILED) { perror("mmap source"); close(src_fd); return EXIT_FAILURE; }
	 *
	 * After mmap() you can close src_fd — the mapping keeps the file open
	 * internally until munmap() is called.
	 */
	close(src_fd);

	/* Open/create destination file and set its size. */
	int dst_fd = open(dst_path, O_RDWR | O_CREAT | O_TRUNC, 0644);
	if (dst_fd < 0) {
		perror("open destination");
		/* TODO 2: Unmap src_map before returning.
		 *   munmap(src_map, file_size);
		 */
		return EXIT_FAILURE;
	}

	/* TODO 3: Use ftruncate() to set the destination file size to
	 * file_size.  mmap() requires the destination file to be at least as
	 * large as the mapping; ftruncate() extends (or shrinks) the file.
	 *
	 *   if (ftruncate(dst_fd, (off_t)file_size) < 0) {
	 *       perror("ftruncate");
	 *       close(dst_fd);
	 *       munmap(src_map, file_size);
	 *       return EXIT_FAILURE;
	 *   }
	 */

	/* TODO 4: Map the destination file into memory for writing.
	 * Use mmap() with:
	 *   - prot  = PROT_READ | PROT_WRITE
	 *   - flags = MAP_SHARED   (writes go through to the underlying file)
	 *
	 *   void *dst_map = mmap(NULL, file_size, PROT_READ | PROT_WRITE,
	 *                        MAP_SHARED, dst_fd, 0);
	 *   if (dst_map == MAP_FAILED) { ... }
	 *
	 * Close dst_fd after mmap().
	 */
	close(dst_fd);

	/* TODO 5: Copy the source mapping into the destination mapping using
	 * memcpy().  Because both regions are memory-mapped, this is just a
	 * pointer-to-pointer copy — the kernel handles all the I/O.
	 *
	 *   memcpy(dst_map, src_map, file_size);
	 */

	/* TODO 6: Flush the destination mapping to disk with msync() and
	 * unmap both mappings with munmap().
	 *
	 *   msync(dst_map, file_size, MS_SYNC);
	 *   munmap(src_map, file_size);
	 *   munmap(dst_map, file_size);
	 */

	printf("Copied '%s' -> '%s' (%zu bytes)\n", src_path, dst_path,
	       file_size);
	return EXIT_SUCCESS;
}

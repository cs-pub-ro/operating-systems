// SPDX-License-Identifier: BSD-3-Clause

#include <sys/types.h>
#include <sys/stat.h>
#include <sys/mman.h>
#include <fcntl.h>
#include <string.h>
#include <unistd.h>

#include "utils/utils.h"

static void wait_for_input(const char *msg)
{
	char buf[32];

	printf(" * %s\n", msg);
	printf(" -- Press ENTER to continue ...");
	fflush(stdout);
	fgets(buf, 32, stdin);
}

int main(int argc, char *argv[])
{
	int fdin;
	int fdout;
	int rc;
	char *src;
	char *dst;
	struct stat statbuf;

	DIE(argc != 3, "Usage: ./mmap_cp <from_file> <to_file>");

	printf("PID: %d\n", getpid());

	/* TODO 2: Open the input file. */
	fdin = open(argv[1], O_RDONLY);
	DIE(fdin < 0, "open");

	/* TODO 2: Open/create the output file. */
	fdout = open(argv[2], O_RDWR | O_CREAT | O_TRUNC, 0644);
	DIE(fdout < 0, "open");

	/**
	 * The output file is created with a size of 0. We need to set the size
	 * of the output file to the size of the input file.
	 */

	/* TODO 2: Use fstat() to get the size of the input file. */
	rc = fstat(fdin, &statbuf);
	DIE(rc < 0, "fstat");

	/* TODO 2: Use ftruncate() to set the size of the output file. */
	rc = ftruncate(fdout, statbuf.st_size);
	DIE(rc < 0, "ftruncate");

	/* TODO 2: `mmap()` the input file. */
	src = mmap(NULL, statbuf.st_size, PROT_READ, MAP_PRIVATE, fdin, 0);
	DIE(src == MAP_FAILED, "mmap");

	/* wait_for_input("Mapped input file."); */

	/* TODO 2: `mmap()` the output file. */
	dst = mmap(NULL, statbuf.st_size, PROT_WRITE, MAP_SHARED, fdout, 0);
	DIE(dst == MAP_FAILED, "mmap");

	/* wait_for_input("Mapped output file."); */

	/* TODO 1: Copy the contents of the input mapping to the output mapping. */
	memcpy(dst, src, statbuf.st_size);

	/* TODO 10: Clean up. Use `munmap()` to unmap the 2 files. */
	rc = munmap(src, statbuf.st_size);
	DIE(rc < 0, "munmap");

	rc = munmap(dst, statbuf.st_size);
	DIE(rc < 0, "munmap");

	rc = close(fdin);
	DIE(rc < 0, "close");
	rc = close(fdout);
	DIE(rc < 0, "close");

	return 0;
}

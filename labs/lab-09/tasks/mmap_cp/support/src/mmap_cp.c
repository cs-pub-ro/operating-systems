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

	/* TODO: Open the input file. */

	/* TODO: Open/create the output file. */

	/**
	 * The output file is created with a size of 0. We need to set the size
	 * of the output file to the size of the input file.
	 */

	/* TODO: Use fstat() to get the size of the input file. */

	/* TODO: Use ftruncate() to set the size of the output file. */

	/* TODO: `mmap()` the input file. */

	/* wait_for_input("Mapped input file."); */

	/* TODO: `mmap()` the output file. */

	/* wait_for_input("Mapped output file."); */

	/* TODO: Copy the contents of the input mapping to the output mapping. */

	/* TODO: Clean up. Use `munmap()` to unmap the 2 files. */

	return 0;
}

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/mman.h>
#include <errno.h>

#include "utils.h"

enum mem_op_type {
	READ_ACCESS_ON_WRITE_PERM = 1,
	WRITE_ACCESS_ON_WRITE_PERM,
	OOB_READ_ACCESS_ON_WRITE_PERM,
	OOB_WRITE_ACCESS_ON_WRITE_PERM,
	READ_ACCESS_ON_READ_PERM,
	WRITE_ACCESS_ON_READ_PERM,
	OOB_READ_ACCESS_ON_READ_PERM,
	OOB_WRITE_ACCESS_ON_READ_PERM
};

static void usage(const char *argv0)
{
	fprintf(stderr, "%s <option>\n", argv0);
	fprintf(stderr, "  1 - read access on write perm\n");
	fprintf(stderr, "  2 - write access on write perm\n");
	fprintf(stderr, "  3 - out-of-bounds read access on write perm\n");
	fprintf(stderr, "  4 - out-of-bounds write access on write perm\n");
	fprintf(stderr, "  5 - read access on read perm\n");
	fprintf(stderr, "  6 - write access on read perm\n");
	fprintf(stderr, "  7 - out-of-bounds read access on read perm\n");
	fprintf(stderr, "  8 - out-of-bounds write access on read perm\n");
}

int main(int argc, char **argv)
{
	char *mmap_ptr;
	enum mem_op_type op_type;
	char *endp;
	char v;

	if (argc != 2) {
		usage(argv[0]);
		exit(EXIT_FAILURE);
	}

	op_type = strtoul(argv[1], &endp, 10);
	if (*endp != '\0' || errno == ERANGE) {
		fprintf(stderr, "Invalid parameter.");
		exit(EXIT_FAILURE);
	}

	if (op_type < READ_ACCESS_ON_WRITE_PERM || op_type > OOB_WRITE_ACCESS_ON_READ_PERM) {
		fprintf(stderr, "Value out of range.");
		exit(EXIT_FAILURE);
	}

	/* Reserve one rw page. */
	if (op_type < READ_ACCESS_ON_READ_PERM) {
		puts("Reserve rw page with mmap.");
		mmap_ptr = mmap(NULL, 4096, PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
		DIE(mmap_ptr == MAP_FAILED, "mmap");
	} else {
		puts("Reserve ro page with mmap.");
		mmap_ptr = mmap(NULL, 4096, PROT_READ, MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
		DIE(mmap_ptr == MAP_FAILED, "mmap");
	}

	switch (op_type) {
	case READ_ACCESS_ON_WRITE_PERM:
	case READ_ACCESS_ON_READ_PERM:
		puts("Read first byte in page.");
		v = mmap_ptr[0];
		break;
	case WRITE_ACCESS_ON_WRITE_PERM:
	case WRITE_ACCESS_ON_READ_PERM:
		puts("Write to first byte in page.");
		mmap_ptr[0] = 'a';
		break;
	case OOB_READ_ACCESS_ON_WRITE_PERM:
	case OOB_READ_ACCESS_ON_READ_PERM:
		puts("Read out of bounds.");
		v = mmap_ptr[4096];
		break;
	case OOB_WRITE_ACCESS_ON_WRITE_PERM:
	case OOB_WRITE_ACCESS_ON_READ_PERM:
		puts("Write out of bounds.");
		mmap_ptr[4096] = 'a';
		break;
	default:
		break;
	}

	puts("Unmap page.");
	munmap(mmap_ptr, 4096);

	return 0;
}

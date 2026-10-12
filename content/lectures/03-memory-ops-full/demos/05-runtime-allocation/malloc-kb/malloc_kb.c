#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>

#include "utils.h"

static void usage(const char *argv0)
{
	fprintf(stderr, "%s <num_kb>\n", argv0);
}

int main(int argc, char **argv)
{
	char *endp;
	unsigned int num_kb;
	void *ptr;

	if (argc != 2) {
		usage(argv[0]);
		exit(EXIT_FAILURE);
	}

	num_kb = strtoul(argv[1], &endp, 10);
	DIE(*endp != '\0', "strtoul");

	ptr = malloc(num_kb * 1024);
	ptr = malloc(num_kb * 1024);
	ptr = malloc(num_kb * 1024);
	ptr = malloc(num_kb * 1024);
	ptr = malloc(num_kb * 1024);
	ptr = malloc(num_kb * 1024);
	ptr = malloc(num_kb * 1024);
	ptr = malloc(num_kb * 1024);
	ptr = malloc(num_kb * 1024);
	ptr = malloc(num_kb * 1024);

	DIE(ptr == NULL, "malloc");

	free(ptr);

	return 0;
}

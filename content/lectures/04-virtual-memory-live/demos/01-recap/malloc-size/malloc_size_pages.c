#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>

#include "utils.h"

static void wait_for_input(const char *msg)
{
	char buf[32];

	printf(" * %s\n", msg);
	printf(" -- Press ENTER to continue ...\n");
	fflush(stdout);
	fgets(buf, 32, stdin);
}

static void usage(const char *argv0)
{
	fprintf(stderr, "%s <num_pages>\n", argv0);
}

int main(int argc, char **argv)
{
	char *endp;
	unsigned int num_pages;
	void **malloc_ptr;

	if (argc != 2) {
		usage(argv[0]);
		exit(EXIT_FAILURE);
	}

	num_pages = strtoul(argv[1], &endp, 10);
	DIE(*endp != '\0', "strtoul");

	malloc_ptr = malloc(num_pages * sizeof(*malloc_ptr));
	DIE(malloc_ptr == NULL, "malloc");

	printf("Allocating %u pages with malloc ...\n", num_pages);
	wait_for_input("before allocation");
	for (unsigned int i = 0; i < num_pages; i++) {
		malloc_ptr[i] = malloc(4096);
		DIE(malloc_ptr[i] == NULL, "malloc");
	}

	wait_for_input("before free");
	for (unsigned int i = 0; i < num_pages; i++)
		free(malloc_ptr[i]);

	wait_for_input("before program end");
	free(malloc_ptr);

	return 0;
}

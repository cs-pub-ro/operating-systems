#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>

#include "utils.h"

#define ONE_GB	(1024 * 1024 * 1024UL)

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
	fprintf(stderr, "%s <num_gb>\n", argv0);
}

int main(int argc, char **argv)
{
	char *endp;
	unsigned int num_gb;

	if (argc != 2) {
		usage(argv[0]);
		exit(EXIT_FAILURE);
	}

	num_gb = strtoul(argv[1], &endp, 10);
	DIE(*endp != '\0', "strtoul");

	wait_for_input("before allocation");

	for (unsigned int i = 0; i < num_gb; i++) {
		void *p = mmap(NULL, ONE_GB, PROT_READ | PROT_WRITE,
			MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
		DIE(p == MAP_FAILED, "mmap");
	}

	wait_for_input("after allocation");

	return 0;
}

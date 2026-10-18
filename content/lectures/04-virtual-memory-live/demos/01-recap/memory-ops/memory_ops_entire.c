#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/mman.h>

#include "utils.h"

#define NUM_PAGES	1024

static void wait_for_input(const char *msg)
{
	char buf[32];

	printf(" * %s\n", msg);
	printf(" -- Press ENTER to continue ...\n");
	fflush(stdout);
	fgets(buf, 32, stdin);
}

int main(void)
{
	char *malloc_ptr;
	char *mmap_ptr;

	/* malloc() allocation */
	wait_for_input("before malloc allocation");
	printf("Allocate 4MB (%u pages) with malloc.\n\n", NUM_PAGES);
	malloc_ptr = malloc(NUM_PAGES * 4096);
	DIE(malloc_ptr == NULL, "malloc");

	/* mmap() allocation */
	wait_for_input("before mmap allocation");
	printf("Allocate 4MB (%u pages) with mmap.\n\n", NUM_PAGES);
	mmap_ptr = mmap(NULL, NUM_PAGES * 4096, PROT_READ | PROT_WRITE,
			MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
	DIE(mmap_ptr == MAP_FAILED, "mmap");

	/* malloc() deallocation - free() */
	wait_for_input("before malloc/free deallocation");
	printf("Freeing 4MB (%u pages) with free.\n\n", NUM_PAGES);
	free(malloc_ptr);

	/* mmap() deallocation - munmap() */
	wait_for_input("before mmap/munmap deallocation");
	printf("Freeing 4MB (%u pages) with munmap.\n\n", NUM_PAGES);
	munmap(mmap_ptr, NUM_PAGES * 4096);

	wait_for_input("before program end");

	return 0;
}

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
	printf(" -- Press ENTER to continue ...\n"); fflush(stdout);
	fgets(buf, 32, stdin);
}

int main(void)
{
	char *mmap_ptr;

	/* Reserve 4MB. */
	wait_for_input("before reservation");
	printf("Reserve %u rw pages with mmap.\n\n", NUM_PAGES);
	mmap_ptr = mmap(NULL, NUM_PAGES * 4096, PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
	DIE(mmap_ptr == MAP_FAILED, "mmap");

	/* Touch first byte of pages. */
	wait_for_input("before touching first byte of pages");
	printf("Touching %u pages.\n\n", NUM_PAGES);
	for (unsigned int i = 0; i < NUM_PAGES; i++) {
		char *page_start = mmap_ptr + i * 4096;
		page_start[0] = 'a';
	}

	/* Touch last byte of pages. */
	wait_for_input("before touching last byte of pages");
	printf("Touching %u pages.\n\n", NUM_PAGES);
	for (unsigned int i = 0; i < NUM_PAGES; i++) {
		char *page_start = mmap_ptr + i * 4096;
		page_start[4095] = 'a';
	}

	/* mmap() deallocation - munmap() */
	wait_for_input("before deallocation");
	printf("Freeing %u rw pages with munmap.\n\n", NUM_PAGES);
	munmap(mmap_ptr, NUM_PAGES * 4096);

	wait_for_input("before program end");

	return 0;
}

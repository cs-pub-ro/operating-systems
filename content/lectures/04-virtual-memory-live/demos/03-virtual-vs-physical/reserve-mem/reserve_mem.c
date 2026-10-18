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
	char *mmap_ptr1, *mmap_ptr2, *mmap_ptr3;

	/* Reserve 4MB. */
	wait_for_input("before 1st reservation");
	printf("Reserve %u rw pages with mmap.\n\n", NUM_PAGES);
	mmap_ptr1 = mmap(NULL, NUM_PAGES * 4096, PROT_READ | PROT_WRITE,
			MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
	DIE(mmap_ptr1 == MAP_FAILED, "mmap");

	/* Reserve 4MB. */
	wait_for_input("before 2nd reservation");
	printf("Reserve %u read-only pages with mmap.\n\n", NUM_PAGES);
	mmap_ptr2 = mmap(NULL, NUM_PAGES * 4096, PROT_READ,
			MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
	DIE(mmap_ptr2 == MAP_FAILED, "mmap");

	/* Reserve 4MB. */
	wait_for_input("before 3rd reservation");
	printf("Reserve %u rwx pages with mmap.\n\n", NUM_PAGES);
	mmap_ptr3 = mmap(NULL, NUM_PAGES * 4096, PROT_READ | PROT_WRITE | PROT_EXEC,
			MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
	DIE(mmap_ptr3 == MAP_FAILED, "mmap");

	/* mmap() deallocation - munmap() */
	wait_for_input("before 1st deallocation");
	printf("Freeing %u rw pages with munmap.\n\n", NUM_PAGES);
	munmap(mmap_ptr1, NUM_PAGES * 4096);

	/* mmap() deallocation - munmap() */
	wait_for_input("before 2nd deallocation");
	printf("Freeing %u read-only pages with munmap.\n\n", NUM_PAGES);
	munmap(mmap_ptr2, NUM_PAGES * 4096);

	/* mmap() deallocation - munmap() */
	wait_for_input("before 3rd deallocation");
	printf("Freeing %u rwx pages with munmap.\n\n", NUM_PAGES);
	munmap(mmap_ptr3, NUM_PAGES * 4096);

	wait_for_input("before program end");

	return 0;
}

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/mman.h>

#include "utils.h"

static void wait_for_input(const char *msg)
{
	char buf[32];

	printf(" * %s\n", msg);
	printf(" -- Press ENTER to continue ...\n"); fflush(stdout);
	fgets(buf, 32, stdin);
}

static void stack_allocation(void)
{
	char *buffer;

	wait_for_input("before stack allocation");
	printf("Allocate 16 pages (64 KB) of stack memory.\n");
	buffer = alloca(16 * 4096);
	/* Touch it, or nothing is paged in and pmap shows no change in RSS. */
	memset(buffer, 0, 16 * 4096);

	wait_for_input("before stack free");
	printf("Free 16 pages of stack memory.\n");
	/* Returning discards the stack frame: no call to free anything. */
}

static void recurse(unsigned int steps)
{
	char buffer[4096];

	/* One page per call; touch it so the stack really grows. */
	memset(buffer, (int) steps, sizeof(buffer));

	if (steps == 0) {
		wait_for_input("number of steps reached");
		return;
	}

	recurse(steps - 1);
}

static void heap_allocation(void)
{
	char *ptr[4];
	int i;

	wait_for_input("before heap allocation");
	printf("Allocate 4 x 16 pages (4 x 64 KB) of heap memory.\n");
	/*
	 * Each request is below the 128 KB mmap threshold, so malloc() serves
	 * it from the heap; together they outgrow the initial heap, so the
	 * allocator has to extend it with brk().
	 */
	for (i = 0; i < 4; i++) {
		ptr[i] = malloc(16 * 4096);
		DIE(ptr[i] == NULL, "malloc");
		memset(ptr[i], 0, 16 * 4096);
	}

	wait_for_input("before heap free");
	printf("Free 4 x 16 pages of heap memory.\n");
	/* Freeing the top of the heap lets the allocator shrink it with brk(). */
	for (i = 0; i < 4; i++)
		free(ptr[i]);
}

static void mapped_allocation(void)
{
	char *ptr;

	wait_for_input("before mapped allocation");
	printf("Allocate 16 pages (64 KB) of mapped memory.\n");
	ptr = mmap(NULL, 65536, PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
	DIE(ptr == MAP_FAILED, "mmap");

	wait_for_input("before mapped free");
	printf("Free 16 pages of mapped memory.\n");
	munmap(ptr, 65536);
}

int main(void)
{
	/* Stack-based memory allocation and deallocation */
	stack_allocation();

	/* Stack-based memory allocation and deallocation with recursion */
	printf("Start recursion: 100 calls, one page of stack each.\n");
	recurse(100);

	/* Heap-based memory allocation and deallocation */
	heap_allocation();

	/* Memory mapping-based allocation and deallocation */
	mapped_allocation();

	wait_for_input("before program end");

	return 0;
}

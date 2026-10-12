#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/mman.h>

#include "utils.h"

static int init_data[] = {1, };		/* stored in .data section (rw-) */
static int non_init_data[4096];		/* stored in .bss section (rw-) */
static const int ro_data[4096] = {2, };	/* stored in .rodata section (r--) */
static void *heap_data;
static void *mapped_data;

static void wait_for_input(const char *msg)
{
	char buf[32];

	printf(" * %s\n", msg);
	printf(" -- Press ENTER to continue ...\n"); fflush(stdout);
	fgets(buf, 32, stdin);
}

static void recurse(unsigned int steps)
{
	char buffer[4096];

	/* One page per call; touch it so the stack really grows. */
	memset(buffer, (int) steps, sizeof(buffer));

	if (steps == 0) {
		wait_for_input("After allocation");
		return;
	}

	recurse(steps-1);
}

static void allocate_data_local_scope(void)
{
	static int local_scope_data[4096] = {3, };

	local_scope_data[1] = 4;
	init_data[0] = non_init_data[0] = ro_data[0];
}

static void heap_allocation(void)
{
	heap_data = malloc(65536);
	heap_data = malloc(65536);
	heap_data = malloc(65536);
	heap_data = malloc(65536);
}

static void heap_free(void)
{
	free(heap_data);
}

static void mapped_allocation(void)
{
	mapped_data = mmap(NULL, 65536, PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
	DIE(mapped_data == MAP_FAILED, "mmap");
}

static void mapped_free(void)
{
	munmap(mapped_data, 65536);
}

int main(void)
{
	wait_for_input("Before allocation");

	/* Allocate everything. Allocate stack last to keep it visible in pmap. */
	allocate_data_local_scope();
	heap_allocation();
	mapped_allocation();
	recurse(100);

	/* Deallocate everything. */
	heap_free();
	mapped_free();

	return 0;
}

#include <stdio.h>
#include <stdlib.h>
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

static void stack_allocation(void)
{
	char buffer[4096];

	printf("stack_buffer: %p\n", buffer);
}

static void stack_allocation_2(void)
{
	char *buffer;

	buffer = alloca(4096);

	printf("alloca_buffer: %p\n", buffer);
}

static void allocate_data_local_scope(void)
{
	static int local_scope_data[4096] = {3, };

	local_scope_data[1] = 4;

	puts("Initialized local scope static variable");
	printf("local_scope_data: %p\n", local_scope_data);
}

static void heap_allocation(void)
{
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
	printf("init_data: %p\n", init_data);
	printf("non_init_data: %p\n", non_init_data);
	printf("ro_data: %p\n", ro_data);

	wait_for_input("before stack allocation");
	stack_allocation();

	wait_for_input("before stack allocation 2");
	stack_allocation_2();

	wait_for_input("before local scope allocation");
	allocate_data_local_scope();

	wait_for_input("before heap allocation");
	heap_allocation();
	printf("heap_data: %p\n", heap_data);

	wait_for_input("before heap free");
	heap_free();

	wait_for_input("before mapped allocation");
	mapped_allocation();
	printf("mapped_data: %p\n", mapped_data);

	wait_for_input("before mapped free");
	mapped_free();

	wait_for_input("before program ends");

	return 0;
}

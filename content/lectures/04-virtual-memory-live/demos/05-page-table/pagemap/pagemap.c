/*
 * Read our own page table, the way the kernel exports it: /proc/self/pagemap
 * holds one 64-bit entry per virtual page, indexed by the virtual page
 * number.  Bit 63 says whether the page is in memory; bits 0-54 hold the
 * frame number, which the kernel shows only to root.
 *
 * Map four pages, print their entries, touch some, print again.
 */
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/mman.h>

#include "utils.h"

#define NUM_PAGES	4
#define PAGE_SIZE	4096

static void show(int fd, char *base)
{
	for (unsigned int i = 0; i < NUM_PAGES; i++) {
		char *addr = base + i * PAGE_SIZE;
		uint64_t page_index = (uint64_t)addr / PAGE_SIZE;
		uint64_t entry;
		ssize_t rc;

		rc = pread(fd, &entry, sizeof(entry), page_index * sizeof(entry));
		DIE(rc != sizeof(entry), "pread");

		printf("  page %u: virtual %p  index 0x%lx  present %lu  frame 0x%lx\n",
		       i, (void *)addr, page_index, (entry >> 63) & 1,
		       entry & ((1UL << 55) - 1));
	}
}

int main(void)
{
	volatile char c;
	char *base;
	int fd;

	base = mmap(NULL, NUM_PAGES * PAGE_SIZE, PROT_READ | PROT_WRITE,
		    MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
	DIE(base == MAP_FAILED, "mmap");

	fd = open("/proc/self/pagemap", O_RDONLY);
	DIE(fd < 0, "open");

	printf("after mmap(), before any access:\n");
	show(fd, base);

	base[0 * PAGE_SIZE] = 'a';
	base[2 * PAGE_SIZE] = 'c';
	printf("after writing to pages 0 and 2:\n");
	show(fd, base);

	c = base[1 * PAGE_SIZE];
	(void)c;
	printf("after reading page 1:\n");
	show(fd, base);

	close(fd);
	munmap(base, NUM_PAGES * PAGE_SIZE);

	return 0;
}

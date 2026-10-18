/*
 * Count the page faults a reservation costs, and the ones the first access
 * to each page costs.
 *
 * getrusage() reports the process's minor page faults: the ones served from
 * memory, with no disk involved.  Each line below prints how many of them
 * one step caused.
 */
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/resource.h>

#include "utils.h"

#define NUM_PAGES	1024
#define PAGE_SIZE	4096

static long faults(void)
{
	struct rusage ru;

	getrusage(RUSAGE_SELF, &ru);

	return ru.ru_minflt;
}

static void touch(char *p, char c)
{
	for (unsigned int i = 0; i < NUM_PAGES; i++)
		p[i * PAGE_SIZE] = c;
}

static void read_all(char *p)
{
	for (unsigned int i = 0; i < NUM_PAGES; i++)
		(void)*(volatile char *)(p + i * PAGE_SIZE);
}

int main(void)
{
	char *p;
	long before;

	printf("%u pages of %u bytes, %u MB\n\n", NUM_PAGES, PAGE_SIZE,
	       NUM_PAGES * PAGE_SIZE / (1024 * 1024));

	before = faults();
	p = mmap(NULL, NUM_PAGES * PAGE_SIZE, PROT_READ | PROT_WRITE,
		 MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
	DIE(p == MAP_FAILED, "mmap");
	printf("mmap():                      %5ld page faults\n", faults() - before);

	before = faults();
	touch(p, 1);
	printf("first write to every page:   %5ld page faults\n", faults() - before);

	before = faults();
	touch(p, 2);
	printf("second write to every page:  %5ld page faults\n", faults() - before);

	munmap(p, NUM_PAGES * PAGE_SIZE);

	printf("\nagain, reading before writing\n\n");

	p = mmap(NULL, NUM_PAGES * PAGE_SIZE, PROT_READ | PROT_WRITE,
		 MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
	DIE(p == MAP_FAILED, "mmap");

	before = faults();
	read_all(p);
	printf("first read of every page:    %5ld page faults\n", faults() - before);

	before = faults();
	touch(p, 1);
	printf("then first write:            %5ld page faults\n", faults() - before);

	munmap(p, NUM_PAGES * PAGE_SIZE);

	return 0;
}

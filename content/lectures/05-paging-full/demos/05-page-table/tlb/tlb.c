/*
 * How much a TLB miss costs: walk 512 MB touching one byte per 4 KB page,
 * so that almost every access needs a translation the TLB does not hold.
 * With "huge" as the argument the same memory is backed by 2 MB pages, and
 * 256 translations cover the whole walk.
 *
 * Run it under `perf stat -e dTLB-load-misses,dTLB-loads` to see the misses.
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <sys/mman.h>

#include "utils.h"

#define SIZE		(512UL << 20)
#define PAGE_SIZE	4096UL
#define HUGE_PAGE	(2UL << 20)
#define ROUNDS		8

static double now(void)
{
	struct timespec ts;

	clock_gettime(CLOCK_MONOTONIC, &ts);

	return (double)ts.tv_sec + (double)ts.tv_nsec / 1e9;
}

/* How much of the process is backed by huge pages, from smaps_rollup. */
static void report_huge(void)
{
	char line[256];
	FILE *f;

	f = fopen("/proc/self/smaps_rollup", "r");
	DIE(f == NULL, "fopen");
	while (fgets(line, sizeof(line), f))
		if (strncmp(line, "AnonHugePages:", 14) == 0)
			printf("backed by 2 MB pages: %ld MB\n", atol(line + 14) >> 10);
	fclose(f);
}

int main(int argc, char *argv[])
{
	int huge = argc > 1 && strcmp(argv[1], "huge") == 0;
	volatile long sum = 0;
	double start, per;
	char *p;

	/* One extra huge page, so that the buffer can be aligned to 2 MB. */
	p = mmap(NULL, SIZE + HUGE_PAGE, PROT_READ | PROT_WRITE,
		 MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
	DIE(p == MAP_FAILED, "mmap");
	p = (char *)(((unsigned long)p + HUGE_PAGE - 1) & ~(HUGE_PAGE - 1));
	if (huge)
		DIE(madvise(p, SIZE, MADV_HUGEPAGE) < 0, "madvise");

	/* Fault everything in first; the timing is about translation only. */
	memset(p, 1, SIZE);
	report_huge();

	start = now();
	for (unsigned int r = 0; r < ROUNDS; r++)
		for (size_t i = 0; i < SIZE; i += PAGE_SIZE)
			sum += p[i];
	per = (now() - start) / (ROUNDS * (SIZE / PAGE_SIZE)) * 1e9;
	printf("one byte per 4 KB page, %lu MB, %s pages: %.1f ns per access\n",
	       SIZE >> 20, huge ? "2 MB" : "4 KB", per);

	return 0;
}

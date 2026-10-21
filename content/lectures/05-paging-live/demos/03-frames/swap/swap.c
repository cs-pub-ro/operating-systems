/*
 * Write 256 MB, then read it back, and report after each step how much of it
 * is resident, how much is in swap, and how many major faults it took.
 *
 * Run as it is, nothing is swapped.  Run inside a memory cgroup smaller than
 * 256 MB (see the README) and the kernel has to move most of it out, and
 * bring it back when it is read.
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/resource.h>

#include "utils.h"

#define SIZE		(256UL << 20)
#define PAGE_SIZE	4096

static long major_faults(void)
{
	struct rusage ru;

	getrusage(RUSAGE_SELF, &ru);

	return ru.ru_majflt;
}

static double now(void)
{
	struct timespec ts;

	clock_gettime(CLOCK_MONOTONIC, &ts);

	return (double)ts.tv_sec + (double)ts.tv_nsec / 1e9;
}

/* VmRSS and VmSwap, from /proc/self/status. */
static void report(const char *label, double seconds, long faults)
{
	char line[256];
	long rss = 0, swap = 0;
	FILE *f;

	f = fopen("/proc/self/status", "r");
	DIE(f == NULL, "fopen");
	while (fgets(line, sizeof(line), f)) {
		if (strncmp(line, "VmRSS:", 6) == 0)
			rss = atol(line + 6);
		else if (strncmp(line, "VmSwap:", 7) == 0)
			swap = atol(line + 7);
	}
	fclose(f);

	printf("%-24s RSS %6ld MB   swap %6ld MB   major faults %6ld   %.2f s\n",
	       label, rss >> 10, swap >> 10, faults, seconds);
}

int main(void)
{
	volatile long sum = 0;
	long major;
	double start;
	char *p;

	p = mmap(NULL, SIZE, PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS,
		 -1, 0);
	DIE(p == MAP_FAILED, "mmap");
	report("start:", 0, 0);

	major = major_faults();
	start = now();
	for (size_t i = 0; i < SIZE; i += PAGE_SIZE)
		p[i] = 1;
	report("after writing 256 MB:", now() - start, major_faults() - major);

	major = major_faults();
	start = now();
	for (size_t i = 0; i < SIZE; i += PAGE_SIZE)
		sum += p[i];
	report("after reading it back:", now() - start, major_faults() - major);

	munmap(p, SIZE);

	return 0;
}

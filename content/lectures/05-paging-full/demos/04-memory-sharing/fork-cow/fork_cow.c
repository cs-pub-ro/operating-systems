/*
 * fork() and copy-on-write.
 *
 * The parent fills 64 MB and forks.  The child reads all of it, then writes
 * all of it, and after each step both print what the kernel says they hold:
 * Rss, Pss, and how much of it is shared with the other process.
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/resource.h>
#include <sys/wait.h>

#include "utils.h"

#define SIZE		(64UL << 20)
#define PAGE_SIZE	4096

static long minor_faults(void)
{
	struct rusage ru;

	getrusage(RUSAGE_SELF, &ru);

	return ru.ru_minflt;
}

/* Four lines of /proc/self/smaps_rollup, in kB. */
static void report(const char *who, const char *label)
{
	static const char * const keys[] = { "Rss:", "Pss:", "Shared_Dirty:", "Private_Dirty:" };
	long vals[4] = { 0 };
	char line[256];
	FILE *f;

	f = fopen("/proc/self/smaps_rollup", "r");
	DIE(f == NULL, "fopen");
	while (fgets(line, sizeof(line), f))
		for (unsigned int i = 0; i < 4; i++)
			if (strncmp(line, keys[i], strlen(keys[i])) == 0)
				vals[i] = atol(line + strlen(keys[i]));
	fclose(f);

	printf("%s %-22s Rss %6ld kB  Pss %6ld kB  Shared_Dirty %6ld kB  Private_Dirty %6ld kB\n",
	       who, label, vals[0], vals[1], vals[2], vals[3]);
}

int main(void)
{
	volatile long sum = 0;
	long faults;
	pid_t pid;
	char *p;

	setvbuf(stdout, NULL, _IONBF, 0);

	p = mmap(NULL, SIZE, PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS,
		 -1, 0);
	DIE(p == MAP_FAILED, "mmap");
	memset(p, 1, SIZE);
	report("parent", "before fork():");

	pid = fork();
	DIE(pid < 0, "fork");

	if (pid == 0) {
		report("child ", "after fork():");

		faults = minor_faults();
		for (size_t i = 0; i < SIZE; i += PAGE_SIZE)
			sum += p[i];
		printf("child  reads every page:     %ld page faults\n",
		       minor_faults() - faults);
		report("child ", "after reading:");

		faults = minor_faults();
		for (size_t i = 0; i < SIZE; i += PAGE_SIZE)
			p[i] = 2;
		printf("child  writes to every page: %ld page faults\n",
		       minor_faults() - faults);
		report("child ", "after writing:");

		exit(EXIT_SUCCESS);
	}

	DIE(waitpid(pid, NULL, 0) < 0, "waitpid");
	report("parent", "after the child exits:");
	printf("parent p[0] is still %d\n", p[0]);

	munmap(p, SIZE);

	return 0;
}

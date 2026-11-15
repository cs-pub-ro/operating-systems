/*
 * N workers each map a page, touch it and unmap it, NUM_ROUNDS times.
 * No worker shares any data with another in user space.
 *
 *   ./map_unmap threads N     the workers are threads of one process
 *   ./map_unmap processes N   the workers are processes
 *
 * Threads share one address space, and the kernel keeps one lock for it.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <pthread.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/wait.h>

#include "utils.h"

#define NUM_ROUNDS	50000
#define MAX_WORKERS	256

static void *map_unmap(void *arg)
{
	size_t i;
	char *p;

	for (i = 0; i < NUM_ROUNDS; i++) {
		p = mmap(NULL, 4096, PROT_READ | PROT_WRITE,
			 MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
		DIE(p == MAP_FAILED, "mmap");
		p[0] = 1;
		munmap(p, 4096);
	}

	return NULL;
}

static double now_ms(void)
{
	struct timespec ts;

	clock_gettime(CLOCK_MONOTONIC, &ts);
	return ts.tv_sec * 1000.0 + ts.tv_nsec / 1000000.0;
}

int main(int argc, char **argv)
{
	pthread_t th[MAX_WORKERS];
	int use_threads;
	double start;
	size_t i, n;
	pid_t pid;
	int rc;

	if (argc != 3) {
		fprintf(stderr, "Usage: %s threads|processes N\n", argv[0]);
		return 1;
	}
	use_threads = strcmp(argv[1], "threads") == 0;
	n = strtoul(argv[2], NULL, 10);
	if (n == 0 || n > MAX_WORKERS)
		n = 1;

	start = now_ms();

	for (i = 0; i < n; i++) {
		if (use_threads) {
			rc = pthread_create(&th[i], NULL, map_unmap, NULL);
			DIE(rc != 0, "pthread_create");
		} else {
			pid = fork();
			DIE(pid < 0, "fork");
			if (pid == 0) {
				map_unmap(NULL);
				exit(0);
			}
		}
	}

	for (i = 0; i < n; i++) {
		if (use_threads)
			pthread_join(th[i], NULL);
		else
			wait(NULL);
	}

	printf("%zu %s, %d map/unmap pairs each: %.0f ms\n",
	       n, argv[1], NUM_ROUNDS, now_ms() - start);

	return 0;
}

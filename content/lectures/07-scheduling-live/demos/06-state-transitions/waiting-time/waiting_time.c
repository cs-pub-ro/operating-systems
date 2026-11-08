#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <sched.h>
#include <pthread.h>
#include <errno.h>
#include <time.h>

#include "utils.h"

#define diff_us(ta, tb)		\
	(((ta).tv_sec - (tb).tv_sec) * 1000 * 1000 + \
	 ((ta).tv_nsec - (tb).tv_nsec) / 1000)

#define NUM_ROUNDS	5

static void *run_and_yield(void *arg)
{
	unsigned int round_no, i, j, val = 0x12345678;
	struct timespec time_before, time_after;

	for (round_no = 0; round_no < NUM_ROUNDS; round_no++) {
		for (i = 0; i < 1000000; i++) {
			val = val ^ i;
			for (j = 0; j < 300; j++)
				val = val ^ j;
		}
		clock_gettime(CLOCK_REALTIME, &time_before);
		sched_yield();
		clock_gettime(CLOCK_REALTIME, &time_after);
		printf("run %u, time passed %ld microseconds\n",
				round_no, diff_us(time_after, time_before));
	}

	return NULL;
}

int main(int argc, char **argv)
{
	unsigned int num_threads;
	pthread_t *thread_ids;
	char *endp;
	int rc;

	if (argc != 2) {
		fprintf(stderr, "Usage: %s <num_threads>\n", argv[0]);
		exit(EXIT_FAILURE);
	}

	num_threads = strtoul(argv[1], &endp, 10);
	if (*endp != '\0' || errno == ERANGE || num_threads > 1024) {
		fprintf(stderr, "Invalid argument / number of threads.\n");
		exit(EXIT_FAILURE);
	}

	thread_ids = malloc(num_threads * sizeof(*thread_ids));
	DIE(thread_ids == NULL, "malloc");

	/* Create NUM_THREADS threads for thread_sleep1() function. */
	for (unsigned int i = 0; i < num_threads; i++) {
		rc = pthread_create(&thread_ids[i], NULL, run_and_yield, NULL);
		DIE(rc < 0, "pthread_create");
	}

	for (unsigned int i = 0; i < num_threads; i++) {
		rc = pthread_join(thread_ids[i], NULL);
		DIE(rc < 0, "pthread_join");
	}

	free(thread_ids);

	return 0;
}

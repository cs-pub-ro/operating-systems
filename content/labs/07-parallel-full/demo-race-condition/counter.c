// SPDX-License-Identifier: BSD-3-Clause

/*
 * Several threads increment one shared counter, each a given number of
 * times.  A mutex around the increment makes the final value come out right.
 *
 *     ./counter <threads> <increments-per-thread>
 *     ./counter 4 1000000
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>

#define MAX_THREADS	64

/* The shared variable: every thread reads and writes it. */
static long counter;

/* The mutex that protects it: whoever holds it is alone with the counter. */
static pthread_mutex_t counter_lock;

/* How many times each thread increments; set once, before the threads start. */
static long increments;

/* What every thread runs. */
static void *increment(void *arg)
{
	long i;

	(void) arg;

	for (i = 0; i < increments; i++) {
		/*
		 * The critical section is the one statement that touches the
		 * shared variable.  Between the lock and the unlock no other
		 * thread can be between its own lock and unlock.
		 */
		pthread_mutex_lock(&counter_lock);
		counter++;
		pthread_mutex_unlock(&counter_lock);
	}

	return NULL;
}

int main(int argc, char *argv[])
{
	pthread_t threads[MAX_THREADS];
	int nthreads, i, rc;

	if (argc != 3) {
		fprintf(stderr, "Usage: %s <threads> <increments-per-thread>\n", argv[0]);
		return 1;
	}

	nthreads = atoi(argv[1]);
	increments = atol(argv[2]);
	if (nthreads < 1 || nthreads > MAX_THREADS || increments < 1) {
		fprintf(stderr, "threads must be between 1 and %d, increments at least 1\n",
			MAX_THREADS);
		return 1;
	}

	/* A mutex has to be initialized before its first use. */
	pthread_mutex_init(&counter_lock, NULL);

	for (i = 0; i < nthreads; i++) {
		rc = pthread_create(&threads[i], NULL, increment, NULL);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	for (i = 0; i < nthreads; i++)
		pthread_join(threads[i], NULL);

	pthread_mutex_destroy(&counter_lock);

	printf("expected: %ld\n", (long) nthreads * increments);
	printf("counter:  %ld\n", counter);

	return 0;
}

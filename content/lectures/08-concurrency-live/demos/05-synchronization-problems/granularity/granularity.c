/*
 * NUM_THREADS threads each add 1 to a shared counter, NUM_ROUNDS times,
 * under a mutex.  How much one lock/unlock pair covers is chosen when the
 * file is compiled:
 *
 *   -DGRANULARITY_TYPE=GRANULARITY_FINE     one addition
 *   -DGRANULARITY_TYPE=GRANULARITY_COARSE   the whole loop
 */

#include <stdio.h>
#include <time.h>
#include <pthread.h>

#include "utils.h"

#define NUM_THREADS		100
#define NUM_ROUNDS		100000

#define GRANULARITY_COARSE	1
#define GRANULARITY_FINE	2

static size_t value;
static pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;

static void *add_rounds(void *arg)
{
	size_t i;

#if GRANULARITY_TYPE == GRANULARITY_FINE
	for (i = 0; i < NUM_ROUNDS; i++) {
		pthread_mutex_lock(&m);
		value++;
		pthread_mutex_unlock(&m);
	}
#elif GRANULARITY_TYPE == GRANULARITY_COARSE
	pthread_mutex_lock(&m);
	for (i = 0; i < NUM_ROUNDS; i++)
		value++;
	pthread_mutex_unlock(&m);
#endif

	return NULL;
}

static double now_ms(void)
{
	struct timespec ts;

	clock_gettime(CLOCK_MONOTONIC, &ts);
	return ts.tv_sec * 1000.0 + ts.tv_nsec / 1000000.0;
}

int main(void)
{
	pthread_t threads[NUM_THREADS];
	double start = now_ms();
	size_t i;
	int rc;

	for (i = 0; i < NUM_THREADS; i++) {
		rc = pthread_create(&threads[i], NULL, add_rounds, NULL);
		DIE(rc != 0, "pthread_create");
	}

	for (i = 0; i < NUM_THREADS; i++) {
		rc = pthread_join(threads[i], NULL);
		DIE(rc != 0, "pthread_join");
	}

	printf("value: %zu  expected: %d  time: %.0f ms\n",
	       value, NUM_THREADS * NUM_ROUNDS, now_ms() - start);

	return 0;
}

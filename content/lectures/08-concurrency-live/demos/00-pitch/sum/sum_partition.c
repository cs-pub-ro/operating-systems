/*
 * NUM_THREADS threads share the rounds, and each adds to a variable of its
 * own.  The partial sums are added up once, at the end, by one thread.
 */

#include <stdio.h>
#include <pthread.h>

#include "utils.h"
#include "sum.h"

/* One partial sum per thread; nobody else touches it. */
static unsigned long partial[NUM_THREADS];
static unsigned long sum;

static void *add_rounds(void *arg)
{
	unsigned long r, i;
	unsigned long mine = 0;

	for (r = 0; r < NUM_ROUNDS / NUM_THREADS; r++)
		for (i = 1; i <= N; i++)
			mine += i;

	*(unsigned long *)arg = mine;

	return NULL;
}

int main(void)
{
	pthread_t th[NUM_THREADS];
	double start = now_ms();
	size_t t;
	int rc;

	for (t = 0; t < NUM_THREADS; t++) {
		rc = pthread_create(&th[t], NULL, add_rounds, &partial[t]);
		DIE(rc != 0, "pthread_create");
	}

	for (t = 0; t < NUM_THREADS; t++) {
		rc = pthread_join(th[t], NULL);
		DIE(rc != 0, "pthread_join");
		sum += partial[t];
	}

	report("partition", sum, start);

	return 0;
}

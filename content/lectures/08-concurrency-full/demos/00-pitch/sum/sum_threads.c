/*
 * NUM_THREADS threads share the rounds, and all of them add to the same
 * variable.  Nothing protects it.
 */

#include <stdio.h>
#include <pthread.h>

#include "utils.h"
#include "sum.h"

static unsigned long sum;

static void *add_rounds(void *arg)
{
	unsigned long r, i;

	for (r = 0; r < NUM_ROUNDS / NUM_THREADS; r++)
		for (i = 1; i <= N; i++)
			sum += i;

	return NULL;
}

int main(void)
{
	pthread_t th[NUM_THREADS];
	double start = now_ms();
	size_t t;
	int rc;

	for (t = 0; t < NUM_THREADS; t++) {
		rc = pthread_create(&th[t], NULL, add_rounds, NULL);
		DIE(rc != 0, "pthread_create");
	}

	for (t = 0; t < NUM_THREADS; t++) {
		rc = pthread_join(th[t], NULL);
		DIE(rc != 0, "pthread_join");
	}

	report("threads", sum, start);

	return 0;
}

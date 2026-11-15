/*
 * NUM_THREADS threads share the rounds, and all of them add to the same
 * variable, taking a spinlock around each addition.  A thread that finds
 * the lock taken keeps trying, on its CPU, until it gets it.
 */

#include <stdio.h>
#include <pthread.h>

#include "utils.h"
#include "sum.h"

static unsigned long sum;
static pthread_spinlock_t lock;

static void *add_rounds(void *arg)
{
	unsigned long r, i;

	for (r = 0; r < NUM_ROUNDS / NUM_THREADS; r++)
		for (i = 1; i <= N; i++) {
			pthread_spin_lock(&lock);
			sum += i;
			pthread_spin_unlock(&lock);
		}

	return NULL;
}

int main(void)
{
	pthread_t th[NUM_THREADS];
	double start = now_ms();
	size_t t;
	int rc;

	pthread_spin_init(&lock, PTHREAD_PROCESS_PRIVATE);

	for (t = 0; t < NUM_THREADS; t++) {
		rc = pthread_create(&th[t], NULL, add_rounds, NULL);
		DIE(rc != 0, "pthread_create");
	}

	for (t = 0; t < NUM_THREADS; t++) {
		rc = pthread_join(th[t], NULL);
		DIE(rc != 0, "pthread_join");
	}

	report("spinlock", sum, start);

	return 0;
}

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <unistd.h>
#include <pthread.h>

#include "utils.h"

#define NUM_ROUNDS	10000000
#define NUM_THREADS	10

static unsigned long sum = 0;

static void *thread_func(void *arg)
{
	size_t v = (size_t) arg;
	size_t i;

	for (i = 0; i < NUM_ROUNDS; i++)
		sum += v;

	return NULL;
}

int main(void)
{
	size_t i;
	pthread_t th[NUM_THREADS];
	int rc;

	for (i = 0; i < NUM_THREADS; i++) {
		rc = pthread_create(&th[i], NULL, thread_func, (void *) i);
		DIE(rc < 0, "pthread_create");
		rc = pthread_join(th[i], NULL);
		DIE(rc < 0, "pthread_join");
	}

	printf("sum is: %lu\n", sum);

	return 0;
}

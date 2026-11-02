#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdint.h>
#include <pthread.h>

#include "utils.h"

#define NUM_THREADS	4
#define NUM_ELEMENTS	1000000

/*
 * Each thread sums one slice of the array and returns the partial sum as the
 * thread's return value.  The slices do not overlap, so no two threads ever
 * touch the same element and no lock is needed.
 */
struct slice {
	long *data;
	size_t start;
	size_t count;
};

static void *sum_slice(void *arg)
{
	struct slice *s = arg;
	long sum = 0;

	for (size_t i = s->start; i < s->start + s->count; i++)
		sum += s->data[i];

	/* Return the partial sum through the thread's return value. */
	return (void *)(intptr_t)sum;
}

int main(void)
{
	pthread_t tid[NUM_THREADS];
	struct slice slices[NUM_THREADS];
	long *data;
	long total = 0;
	long reference = 0;
	int rc;

	data = malloc(NUM_ELEMENTS * sizeof(*data));
	DIE(data == NULL, "malloc");
	for (size_t i = 0; i < NUM_ELEMENTS; i++) {
		data[i] = i + 1;
		reference += data[i];
	}

	/* Create one thread per slice. */
	for (unsigned int i = 0; i < NUM_THREADS; i++) {
		slices[i].data = data;
		slices[i].start = i * (NUM_ELEMENTS / NUM_THREADS);
		slices[i].count = NUM_ELEMENTS / NUM_THREADS;
		rc = pthread_create(&tid[i], NULL, sum_slice, &slices[i]);
		DIE(rc != 0, "pthread_create");
	}

	/* Join each thread and read the partial sum it returned. */
	for (unsigned int i = 0; i < NUM_THREADS; i++) {
		void *ret;

		rc = pthread_join(tid[i], &ret);
		DIE(rc != 0, "pthread_join");
		printf("thread %u summed its slice: %ld\n", i, (long)(intptr_t)ret);
		total += (long)(intptr_t)ret;
	}

	printf("total: %ld\n", total);
	printf("matches single-threaded sum: %s\n", total == reference ? "yes" : "no");

	free(data);
	return 0;
}

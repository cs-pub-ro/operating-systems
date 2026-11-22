// SPDX-License-Identifier: BSD-3-Clause

/*
 * A workload made for a read-write lock: eight threads that only look
 * records up, in a database of a hundred thousand.  Linked with db.c
 * directly, so that the same program can be built against a version of
 * db.c that uses a mutex, and the two timed against each other.
 *
 *     ./readers
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <pthread.h>

#include "db.h"

#define NUM_RECORDS	100000
#define NUM_THREADS	8
#define NUM_FINDS	2000	/* per thread */

static struct database *db;

static void *reader(void *arg)
{
	unsigned int seed = (unsigned int)(size_t)arg;
	struct record record;
	int i;

	for (i = 0; i < NUM_FINDS; i++)
		db_find(db, rand_r(&seed) % NUM_RECORDS, &record);

	return NULL;
}

int main(void)
{
	pthread_t threads[NUM_THREADS];
	struct timespec start, end;
	size_t i;

	db = db_create();
	if (db == NULL)
		return 1;
	for (i = 0; i < NUM_RECORDS; i++)
		db_add(db, i, "somebody");

	clock_gettime(CLOCK_MONOTONIC, &start);
	for (i = 0; i < NUM_THREADS; i++)
		pthread_create(&threads[i], NULL, reader, (void *)(i + 1));
	for (i = 0; i < NUM_THREADS; i++)
		pthread_join(threads[i], NULL);
	clock_gettime(CLOCK_MONOTONIC, &end);

	printf("%d threads, %d lookups each, %d records: %.3f s\n", NUM_THREADS,
	       NUM_FINDS, NUM_RECORDS,
	       (end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec) / 1e9);

	db_destroy(db);

	return 0;
}

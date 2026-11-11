// SPDX-License-Identifier: BSD-3-Clause

/*
 * Count how many times a letter occurs in a large buffer, with as many
 * threads as asked for.  The program times its two halves separately: the
 * filling of the buffer, which one thread does, and the counting, which is
 * split between the threads.
 *
 *     ./count_chars <threads> [size-in-MiB]
 *     ./count_chars 4
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <pthread.h>

#define MIB		(1024UL * 1024)
#define DEFAULT_MIB	256
#define MAX_THREADS	1024
#define TARGET		'e'
#define BLOCK		(64UL * 1024)

/* What one thread works on: a part of the buffer, and where its count goes. */
struct region {
	const char *start;	/* first byte of this thread's part        */
	size_t len;		/* how many bytes it covers                */
	size_t count;		/* the result, written by the thread       */
};

/* Seconds since some fixed point in the past; only differences mean anything. */
static double now(void)
{
	struct timespec ts;

	clock_gettime(CLOCK_MONOTONIC, &ts);

	return ts.tv_sec + ts.tv_nsec / 1e9;
}

/*
 * Fill the buffer with lowercase letters: one block from a fixed
 * pseudo-random sequence, the same on every machine and on every run,
 * repeated until the buffer is full.
 */
static void fill_buffer(char *buf, size_t size)
{
	unsigned int state = 12345;
	size_t i, len;

	for (i = 0; i < BLOCK && i < size; i++) {
		state = state * 1103515245 + 12345;
		buf[i] = 'a' + (state >> 16) % 26;
	}

	for (i = BLOCK; i < size; i += len) {
		len = size - i < BLOCK ? size - i : BLOCK;
		memcpy(buf + i, buf, len);
	}
}

/* Count how many of the `len` bytes at `buf` are equal to `c`. */
static size_t count_char(const char *buf, size_t len, char c)
{
	size_t count = 0;
	size_t i;

	for (i = 0; i < len; i++)
		if (buf[i] == c)
			count++;

	return count;
}

/*
 * What every thread runs: count in its own part, and leave the result in its
 * own region.  Nothing here is shared for writing, so nothing is locked.
 */
static void *count_region(void *arg)
{
	struct region *r = arg;

	r->count = count_char(r->start, r->len, TARGET);

	return NULL;
}

int main(int argc, char *argv[])
{
	static struct region regions[MAX_THREADS];
	static pthread_t threads[MAX_THREADS];
	double t_start, t_filled, t_counted;
	size_t size, chunk, total;
	int nthreads, i, rc;
	char *buf;

	if (argc != 2 && argc != 3) {
		fprintf(stderr, "Usage: %s <threads> [size-in-MiB]\n", argv[0]);
		return 1;
	}

	nthreads = atoi(argv[1]);
	if (nthreads < 1 || nthreads > MAX_THREADS) {
		fprintf(stderr, "threads must be between 1 and %d\n", MAX_THREADS);
		return 1;
	}

	size = (argc == 3 ? (size_t) atoi(argv[2]) : DEFAULT_MIB) * MIB;
	if (size == 0) {
		fprintf(stderr, "size must be at least 1 MiB\n");
		return 1;
	}

	buf = malloc(size);
	if (buf == NULL) {
		perror("malloc");
		return 1;
	}

	/* The sequential part: one thread, however many were asked for. */
	t_start = now();
	fill_buffer(buf, size);
	t_filled = now();

	/* The parallel part: partition, start, join, add up. */
	chunk = size / nthreads;
	for (i = 0; i < nthreads; i++) {
		regions[i].start = buf + (size_t) i * chunk;
		regions[i].len = (i == nthreads - 1) ? size - (size_t) i * chunk : chunk;
	}

	for (i = 0; i < nthreads; i++) {
		rc = pthread_create(&threads[i], NULL, count_region, &regions[i]);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	total = 0;
	for (i = 0; i < nthreads; i++) {
		pthread_join(threads[i], NULL);
		total += regions[i].count;
	}
	t_counted = now();

	printf("'%c' occurs %zu times in %zu MiB\n", TARGET, total, size / MIB);
	printf("fill:  %.3f s, 1 thread\n", t_filled - t_start);
	printf("count: %.3f s, %d thread(s)\n", t_counted - t_filled, nthreads);

	free(buf);

	return 0;
}

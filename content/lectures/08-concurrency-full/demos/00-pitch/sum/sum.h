/*
 * What every version of the sum shares: the size of the job, a clock and
 * the line printed at the end.
 */

#ifndef SUM_H_
#define SUM_H_	1

#include <stdio.h>
#include <time.h>

/* Add the numbers 1 to N, NUM_ROUNDS times over. */
#define N		1000UL
#define NUM_ROUNDS	40000UL
#define NUM_THREADS	8

#define EXPECTED	(NUM_ROUNDS * (N * (N + 1) / 2))

static inline double now_ms(void)
{
	struct timespec ts;

	clock_gettime(CLOCK_MONOTONIC, &ts);
	return ts.tv_sec * 1000.0 + ts.tv_nsec / 1000000.0;
}

static inline void report(const char *name, unsigned long sum, double start)
{
	printf("%-14s sum: %12lu  expected: %12lu  %-5s  time: %5.0f ms\n",
	       name, sum, EXPECTED, sum == EXPECTED ? "OK" : "WRONG",
	       now_ms() - start);
}

#endif

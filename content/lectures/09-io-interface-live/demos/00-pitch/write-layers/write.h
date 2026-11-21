/* SPDX-License-Identifier: BSD-3-Clause */

/*
 * What the programs of this demo have in common: how much they write, and
 * how the time is taken.
 */

#ifndef WRITE_H_
#define WRITE_H_	1

#include <stdio.h>
#include <time.h>

#define FILE_NAME	"f.dat"
#define NUM_RECORDS	2048	/* records written by one run       */
#define RECORD_SIZE	512	/* bytes in a record: 1 MiB in total */

static inline double now_ms(void)
{
	struct timespec ts;

	clock_gettime(CLOCK_MONOTONIC, &ts);

	return ts.tv_sec * 1000.0 + ts.tv_nsec / 1000000.0;
}

static inline void report(const char *name, double ms)
{
	printf("%-22s %d records of %d bytes  time: %8.1f ms  %8.2f us/record\n",
	       name, NUM_RECORDS, RECORD_SIZE, ms, ms * 1000 / NUM_RECORDS);
}

#endif

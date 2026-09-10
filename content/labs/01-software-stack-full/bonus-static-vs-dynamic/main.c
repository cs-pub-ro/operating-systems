/*
 * main.c - hammer a library with calls, so we can see what a call costs.
 *
 * This exact source is linked twice, against the same functions, built from
 * the same mystring.c:
 *
 *   main_static   - libmystring.a  linked into the executable
 *   main_dynamic  - libmystring.so loaded at run time
 *
 * The C code is identical. The machine code around each call is not.
 *
 * Usage: ./main_static [iterations]
 *        ./main_static 0        -> do no work at all; measures start-up only
 */

#define _POSIX_C_SOURCE 200809L

#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#include "mystring.h"

#define DEFAULT_ITERATIONS 20000000L
#define CALLS_PER_ITER 3

/* volatile: stops the optimiser from deciding the loop is pointless. */
static volatile size_t sink;

int main(int argc, char **argv)
{
	struct timespec t0, t1;
	const char *src = "abcdefg"; /* short on purpose: we want to measure
				      * the call, not the copying */
	char dst[32];
	char dst2[32];
	size_t total = 0;
	long iterations = DEFAULT_ITERATIONS;
	double elapsed;

	if (argc > 2) {
		fprintf(stderr, "usage: %s [iterations]\n", argv[0]);
		return EXIT_FAILURE;
	}
	if (argc == 2) {
		char *end;

		errno = 0;
		iterations = strtol(argv[1], &end, 10);
		if (errno != 0 || *end != '\0' || iterations < 0) {
			fprintf(stderr, "%s: bad iteration count '%s'\n",
				argv[0], argv[1]);
			return EXIT_FAILURE;
		}
	}

	/*
	 * Warm up: let the CPU clock ramp and the lazy PLT resolution happen,
	 * so we measure steady-state call cost rather than one-off start-up.
	 */
	for (long i = 0; i < 100000; i++) {
		total += my_strlen(src);
		my_strcpy(dst, src);
		my_memcpy(dst2, src, 8);
	}

	clock_gettime(CLOCK_MONOTONIC, &t0);
	for (long i = 0; i < iterations; i++) {
		total += my_strlen(src);
		my_strcpy(dst, src);
		my_memcpy(dst2, src, 8);
	}
	clock_gettime(CLOCK_MONOTONIC, &t1);

	sink = total;

	elapsed = (double)(t1.tv_sec - t0.tv_sec) +
		  (double)(t1.tv_nsec - t0.tv_nsec) / 1e9;

	if (iterations > 0) {
		double ns_per_call =
			elapsed * 1e9 / ((double)iterations * CALLS_PER_ITER);

		printf("%-14s %10ld iters x %d calls  %8.2f ms  %6.2f ns/call\n",
		       argv[0], iterations, CALLS_PER_ITER, elapsed * 1e3,
		       ns_per_call);
	}

	return EXIT_SUCCESS;
}

/*
 * bench.c - what does strcat actually cost?
 *
 * You do not need to modify this file. Run it with: make bench
 * (Make sure `make test` passes first -- timing a broken function is
 * meaningless, and this program will tell you if the result is wrong.)
 *
 * The task is always the same: build one big string by appending a small
 * chunk N times. We do it four ways and double N each round.
 *
 * Watch the *shape* of each column as N doubles, not the absolute numbers.
 */

#define _POSIX_C_SOURCE 200809L

#include <stdio.h>
#include <stdlib.h>
#include <string.h> /* the reference implementations we compare against */
#include <time.h>

#include "mystring.h"

static const char CHUNK[] = "0123456789abcdef"; /* 16 bytes */
#define CHUNK_LEN (sizeof(CHUNK) - 1)

/* Keeps the optimiser from deleting work whose result we never look at. */
static volatile size_t sink;

/* --- the four ways to build the string ---------------------------------- */

/*
 * Repeated strcat. Note what is NOT here: any variable remembering how long
 * dst currently is. strcat cannot know, so it finds out -- every single call.
 */
static void build_my_strcat(char *dst, long n)
{
	dst[0] = '\0';
	for (long i = 0; i < n; i++)
		my_strcat(dst, CHUNK);
}

/*
 * Same result, but we remember the length ourselves, so each append copies
 * CHUNK_LEN bytes and nothing else.
 */
static void build_my_memcpy(char *dst, long n)
{
	size_t off = 0;

	for (long i = 0; i < n; i++) {
		my_memcpy(dst + off, CHUNK, CHUNK_LEN);
		off += CHUNK_LEN;
	}
	dst[off] = '\0';
}

static void build_libc_strcat(char *dst, long n)
{
	dst[0] = '\0';
	for (long i = 0; i < n; i++)
		strcat(dst, CHUNK);
}

static void build_libc_memcpy(char *dst, long n)
{
	size_t off = 0;

	for (long i = 0; i < n; i++) {
		memcpy(dst + off, CHUNK, CHUNK_LEN);
		off += CHUNK_LEN;
	}
	dst[off] = '\0';
}

/* --- driver ------------------------------------------------------------- */

struct variant {
	const char *name;
	void (*build)(char *, long);
};

static const struct variant variants[] = {
	{ "my_strcat",   build_my_strcat },
	{ "my_memcpy",   build_my_memcpy },
	{ "libc strcat", build_libc_strcat },
	{ "libc memcpy", build_libc_memcpy },
};

#define NR_VARIANTS (sizeof(variants) / sizeof(variants[0]))

static const long sizes[] = { 1000, 2000, 4000, 8000, 16000, 32000 };
#define NR_SIZES (sizeof(sizes) / sizeof(sizes[0]))
#define MAX_N 32000

static double time_build(const struct variant *v, char *buf, long n, int *ok)
{
	struct timespec t0, t1;

	memset(buf, 0, (size_t)n * CHUNK_LEN + 1);
	clock_gettime(CLOCK_MONOTONIC, &t0);
	v->build(buf, n);
	clock_gettime(CLOCK_MONOTONIC, &t1);

	/* Correctness guard: the string must be exactly n * CHUNK_LEN bytes. */
	*ok = (strlen(buf) == (size_t)n * CHUNK_LEN);
	sink = strlen(buf);

	return (double)(t1.tv_sec - t0.tv_sec) +
	       (double)(t1.tv_nsec - t0.tv_nsec) / 1e9;
}

/*
 * Warm-up. Modern CPUs idle at a low clock frequency and take a few
 * milliseconds of load to ramp up, so the *first* thing you measure comes out
 * artificially slow. This also touches every byte of buf once up front, so the
 * cost of making that memory usable does not land in the middle of a
 * measurement.
 *
 * Without this, the N=1000 row lands ~2.5x above its own trend line and the
 * quadratic curve looks broken. Warming up is not cheating -- it is how you
 * measure steady-state cost instead of start-up noise.
 */
static void warmup(char *buf)
{
	memset(buf, 0, (size_t)MAX_N * CHUNK_LEN + 1);
	for (int i = 0; i < 20; i++) {
		build_my_strcat(buf, 2000);
		build_my_memcpy(buf, 2000);
	}
}

int main(void)
{
	char *buf = malloc((size_t)MAX_N * CHUNK_LEN + 1);
	int any_bad = 0;

	if (buf == NULL) {
		perror("malloc");
		return EXIT_FAILURE;
	}

	warmup(buf);

	printf("Building a string of N x %zu bytes, N doubling each row.\n",
	       CHUNK_LEN);
	printf("Times in milliseconds.\n\n");

	printf("%8s", "N");
	for (size_t v = 0; v < NR_VARIANTS; v++)
		printf("%14s", variants[v].name);
	printf("%10s\n", "ratio");
	printf("%8s", "");
	for (size_t v = 0; v < NR_VARIANTS; v++)
		printf("%14s", "");
	printf("%10s\n", "cat/cpy");

	for (size_t i = 0; i < NR_SIZES; i++) {
		double t[NR_VARIANTS];

		printf("%8ld", sizes[i]);
		for (size_t v = 0; v < NR_VARIANTS; v++) {
			int ok;

			t[v] = time_build(&variants[v], buf, sizes[i], &ok);
			if (!ok)
				any_bad = 1;
			printf("%13.2f%s", t[v] * 1e3, ok ? " " : "!");
		}
		/* my_strcat vs my_memcpy */
		printf("%10.1fx\n", t[1] > 0 ? t[0] / t[1] : 0.0);
		fflush(stdout);
	}

	if (any_bad) {
		printf("\n"
		       "!! A '!' means that variant produced the WRONG string.\n"
		       "!! Run `make test` and fix your implementation -- the\n"
		       "!! timings above are meaningless until it passes.\n");
	}

	free(buf);
	return any_bad ? EXIT_FAILURE : EXIT_SUCCESS;
}

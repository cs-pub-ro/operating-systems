/*
 * write_demo.c - print the same line NUM_ROUNDS times, using write().
 *
 * Build and run:
 *     make
 *     ./write_demo > /dev/null
 */

#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <time.h>

#define diff_us(ta, tb)		\
	(((ta).tv_sec - (tb).tv_sec) * 1000 * 1000 + \
	 ((ta).tv_nsec - (tb).tv_nsec) / 1000)

#define NUM_ROUNDS 1000000

static const char line[] = "Hello, World!\n";

int main(void)
{
	struct timespec time_before, time_after;
	size_t len;

	/*
	 * TODO: Compute the length of `line` in variable `len`.
	 */

	clock_gettime(CLOCK_REALTIME, &time_before);
	/*
	 * TODO: write() `line` to file descriptor 1 (stdout), NUM_ROUND times.
	 * There is no formatting and no buffering.
	 */
	clock_gettime(CLOCK_REALTIME, &time_after);
	fprintf(stderr, "time passed %ld microseconds\n", diff_us(time_after, time_before));

	return 0;
}

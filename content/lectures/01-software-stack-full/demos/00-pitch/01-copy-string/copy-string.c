/*
 * Build the same string over and over with strcat().
 *
 * Every strcat() has to find the end of the destination first, and the only
 * way to find it is to walk the string from the beginning looking for the
 * terminating NUL.  The string gets longer with each call, so the four calls
 * of one round walk 0, 6, 12 and 20 characters before they copy anything.
 *
 * Compare with copy-string-improved.c, which writes the same bytes without
 * ever searching for the end.
 */

#include <stdio.h>
#include <string.h>
#include <time.h>

#define diff_us(ta, tb)		\
	(((ta).tv_sec - (tb).tv_sec) * 1000 * 1000 + \
	 ((ta).tv_nsec - (tb).tv_nsec) / 1000)

#define NUM_ROUNDS 10000000

static char big_string[1000];

int main(void)
{
	struct timespec time_before, time_after;
	unsigned int i;

	clock_gettime(CLOCK_MONOTONIC, &time_before);
	for (i = 0; i < NUM_ROUNDS; i++) {
		big_string[0] = '\0';
		strcat(big_string, "John, ");
		strcat(big_string, "Paul, ");
		strcat(big_string, "George, ");
		strcat(big_string, "Joel");
	}
	clock_gettime(CLOCK_MONOTONIC, &time_after);

	printf("result: '%s'\n", big_string);
	printf("time passed: %ld microseconds\n",
	       diff_us(time_after, time_before));

	return 0;
}

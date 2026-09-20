/*
 * Build the same string as copy-string.c, without ever searching for its end.
 *
 * The program knows where each piece goes, because it knows how long the
 * pieces before it are, so every strcpy() starts writing straight away.  The
 * bytes written are exactly the same; what disappears is the repeated walk
 * over what has already been written.
 */

#include <stdio.h>
#include <string.h>
#include <time.h>

#define diff_us(ta, tb)		\
	(((ta).tv_sec - (tb).tv_sec) * 1000 * 1000 + \
	 ((ta).tv_nsec - (tb).tv_nsec) / 1000)

#define NUM_ROUNDS 10000000

#define JOHN	"John, "
#define PAUL	"Paul, "
#define GEORGE	"George, "
#define JOEL	"Joel"

static char big_string[1000];

int main(void)
{
	struct timespec time_before, time_after;
	unsigned int i;

	clock_gettime(CLOCK_MONOTONIC, &time_before);
	for (i = 0; i < NUM_ROUNDS; i++) {
		strcpy(big_string, JOHN);
		strcpy(big_string + sizeof(JOHN) - 1, PAUL);
		strcpy(big_string + sizeof(JOHN) + sizeof(PAUL) - 2, GEORGE);
		strcpy(big_string + sizeof(JOHN) + sizeof(PAUL) +
		       sizeof(GEORGE) - 3, JOEL);
	}
	clock_gettime(CLOCK_MONOTONIC, &time_after);

	printf("result: '%s'\n", big_string);
	printf("time passed: %ld microseconds\n",
	       diff_us(time_after, time_before));

	return 0;
}

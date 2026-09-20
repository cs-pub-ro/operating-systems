#include <stdio.h>
#include <string.h>
#include <time.h>

#define diff_us(ta, tb)		\
	(((ta).tv_sec - (tb).tv_sec) * 1000 * 1000 + \
	 ((ta).tv_nsec - (tb).tv_nsec) / 1000)

#define NUM_ROUNDS 100000000

static char big_string[1000];

int main(void)
{
	struct timespec time_before, time_after;

	clock_gettime(CLOCK_REALTIME, &time_before);
	for (unsigned int i = 0; i < NUM_ROUNDS; i++) {
		big_string[0] = '\0';
		strcat(big_string, "John, ");
		strcat(big_string, "Paul, ");
		strcat(big_string, "George, ");
		strcat(big_string, "Joel ");
	}
	clock_gettime(CLOCK_REALTIME, &time_after);
	printf("time passed %ld microseconds\n", diff_us(time_after, time_before));

	return 0;
}

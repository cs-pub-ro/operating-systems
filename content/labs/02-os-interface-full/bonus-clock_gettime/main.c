#include <stdio.h>
#include <time.h>

#include "my_time.h"

int main(void)
{
	struct timespec ts;
	time_t t;

	/* Use my_clock_gettime() to get the current CLOCK_REALTIME time. */
	my_clock_gettime(CLOCK_REALTIME, &ts);
	printf("my_clock_gettime: tv_sec=%ld, tv_nsec=%ld\n",
	       (long)ts.tv_sec, ts.tv_nsec);

	/* Use my_time() to get the current time as seconds since the Epoch. */
	t = my_time(NULL);
	printf("my_time:          %ld\n", (long)t);

	/* The two tv_sec values should be equal (or differ by at most 1). */
	return 0;
}

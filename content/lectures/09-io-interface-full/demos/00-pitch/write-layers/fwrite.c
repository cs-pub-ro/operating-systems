#include <stdio.h>
#include <time.h>

#include "utils.h"

#define NUM_ROUNDS	1000
#define NUM_BLOCKS	100
#define NUM_BYTES	1024

static const char buffer[NUM_BYTES] = {1, };

#define diff_us(ta, tb)		\
	(((ta).tv_sec - (tb).tv_sec) * 1000 * 1000 + \
	 ((ta).tv_nsec - (tb).tv_nsec) / 1000)

int main(void)
{
	struct timespec time_before, time_after;
	FILE *f;

	f = fopen("f.dat", "w");
	DIE(f == NULL, "fopen");

	clock_gettime(CLOCK_REALTIME, &time_before);
	for (unsigned int i = 0; i < NUM_ROUNDS; i++) {
		fseek(f, 0, SEEK_SET);
		for (unsigned int j = 0; j < NUM_ROUNDS; j++) {
			fwrite(buffer, 1024, 1, f);
		}
	}
	clock_gettime(CLOCK_REALTIME, &time_after);

	printf("time passed %ld microseconds\n", diff_us(time_after, time_before));

	fclose(f);

	return 0;
}

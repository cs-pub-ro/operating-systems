#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <sched.h>
#include <time.h>
#include <fcntl.h>

#define diff_us(ta, tb)		\
	(((ta).tv_sec - (tb).tv_sec) * 1000 * 1000 + \
	 ((ta).tv_nsec - (tb).tv_nsec) / 1000)

#define NUM_ROUNDS 10000
#define NUM_BYTES  1024

int main(void)
{
	struct timespec time_before, time_after;
	FILE *f;

	f = fopen("test.dat", "wb");
	if (f == NULL) {
		perror("fopen");
		exit(EXIT_FAILURE);
	}

	clock_gettime(CLOCK_REALTIME, &time_before);
	for (unsigned int i = 0; i < NUM_ROUNDS; i++) {
		fseek(f, 0, SEEK_SET);
		for (unsigned int j = 0; j < NUM_BYTES; j++)
			fwrite("a", 1, 1, f);
	}
	clock_gettime(CLOCK_REALTIME, &time_after);
	printf("time passed %ld microseconds\n", diff_us(time_after, time_before));

	fclose(f);

	return 0;
}

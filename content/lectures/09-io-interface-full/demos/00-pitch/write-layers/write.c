#include <stdio.h>
#include <time.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/types.h>

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
	int fd;

	fd = open("f.dat", O_WRONLY | O_CREAT, 0644);
	DIE(fd < 0, "fopen");

	clock_gettime(CLOCK_REALTIME, &time_before);
	for (unsigned int i = 0; i < NUM_ROUNDS; i++) {
		lseek(fd, 0, SEEK_SET);
		for (unsigned int j = 0; j < NUM_ROUNDS; j++) {
			write(fd, buffer, 1024);
		}
	}
	clock_gettime(CLOCK_REALTIME, &time_after);

	printf("time passed %ld microseconds\n", diff_us(time_after, time_before));

	close(fd);

	return 0;
}

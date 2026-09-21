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

#define NUM_ROUNDS 10000000

static ssize_t my_write(int fd, const char *buf, size_t len)
{
	return len;
}

int main(void)
{
	struct timespec time_before, time_after;
	int fd;

	fd = open("/dev/null", O_WRONLY);
	if (fd < 0) {
		perror("open");
		exit(EXIT_FAILURE);
	}

	clock_gettime(CLOCK_REALTIME, &time_before);
	for (unsigned int i = 0; i < NUM_ROUNDS; i++) {
		my_write(fd, "a", 1);
	}
	clock_gettime(CLOCK_REALTIME, &time_after);
	printf("time passed %ld microseconds\n", diff_us(time_after, time_before));

	close(fd);

	return 0;
}

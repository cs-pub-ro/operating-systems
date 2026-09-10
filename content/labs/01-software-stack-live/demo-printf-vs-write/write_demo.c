/*
 * write_demo.c - print the same line N times, using write().
 *
 * Build and run:
 *     make
 *     time ./write_demo > /dev/null
 */

#include <string.h>
#include <unistd.h>

#define N 1000000

const char *line = "hello from the operating systems lab\n";

int main(void)
{
	/*
	 * TODO 1: compute the length of `line`.
	 */

	/*
	 * TODO 2: write() `line` to file descriptor 1 (stdout), N times.
	 * There is no formatting and no buffering here.
	 */

	return 0;
}

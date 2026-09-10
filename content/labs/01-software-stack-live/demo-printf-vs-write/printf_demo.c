/*
 * printf_demo.c - print the same line N times, using printf().
 *
 * Build and run:
 *     make
 *     time ./printf_demo > /dev/null
 */

#include <stdio.h>

#define N 1000000

const char *line = "hello from the operating systems lab\n";

int main(void)
{
	/*
	 * TODO 1: switch stdout's buffering OFF, using setvbuf().
	 * Later in the demo you will comment this line out and measure again.
	 */

	/*
	 * TODO 2: print `line` N times, using printf() with a "%s" format.
	 */

	return 0;
}

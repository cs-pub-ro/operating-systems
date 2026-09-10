/*
 * printf_demo.c - print the same line a million times, using printf.
 *
 *     gcc -O0 -Wall -Wextra -o printf_demo printf_demo.c
 *     time ./printf_demo > /dev/null
 */

#include <stdio.h>

#define N 1000000

const char *line = "hello from the operating systems lab\n";

int main(void)
{
	/* Switches stdout's buffer OFF. Comment it out to switch it back on. */
	setvbuf(stdout, NULL, _IONBF, 0);

	for (long i = 0; i < N; i++)
		printf("%s", line);

	return 0;
}

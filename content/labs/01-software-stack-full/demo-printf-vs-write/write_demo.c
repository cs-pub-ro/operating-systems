/*
 * write_demo.c - print the same line a million times, using write.
 *
 *     gcc -O0 -Wall -Wextra -o write_demo write_demo.c
 *     time ./write_demo > /dev/null
 */

#include <string.h>
#include <unistd.h>

#define N 1000000

const char *line = "hello from the operating systems lab\n";

int main(void)
{
	size_t len = strlen(line);

	for (long i = 0; i < N; i++)
		write(1, line, len); /* 1 is stdout */

	return 0;
}

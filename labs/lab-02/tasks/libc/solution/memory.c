// SPDX-License-Identifier: BSD-3-Clause

#include <stdlib.h>

int main(void)
{
	void *p;

	/* TODO 8: Use malloc() to allocate memory of different sizes.
	 * Store result in p.
	 * Use free() to deallocate memory.
	 * Use ltrace and strace command line tools to monitor library
	 * and system calls.
	 */
	p = malloc(1000);
	free(p);
	p = malloc(10000);
	free(p);
	p = malloc(100000);
	free(p);
	p = malloc(1000000);
	free(p);

	return 0;
}

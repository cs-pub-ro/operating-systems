/*
 * One thread adds the numbers 1 to N, NUM_ROUNDS times over.
 */

#include <stdio.h>

#include "sum.h"

static unsigned long sum;

static void add_rounds(unsigned long rounds)
{
	unsigned long r, i;

	for (r = 0; r < rounds; r++)
		for (i = 1; i <= N; i++)
			sum += i;
}

int main(void)
{
	double start = now_ms();

	add_rounds(NUM_ROUNDS);

	report("serial", sum, start);

	return 0;
}

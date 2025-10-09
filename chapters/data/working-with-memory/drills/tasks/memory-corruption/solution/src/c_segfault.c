// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>

#define SIZE_INT 32

/* TODO 9: Fix the bug causing the Segmentation Fault */
static void print_bit_array(unsigned int the_bits[SIZE_INT])
{
	int i = SIZE_INT - 1;

	while (i >= 0) {
		printf("%u\n", the_bits[i]);
		i--;
	}
}

/* REPLACE 9 */
/* static void print_bit_array(unsigned int the_bits[SIZE_INT])
{
	unsigned int i = SIZE_INT - 1;

	while (i >= 0) {
		printf("%u\n", the_bits[i]);
		i--;
	}
} */

static void to_bits(unsigned int value, unsigned int in_bits[SIZE_INT])
{
	unsigned int shift_bit = 0x0001;

	for (unsigned int i = 0; i < SIZE_INT; i++) {
		if ((value & shift_bit) == 0)
			in_bits[i] = 0;
		else
			in_bits[i] = 1;
		shift_bit = shift_bit << 1;
	}
}

static unsigned int factorial(unsigned int num)
{
	unsigned int fact = 0;

	if (num == 0)
		return 1;

	fact = factorial(num - 1);
	return fact * num;
}

int main(void)
{
	unsigned int number = 0;
	unsigned int the_bits[SIZE_INT];
	unsigned int fact;

	printf("Input a positive integer: ");
	scanf("%u", &number);

	fact = factorial(number);
	printf("%u   Factorial = %u\n", number, fact);

	to_bits(fact, the_bits);
	print_bit_array(the_bits);

	return 0;
}

// SPDX-License-Identifier: BSD-3-Clause
#include <stdio.h>

void pawned(void)
{
	printf("Oh no! The canary was eaten: https://www.youtube.com/watch?v=JGWOCALy1LI&ab_channel=lou2u\n");
}

void fun1(char *p)
{
	unsigned char a[8] = {'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'};
	unsigned long long *addr = (unsigned long long *)a;

	printf("%p\n", &pawned);
	for (int i = 0; i < 64; i++) {
		if (i % 8 == 0)
			printf("\n");
		printf("c[%d] = %x\n", i, a[i]);
	}

	printf("overwrite canary:\n");
	/* TODO 1: Add code that overwrites the canary.
	 * Note: You should get a stack smashing detected error.
	 * Remove the overwrite after getting the error in order to proceed to the next step.
	 */
	addr[1] = 0;

	printf("overwrite return address:\n");
	/* TODO 2: Add code that overwrites the return address with the address of pawned. */
	addr[3] = &pawned;

	(void) p;
}

int main(void)
{
	setvbuf(stdout, NULL, _IONBF, 0);
	setvbuf(stderr, NULL, _IONBF, 0);
	char *p = (char *)0x4343434343434343;

	fun1(p);
	return 0;
}

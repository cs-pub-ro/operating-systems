#include <stdio.h>
#include <stdlib.h>
#include <malloc.h>

int main(void)
{
	char c;
	char *ptr;
	void (*f)(void);

	// allocate memory
	printf("----- Allocate memory -----\n");
	ptr = malloc(1024);

	// write to memory
	printf("----- Write to memory -----\n");
	ptr[0] = 0xc3;

	printf("----- Read from memory -----\n");
	// read from memory
	c = ptr[0];

	printf("----- Execute memory -----\n");
	// execute memory
	f = (void (*)(void)) ptr;
	f();

	printf("----- Free memory -----\n");
	// free memory
	free(ptr);

	return 0;
}

#include <stdio.h>

#define SIZE 8192

char x[SIZE][SIZE];

int
main(void)
{
	int i, j;

	for (i = 0; i < SIZE; ++i) {
		for (j = 0; j < SIZE; ++j)
			x[i][j] = i * j;
	}
	return 0;
}

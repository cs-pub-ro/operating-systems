#include <stdio.h>
#include <stdlib.h>

int main(int argc, char* argv[])
{
	int a = 0, b = 1, c;
	int N;

	/* TODO 25: Compute the Nth fibonacci number */
	if (argc < 2) {
		printf("Not enough arguments\n");
		return 1;
	}

	N = atoi(argv[1]);

	if (N < 0) {
		printf("N cannot be negative\n");
		return 1;
	}

	if (N == 0) {
		printf("0\n");
		return 0;
	}

	for (int i = 1; i < N; i++) {
		c = a + b;
		a = b;
		b = c;
	}

	printf("%d\n", b);

	return 0;
}

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "caesar.h"

static void usage(const char *prog)
{
	fprintf(stderr,
		"Usage:\n"
		"  %s <shift> <text>\n"
		"\n"
		"  shift  integer (positive = encrypt, negative = decrypt)\n",
		prog);
}

int main(int argc, char *argv[])
{
	if (argc != 3) {
		usage(argv[0]);
		return EXIT_FAILURE;
	}

	int shift = atoi(argv[1]);
	char *text = strdup(argv[2]);

	if (text == NULL) {
		perror("strdup");
		return EXIT_FAILURE;
	}

	caesar(text, shift);

	printf("%s\n", text);
	free(text);
	return EXIT_SUCCESS;
}

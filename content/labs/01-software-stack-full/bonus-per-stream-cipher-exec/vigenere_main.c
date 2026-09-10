#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "vigenere.h"

static void usage(const char *prog)
{
	fprintf(stderr,
		"Usage:\n"
		"  %s <key> <text>\n"
		"\n"
		"  key  letters only (case-insensitive)\n",
		prog);
}

int main(int argc, char *argv[])
{
	if (argc != 3) {
		usage(argv[0]);
		return EXIT_FAILURE;
	}

	const char *key = argv[1];
	char *text = strdup(argv[2]);

	if (text == NULL) {
		perror("strdup");
		return EXIT_FAILURE;
	}

	vigenere(text, key);

	printf("%s\n", text);
	free(text);
	return EXIT_SUCCESS;
}

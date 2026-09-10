#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "caesar.h"
#include "vigenere.h"

static void usage(const char *prog)
{
	fprintf(stderr,
		"Usage:\n"
		"  %s caesar  <shift>  <text>\n"
		"  %s vigenere <key>   <text>\n"
		"\n"
		"  shift  integer (positive = encrypt, negative = decrypt)\n"
		"  key    letters only (case-insensitive)\n",
		prog, prog);
}

int main(int argc, char *argv[])
{
	if (argc != 4) {
		usage(argv[0]);
		return EXIT_FAILURE;
	}

	const char *cipher = argv[1];
	char *text = strdup(argv[3]);

	if (text == NULL) {
		perror("strdup");
		return EXIT_FAILURE;
	}

	if (strcmp(cipher, "caesar") == 0) {
		int shift = atoi(argv[2]);
		caesar(text, shift);
	} else if (strcmp(cipher, "vigenere") == 0) {
		vigenere(text, argv[2]);
	} else {
		fprintf(stderr, "Unknown cipher: %s\n", cipher);
		usage(argv[0]);
		free(text);
		return EXIT_FAILURE;
	}

	printf("%s\n", text);
	free(text);
	return EXIT_SUCCESS;
}

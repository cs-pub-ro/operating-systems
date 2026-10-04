#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "xor.h"

static void usage(const char *prog)
{
	fprintf(stderr,
		"Usage:\n"
		"  %s <key> <text>\n"
		"\n"
		"  key   any non-empty string\n"
		"  text  the string to encrypt\n",
		prog);
}

static void print_hex(const unsigned char *buf, size_t len)
{
	for (size_t i = 0; i < len; i++)
		printf(i == 0 ? "%02x" : " %02x", buf[i]);
	putchar('\n');
}

int main(int argc, char *argv[])
{
	if (argc != 3 || argv[1][0] == '\0') {
		usage(argv[0]);
		return EXIT_FAILURE;
	}

	const char *key = argv[1];
	size_t len = strlen(argv[2]);
	unsigned char *buf = malloc(len + 1);

	if (buf == NULL) {
		perror("malloc");
		return EXIT_FAILURE;
	}
	memcpy(buf, argv[2], len + 1);

	/*
	 * The ciphertext may hold any byte value, '\0' included, so it is
	 * printed in hexadecimal rather than as a string.
	 */
	xor_encrypt(buf, len, key);
	printf("encrypted: ");
	print_hex(buf, len);

	/* Same key, same function: XOR undoes itself. */
	xor_encrypt(buf, len, key);
	printf("decrypted: %s\n", buf);

	free(buf);
	return EXIT_SUCCESS;
}

#include <ctype.h>
#include "caesar.h"

void caesar(char *plaintext, int shift)
{
	/* Normalise shift to [0, 25] */
	shift = ((shift % 26) + 26) % 26;

	for (; *plaintext != '\0'; plaintext++) {
		if (isupper((unsigned char)*plaintext))
			*plaintext = 'A' + (*plaintext - 'A' + shift) % 26;
		else if (islower((unsigned char)*plaintext))
			*plaintext = 'a' + (*plaintext - 'a' + shift) % 26;
	}
}

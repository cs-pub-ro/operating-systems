#include <ctype.h>
#include <string.h>
#include "vigenere.h"

void vigenere(char *plaintext, const char *key)
{
	size_t key_len = strlen(key);

	if (key_len == 0)
		return;

	for (size_t ki = 0; *plaintext != '\0'; plaintext++) {
		if (!isalpha((unsigned char)*plaintext))
			continue;

		int shift = tolower((unsigned char)key[ki % key_len]) - 'a';

		if (isupper((unsigned char)*plaintext))
			*plaintext = 'A' + (*plaintext - 'A' + shift) % 26;
		else
			*plaintext = 'a' + (*plaintext - 'a' + shift) % 26;

		ki++;
	}
}

#include <string.h>
#include "xor.h"

void xor_encrypt(unsigned char *buf, size_t len, const char *key)
{
	size_t key_len = strlen(key);

	if (key_len == 0)
		return;

	for (size_t i = 0; i < len; i++)
		buf[i] ^= (unsigned char)key[i % key_len];
}

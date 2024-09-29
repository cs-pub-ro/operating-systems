// SPDX-License-Identifier: BSD-3-Clause

#include "os_string.h"

unsigned long os_strlen(const char *s)
{
	unsigned long len;

	for (len = 0; *s != '\0'; s++, len++) { }

	return len;
}

char *os_strcpy(char *dest, const char *src)
{
	char *d;

	for (d = dest; *src != '\0'; src++, d++)
		*d = *src;
	/* Also place NUL byte. */
	*d = *src;

	return dest;
}

/* TODO 12: Implement strcat(). */
char *os_strcat(char *dest, const char *src)
{
    char *rdest = dest;

    while (*dest)
      dest++;

    while (*dest++ = *src++)
      ;

    return rdest;
}

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

/* TODO 25: Implement os_strcat(). */
char *os_strcat(char *dest, const char *src)
{
    char *rdest = dest;

    while (*dest)
      dest++;

	while (*src) {
		*dest = *src;
		dest++;
		src++;
	}

	/*
	 * A more difficult to understand, but shorter and smarter implementation is below.
	 * The ++ operator is evaluated last, after checking the condition of the loop, so this condition can be
	 * seen as simply *dest = *src followed by dest++ and src++ in the loop body, which is equivalent to the loop
	 * above.
	 */
	/*
    while (*dest++ = *src++)
      ;
	*/

    return rdest;
}

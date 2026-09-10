/*
 * mystring.c - reference implementation.
 *
 * The four functions below are written the way the exercise asks for them:
 * plain C, byte at a time, nothing from <string.h>.
 *
 * Check them with:   make test
 * Then measure with: make bench
 */

#include "mystring.h"

size_t my_strlen(const char *s)
{
	const char *p = s;

	/*
	 * Walk to the '\0' and report the distance covered. The terminator
	 * itself is not counted, which is why the loop stops *on* it rather
	 * than after it.
	 */
	while (*p != '\0')
		p++;

	return (size_t)(p - s);
}

char *my_strcpy(char *dest, const char *src)
{
	char *d = dest;

	/*
	 * The assignment is the loop condition: it copies the byte and then
	 * tests the value that was copied, so the '\0' is written first and
	 * ends the loop second. Copying the terminator is what makes dest a
	 * string rather than a pile of bytes.
	 */
	while ((*d++ = *src++) != '\0')
		;

	/* strcpy(3) returns dest, not the end of it. */
	return dest;
}

char *my_strcat(char *dest, const char *src)
{
	/*
	 * Find the end of dest, then copy src there. Note what this costs:
	 * my_strlen() rescans the whole of dest on *every* call, because a C
	 * string does not carry its length. Appending in a loop is therefore
	 * quadratic in the length of the result -- which is exactly what the
	 * benchmark in this directory demonstrates.
	 */
	my_strcpy(dest + my_strlen(dest), src);

	return dest;
}

void *my_memcpy(void *dest, const void *src, size_t n)
{
	/*
	 * void * cannot be dereferenced or advanced, so take typed pointers
	 * first. unsigned char is the right type: it is exactly one byte and
	 * has no padding or trap representations.
	 */
	unsigned char *d = dest;
	const unsigned char *s = src;

	/*
	 * n is the only stopping condition -- an embedded '\0' is just another
	 * byte here. n == 0 must copy nothing, and the post-decrement test
	 * gets that right without a special case.
	 */
	while (n-- > 0)
		*d++ = *s++;

	return dest;
}

/*
 * mystring.c - YOUR WORK GOES HERE.
 *
 * Implement the four functions below from scratch.
 *
 * Rules:
 *   - Do NOT call any function from <string.h>. That is the whole point.
 *   - <string.h> is deliberately not included. If you find yourself needing it,
 *     you are about to cheat.
 *   - Plain C, no compiler builtins, no inline assembly. A simple, correct
 *     byte-at-a-time loop is exactly what we want here.
 *
 * Check your work with:   make test
 * Then measure it with:   make bench
 */

#include "mystring.h"

size_t my_strlen(const char *s)
{
	/*
	 * TODO
	 * Walk forward from s until you hit '\0'. Return how many bytes you
	 * walked past (not counting the '\0' itself).
	 */
	(void)s;
	return 0;
}

char *my_strcpy(char *dest, const char *src)
{
	/*
	 * TODO
	 * Copy bytes from src to dest until you have copied the '\0'.
	 * Careful: the '\0' must be copied too, or dest is not a string.
	 * Remember what the function must return -- check the header.
	 */
	(void)src;
	return dest;
}

char *my_strcat(char *dest, const char *src)
{
	/*
	 * TODO
	 * Two steps:
	 *   1. Find the '\0' that currently ends dest.
	 *   2. Copy src (and its '\0') starting at that position.
	 *
	 * You may reuse my_strlen/my_strcpy here.
	 *
	 * Pay attention to step 1 -- it is the reason for the whole benchmark
	 * in this exercise. Ask yourself: how much work is step 1, and does it
	 * depend on the length of dest or the length of src?
	 */
	(void)src;
	return dest;
}

void *my_memcpy(void *dest, const void *src, size_t n)
{
	/*
	 * TODO
	 * Copy exactly n bytes. There is no '\0' involved: n is the only thing
	 * that stops you.
	 *
	 * Hint: you cannot do pointer arithmetic on void *, so start with
	 *       something like:
	 *           unsigned char *d = dest;
	 *           const unsigned char *s = src;
	 */
	(void)src;
	(void)n;
	return dest;
}

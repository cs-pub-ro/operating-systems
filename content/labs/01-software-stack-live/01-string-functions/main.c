/*
 * main.c - test string functions in mystring.c.
 *
 * TODOs in this file correlate with TODOs in mystring.c.
 *
 * Build and run:
 *     make
 *     ./main
 */

#include <stdio.h>
#include <string.h>

#include "mystring.h"

#define BUFLEN 64

static void test_my_strlen(void)
{
	/* Initialize with different values. */
	size_t len = 0xFF;

	/*
	 * TODO 1a: Call my_strlen() on an empty string: "".
	 * Store result in len.
	 */
	if (len == 0)
		puts(" [PASSED] strlen: empty string");
	else
		puts(" [FAILED] strlen: empty string");

	/*
	 * TODO 1b: Call my_strlen() on string "hello".
	 * Store result in len.
	 */
	if (len == 5)
		puts(" [PASSED] strlen: hello string");
	else
		puts(" [FAILED] strlen: hello string");
}

static void test_my_strcpy(void)
{
	/* Initialize with a random value. */
	char buf[BUFLEN] = "abcde";
	char *ret = NULL;

	/*
	 * TODO 2a: Call my_strcpy() to buf of an empty string: "".
	 * Store result in ret.
	 */
	if (strcmp(buf, "") == 0 && ret == buf)
		puts(" [PASSED] strcpy: empty string");
	else
		puts(" [FAILED] strcpy: empty string");

	/*
	 * TODO 2b: Call my_strcpy() to buf of string "hello".
	 * Store result in ret.
	 */
	if (strcmp(buf, "hello") == 0 && ret == buf)
		puts(" [PASSED] strcmp: hello string");
	else
		puts(" [FAILED] strcmp: hello string");
}

static void test_my_strcat(void)
{
	/* Initialize with a random value. */
	char buf[BUFLEN] = "abcde";
	char *ret = NULL;

	/*
	 * TODO 3a: Call my_strcat() to buf of an empty string: "".
	 * Store result in ret.
	 */
	if (strcmp(buf, "abcde") == 0 && ret == buf)
		puts(" [PASSED] strcat: empty string");
	else
		puts(" [FAILED] strcat: empty string");

	/*
	 * TODO 3b: Call my_strcat() to buf of string "hello".
	 * Store result in ret.
	 */
	if (strcmp(buf, "abcdehello") == 0 && ret == buf)
		puts(" [PASSED] strcat: hello string");
	else
		puts(" [FAILED] strcat: hello string");
}

static void test_my_memcpy(void)
{
	/* Initialize with a random value. */
	unsigned char buf[BUFLEN] = "a";
	unsigned char *ret = NULL;

	/*
	 * TODO 4a: Call my_memcpy() to buf of string "def" using 3 bytes.
	 * Store result in ret.
	 */
	if (memcmp(buf, "def", 3) == 0 && ret == buf)
		puts(" [PASSED] memcpy: def byte array");
	else
		puts(" [FAILED] memcpy: def byte array");

	/*
	 * TODO 4b: Call my_memcpy() to buf of string "def" using 4 bytes.
	 * Store result in ret.
	 */
	if (memcmp(buf, "def", 4) == 0 && ret == buf)
		puts(" [PASSED] memcpy: def string");
	else
		puts(" [FAILED] memcpy: def string");

	/*
	 * TODO 4c: Call my_strcat() to buf of string "defghij" using 7 bytes.
	 * Store result in ret.
	 */
	if (memcmp(buf, "defghij", 8) == 0 && ret == buf)
		puts(" [PASSED] memcpy: defghij string");
	else
		puts(" [FAILED] memcpy: defghij string");
}

int main(void)
{
	test_my_strlen();
	test_my_strcpy();
	test_my_strcat();
	test_my_memcpy();

	return 0;
}

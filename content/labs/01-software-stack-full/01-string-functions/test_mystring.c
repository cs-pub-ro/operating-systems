/*
 * test_mystring.c - correctness tests for your mystring.c.
 *
 * You do not need to modify this file. Run it with: make test
 *
 * Note that this file DOES use the real <string.h>: it is the reference we
 * compare your implementation against. Your mystring.c must not.
 *
 * Every buffer is pre-filled with the byte 0xAA and has a guard area after the
 * part you are supposed to touch, so the tests also catch writing too much.
 */

#include <stdio.h>
#include <string.h>

#include "mystring.h"

#define BUF 64
#define FILL 0xAA

static int checks;
static int failures;

static void check(int ok, const char *what)
{
	checks++;
	if (ok) {
		printf("  [ ok ] %s\n", what);
	} else {
		failures++;
		printf("  [FAIL] %s\n", what);
	}
}

/* Are buf[from..BUF) still untouched (0xAA)? Catches buffer overruns. */
static int guard_intact(const unsigned char *buf, size_t from)
{
	for (size_t i = from; i < BUF; i++)
		if (buf[i] != FILL)
			return 0;
	return 1;
}

static void test_strlen(void)
{
	puts("my_strlen:");
	check(my_strlen("") == 0, "empty string has length 0");
	check(my_strlen("a") == 1, "\"a\" has length 1");
	check(my_strlen("hello") == 5, "\"hello\" has length 5");
	check(my_strlen("hello world, lab 1") == 18, "longer string");
	/* A '\0' in the middle ends the string, whatever follows. */
	check(my_strlen("ab\0cd") == 2, "stops at the first '\\0'");
}

static void test_strcpy(void)
{
	unsigned char buf[BUF];
	char *ret;

	puts("my_strcpy:");

	memset(buf, FILL, BUF);
	ret = my_strcpy((char *)buf, "hello");
	check(memcmp(buf, "hello", 6) == 0, "copies the bytes and the '\\0'");
	check(ret == (char *)buf, "returns dest");
	check(guard_intact(buf, 6), "writes nothing past the '\\0'");

	memset(buf, FILL, BUF);
	my_strcpy((char *)buf, "");
	check(buf[0] == '\0', "copying \"\" gives an empty string");
	check(guard_intact(buf, 1), "copying \"\" writes exactly 1 byte");

	/* Overwriting a longer string with a shorter one. */
	memset(buf, FILL, BUF);
	my_strcpy((char *)buf, "aaaaaaaaaa");
	my_strcpy((char *)buf, "bb");
	check(memcmp(buf, "bb", 3) == 0, "overwrites a previous, longer string");
}

static void test_strcat(void)
{
	unsigned char buf[BUF];
	char *ret;

	puts("my_strcat:");

	memset(buf, FILL, BUF);
	strcpy((char *)buf, "foo");
	ret = my_strcat((char *)buf, "bar");
	check(memcmp(buf, "foobar", 7) == 0, "\"foo\" + \"bar\" = \"foobar\"");
	check(ret == (char *)buf, "returns dest");
	check(guard_intact(buf, 7), "writes nothing past the new '\\0'");

	memset(buf, FILL, BUF);
	strcpy((char *)buf, "");
	my_strcat((char *)buf, "abc");
	check(memcmp(buf, "abc", 4) == 0, "appending to an empty string");

	memset(buf, FILL, BUF);
	strcpy((char *)buf, "abc");
	my_strcat((char *)buf, "");
	check(memcmp(buf, "abc", 4) == 0, "appending an empty string changes nothing");

	/* Repeated appends: this is what the benchmark does. */
	memset(buf, FILL, BUF);
	strcpy((char *)buf, "");
	for (int i = 0; i < 5; i++)
		my_strcat((char *)buf, "ab");
	check(memcmp(buf, "ababababab", 11) == 0, "five appends in a row");
}

static void test_memcpy(void)
{
	unsigned char buf[BUF];
	void *ret;

	puts("my_memcpy:");

	memset(buf, FILL, BUF);
	ret = my_memcpy(buf, "hello", 5);
	check(memcmp(buf, "hello", 5) == 0, "copies n bytes");
	check(ret == (void *)buf, "returns dest");
	check(guard_intact(buf, 5), "copies exactly n bytes, not one more");

	/* The important difference from strcpy: '\0' is just a byte. */
	memset(buf, FILL, BUF);
	my_memcpy(buf, "ab\0cd", 6);
	check(memcmp(buf, "ab\0cd", 6) == 0, "copies straight through a '\\0'");

	memset(buf, FILL, BUF);
	my_memcpy(buf, "hello", 0);
	check(guard_intact(buf, 0), "n == 0 copies nothing at all");

	/* Non-zero offsets, in case you hardcoded something. */
	memset(buf, FILL, BUF);
	my_memcpy(buf + 3, "xy", 2);
	check(buf[0] == FILL && buf[1] == FILL && buf[2] == FILL,
	      "does not write before dest");
	check(buf[3] == 'x' && buf[4] == 'y', "copies to dest + 3 correctly");
	check(guard_intact(buf, 5), "does not write past dest + 3 + n");
}

int main(void)
{
	test_strlen();
	test_strcpy();
	test_strcat();
	test_memcpy();

	printf("\n%d/%d checks passed\n", checks - failures, checks);
	if (failures != 0) {
		printf("FAILED: %d check(s) still to fix.\n", failures);
		return 1;
	}
	puts("All good. Now run: make bench");
	return 0;
}

// SPDX-License-Identifier: BSD-3-Clause

/*
 * Encrypt a very long string, held in memory, with a repeating-key XOR
 * cipher.  For now one thread encrypts all of it; the work is to be split
 * between as many threads as asked for.  The program then decrypts the
 * result with one thread, as a check: what comes back has to be the
 * original text.
 *
 *     ./encrypt <key> <threads> [size]
 *     ./encrypt secret 4
 *     ./encrypt secret 3 20
 *
 * The size is a number of characters, or of KiB or MiB with a K or an M
 * after it; the default is 256M.  A string of at most SHOW_MAX characters
 * is also shown character by character, for debugging.
 */

#include <ctype.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <pthread.h>

#define KIB		1024UL
#define MIB		(1024UL * KIB)
#define DEFAULT_SIZE	(256 * MIB)
#define MAX_THREADS	64
#define BLOCK		(64UL * 1024)
#define SHOW_MAX	64

/*
 * TODO 1: declare a struct with what one thread needs to know to encrypt
 * its part of the string. Use the thread-scaling demo as a starting point.
 */

/* Seconds since some fixed point in the past; only differences mean anything. */
static double now(void)
{
	struct timespec ts;

	clock_gettime(CLOCK_MONOTONIC, &ts);

	return ts.tv_sec + ts.tv_nsec / 1e9;
}

/* One block of text from a fixed pseudo-random sequence of letters. */
static void fill_block(char *block)
{
	unsigned int state = 12345;
	size_t i;

	for (i = 0; i < BLOCK; i++) {
		state = state * 1103515245 + 12345;
		block[i] = 'a' + (state >> 16) % 26;
	}
}

/* Fill the string with the block, repeated until the string is full. */
static void fill_text(char *text, size_t size)
{
	static char block[BLOCK];
	size_t i, len;

	fill_block(block);
	for (i = 0; i < size; i += len) {
		len = size - i < BLOCK ? size - i : BLOCK;
		memcpy(text + i, block, len);
	}
}

/* Is the string what fill_text() wrote?  Returns 1 if it is, 0 if not. */
static int check_text(const char *text, size_t size)
{
	static char block[BLOCK];
	size_t i, len;

	fill_block(block);
	for (i = 0; i < size; i += len) {
		len = size - i < BLOCK ? size - i : BLOCK;
		if (memcmp(text + i, block, len) != 0)
			return 0;
	}

	return 1;
}

/*
 * Read a size: a number of characters, or of KiB or MiB with a K or an M
 * after the number.  Returns the size, or 0 if `arg` is not one.
 */
static size_t parse_size(const char *arg)
{
	size_t unit = 1;
	unsigned long n;
	char *end;

	if (!isdigit((unsigned char) arg[0]))
		return 0;

	n = strtoul(arg, &end, 10);
	if (toupper((unsigned char) end[0]) == 'K' && end[1] == '\0')
		unit = KIB;
	else if (toupper((unsigned char) end[0]) == 'M' && end[1] == '\0')
		unit = MIB;
	else if (end[0] != '\0')
		return 0;

	if (n > SIZE_MAX / unit)
		return 0;

	return n * unit;
}

/* A size, in the largest unit it is a whole number of. */
static const char *size_str(size_t size)
{
	static char buf[32];

	if (size % MIB == 0)
		snprintf(buf, sizeof(buf), "%zu MiB", size / MIB);
	else if (size % KIB == 0)
		snprintf(buf, sizeof(buf), "%zu KiB", size / KIB);
	else
		snprintf(buf, sizeof(buf), "%zu character%s", size, size == 1 ? "" : "s");

	return buf;
}

/* Print a byte of the key in quotes, or in hex if it does not print. */
static void print_byte(unsigned char c)
{
	if (isprint(c))
		printf("'%c'", c);
	else
		printf("0x%02x", c);
}

/*
 * The byte the threads XORed character `i` with.  By the time this is
 * called the string has been decrypted in one pass, with the right key byte
 * for every position, so whatever separates character `i` from the original
 * is what the threads did differently: 0 if they left the character in
 * clear, the right key byte if they got it right.
 */
static unsigned char applied(const char *text, const char *block, size_t i,
			     const char *key, size_t klen)
{
	return text[i] ^ block[i % BLOCK] ^ key[i % klen];
}

/*
 * Show a short string character by character: on one line the key byte one
 * pass over the string gives each character, on the next the one the
 * threads gave it.  A '.' is a character left in clear, a '?' one XORed
 * with something that is not a byte of the key.
 */
static void show_key_bytes(const char *text, size_t size, const char *key)
{
	static char block[BLOCK];
	size_t klen = strlen(key);
	size_t i, first = size;
	unsigned char c;

	fill_block(block);

	printf("one pass: ");
	for (i = 0; i < size; i++)
		putchar(isprint((unsigned char) key[i % klen]) ? key[i % klen] : '?');
	printf("\nthreads:  ");
	for (i = 0; i < size; i++) {
		c = applied(text, block, i, key, klen);
		if (c != (unsigned char) key[i % klen] && first == size)
			first = i;
		if (c == 0)
			putchar('.');
		else if (isprint(c) && memchr(key, c, klen) != NULL)
			putchar(c);
		else
			putchar('?');
	}
	printf("\n");

	if (first < size)
		printf("%*s^\n", (int) (strlen("threads:  ") + first), "");
}

/*
 * The round trip failed: say how many characters came out of the threads
 * wrong, where the first of them is, and what was done to it.  A character
 * left in clear points at the split; one XORed with the wrong byte of the
 * key points at how the key byte is chosen.
 */
static void explain_failure(const char *text, size_t size, const char *key)
{
	static char block[BLOCK];
	size_t klen = strlen(key);
	size_t i, first = size, run = 0, wrong = 0;
	unsigned char c;

	fill_block(block);
	for (i = 0; i < size; i++) {
		if (text[i] == block[i % BLOCK])
			continue;
		if (first == size)
			first = i;
		if (i == first + run)
			run++;
		wrong++;
	}

	if (first == size)
		return;

	printf("  %zu of %zu characters %s wrong; the first is at position %zu",
	       wrong, size, wrong == 1 ? "is" : "are", first);
	if (run > 1)
		printf(", followed by %zu more in a row", run - 1);
	printf("\n");

	c = applied(text, block, first, key, klen);
	printf("  position %zu ", first);
	if (c == 0) {
		printf("was left in clear: no part encrypted it, or two parts did;");
		printf(" look at the split\n");
	} else if (memchr(key, c, klen) != NULL) {
		printf("was XORed with ");
		print_byte(c);
		printf(", where one pass gives it ");
		print_byte(key[first % klen]);
		printf(": look at how the key byte is chosen\n");
	} else {
		printf("was XORed with 0x%02x, which is not a byte of the key;", c);
		printf(" look at the split, and at how the key byte is chosen\n");
	}
}

/*
 * XOR the `len` characters at `buf` with the key, repeated as often as
 * needed: the first character with the first byte of the key, and so on.
 * Doing it twice gives the original characters back.
 *
 * TODO 2: this is right for a buffer that is the whole string.  A thread's
 * part starts somewhere in the middle, and its first character is not
 * always due the first byte of the key.  Change the function so that it can
 * be told where in the string its buffer starts.
 */
static void xor_buffer(char *buf, size_t len, const char *key)
{
	size_t klen = strlen(key);
	size_t i;

	for (i = 0; i < len; i++)
		buf[i] ^= key[i % klen];
}

/*
 * TODO 3: write the function every thread runs: encrypt its own part.
 */

int main(int argc, char *argv[])
{
	double t_start, t_end;
	int nthreads, rc;
	const char *key;
	size_t size;
	char *text;

	if (argc != 3 && argc != 4) {
		fprintf(stderr, "Usage: %s <key> <threads> [size]\n", argv[0]);
		return 1;
	}

	key = argv[1];
	nthreads = atoi(argv[2]);
	if (key[0] == '\0' || nthreads < 1 || nthreads > MAX_THREADS) {
		fprintf(stderr, "the key must not be empty, threads must be between 1 and %d\n",
			MAX_THREADS);
		return 1;
	}

	size = argc == 4 ? parse_size(argv[3]) : DEFAULT_SIZE;
	if (size == 0) {
		fprintf(stderr, "the size is a number of characters, or a number and K or M\n");
		return 1;
	}

	text = malloc(size);
	if (text == NULL) {
		perror("malloc");
		return 1;
	}
	fill_text(text, size);

	t_start = now();

	/*
	 * The encryption: sequential for now, one call over the whole string,
	 * whatever `nthreads` says.
	 *
	 * TODO 4: cut the string into `nthreads` parts.  Every character has
	 * to be in exactly one part, including the ones the division leaves
	 * over.
	 * TODO 5: start one thread per part, and wait for all of them.
	 */
	xor_buffer(text, size, key);

	t_end = now();

	printf("encrypted %s, %d thread(s), %.3f s\n", size_str(size), nthreads,
	       t_end - t_start);

	/*
	 * The check: the text was encrypted by the threads, so it must not be
	 * the original any more; decrypted in one pass by one thread, it must
	 * be the original again.
	 */
	rc = !check_text(text, size);
	xor_buffer(text, size, key);
	rc = rc && check_text(text, size);
	printf("round trip: %s\n", rc ? "ok" : "FAILED");

	/* Where the threads went wrong, if they did. */
	if (size <= SHOW_MAX)
		show_key_bytes(text, size, key);
	if (!rc)
		explain_failure(text, size, key);

	free(text);

	return rc ? 0 : 1;
}

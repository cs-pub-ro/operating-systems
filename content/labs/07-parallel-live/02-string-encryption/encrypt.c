// SPDX-License-Identifier: BSD-3-Clause

/*
 * Encrypt a very long string, held in memory, with a repeating-key XOR
 * cipher.  For now one thread encrypts all of it; the work is to be split
 * between as many threads as asked for.  The program then decrypts the
 * result with one thread, as a check: what comes back has to be the
 * original text.
 *
 *     ./encrypt <key> <threads> [size-in-MiB]
 *     ./encrypt secret 4
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <pthread.h>

#define MIB		(1024UL * 1024)
#define DEFAULT_MIB	256
#define MAX_THREADS	64
#define BLOCK		(64UL * 1024)

/*
 * TODO 1: declare a struct with what one thread needs to know to encrypt
 * its part of the string.
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
		fprintf(stderr, "Usage: %s <key> <threads> [size-in-MiB]\n", argv[0]);
		return 1;
	}

	key = argv[1];
	nthreads = atoi(argv[2]);
	if (key[0] == '\0' || nthreads < 1 || nthreads > MAX_THREADS) {
		fprintf(stderr, "the key must not be empty, threads must be between 1 and %d\n",
			MAX_THREADS);
		return 1;
	}

	size = (argc == 4 ? (size_t) atoi(argv[3]) : DEFAULT_MIB) * MIB;
	if (size == 0) {
		fprintf(stderr, "size must be at least 1 MiB\n");
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

	printf("encrypted %zu MiB, %d thread(s), %.3f s\n", size / MIB, nthreads,
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

	free(text);

	return rc ? 0 : 1;
}

// SPDX-License-Identifier: BSD-3-Clause

/*
 * Encrypt a long string, held in memory, with encrypt_text() of
 * libxorcipher.so and eight threads.  The result is then decrypted here,
 * in one pass by one thread, as a check: what comes back has to be the
 * original text.  If it is, the flag is printed.
 *
 *     ./chall [timeout]
 *
 * The timeout is in seconds, 20 if not given, and 0 means no timeout.
 */

#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <unistd.h>

#include "xorcipher.h"
#include "flag.h"

#define MIB		(1024UL * 1024)
#define TEXT_SIZE	(64 * MIB + 1000)
#define NUM_THREADS	8
#define KEY		"operating systems"
#define BLOCK		(64UL * 1024)
#define TIMEOUT		20

/* The threads did not finish in time: say so, and give up. */
static void on_alarm(int sig)
{
	static const char msg[] =
		"Timed out: a thread is waiting for something that never comes.\n";
	ssize_t rc;

	(void)sig;
	rc = write(STDERR_FILENO, msg, sizeof(msg) - 1);
	(void)rc;
	_exit(2);
}

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

/*
 * Compare the string with what fill_text() wrote.  Returns the number of
 * characters that differ, and leaves the position of the first in `*first`.
 */
static size_t check_text(const char *text, size_t size, size_t *first)
{
	static char block[BLOCK];
	size_t i, wrong = 0;

	fill_block(block);
	for (i = 0; i < size; i++) {
		if (text[i] == block[i % BLOCK])
			continue;
		if (wrong == 0)
			*first = i;
		wrong++;
	}

	return wrong;
}

/* XOR the whole string with the key, in one pass. */
static void xor_text(char *text, size_t size, const char *key)
{
	size_t klen = strlen(key);
	size_t i;

	for (i = 0; i < size; i++)
		text[i] ^= key[i % klen];
}

int main(int argc, char *argv[])
{
	size_t wrong, first = 0;
	double t_start, t_end;
	uint64_t proof[2];
	char *text;

	signal(SIGALRM, on_alarm);
	alarm(argc > 1 ? atoi(argv[1]) : TIMEOUT);

	text = malloc(TEXT_SIZE);
	if (text == NULL) {
		perror("malloc");
		return 1;
	}
	fill_text(text, TEXT_SIZE);

	t_start = now();
	encrypt_text(text, TEXT_SIZE, KEY, NUM_THREADS);
	t_end = now();

	printf("encrypted %zu characters, %d threads, %.3f s\n", (size_t)TEXT_SIZE,
	       NUM_THREADS, t_end - t_start);

	/* What the encrypted text hashes to is part of what unlocks the flag. */
	proof[0] = TEXT_SIZE;
	proof[1] = flag_hash(FLAG_SEED, text, TEXT_SIZE);

	/* Decrypted in one pass, the text has to be the original again. */
	xor_text(text, TEXT_SIZE, KEY);
	wrong = check_text(text, TEXT_SIZE, &first);
	free(text);

	if (wrong != 0) {
		printf("round trip: FAILED\n");
		printf("  %zu characters came out of the threads wrong; the first is at position %zu\n",
		       wrong, first);
		printf("  a character is wrong if no thread encrypted it, or if two did:\n");
		printf("  XORing twice with the same byte gives the clear text back\n");
		printf("No flag: the text was not encrypted as one pass would encrypt it.\n");
		return 1;
	}
	printf("round trip: ok\n");

	return flag_print(proof, 2);
}

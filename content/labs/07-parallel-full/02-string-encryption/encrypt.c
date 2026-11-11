// SPDX-License-Identifier: BSD-3-Clause

/*
 * Encrypt a very long string, held in memory, with a repeating-key XOR
 * cipher and several threads: the string is cut into one part per thread.
 * The program then decrypts the result with one thread, as a check: what
 * comes back has to be the original text.
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

/* What one thread works on: a part of the string, and the key. */
struct part {
	char *start;		/* first character of this thread's part   */
	size_t len;		/* how many characters it covers           */
	size_t pos;		/* where the part starts in the string     */
	const char *key;	/* the key to XOR with                     */
};

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
 * needed.  `pos` is where `buf` starts in the whole string: the key byte for
 * a character is chosen by the character's position in the string, so that
 * a part in the middle is encrypted exactly as it would be in one pass over
 * everything.  Doing it twice gives the original characters back.
 */
static void xor_buffer(char *buf, size_t len, size_t pos, const char *key)
{
	size_t klen = strlen(key);
	size_t i;

	for (i = 0; i < len; i++)
		buf[i] ^= key[(pos + i) % klen];
}

/*
 * What every thread runs: encrypt its own part.  The parts do not overlap,
 * so no two threads write the same character, and there is nothing to lock.
 */
static void *encrypt_part(void *arg)
{
	struct part *p = arg;

	xor_buffer(p->start, p->len, p->pos, p->key);

	return NULL;
}

int main(int argc, char *argv[])
{
	struct part parts[MAX_THREADS];
	pthread_t threads[MAX_THREADS];
	double t_start, t_end;
	size_t size, chunk;
	int nthreads, i, rc;
	const char *key;
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
	 * Cut the string into `nthreads` parts: `chunk` characters each, and
	 * the last one also takes what the division left over.  Part i starts
	 * `i * chunk` characters in, and that is also where it starts in the
	 * key's repetition.
	 */
	chunk = size / nthreads;
	for (i = 0; i < nthreads; i++) {
		parts[i].pos = (size_t) i * chunk;
		parts[i].start = text + parts[i].pos;
		parts[i].len = (i == nthreads - 1) ? size - parts[i].pos : chunk;
		parts[i].key = key;
	}

	for (i = 0; i < nthreads; i++) {
		rc = pthread_create(&threads[i], NULL, encrypt_part, &parts[i]);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	for (i = 0; i < nthreads; i++)
		pthread_join(threads[i], NULL);

	t_end = now();

	printf("encrypted %zu MiB, %d thread(s), %.3f s\n", size / MIB, nthreads,
	       t_end - t_start);

	/*
	 * The check: the text was encrypted by the threads, so it must not be
	 * the original any more; decrypted in one pass by one thread, it must
	 * be the original again.
	 */
	rc = !check_text(text, size);
	xor_buffer(text, size, 0, key);
	rc = rc && check_text(text, size);
	printf("round trip: %s\n", rc ? "ok" : "FAILED");

	free(text);

	return rc ? 0 : 1;
}

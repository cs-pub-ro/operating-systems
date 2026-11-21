// SPDX-License-Identifier: BSD-3-Clause

/*
 * A repeating-key XOR cipher that encrypts a long string with several
 * threads.
 *
 * In session 07 the string was cut into one part per thread, before the
 * threads started.  Here the string is cut into many small blocks, and the
 * threads share them out while they run: a thread takes the next block
 * nobody has taken, encrypts it, and comes back for another, until there
 * are none left.  A thread that is slowed down just takes fewer blocks.
 *
 * The one thing the threads share for writing is `next`, the place where
 * the next block starts.  A mutex protects it, and nothing else: the blocks
 * themselves do not overlap, so encrypting them needs no lock.
 */

#include <string.h>
#include <pthread.h>

#include "xorcipher.h"

#define BLOCK	4096

/* One call of encrypt_text(): what its threads work on, together. */
struct job {
	char *text;		/* the whole string                         */
	size_t size;		/* its length                               */
	const char *key;	/* the key to XOR with                      */
	size_t next;		/* where the next block to hand out starts  */
	pthread_mutex_t lock;	/* protects `next`                           */
};

/*
 * XOR the `len` characters at `buf` with the key, repeated as often as
 * needed.  `pos` is where `buf` starts in the whole string: the key byte for
 * a character is chosen by the character's position in the string, so that
 * a block in the middle is encrypted exactly as it would be in one pass over
 * everything.
 */
static void xor_buffer(char *buf, size_t len, size_t pos, const char *key)
{
	size_t klen = strlen(key);
	size_t i;

	for (i = 0; i < len; i++)
		buf[i] ^= key[(pos + i) % klen];
}

/*
 * What every thread runs: take a block, encrypt it, repeat.
 *
 * Taking a block is a read of `next`, a test and a write, and the three
 * are one critical section: two threads that read the same value would
 * both encrypt that block, and XORing twice puts the clear text back.
 * The encryption itself is outside the lock, which is what lets the
 * threads work at the same time.
 */
static void *encrypt_blocks(void *arg)
{
	struct job *job = arg;
	size_t pos, len;

	for (;;) {
		pthread_mutex_lock(&job->lock);
		pos = job->next;
		if (pos < job->size)
			job->next = pos + BLOCK;
		pthread_mutex_unlock(&job->lock);

		if (pos >= job->size)
			break;

		len = job->size - pos < BLOCK ? job->size - pos : BLOCK;
		xor_buffer(job->text + pos, len, pos, job->key);
	}

	return NULL;
}

void encrypt_text(char *text, size_t size, const char *key, int nthreads)
{
	pthread_t threads[MAX_THREADS];
	struct job job;
	int i, started = 0;

	if (nthreads < 1)
		nthreads = 1;
	if (nthreads > MAX_THREADS)
		nthreads = MAX_THREADS;

	job.text = text;
	job.size = size;
	job.key = key;
	job.next = 0;
	pthread_mutex_init(&job.lock, NULL);

	for (i = 0; i < nthreads; i++) {
		if (pthread_create(&threads[started], NULL, encrypt_blocks, &job) != 0)
			break;
		started++;
	}

	/* If no thread could be started, do the work here. */
	if (started == 0)
		encrypt_blocks(&job);

	for (i = 0; i < started; i++)
		pthread_join(threads[i], NULL);

	pthread_mutex_destroy(&job.lock);
}

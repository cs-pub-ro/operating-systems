/* SPDX-License-Identifier: BSD-3-Clause */

/*
 * A repeating-key XOR cipher that encrypts a long string with several
 * threads.
 *
 * The library is libxorcipher.so, built from xorcipher.c.
 */

#ifndef XORCIPHER_H_
#define XORCIPHER_H_	1

#include <stddef.h>

#define MAX_THREADS	64

/*
 * Encrypt, in place, the `size` characters at `text`: character i is XORed
 * with byte i % strlen(key) of the key.  The work is done by `nthreads`
 * threads, which the function starts and waits for.  Doing it twice gives
 * the original characters back.
 */
void encrypt_text(char *text, size_t size, const char *key, int nthreads);

#endif

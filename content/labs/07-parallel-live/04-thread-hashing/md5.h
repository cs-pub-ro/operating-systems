/* SPDX-License-Identifier: BSD-3-Clause */

/*
 * The MD5 message digest, as specified in RFC 1321: the function that the
 * `md5sum` utility computes.  MD5 is no longer safe for anything that has to
 * resist an attacker; it is used here because it is small and well known.
 */

#ifndef MD5_H
#define MD5_H

#include <stddef.h>
#include <stdint.h>

#define MD5_DIGEST_LEN	16			/* bytes in a digest         */
#define MD5_HEX_LEN	(2 * MD5_DIGEST_LEN + 1)	/* as hex digits, and a NUL  */

/* The state of one computation; each computation needs its own. */
struct md5_ctx {
	uint32_t state[4];	/* the digest so far                       */
	uint64_t len;		/* bytes hashed so far                     */
	unsigned char buf[64];	/* bytes waiting for a full 64-byte block  */
	size_t buflen;		/* how many of them                        */
};

/* Start a computation. */
void md5_init(struct md5_ctx *ctx);

/* Hash `len` more bytes.  May be called any number of times. */
void md5_update(struct md5_ctx *ctx, const void *data, size_t len);

/* Finish, and store the 16 bytes of the digest. */
void md5_final(struct md5_ctx *ctx, unsigned char digest[MD5_DIGEST_LEN]);

/* Write a digest as 32 lowercase hex digits and a terminating NUL. */
void md5_to_hex(const unsigned char digest[MD5_DIGEST_LEN], char hex[MD5_HEX_LEN]);

/*
 * Hash the whole file at `path` and store its digest as hex digits, the way
 * `md5sum` prints it.  Returns 0 on success, -1 if the file cannot be read.
 */
int md5_file(const char *path, char hex[MD5_HEX_LEN]);

#endif /* MD5_H */

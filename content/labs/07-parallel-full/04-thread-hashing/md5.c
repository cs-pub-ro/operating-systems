// SPDX-License-Identifier: BSD-3-Clause

/*
 * The MD5 message digest, as specified in RFC 1321.  Nothing in this file
 * is shared between computations: everything a computation needs is in its
 * own `struct md5_ctx`, and the two tables below are only ever read.
 */

#include <stdio.h>
#include <string.h>

#include "md5.h"

#define READ_SIZE	(64 * 1024)

/* Per-round shift amounts. */
static const unsigned int shifts[64] = {
	7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
	5,  9, 14, 20, 5,  9, 14, 20, 5,  9, 14, 20, 5,  9, 14, 20,
	4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
	6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
};

/* Per-round constants: the integer part of 2^32 * abs(sin(i + 1)). */
static const uint32_t constants[64] = {
	0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
	0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
	0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
	0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
	0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
	0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
	0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
	0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
	0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
	0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
	0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
	0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
	0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
	0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
	0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
	0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
};

static uint32_t rotate_left(uint32_t x, unsigned int n)
{
	return (x << n) | (x >> (32 - n));
}

/* Mix one 64-byte block into the state. */
static void md5_block(struct md5_ctx *ctx, const unsigned char block[64])
{
	uint32_t a = ctx->state[0];
	uint32_t b = ctx->state[1];
	uint32_t c = ctx->state[2];
	uint32_t d = ctx->state[3];
	uint32_t words[16];
	uint32_t f, tmp;
	unsigned int i, g;

	/* The block as sixteen 32-bit words, least significant byte first. */
	for (i = 0; i < 16; i++)
		words[i] = (uint32_t) block[4 * i] |
			   (uint32_t) block[4 * i + 1] << 8 |
			   (uint32_t) block[4 * i + 2] << 16 |
			   (uint32_t) block[4 * i + 3] << 24;

	for (i = 0; i < 64; i++) {
		if (i < 16) {
			f = (b & c) | (~b & d);
			g = i;
		} else if (i < 32) {
			f = (d & b) | (~d & c);
			g = (5 * i + 1) % 16;
		} else if (i < 48) {
			f = b ^ c ^ d;
			g = (3 * i + 5) % 16;
		} else {
			f = c ^ (b | ~d);
			g = (7 * i) % 16;
		}

		tmp = d;
		d = c;
		c = b;
		b += rotate_left(a + f + constants[i] + words[g], shifts[i]);
		a = tmp;
	}

	ctx->state[0] += a;
	ctx->state[1] += b;
	ctx->state[2] += c;
	ctx->state[3] += d;
}

void md5_init(struct md5_ctx *ctx)
{
	ctx->state[0] = 0x67452301;
	ctx->state[1] = 0xefcdab89;
	ctx->state[2] = 0x98badcfe;
	ctx->state[3] = 0x10325476;
	ctx->len = 0;
	ctx->buflen = 0;
}

void md5_update(struct md5_ctx *ctx, const void *data, size_t len)
{
	const unsigned char *bytes = data;
	size_t room;

	ctx->len += len;

	/* Top up a partly filled block first. */
	if (ctx->buflen > 0) {
		room = sizeof(ctx->buf) - ctx->buflen;
		if (len < room) {
			memcpy(ctx->buf + ctx->buflen, bytes, len);
			ctx->buflen += len;
			return;
		}
		memcpy(ctx->buf + ctx->buflen, bytes, room);
		md5_block(ctx, ctx->buf);
		ctx->buflen = 0;
		bytes += room;
		len -= room;
	}

	/* Whole blocks straight from the input. */
	while (len >= sizeof(ctx->buf)) {
		md5_block(ctx, bytes);
		bytes += sizeof(ctx->buf);
		len -= sizeof(ctx->buf);
	}

	/* What is left waits for the next call. */
	memcpy(ctx->buf, bytes, len);
	ctx->buflen = len;
}

void md5_final(struct md5_ctx *ctx, unsigned char digest[MD5_DIGEST_LEN])
{
	static const unsigned char padding[64] = { 0x80 };
	uint64_t bits = ctx->len * 8;
	unsigned char length[8];
	size_t padlen;
	int i;

	for (i = 0; i < 8; i++)
		length[i] = bits >> (8 * i);

	/* Pad with 0x80 and zeroes up to 56 bytes into a block, then the length. */
	padlen = ctx->buflen < 56 ? 56 - ctx->buflen : 120 - ctx->buflen;
	md5_update(ctx, padding, padlen);
	md5_update(ctx, length, sizeof(length));

	for (i = 0; i < MD5_DIGEST_LEN; i++)
		digest[i] = ctx->state[i / 4] >> (8 * (i % 4));
}

void md5_to_hex(const unsigned char digest[MD5_DIGEST_LEN], char hex[MD5_HEX_LEN])
{
	static const char digits[] = "0123456789abcdef";
	int i;

	for (i = 0; i < MD5_DIGEST_LEN; i++) {
		hex[2 * i] = digits[digest[i] >> 4];
		hex[2 * i + 1] = digits[digest[i] & 0xf];
	}
	hex[2 * MD5_DIGEST_LEN] = '\0';
}

int md5_file(const char *path, char hex[MD5_HEX_LEN])
{
	unsigned char digest[MD5_DIGEST_LEN];
	unsigned char data[READ_SIZE];
	struct md5_ctx ctx;
	size_t len;
	FILE *file;
	int rc = 0;

	file = fopen(path, "rb");
	if (file == NULL) {
		perror(path);
		return -1;
	}

	md5_init(&ctx);
	while ((len = fread(data, 1, sizeof(data), file)) > 0)
		md5_update(&ctx, data, len);
	if (ferror(file)) {
		perror(path);
		rc = -1;
	}
	fclose(file);

	md5_final(&ctx, digest);
	md5_to_hex(digest, hex);

	return rc;
}

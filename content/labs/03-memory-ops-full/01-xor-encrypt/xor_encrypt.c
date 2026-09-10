/*
 * XOR-encrypt a file with a fixed 32-byte key.
 *
 * Every size in this program is known before it ever runs: the key is 32
 * bytes, and the file is processed one 32-byte block at a time.  There is
 * nothing whose size is decided at run time, so there is nothing to malloc --
 * the key and the two work buffers are plain fixed-size arrays.  This is the
 * counterpart to the heap exercises in this session: when the size is
 * predetermined, static allocation is all you need, and there is no owner to
 * track, no free to forget, and no leak to find.
 *
 * XOR is its own inverse, so this same program decrypts: run a file through it
 * once to encrypt, run the result through it again with the same key, and the
 * original comes back.  That is what `make test` checks.
 *
 * This is a teaching toy, not real cryptography -- a repeating-key XOR is
 * trivially broken.  See FURTHER.md.
 *
 * Build:  make
 * Run:    ./xor_encrypt <input> <output>
 */
#include <stdio.h>
#include <stdlib.h>

#define BLOCK_SIZE	32

/*
 * The encryption key: 32 bytes, fixed at compile time.  `static const` places
 * it in the program's read-only data, allocated once for the whole run and
 * never freed -- the simplest lifetime there is.
 */
static const unsigned char key[BLOCK_SIZE] = {
	0x9e, 0x3a, 0x7c, 0x11, 0x54, 0xd2, 0x08, 0xbf,
	0x6d, 0x21, 0xf0, 0x4a, 0x88, 0x13, 0xc7, 0x5e,
	0x2b, 0x99, 0x60, 0xa4, 0x37, 0xee, 0x1c, 0x70,
	0xd5, 0x0f, 0xb3, 0x46, 0x82, 0xca, 0x59, 0x24,
};

int main(int argc, char **argv)
{
	FILE *in, *out;
	/*
	 * The two work buffers, one block each.  Their size is a compile-time
	 * constant, so they are ordinary arrays living in this function's stack
	 * frame: no malloc, no free, nothing that can leak.
	 */
	unsigned char in_buf[BLOCK_SIZE];
	unsigned char out_buf[BLOCK_SIZE];
	size_t n;

	if (argc != 3) {
		fprintf(stderr, "usage: %s <input> <output>\n", argv[0]);
		return 1;
	}

	in = fopen(argv[1], "rb");
	if (in == NULL) {
		perror("fopen input");
		return 1;
	}

	out = fopen(argv[2], "wb");
	if (out == NULL) {
		perror("fopen output");
		fclose(in);
		return 1;
	}

	/*
	 * Read one block at a time.  The final block is usually shorter than
	 * BLOCK_SIZE; fread reports how many bytes it actually read, and we
	 * encrypt and write exactly that many -- reading, encrypting and
	 * writing past the real data would corrupt the output (and, for the
	 * buffers, read uninitialised bytes).
	 */
	while ((n = fread(in_buf, 1, BLOCK_SIZE, in)) > 0) {
		size_t i;

		for (i = 0; i < n; i++)
			out_buf[i] = in_buf[i] ^ key[i];

		if (fwrite(out_buf, 1, n, out) != n) {
			perror("fwrite");
			fclose(in);
			fclose(out);
			return 1;
		}
	}

	fclose(in);
	fclose(out);

	return 0;
}

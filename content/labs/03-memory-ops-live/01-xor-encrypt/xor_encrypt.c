/*
 * XOR-encrypt a file with a fixed 32-byte key.
 *
 * Every size here is known before the program runs: the key is 32 bytes, and
 * the file is processed one 32-byte block at a time.  Nothing is sized at run
 * time, so nothing needs malloc -- the key and the two work buffers are plain
 * fixed-size arrays.  Fill in the two TODOs.
 *
 * XOR is its own inverse, so this same program also decrypts: encrypt a file,
 * encrypt the result again with the same key, and the original comes back.
 *
 * Build:  make
 * Run:    ./xor_encrypt <input> <output>
 */
#include <stdio.h>
#include <stdlib.h>

#define BLOCK_SIZE	32

/*
 * The encryption key: 32 bytes, fixed at compile time.  `static const` places
 * it in read-only data, allocated once for the whole run and never freed.
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
	size_t n;

	/*
	 * TODO 1: declare the two work buffers, in_buf and out_buf, one block
	 * of `unsigned char` each.
	 *
	 * Before choosing how to allocate them, ask what is known about their
	 * size, and when it is known.
	 */

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
	 * Read one block at a time.  fread returns how many bytes it actually
	 * read; the last block is usually shorter than BLOCK_SIZE.
	 */
	while ((n = fread(in_buf, 1, BLOCK_SIZE, in)) > 0) {
		size_t i;

		/*
		 * TODO 2: encrypt the bytes just read, from in_buf into out_buf,
		 * with the key.
		 *
		 * Not every block is a full one.
		 */

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

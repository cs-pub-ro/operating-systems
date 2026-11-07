// SPDX-License-Identifier: BSD-3-Clause

/*
 * Write a large text file to search in: lines of words picked from a small
 * vocabulary by a fixed pseudo-random sequence, so that every run produces
 * the same file.  The word "kernel" is also planted so that it straddles the
 * points where a split into 2, 4 or 8 equal parts falls.
 *
 *     ./gen_text big.txt 64        # a 64 MiB file
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MIB		(1024 * 1024)
#define WORDS_PER_LINE	12

static const char * const words[] = {
	"the", "kernel", "schedules", "a", "thread", "process", "memory",
	"page", "stack", "heap", "fork", "exec", "wait", "signal", "file",
	"system", "call", "user", "mode", "address",
};

#define NWORDS		(sizeof(words) / sizeof(words[0]))

/* A small linear congruential generator, the same on every machine. */
static unsigned int next_random(void)
{
	static unsigned int state = 12345;

	state = state * 1103515245 + 12345;

	return (state >> 16) & 0x7fff;
}

int main(int argc, char *argv[])
{
	const char *path;
	size_t size, pos, len;
	int count, parts, k;
	char *buf;
	FILE *out;

	if (argc != 3) {
		fprintf(stderr, "Usage: %s <file> <size-in-MiB>\n", argv[0]);
		return 1;
	}

	path = argv[1];
	size = (size_t) atoi(argv[2]) * MIB;
	if (size == 0) {
		fprintf(stderr, "size must be at least 1 MiB\n");
		return 1;
	}

	buf = malloc(size);
	if (buf == NULL) {
		perror("malloc");
		return 1;
	}

	/* Fill the buffer with words, a space after each, a newline now and then. */
	pos = 0;
	count = 0;
	while (pos < size) {
		const char *word = words[next_random() % NWORDS];

		len = strlen(word);
		if (pos + len + 1 > size)
			break;
		memcpy(buf + pos, word, len);
		pos += len;
		buf[pos++] = (++count % WORDS_PER_LINE == 0) ? '\n' : ' ';
	}
	memset(buf + pos, ' ', size - pos);
	buf[size - 1] = '\n';

	/*
	 * Plant "kernel" across the boundaries of a 2-, 4- and 8-way split:
	 * three characters before the boundary, three after.
	 */
	for (parts = 2; parts <= 8; parts *= 2)
		for (k = 1; k < parts; k++)
			memcpy(buf + (size / parts) * k - 3, "kernel", 6);

	out = fopen(path, "wb");
	if (out == NULL) {
		perror(path);
		free(buf);
		return 1;
	}
	if (fwrite(buf, 1, size, out) != size) {
		perror("fwrite");
		fclose(out);
		free(buf);
		return 1;
	}
	fclose(out);
	free(buf);

	printf("wrote %zu bytes to %s\n", size, path);

	return 0;
}

/*
 * Shout: print every line of the input in upper case, numbered.
 *
 * Fixed version. The bug was in main(): the upper-case copy of every line
 * was allocated and never freed. See the FIX comment below.
 *
 * Build:  make
 * Run:    ./shout < input.txt
 */
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LINE_LEN	256

/*
 * Return an upper-case copy of s.
 *
 * The copy is allocated on the heap, because the caller keeps reusing its
 * own line buffer. Whoever calls this function owns the copy.
 */
static char *upper_copy(const char *s)
{
	size_t len = strlen(s);
	char *copy = malloc(len + 1);
	size_t i;

	if (copy == NULL)
		return NULL;

	for (i = 0; i < len; i++)
		copy[i] = toupper((unsigned char)s[i]);
	copy[len] = '\0';

	return copy;
}

int main(void)
{
	char line[LINE_LEN];
	unsigned int lineno = 0;

	while (fgets(line, sizeof(line), stdin) != NULL) {
		char *shout = upper_copy(line);

		if (shout == NULL) {
			fprintf(stderr, "out of memory\n");
			return 1;
		}

		lineno++;
		printf("%3u: %s", lineno, shout);

		/*
		 * FIX: main() owns the copy, so main() frees it, once it is
		 * done with it. Without this line the pointer is overwritten
		 * by the next iteration and the block can never be freed.
		 */
		free(shout);
	}

	return 0;
}

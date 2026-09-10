/*
 * Longest word.
 *
 * Reads whitespace-separated words from standard input and reports how many
 * words were read and which one was the longest.
 *
 * The output is correct. The memory behaviour is not.
 *
 * Build:  make
 * Run:    ./longest < input.txt
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define WORD_LEN	64

/*
 * Bookkeeping for the scan.
 *
 *   longest -- heap copy of the longest word seen so far (NULL at the start)
 *   length  -- its length
 *   words   -- how many words we have looked at
 */
struct tracker {
	char *longest;
	size_t length;
	size_t words;
};

static void tracker_init(struct tracker *t)
{
	t->longest = NULL;
	t->length = 0;
	t->words = 0;
}

/*
 * Look at one more word and keep it if it is the longest one so far.
 *
 * The word lives in a buffer that main() reuses for the next word, so we
 * cannot just remember the pointer: we have to keep our own copy of the
 * string. strdup() allocates that copy on the heap for us.
 */
static void tracker_offer(struct tracker *t, const char *word)
{
	size_t len = strlen(word);

	t->words++;

	if (t->longest != NULL && len <= t->length)
		return;

	t->longest = strdup(word);
	t->length = len;
}

static void tracker_report(const struct tracker *t)
{
	printf("read %zu words\n", t->words);

	if (t->longest == NULL)
		printf("no words at all\n");
	else
		printf("longest word: %s (%zu characters)\n",
		       t->longest, t->length);
}

int main(void)
{
	struct tracker t;
	char word[WORD_LEN];

	tracker_init(&t);

	while (scanf("%63s", word) == 1)
		tracker_offer(&t, word);

	tracker_report(&t);

	free(t.longest);

	return 0;
}

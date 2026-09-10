/*
 * Longest word -- fixed version.
 *
 * The bug was in tracker_offer(): every new "longest word so far" overwrote
 * t->longest with a fresh strdup() without releasing the previous copy, so
 * every intermediate winner was leaked. See the FIX comment below.
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
	char *copy;

	t->words++;

	if (t->longest != NULL && len <= t->length)
		return;

	copy = strdup(word);
	if (copy == NULL)
		return;		/* out of memory: keep the previous winner */

	/*
	 * FIX: the struct owns the string it points to. Overwriting the
	 * pointer with a new allocation drops the only reference to the old
	 * block, so it can never be freed again -- that is the leak. Release
	 * the previous copy first, then take ownership of the new one.
	 */
	free(t->longest);
	t->longest = copy;
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

	/* The last winner is still owned by the tracker; free it too. */
	free(t.longest);

	return 0;
}

/*
 * Grade histogram.
 *
 * Reads grades (integers between 0 and 100) from standard input and prints
 * how many of them fall into each ten-point bucket.
 *
 * Build:  make
 * Run:    ./histogram < input.txt
 */
#include <stdio.h>
#include <stdlib.h>

/* Buckets: 0-9, 10-19, ..., 80-89, 90-100. */
#define NBUCKETS	10

struct stats {
	int counts[NBUCKETS];	/* how many grades landed in each bucket */
	int total;		/* how many grades we processed in total  */
};

/* Count one grade into the bucket it belongs to. */
static void record_grade(struct stats *st, int grade)
{
	int bucket = grade / 10;

	st->total++;
	st->counts[bucket]++;
}

/* Print one row per bucket, plus a summary line. */
static void print_stats(const struct stats *st)
{
	for (int i = 0; i < NBUCKETS; i++) {
		int low = i * 10;
		int high = (i == NBUCKETS - 1) ? 100 : low + 9;

		printf("%3d - %3d | ", low, high);
		for (int j = 0; j < st->counts[i]; j++)
			putchar('#');
		printf(" %d\n", st->counts[i]);
	}

	printf("processed %d grades\n", st->total);
}

int main(void)
{
	struct stats *st;
	int grade;

	/* calloc() gives us a zeroed structure: all counts start at 0. */
	st = calloc(1, sizeof(*st));
	if (st == NULL) {
		fprintf(stderr, "out of memory\n");
		return 1;
	}

	while (scanf("%d", &grade) == 1) {
		/* Ignore anything that is not a valid grade. */
		if (grade < 0 || grade > 100) {
			fprintf(stderr, "ignoring out-of-range grade %d\n", grade);
			continue;
		}

		record_grade(st, grade);
	}

	print_stats(st);
	free(st);

	return 0;
}

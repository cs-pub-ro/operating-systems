// SPDX-License-Identifier: BSD-3-Clause

/*
 * A pool of eight worker threads, through libpool.so, used to add up the
 * numbers in a range.  The task for a large range does not add anything:
 * it cuts the range in two and submits a task for each half.  Only the
 * small ranges are added up.  So tasks submit tasks, and the work is over
 * only when the last small range is done.
 *
 * The pool is used for several rounds, and pool_wait() is called after
 * each: when it returns, the sum has to be complete.  If it was, every
 * time, and the pool could be destroyed at the end, the flag is printed.
 *
 *     ./chall [timeout]
 *
 * The timeout is in seconds, 10 if not given, and 0 means no timeout.
 */

#include <signal.h>
#include <stdatomic.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#include "pool.h"
#include "flag.h"

#define NUM_WORKERS	8
#define NUM_ROUNDS	10
#define ROUND_SIZE	4000000L	/* round r adds up 0 ... r * ROUND_SIZE - 1 */
#define LEAF_SIZE	100000		/* a range this small is added up, not cut  */
#define TIMEOUT		10

struct range {
	long lo;	/* first number of the range          */
	long hi;	/* one past the last number           */
};

static struct pool *pool;
static atomic_llong total;	/* the sum so far, this round          */
static atomic_long tasks;	/* tasks run so far, all rounds        */

/* The threads did not finish in time: say so, and give up. */
static void on_alarm(int sig)
{
	static const char msg[] =
		"Timed out: a thread is waiting for something that never comes.\n";
	ssize_t rc;

	(void)sig;
	rc = write(STDERR_FILENO, msg, sizeof(msg) - 1);
	(void)rc;
	_exit(2);
}

static void submit_range(long lo, long hi);

/* The task: add up a small range, or cut a large one in two. */
static void sum_range(void *arg)
{
	struct range *range = arg;
	long long sum = 0;
	long mid, i;

	atomic_fetch_add(&tasks, 1);

	if (range->hi - range->lo <= LEAF_SIZE) {
		for (i = range->lo; i < range->hi; i++)
			sum += i;
		atomic_fetch_add(&total, sum);
	} else {
		mid = range->lo + (range->hi - range->lo) / 2;
		submit_range(range->lo, mid);
		submit_range(mid, range->hi);
	}

	free(range);
}

static void submit_range(long lo, long hi)
{
	struct range *range;

	range = malloc(sizeof(*range));
	if (range == NULL) {
		perror("malloc");
		exit(1);
	}
	range->lo = lo;
	range->hi = hi;

	pool_submit(pool, sum_range, range);
}

int main(int argc, char *argv[])
{
	long long sum, expected, grand_total = 0;
	uint64_t proof[2];
	int round, wrong = 0;
	long n;

	signal(SIGALRM, on_alarm);
	alarm(argc > 1 ? atoi(argv[1]) : TIMEOUT);

	pool = pool_create(NUM_WORKERS);
	if (pool == NULL) {
		fprintf(stderr, "pool_create() failed\n");
		return 1;
	}

	for (round = 1; round <= NUM_ROUNDS; round++) {
		n = round * ROUND_SIZE;
		expected = (long long)n * (n - 1) / 2;

		atomic_store(&total, 0);
		submit_range(0, n);
		pool_wait(pool);

		sum = atomic_load(&total);
		if (sum != expected) {
			wrong++;
			if (wrong <= 3)
				printf("round %d: pool_wait() returned with the sum at %lld of %lld\n",
				       round, sum, expected);
		}
		grand_total += sum;
	}

	pool_destroy(pool);

	printf("rounds with the complete sum: %d (expected %d)\n",
	       NUM_ROUNDS - wrong, NUM_ROUNDS);
	printf("tasks run:                    %ld\n", atomic_load(&tasks));

	if (wrong != 0) {
		printf("No flag: pool_wait() returned before the work was over.\n");
		return 1;
	}

	proof[0] = grand_total;
	proof[1] = atomic_load(&tasks);

	return flag_print(proof, 2);
}

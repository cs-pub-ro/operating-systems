// SPDX-License-Identifier: BSD-3-Clause

/*
 * A boss with eight workers, through libboss.so.  The work is a list of
 * numbered items, and doing an item means, here, noting that it was done.
 * Every item has to be done exactly once, and boss_run() has to return.
 * If that is what happened, in every round, the flag is printed.
 *
 *     ./chall [timeout]
 *
 * The timeout is in seconds, 10 if not given, and 0 means no timeout.
 */

#include <signal.h>
#include <stdarg.h>
#include <stdatomic.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#include "boss.h"
#include "flag.h"

#define NUM_WORKERS	8
#define NUM_ITEMS	2000	/* per round */
#define NUM_ROUNDS	20
#define TIMEOUT		10
#define MAX_COMPLAINTS	5

static atomic_int done[NUM_ITEMS];	/* times every item was done, this round */
static atomic_long errors;

/* Count something that went wrong, and print the first few. */
static void complain(const char *fmt, ...)
{
	va_list args;

	if (atomic_fetch_add(&errors, 1) >= MAX_COMPLAINTS)
		return;

	va_start(args, fmt);
	vfprintf(stderr, fmt, args);
	va_end(args);
}

/* The threads did not finish in time: say so, and give up. */
static void on_alarm(int sig)
{
	static const char msg[] =
		"Timed out: boss_run() did not return; somebody is asleep and nobody will wake them.\n";
	ssize_t rc;

	(void)sig;
	rc = write(STDERR_FILENO, msg, sizeof(msg) - 1);
	(void)rc;
	_exit(2);
}

static void work(int item)
{
	if (item < 0 || item >= NUM_ITEMS)
		complain("a worker was given item %d, which does not exist\n", item);
	else
		atomic_fetch_add(&done[item], 1);
}

int main(int argc, char *argv[])
{
	long once = 0, n;
	uint64_t proof[2];
	int round, i;

	signal(SIGALRM, on_alarm);
	alarm(argc > 1 ? atoi(argv[1]) : TIMEOUT);

	for (round = 1; round <= NUM_ROUNDS; round++) {
		for (i = 0; i < NUM_ITEMS; i++)
			atomic_store(&done[i], 0);

		boss_run(work, NUM_ITEMS, NUM_WORKERS);

		for (i = 0; i < NUM_ITEMS; i++) {
			n = atomic_load(&done[i]);
			if (n == 1)
				once++;
			else
				complain("round %d: item %d was done %ld times\n",
					 round, i, n);
		}
	}

	printf("rounds:                 %d, of %d items each\n", NUM_ROUNDS,
	       NUM_ITEMS);
	printf("items done once:        %ld (expected %d)\n", once,
	       NUM_ROUNDS * NUM_ITEMS);
	printf("things that went wrong: %ld\n", atomic_load(&errors));

	if (atomic_load(&errors) != 0) {
		printf("No flag: the work was not done once each.\n");
		return 1;
	}

	proof[0] = NUM_ROUNDS;
	proof[1] = once;

	return flag_print(proof, 2);
}

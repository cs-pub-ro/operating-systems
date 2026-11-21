// SPDX-License-Identifier: BSD-3-Clause

/*
 * Eight threads move money between four accounts, through libbank.so.  The
 * accounts are in a ring: half of the threads send money one way around
 * it, and the other half the other way.  Every transfer is known in
 * advance, so the balances at the end are too, whatever order the threads
 * run in.  If the balances are the expected ones, the flag is printed.
 *
 *     ./chall [timeout]
 *
 * The timeout is in seconds, 10 if not given, and 0 means no timeout:
 * useful when you want to look at a stuck program with ps or GDB.
 */

#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <pthread.h>

#include "bank.h"
#include "flag.h"

#define NUM_THREADS	8
#define NUM_ACCOUNTS	4
#define NUM_TRANSFERS	100000	/* per thread */
#define START_BALANCE	1000000
#define TIMEOUT		10

static struct account *accounts[NUM_ACCOUNTS];

/* The threads did not finish in time: say so, and give up. */
static void on_alarm(int sig)
{
	static const char msg[] =
		"Timed out: the threads are stuck, each waiting for something another one holds.\n";
	ssize_t rc;

	(void)sig;
	rc = write(STDERR_FILENO, msg, sizeof(msg) - 1);
	(void)rc;
	_exit(2);
}

/*
 * Transfer number `i` of thread `id`: which account the money leaves, which
 * one it reaches, and how much.  Threads with an even id send the money to
 * the next account of the ring, threads with an odd id to the one before.
 */
static void pick_transfer(int id, int i, int *from, int *to, long *amount)
{
	int a = (id + i % 7) % NUM_ACCOUNTS;
	int b = (a + 1) % NUM_ACCOUNTS;

	*from = id % 2 == 0 ? a : b;
	*to = id % 2 == 0 ? b : a;
	*amount = id + 1;
}

static void *make_transfers(void *arg)
{
	int id = (int)(size_t)arg;
	int i, from, to;
	long amount;

	for (i = 0; i < NUM_TRANSFERS; i++) {
		pick_transfer(id, i, &from, &to, &amount);
		bank_transfer(accounts[from], accounts[to], amount);
	}

	return NULL;
}

int main(int argc, char *argv[])
{
	long expected[NUM_ACCOUNTS], balance, amount, total = 0;
	pthread_t threads[NUM_THREADS];
	uint64_t proof[NUM_ACCOUNTS];
	int i, j, from, to, rc, wrong = 0;

	signal(SIGALRM, on_alarm);
	alarm(argc > 1 ? atoi(argv[1]) : TIMEOUT);

	/* The balances the transfers lead to, worked out with no threads. */
	for (i = 0; i < NUM_ACCOUNTS; i++)
		expected[i] = START_BALANCE;
	for (i = 0; i < NUM_THREADS; i++) {
		for (j = 0; j < NUM_TRANSFERS; j++) {
			pick_transfer(i, j, &from, &to, &amount);
			expected[from] -= amount;
			expected[to] += amount;
		}
	}

	for (i = 0; i < NUM_ACCOUNTS; i++) {
		accounts[i] = account_create(START_BALANCE);
		if (accounts[i] == NULL) {
			fprintf(stderr, "account_create() failed\n");
			return 1;
		}
	}

	printf("%d threads, %d transfers each, between %d accounts\n", NUM_THREADS,
	       NUM_TRANSFERS, NUM_ACCOUNTS);

	for (i = 0; i < NUM_THREADS; i++) {
		rc = pthread_create(&threads[i], NULL, make_transfers,
				    (void *)(size_t)i);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	for (i = 0; i < NUM_THREADS; i++)
		pthread_join(threads[i], NULL);

	for (i = 0; i < NUM_ACCOUNTS; i++) {
		balance = account_balance(accounts[i]);
		printf("account %d: %ld (expected %ld)\n", i, balance, expected[i]);
		if (balance != expected[i])
			wrong++;
		total += balance;
		proof[i] = balance;
		account_destroy(accounts[i]);
	}
	printf("total:     %ld (expected %ld)\n", total,
	       (long)NUM_ACCOUNTS * START_BALANCE);

	if (wrong != 0) {
		printf("No flag: money was lost, or made.\n");
		return 1;
	}

	return flag_print(proof, NUM_ACCOUNTS);
}

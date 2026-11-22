// SPDX-License-Identifier: BSD-3-Clause

/*
 * Five threads, each printing its own number, in a loop.  Before it prints,
 * a thread calls turn_take(), and after it, turn_pass(); both are in
 * libturns.so.  The messages have to come out as 1 2 3 4 5, 1 2 3 4 5, ...
 * for as long as the threads run.  If they did, the flag is printed.
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
#include <string.h>
#include <unistd.h>
#include <pthread.h>

#include "turns.h"
#include "flag.h"

#define NUM_THREADS	5
#define NUM_ROUNDS	2000
#define NUM_MESSAGES	(NUM_THREADS * NUM_ROUNDS)
#define SHOWN_ROUNDS	4	/* rounds printed on the screen */
#define TIMEOUT		10
#define MAX_COMPLAINTS	5

static int sequence[NUM_MESSAGES];	/* the id behind every message, in order */
static long count;			/* messages so far                        */
static atomic_int printing;		/* is a thread in print_message() now?    */
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
		"\nTimed out: a thread is waiting for a turn that never comes.\n";

	write(STDERR_FILENO, msg, sizeof(msg) - 1);
	_exit(2);
}

/*
 * The message of thread `id` is its number, id + 1.  Only the first rounds
 * are shown; all of them are recorded.
 */
void print_message(int id)
{
	if (atomic_exchange(&printing, 1))
		complain("thread %d printed while another thread was printing\n",
			 id + 1);

	if (count < NUM_MESSAGES)
		sequence[count] = id;
	if (count < SHOWN_ROUNDS * NUM_THREADS) {
		printf("%d%s", id + 1, id == NUM_THREADS - 1 ? "\n" : " ");
		fflush(stdout);
	}
	count++;

	atomic_store(&printing, 0);
}

static void *take_turns(void *arg)
{
	int id = (int)(size_t)arg;
	int i;

	for (i = 0; i < NUM_ROUNDS; i++) {
		turn_take(id);
		print_message(id);
		turn_pass(id);
	}

	return NULL;
}

int main(int argc, char *argv[])
{
	pthread_t threads[NUM_THREADS];
	uint64_t proof[2] = { 0, 0 };
	long in_order = 0;
	size_t i;
	int rc;

	signal(SIGALRM, on_alarm);
	alarm(argc > 1 ? atoi(argv[1]) : TIMEOUT);

	turns_init(NUM_THREADS);

	for (i = 0; i < NUM_THREADS; i++) {
		rc = pthread_create(&threads[i], NULL, take_turns, (void *)i);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	for (i = 0; i < NUM_THREADS; i++)
		pthread_join(threads[i], NULL);

	/* Message number i has to be the one of thread i % NUM_THREADS. */
	for (i = 0; i < NUM_MESSAGES; i++) {
		if (sequence[i] == (int)(i % NUM_THREADS))
			in_order++;
		else
			complain("message %zu came from thread %d, and thread %zu was due\n",
				 i + 1, sequence[i] + 1, i % NUM_THREADS + 1);
		proof[1] += (uint64_t)sequence[i] * (i + 1);
	}

	printf("...\n");
	printf("messages printed:  %ld (expected %d)\n", count, NUM_MESSAGES);
	printf("messages in order: %ld (expected %d)\n", in_order, NUM_MESSAGES);

	if (atomic_load(&errors) != 0 || count != NUM_MESSAGES) {
		printf("No flag: the threads did not take turns.\n");
		return 1;
	}

	proof[0] = count;

	return flag_print(proof, 2);
}

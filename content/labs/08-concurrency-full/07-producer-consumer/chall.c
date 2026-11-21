// SPDX-License-Identifier: BSD-3-Clause

/*
 * Four producers and four consumers share one small queue, through
 * libqueue.so.  Every producer puts in items that no other producer makes,
 * and the consumers take out as many items as were put in.  Every item has
 * to come out exactly once.  If it did, the flag is printed.
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

#include "queue.h"
#include "flag.h"

#define NUM_PRODUCERS	4
#define NUM_CONSUMERS	4
#define ITEMS		20000	/* per producer, and per consumer */
#define NUM_ITEMS	(NUM_PRODUCERS * ITEMS)
#define CAPACITY	2
#define TIMEOUT		10
#define MAX_COMPLAINTS	5

static struct queue *queue;
static atomic_int taken[NUM_ITEMS + 1];	/* times every item came out      */
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
		"Timed out: threads are asleep, waiting for a wake-up that never comes.\n";
	ssize_t rc;

	(void)sig;
	rc = write(STDERR_FILENO, msg, sizeof(msg) - 1);
	(void)rc;
	_exit(2);
}

/* Producer `id` makes the items id * ITEMS + 1 ... id * ITEMS + ITEMS. */
static void *produce(void *arg)
{
	long id = (long)arg;
	long i;

	for (i = 1; i <= ITEMS; i++)
		queue_put(queue, id * ITEMS + i);

	return NULL;
}

static void *consume(void *arg)
{
	long i, item;

	(void)arg;
	for (i = 0; i < ITEMS; i++) {
		item = queue_get(queue);
		if (item < 1 || item > NUM_ITEMS)
			complain("an item came out that nobody put in: %ld\n", item);
		else
			atomic_fetch_add(&taken[item], 1);
	}

	return NULL;
}

int main(int argc, char *argv[])
{
	pthread_t producers[NUM_PRODUCERS], consumers[NUM_CONSUMERS];
	long i, once = 0, n;
	uint64_t proof[2] = { 0, 0 };
	int rc;

	signal(SIGALRM, on_alarm);
	alarm(argc > 1 ? atoi(argv[1]) : TIMEOUT);

	queue = queue_create(CAPACITY);
	if (queue == NULL) {
		fprintf(stderr, "queue_create() failed\n");
		return 1;
	}

	for (i = 0; i < NUM_CONSUMERS; i++) {
		rc = pthread_create(&consumers[i], NULL, consume, NULL);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}
	for (i = 0; i < NUM_PRODUCERS; i++) {
		rc = pthread_create(&producers[i], NULL, produce, (void *)i);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	for (i = 0; i < NUM_PRODUCERS; i++)
		pthread_join(producers[i], NULL);
	for (i = 0; i < NUM_CONSUMERS; i++)
		pthread_join(consumers[i], NULL);

	for (i = 1; i <= NUM_ITEMS; i++) {
		n = atomic_load(&taken[i]);
		if (n == 1) {
			once++;
			proof[1] += i;
		} else {
			complain("item %ld came out %ld times\n", i, n);
		}
	}

	printf("items put in:                 %d\n", NUM_ITEMS);
	printf("items that came out once:     %ld (expected %d)\n", once, NUM_ITEMS);
	printf("things that went wrong:       %ld\n", atomic_load(&errors));

	queue_destroy(queue);

	if (atomic_load(&errors) != 0) {
		printf("No flag: what came out of the queue is not what went in.\n");
		return 1;
	}

	proof[0] = once;

	return flag_print(proof, 2);
}

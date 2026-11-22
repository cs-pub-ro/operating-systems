// SPDX-License-Identifier: BSD-3-Clause

/*
 * Three threads, each printing one number: thread 1 prints 1, thread 2
 * prints 2, thread 3 prints 3.  They take turns, so that the output is
 * always 1 2 3, 1 2 3, ... whatever order the scheduler runs them in.
 *
 * A shared variable says whose turn it is.  A mutex protects it, and a
 * condition variable is where a thread waits until the turn is its own.
 *
 *     ./ordered [rounds]
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>

#define NUM_THREADS	3
#define NUM_ROUNDS	5

static int rounds = NUM_ROUNDS;

static int turn;	/* the thread that prints next; protected by `lock` */
static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t turn_changed = PTHREAD_COND_INITIALIZER;

static void *print_number(void *arg)
{
	int id = (int)(size_t)arg;
	int i;

	for (i = 0; i < rounds; i++) {
		pthread_mutex_lock(&lock);

		/*
		 * Wait for the turn.  pthread_cond_wait() releases the lock
		 * while the thread sleeps and takes it again before it
		 * returns.  The test is in a loop because being woken up
		 * means "the turn changed", not "the turn is mine".
		 */
		while (turn != id)
			pthread_cond_wait(&turn_changed, &lock);

		printf("%d%s", id + 1, id == NUM_THREADS - 1 ? "\n" : " ");

		/*
		 * Pass the turn on, and wake up every waiting thread: two of
		 * them are asleep, and only one of the two is the next.
		 */
		turn = (turn + 1) % NUM_THREADS;
		pthread_cond_broadcast(&turn_changed);

		pthread_mutex_unlock(&lock);
	}

	return NULL;
}

int main(int argc, char *argv[])
{
	pthread_t threads[NUM_THREADS];
	size_t i;
	int rc;

	if (argc > 1)
		rounds = atoi(argv[1]);

	for (i = 0; i < NUM_THREADS; i++) {
		rc = pthread_create(&threads[i], NULL, print_number, (void *)i);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	for (i = 0; i < NUM_THREADS; i++)
		pthread_join(threads[i], NULL);

	return 0;
}

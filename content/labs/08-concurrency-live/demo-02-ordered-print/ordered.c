// SPDX-License-Identifier: BSD-3-Clause

/*
 * Three threads, each printing one number: thread 1 prints 1, thread 2
 * prints 2, thread 3 prints 3.  The output should always be 1 2 3, 1 2 3,
 * ... whatever order the scheduler runs the threads in.  For now nothing
 * makes them take turns.
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

/*
 * TODO 1: declare what the threads share: a variable that says whose turn
 * it is, a mutex that protects it, and a condition variable to wait on.
 */

static void *print_number(void *arg)
{
	int id = (int)(size_t)arg;
	int i;

	for (i = 0; i < rounds; i++) {
		/*
		 * TODO 2: wait until it is this thread's turn.  Decide between
		 * `if` and `while` around pthread_cond_wait().
		 */

		printf("%d%s", id + 1, id == NUM_THREADS - 1 ? "\n" : " ");

		/*
		 * TODO 3: pass the turn to the next thread, and wake up the
		 * threads that are waiting.  Decide between
		 * pthread_cond_signal() and pthread_cond_broadcast().
		 */
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

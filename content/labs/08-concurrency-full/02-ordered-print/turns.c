// SPDX-License-Identifier: BSD-3-Clause

/*
 * Turns: a number of threads, each with an id from 0 up, that do something
 * one after another, in the order of their ids, again and again.
 *
 * A shared variable says whose turn it is.  A mutex protects it, and a
 * condition variable is where a thread waits until the turn is its own.
 */

#include <pthread.h>

#include "turns.h"

static int num_threads;
static int turn;	/* the id that goes next; protected by `lock` */
static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t turn_changed = PTHREAD_COND_INITIALIZER;

void turns_init(int count)
{
	num_threads = count;
	turn = 0;
}

/*
 * Wait for the turn.
 * The lock is held at the end of the function, to be released by turn_pass().
 */
void turn_take(int id)
{
	pthread_mutex_lock(&lock);
	while (turn != id)
		pthread_cond_wait(&turn_changed, &lock);
}

/*
 * Pass the turn on.
 * Assume lock is held from previous call of turn_take.
 * Every waiting thread is woken up, because the one condition variable has all
 * of them on it and only one is the next; the others test `turn`, find it is
 * not theirs, and go back to sleep.
 */
void turn_pass(int id)
{
	turn = (id + 1) % num_threads;
	pthread_cond_broadcast(&turn_changed);
	pthread_mutex_unlock(&lock);
}

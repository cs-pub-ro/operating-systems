// SPDX-License-Identifier: BSD-3-Clause

/*
 * Turns: a number of threads, each with an id from 0 up, that do something
 * one after another, in the order of their ids, again and again.
 *
 * For now nobody waits for anybody.
 */

#include <pthread.h>

#include "turns.h"

static int num_threads;

/*
 * TODO 1: Declare what the threads share: whose turn it is, a mutex, and
 * a condition variable.
 */

void turns_init(int count)
{
	num_threads = count;

	/* TODO 1: the first turn is thread 0's. */
}

/*
 * TODO 2: Return only when it is the turn of thread `id`.
 * Think what to do with the mutex and the condition variable.
 */
void turn_take(int id)
{
	/* ... */
}

/*
 * TODO 3: Give the turn to the thread after `id`, and make sure that thread
 * finds out.
 * Think what to do with the mutex and the condition variable.
 */
void turn_pass(int id)
{
	/* ... */
}

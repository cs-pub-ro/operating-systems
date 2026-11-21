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
 * TODO 1: declare what the threads share: whose turn it is, a mutex, and
 * one or more condition variables.
 */

void turns_init(int count)
{
	num_threads = count;

	/* TODO 1: the first turn is thread 0's. */
}

/*
 * TODO 2: return only when it is the turn of thread `id`.
 */
void turn_take(int id)
{
	(void)id;
}

/*
 * TODO 3: give the turn to the thread after `id`, and make sure that thread
 * finds out.
 */
void turn_pass(int id)
{
	(void)id;
}

/* SPDX-License-Identifier: BSD-3-Clause */

/*
 * Turns: a number of threads, each with an id from 0 up, that do something
 * one after another, in the order of their ids, again and again.
 */

#ifndef TURNS_H_
#define TURNS_H_	1

/*
 * Implemented by the executable (chall): print the message of thread `id`.
 * NOT safe to call from two threads at the same time, and it notices when
 * that happens.
 */
void print_message(int id);

/*
 * The library: libturns.so, built from turns.c.  Every thread of the
 * executable runs, in a loop:
 *
 *     turn_take(id);
 *     print_message(id);
 *     turn_pass(id);
 */

/* Called once, before the threads start: `count` threads, ids 0 to count - 1. */
void turns_init(int count);

/* Return when it is the turn of thread `id`.  The first turn is thread 0's. */
void turn_take(int id);

/* Thread `id` is done: the turn goes to the next thread, and after the last to 0. */
void turn_pass(int id);

#endif

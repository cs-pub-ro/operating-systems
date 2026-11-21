/* SPDX-License-Identifier: BSD-3-Clause */

/*
 * A boss and its workers: the boss hands out items of work one at a time,
 * and a number of worker threads do them.
 *
 * The library is libboss.so, built from boss.c.
 */

#ifndef BOSS_H_
#define BOSS_H_		1

#define MAX_WORKERS	64

/*
 * Do the items 0, 1, ..., nitems - 1: call work(item) once for every one
 * of them, from `nworkers` worker threads.  The calling thread is the boss:
 * it starts the workers, hands the items out, and returns when every item
 * is done and every worker has ended.
 */
void boss_run(void (*work)(int item), int nitems, int nworkers);

#endif

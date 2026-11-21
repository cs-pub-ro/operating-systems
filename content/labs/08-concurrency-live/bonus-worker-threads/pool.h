/* SPDX-License-Identifier: BSD-3-Clause */

/*
 * A pool of worker threads: the threads are started once, and then run
 * whatever tasks they are given, for as long as the pool lives.
 *
 * The library is libpool.so, built from pool.c.  `struct pool` is defined
 * there: the executable only ever holds a pointer to one.
 */

#ifndef POOL_H_
#define POOL_H_		1

struct pool;

/* Start `nworkers` worker threads.  Returns NULL if that was not possible. */
struct pool *pool_create(int nworkers);

/*
 * Add a task: some worker will call fn(arg), once.  May be called from any
 * thread, including from inside a task that a worker is running.
 */
void pool_submit(struct pool *pool, void (*fn)(void *arg), void *arg);

/*
 * Return when every task submitted so far has finished, including the
 * tasks that those tasks submitted.  The pool can be given more tasks
 * afterwards.
 */
void pool_wait(struct pool *pool);

/* Stop the workers, wait for them to end, and free the pool. */
void pool_destroy(struct pool *pool);

#endif

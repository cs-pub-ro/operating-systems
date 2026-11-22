// SPDX-License-Identifier: BSD-3-Clause

/*
 * A pool of worker threads: the threads are started once, and then run
 * whatever tasks they are given, for as long as the pool lives.
 *
 * The tasks wait in a linked list, a queue with no limit.  A mutex
 * protects it, and a condition variable is where the workers sleep while
 * it is empty.
 *
 * This is the boss and the workers again, with three things added: the
 * boss does not wait for a free desk, anybody can be the boss, and the
 * workers stay.
 *
 * `pending` counts the tasks that were submitted and have not finished,
 * whether they are still in the queue or a worker is running them.  That
 * is what pool_wait() waits for, on a condition variable of its own.
 */

#include <stdlib.h>
#include <pthread.h>

#include "pool.h"

struct task {
	void (*fn)(void *arg);
	void *arg;
	struct task *next;
};

struct pool {
	pthread_t *threads;
	int nworkers;
	struct task *head;	/* the task that runs next; NULL if none   */
	struct task *tail;	/* the last task in the queue              */
	size_t pending;		/* tasks submitted and not yet finished    */
	int stop;		/* the pool is being destroyed             */
	pthread_mutex_t lock;	/* protects the queue, `pending`, `stop`   */
	pthread_cond_t has_work;	/* where the workers wait         */
	pthread_cond_t all_done;	/* where pool_wait() waits        */
};

/*
 * A worker holds the lock while it takes a task out of the queue, and
 * again while it counts the task as finished.  It does NOT hold it while
 * the task runs: the tasks are what should run at the same time, and a
 * task that calls pool_submit() needs the lock for itself.
 */
static void *worker(void *arg)
{
	struct pool *pool = arg;
	struct task *task;

	for (;;) {
		pthread_mutex_lock(&pool->lock);
		while (pool->head == NULL && !pool->stop)
			pthread_cond_wait(&pool->has_work, &pool->lock);
		if (pool->head == NULL) {
			pthread_mutex_unlock(&pool->lock);
			break;
		}

		task = pool->head;
		pool->head = task->next;
		if (pool->head == NULL)
			pool->tail = NULL;
		pthread_mutex_unlock(&pool->lock);

		task->fn(task->arg);
		free(task);

		/*
		 * The task is finished only now, after anything it submitted
		 * was counted: `pending` cannot reach zero while a task
		 * that may still submit is running.
		 */
		pthread_mutex_lock(&pool->lock);
		pool->pending--;
		if (pool->pending == 0)
			pthread_cond_broadcast(&pool->all_done);
		pthread_mutex_unlock(&pool->lock);
	}

	return NULL;
}

struct pool *pool_create(int nworkers)
{
	struct pool *pool;
	int i;

	pool = malloc(sizeof(*pool));
	if (pool == NULL)
		return NULL;

	pool->threads = malloc(nworkers * sizeof(*pool->threads));
	if (pool->threads == NULL) {
		free(pool);
		return NULL;
	}

	pool->nworkers = nworkers;
	pool->head = NULL;
	pool->tail = NULL;
	pool->pending = 0;
	pool->stop = 0;
	pthread_mutex_init(&pool->lock, NULL);
	pthread_cond_init(&pool->has_work, NULL);
	pthread_cond_init(&pool->all_done, NULL);

	for (i = 0; i < nworkers; i++)
		pthread_create(&pool->threads[i], NULL, worker, pool);

	return pool;
}

void pool_submit(struct pool *pool, void (*fn)(void *arg), void *arg)
{
	struct task *task;

	task = malloc(sizeof(*task));
	if (task == NULL)
		return;
	task->fn = fn;
	task->arg = arg;
	task->next = NULL;

	pthread_mutex_lock(&pool->lock);
	if (pool->tail == NULL)
		pool->head = task;
	else
		pool->tail->next = task;
	pool->tail = task;
	pool->pending++;
	pthread_cond_signal(&pool->has_work);
	pthread_mutex_unlock(&pool->lock);
}

/*
 * Sleep until there is nothing pending.  No polling: the worker that
 * finishes the last task wakes this thread up.
 */
void pool_wait(struct pool *pool)
{
	pthread_mutex_lock(&pool->lock);
	while (pool->pending > 0)
		pthread_cond_wait(&pool->all_done, &pool->lock);
	pthread_mutex_unlock(&pool->lock);
}

/*
 * `stop` is written under the lock, like every other shared field, and
 * the news goes to all the workers: broadcast, not signal.
 */
void pool_destroy(struct pool *pool)
{
	int i;

	pthread_mutex_lock(&pool->lock);
	pool->stop = 1;
	pthread_cond_broadcast(&pool->has_work);
	pthread_mutex_unlock(&pool->lock);

	for (i = 0; i < pool->nworkers; i++)
		pthread_join(pool->threads[i], NULL);

	pthread_cond_destroy(&pool->all_done);
	pthread_cond_destroy(&pool->has_work);
	pthread_mutex_destroy(&pool->lock);
	free(pool->threads);
	free(pool);
}

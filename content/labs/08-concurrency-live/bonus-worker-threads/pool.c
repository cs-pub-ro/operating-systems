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
 * workers stay.  It was written in a hurry.
 */

#include <stdlib.h>
#include <unistd.h>
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
	int stop;		/* the pool is being destroyed             */
	pthread_mutex_t lock;	/* protects the queue and `stop`           */
	pthread_cond_t has_work;	/* where the workers wait         */
};

/*
 * TODO 1: a task is free to call pool_submit().  Follow what happens to
 * the lock when it does.  And ask what the other workers are doing while
 * this one runs its task.
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

		task->fn(task->arg);
		free(task);
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
	pool->stop = 0;
	pthread_mutex_init(&pool->lock, NULL);
	pthread_cond_init(&pool->has_work, NULL);

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
	pthread_cond_signal(&pool->has_work);
	pthread_mutex_unlock(&pool->lock);
}

/*
 * TODO 2: "the queue is empty" is not "every task has finished": a task
 * that a worker took out of the queue is still running, and may submit
 * more.  Keep count of what the function really waits for, and wait for it
 * without polling, and without reading shared data outside the lock.
 */
void pool_wait(struct pool *pool)
{
	while (pool->head != NULL)
		usleep(100);
}

/*
 * TODO 3: every worker has to find out that the pool is being destroyed.
 */
void pool_destroy(struct pool *pool)
{
	int i;

	pool->stop = 1;
	pthread_cond_signal(&pool->has_work);

	for (i = 0; i < pool->nworkers; i++)
		pthread_join(pool->threads[i], NULL);

	pthread_cond_destroy(&pool->has_work);
	pthread_mutex_destroy(&pool->lock);
	free(pool->threads);
	free(pool);
}

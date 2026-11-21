// SPDX-License-Identifier: BSD-3-Clause

/*
 * A boss and its workers: the boss hands out items of work one at a time,
 * and a number of worker threads do them.
 *
 * Between them is a desk with room for one item.  The boss puts an item on
 * the desk when the desk is empty; a worker takes it when there is one,
 * and goes off to do it.  When there are no more items, the boss says so,
 * and the workers go home.
 *
 * One mutex protects the desk and the `stop` flag.  There are two
 * condition variables, because there are two things to wait for: the boss
 * waits for the desk to be empty, the workers for something to be on it.
 */

#include <pthread.h>

#include "boss.h"

static void (*do_work)(int item);

static int desk;		/* the item on the desk                  */
static int desk_full;		/* is there an item on the desk?         */
static int stop;		/* no more items will come               */
static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t desk_empty = PTHREAD_COND_INITIALIZER;	/* the boss waits here    */
static pthread_cond_t desk_ready = PTHREAD_COND_INITIALIZER;	/* the workers wait here  */

/*
 * A worker leaves only when it is over AND the desk is empty: the last
 * item may still be on the desk when `stop` is set, and somebody has to
 * take it.  The work itself is done with the lock released, so that the
 * workers work at the same time.
 */
static void *worker(void *arg)
{
	int item;

	(void)arg;
	for (;;) {
		pthread_mutex_lock(&lock);
		while (!desk_full && !stop)
			pthread_cond_wait(&desk_ready, &lock);
		if (!desk_full) {
			pthread_mutex_unlock(&lock);
			break;
		}
		item = desk;
		desk_full = 0;
		pthread_cond_signal(&desk_empty);
		pthread_mutex_unlock(&lock);

		do_work(item);
	}

	return NULL;
}

void boss_run(void (*work)(int item), int nitems, int nworkers)
{
	pthread_t workers[MAX_WORKERS];
	int i;

	if (nworkers < 1)
		nworkers = 1;
	if (nworkers > MAX_WORKERS)
		nworkers = MAX_WORKERS;

	do_work = work;
	desk_full = 0;
	stop = 0;

	for (i = 0; i < nworkers; i++)
		pthread_create(&workers[i], NULL, worker, NULL);

	/* One item at a time: wait for the desk, fill it, wake up one worker. */
	for (i = 0; i < nitems; i++) {
		pthread_mutex_lock(&lock);
		while (desk_full)
			pthread_cond_wait(&desk_empty, &lock);
		desk = i;
		desk_full = 1;
		pthread_cond_signal(&desk_ready);
		pthread_mutex_unlock(&lock);
	}

	/*
	 * The end is news for every worker, not for one of them: broadcast.
	 * A signal would wake up one worker, and the others would sleep for
	 * ever, and so would the joins below.
	 */
	pthread_mutex_lock(&lock);
	stop = 1;
	pthread_cond_broadcast(&desk_ready);
	pthread_mutex_unlock(&lock);

	for (i = 0; i < nworkers; i++)
		pthread_join(workers[i], NULL);
}

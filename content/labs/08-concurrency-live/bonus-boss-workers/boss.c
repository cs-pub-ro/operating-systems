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
 * Items get lost on the way, and some workers never go home.
 */

#include <pthread.h>

#include "boss.h"

static void (*do_work)(int item);

static int desk;		/* the item on the desk                  */
static int desk_full;		/* is there an item on the desk?         */
static int stop;		/* no more items will come               */
static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t changed = PTHREAD_COND_INITIALIZER;

/*
 * TODO 1: a worker that wakes up and finds `stop` set leaves.  Look at
 * what may still be on the desk at that moment.
 */
static void *worker(void *arg)
{
	int item;

	(void)arg;
	for (;;) {
		pthread_mutex_lock(&lock);
		while (!desk_full && !stop)
			pthread_cond_wait(&changed, &lock);
		if (stop) {
			pthread_mutex_unlock(&lock);
			break;
		}
		item = desk;
		desk_full = 0;
		pthread_cond_signal(&changed);
		pthread_mutex_unlock(&lock);

		do_work(item);
	}

	return NULL;
}

/*
 * TODO 2: the boss and the workers sleep on the same condition variable,
 * and pthread_cond_signal() wakes up one thread, any one.  Make sure the
 * thread that can go on is the one that is woken up.
 * TODO 3: at the end, every worker has to find out that it is over.
 */
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

	for (i = 0; i < nitems; i++) {
		pthread_mutex_lock(&lock);
		while (desk_full)
			pthread_cond_wait(&changed, &lock);
		desk = i;
		desk_full = 1;
		pthread_cond_signal(&changed);
		pthread_mutex_unlock(&lock);
	}

	pthread_mutex_lock(&lock);
	stop = 1;
	pthread_cond_signal(&changed);
	pthread_mutex_unlock(&lock);

	for (i = 0; i < nworkers; i++)
		pthread_join(workers[i], NULL);
}

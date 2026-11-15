/*
 * A shop with STOCK items and NUM_THREADS buyers.  A buyer checks that
 * there is an item left and, if there is, takes one.  Every access to the
 * stock is made under the lock; what differs is how much one lock/unlock
 * pair covers:
 *
 *   (nothing)       the check is one critical section, the take another
 *   -DCHECK_AND_ACT the check and the take are one critical section
 */

#include <stdio.h>
#include <pthread.h>

#include "utils.h"

#define NUM_THREADS	8
#define STOCK		1000000

static long stock = STOCK;
static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

#ifdef CHECK_AND_ACT

/* Check and take under one lock: nobody can get in between. */
static int buy_one(void)
{
	int bought = 0;

	pthread_mutex_lock(&lock);
	if (stock > 0) {
		stock--;
		bought = 1;
	}
	pthread_mutex_unlock(&lock);

	return bought;
}

#else

static int in_stock(void)
{
	int available;

	pthread_mutex_lock(&lock);
	available = stock > 0;
	pthread_mutex_unlock(&lock);

	return available;
}

static void take_one(void)
{
	pthread_mutex_lock(&lock);
	stock--;
	pthread_mutex_unlock(&lock);
}

/* Time of check ... time of use: the answer can be stale by then. */
static int buy_one(void)
{
	if (!in_stock())
		return 0;

	take_one();

	return 1;
}

#endif

static void *buyer(void *arg)
{
	long *bought = arg;

	while (buy_one())
		(*bought)++;

	return NULL;
}

int main(void)
{
	long bought[NUM_THREADS] = { 0 };
	pthread_t th[NUM_THREADS];
	long sold = 0;
	size_t t;
	int rc;

	for (t = 0; t < NUM_THREADS; t++) {
		rc = pthread_create(&th[t], NULL, buyer, &bought[t]);
		DIE(rc != 0, "pthread_create");
	}

	for (t = 0; t < NUM_THREADS; t++) {
		rc = pthread_join(th[t], NULL);
		DIE(rc != 0, "pthread_join");
		sold += bought[t];
	}

	printf("in stock at the start: %d  sold: %ld  left: %ld\n",
	       STOCK, sold, stock);

	return 0;
}

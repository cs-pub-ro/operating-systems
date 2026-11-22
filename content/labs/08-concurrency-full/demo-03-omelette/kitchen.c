// SPDX-License-Identifier: BSD-3-Clause

/*
 * The kitchen: hens put eggs in a basket, and a cook takes three of them at
 * a time to make an omelette.  The basket itself belongs to the executable;
 * this library decides who may touch it, and when.
 *
 * One mutex protects the basket and the count of eggs in it.  One condition
 * variable is where the cook waits for "there are at least three eggs".
 */

#include <pthread.h>

#include "kitchen.h"

static int eggs;	/* eggs in the basket; protected by `lock` */
static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t enough_eggs = PTHREAD_COND_INITIALIZER;

void kitchen_init(void)
{
	eggs = 0;
}

/*
 * A hen adds an egg.  The basket and the count change together, under the
 * lock, and the cook is told while the lock is still held: the cook cannot
 * be between its test and its wait at that moment, so the signal is not
 * lost.
 */
void egg_create(void)
{
	pthread_mutex_lock(&lock);
	basket_put_egg();
	eggs++;
	pthread_cond_signal(&enough_eggs);
	pthread_mutex_unlock(&lock);
}

/*
 * The cook makes an omelette.  The wait is in a loop: being woken up means
 * "the count changed", not "there are three eggs", so the condition is
 * tested again every time.  The eggs are taken under the same lock the
 * condition was tested under, so it is still true when they are taken.
 */
void omelette_make(void)
{
	pthread_mutex_lock(&lock);
	while (eggs < EGGS_PER_OMELETTE)
		pthread_cond_wait(&enough_eggs, &lock);
	basket_take_eggs();
	eggs -= EGGS_PER_OMELETTE;
	pthread_mutex_unlock(&lock);
}

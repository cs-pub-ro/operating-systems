// SPDX-License-Identifier: BSD-3-Clause

/*
 * The kitchen: hens put eggs in a basket, and a cook takes three of them at
 * a time to make an omelette.  The basket itself belongs to the executable;
 * this library decides who may touch it, and when.
 *
 * The synchronization below is wrong, in more than one way.
 */

#include <pthread.h>

#include "kitchen.h"

static int eggs;	/* eggs in the basket */
static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t enough_eggs = PTHREAD_COND_INITIALIZER;

void kitchen_init(void)
{
	eggs = 0;
}

/*
 * A hen adds an egg, and tells the cook.
 *
 * TODO 1: which of these statements use something that another thread also
 * uses?  Protect them.
 */
void egg_create(void)
{
	basket_put_egg();
	eggs++;
	pthread_cond_signal(&enough_eggs);
}

/*
 * The cook makes an omelette: wait until there are enough eggs, then take
 * them out of the basket.
 *
 * TODO 2: the cook is woken up when an egg is added.  What does it know
 * about the number of eggs at that moment?
 * TODO 3: between the moment the cook finds enough eggs and the moment it
 * takes them, nothing else may change the basket.
 */
void omelette_make(void)
{
	pthread_mutex_lock(&lock);
	if (eggs < EGGS_PER_OMELETTE)
		pthread_cond_wait(&enough_eggs, &lock);
	pthread_mutex_unlock(&lock);

	basket_take_eggs();
	eggs -= EGGS_PER_OMELETTE;
}

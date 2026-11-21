// SPDX-License-Identifier: BSD-3-Clause

/*
 * Building water: hydrogen threads and oxygen threads arrive in any order,
 * and have to leave in groups of three, two hydrogen and one oxygen.
 *
 * Two semaphores let in at most two hydrogen threads and at most one
 * oxygen thread at a time.  That is not enough.
 */

#include <pthread.h>
#include <semaphore.h>

#include "h2o.h"

static sem_t hydrogen_slots;	/* 2: hydrogen atoms a molecule has room for */
static sem_t oxygen_slots;	/* 1: oxygen atoms a molecule has room for   */

void h2o_init(void)
{
	sem_init(&hydrogen_slots, 0, 2);
	sem_init(&oxygen_slots, 0, 1);
}

/*
 * TODO: a hydrogen thread that has a slot releases its atom at once, and
 * gives the slot back at once, whether or not there is an oxygen thread to
 * go with it.  Make the three threads of a molecule wait for each other
 * before any of them releases, and make sure no thread of the next molecule
 * can get in before all three are done.
 */
void hydrogen(void)
{
	sem_wait(&hydrogen_slots);
	release_hydrogen();
	sem_post(&hydrogen_slots);
}

void oxygen(void)
{
	sem_wait(&oxygen_slots);
	release_oxygen();
	sem_post(&oxygen_slots);
}

// SPDX-License-Identifier: BSD-3-Clause

/*
 * Building water: hydrogen threads and oxygen threads arrive in any order,
 * and have to leave in groups of three, two hydrogen and one oxygen.
 *
 * Two semaphores let in at most two hydrogen threads and at most one
 * oxygen thread: the three places of a molecule.  A barrier of three then
 * holds the threads that got a place until all the places are taken, and
 * lets the three of them go together.
 */

#include <pthread.h>
#include <semaphore.h>

#include "h2o.h"

static sem_t hydrogen_slots;	/* 2: hydrogen atoms a molecule has room for */
static sem_t oxygen_slots;	/* 1: oxygen atoms a molecule has room for   */
static pthread_barrier_t molecule;	/* 3 threads: two hydrogen, one oxygen */

void h2o_init(void)
{
	sem_init(&hydrogen_slots, 0, 2);
	sem_init(&oxygen_slots, 0, 1);
	pthread_barrier_init(&molecule, NULL, 3);
}

/*
 * A thread goes through three steps.
 *
 * 1. Take a place.  At most two hydrogen threads and one oxygen thread are
 *    past this point at any time, so the three threads that meet at the
 *    barrier are always two hydrogen and one oxygen.
 * 2. Wait at the barrier until the molecule is complete, then release.
 * 3. Give the place back, after the release.  The next molecule needs all
 *    three places before its barrier opens, and gets them only once all
 *    three threads of this one have released: the groups cannot mix.
 */
void hydrogen(void)
{
	sem_wait(&hydrogen_slots);
	pthread_barrier_wait(&molecule);
	release_hydrogen();
	sem_post(&hydrogen_slots);
}

void oxygen(void)
{
	sem_wait(&oxygen_slots);
	pthread_barrier_wait(&molecule);
	release_oxygen();
	sem_post(&oxygen_slots);
}

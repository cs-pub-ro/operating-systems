// SPDX-License-Identifier: BSD-3-Clause

/*
 * Building water: hydrogen threads and oxygen threads arrive in any order,
 * and have to leave in groups of three, two hydrogen and one oxygen.
 *
 * One mutex, one condition variable, and four counters.  An atom that
 * arrives is counted as waiting.  When two hydrogen and one oxygen are
 * waiting, and the molecule before has left, a molecule is formed: the three
 * are taken out of the waiting counts and three tickets are handed out, two
 * for hydrogen and one for oxygen.  A thread leaves only with a ticket.
 */

#include <pthread.h>

#include "h2o.h"

static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t changed = PTHREAD_COND_INITIALIZER;

static int waiting_h, waiting_o;	/* arrived, not in a molecule yet   */
static int tickets_h, tickets_o;	/* permissions to leave, not used yet */

void h2o_init(void)
{
	waiting_h = 0;
	waiting_o = 0;
	tickets_h = 0;
	tickets_o = 0;
}

/*
 * Form a molecule, if there are atoms for one and the molecule before it has
 * left.  Called with the lock held, whenever one of the two may have become
 * true: an atom arrived, or a ticket was used.
 *
 * A ticket is used and the atom released in one critical section, so no
 * tickets left means that all three atoms of the molecule before have been
 * released.
 */
static void form(void)
{
	if (tickets_h > 0 || tickets_o > 0)
		return;

	if (waiting_h >= 2 && waiting_o >= 1) {
		waiting_h -= 2;
		waiting_o -= 1;
		tickets_h = 2;
		tickets_o = 1;
		/* Threads of two kinds wait, for different things: tell all. */
		pthread_cond_broadcast(&changed);
	}
}

void hydrogen(void)
{
	pthread_mutex_lock(&lock);
	waiting_h++;
	form();
	while (tickets_h == 0)
		pthread_cond_wait(&changed, &lock);
	tickets_h--;
	/* Released with the lock held: the next molecule cannot get in between. */
	release_hydrogen();
	form();
	pthread_mutex_unlock(&lock);
}

void oxygen(void)
{
	pthread_mutex_lock(&lock);
	waiting_o++;
	form();
	while (tickets_o == 0)
		pthread_cond_wait(&changed, &lock);
	tickets_o--;
	release_oxygen();
	form();
	pthread_mutex_unlock(&lock);
}

// SPDX-License-Identifier: BSD-3-Clause

/*
 * Building water: hydrogen threads and oxygen threads arrive in any order,
 * and have to leave in groups of three, two hydrogen and one oxygen.
 *
 * One mutex, one condition variable, and four counters.  An atom that
 * arrives is counted as waiting.  When two hydrogen and one oxygen are
 * waiting, a molecule is formed: the three are taken out of the waiting
 * counts and three tickets are handed out, two for hydrogen and one for
 * oxygen.  A thread leaves only with a ticket.  That is not enough.
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
 * Form a molecule, if there are atoms for one.  Called with the lock held.
 *
 * TODO 1: A molecule is formed here as soon as there are atoms for it,
 * whether or not the molecule before it has left.  Find what tells you
 * that it has, and form the next one only then.
 */
static void form(void)
{
	if (waiting_h >= 2 && waiting_o >= 1) {
		waiting_h -= 2;
		waiting_o -= 1;
		tickets_h += 2;
		tickets_o += 1;
		pthread_cond_broadcast(&changed);
	}
}

/*
 * TODO 2: The thread takes its ticket with the lock held, and releases its
 * atom after it gave the lock up.  Think what another thread can do between
 * the two, and what form() can rely on once you have closed that.
 * Once a molecule has left, somebody has to form the next one.
 */
void hydrogen(void)
{
	pthread_mutex_lock(&lock);
	waiting_h++;
	form();
	while (tickets_h == 0)
		pthread_cond_wait(&changed, &lock);
	tickets_h--;
	pthread_mutex_unlock(&lock);

	release_hydrogen();
}

void oxygen(void)
{
	pthread_mutex_lock(&lock);
	waiting_o++;
	form();
	while (tickets_o == 0)
		pthread_cond_wait(&changed, &lock);
	tickets_o--;
	pthread_mutex_unlock(&lock);

	release_oxygen();
}

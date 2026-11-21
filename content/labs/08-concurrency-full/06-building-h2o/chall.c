// SPDX-License-Identifier: BSD-3-Clause

/*
 * Four hydrogen threads and two oxygen threads build water, through
 * libh2o.so.  Every thread brings atoms one at a time, by calling
 * hydrogen() or oxygen(), for as long as there are atoms of its kind left,
 * and the library decides when each atom is released.  The releases are recorded in the order they happen, and must
 * come in groups of three: two hydrogen and one oxygen.  If every group is
 * a molecule, the flag is printed.
 *
 *     ./chall [timeout]
 *
 * The timeout is in seconds, 10 if not given, and 0 means no timeout.
 */

#include <signal.h>
#include <stdatomic.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <pthread.h>

#include "h2o.h"
#include "flag.h"

#define NUM_HYDROGEN	4		/* hydrogen threads           */
#define NUM_OXYGEN	2		/* oxygen threads             */
#define NUM_MOLECULES	10000
#define NUM_ATOMS	(3 * NUM_MOLECULES)
#define SHOWN		20		/* molecules shown on the screen */
#define TIMEOUT		10

static char released[NUM_ATOMS + 1];	/* 'H' or 'O', in the order of release */
static atomic_long count;		/* atoms released so far               */

/* Atoms still to bring, shared by the threads of each kind. */
static atomic_long hydrogen_left = 2 * NUM_MOLECULES;
static atomic_long oxygen_left = NUM_MOLECULES;

/* The threads did not finish in time: say so, and give up. */
static void on_alarm(int sig)
{
	static const char msg[] =
		"Timed out: atoms are waiting for a molecule that is never complete.\n";
	ssize_t rc;

	(void)sig;
	rc = write(STDERR_FILENO, msg, sizeof(msg) - 1);
	(void)rc;
	_exit(2);
}

/* Record a release.  Every caller gets a position of its own. */
static void release(char atom)
{
	long pos = atomic_fetch_add(&count, 1);

	if (pos < NUM_ATOMS)
		released[pos] = atom;
}

void release_hydrogen(void)
{
	release('H');
}

void release_oxygen(void)
{
	release('O');
}

static void *bring_hydrogen(void *arg)
{
	(void)arg;
	while (atomic_fetch_sub(&hydrogen_left, 1) > 0)
		hydrogen();

	return NULL;
}

static void *bring_oxygen(void *arg)
{
	(void)arg;
	while (atomic_fetch_sub(&oxygen_left, 1) > 0)
		oxygen();

	return NULL;
}

int main(int argc, char *argv[])
{
	pthread_t threads[NUM_HYDROGEN + NUM_OXYGEN];
	long molecules = 0, first_bad = -1;
	uint64_t proof[2];
	int i, rc, h, o;
	long m;

	signal(SIGALRM, on_alarm);
	alarm(argc > 1 ? atoi(argv[1]) : TIMEOUT);

	h2o_init();

	for (i = 0; i < NUM_HYDROGEN + NUM_OXYGEN; i++) {
		rc = pthread_create(&threads[i], NULL,
				    i < NUM_HYDROGEN ? bring_hydrogen : bring_oxygen,
				    NULL);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	for (i = 0; i < NUM_HYDROGEN + NUM_OXYGEN; i++)
		pthread_join(threads[i], NULL);

	/* Every three releases in a row have to be two H and one O. */
	for (m = 0; m < NUM_MOLECULES; m++) {
		h = 0;
		o = 0;
		for (i = 0; i < 3; i++) {
			if (released[3 * m + i] == 'H')
				h++;
			else if (released[3 * m + i] == 'O')
				o++;
		}
		if (h == 2 && o == 1)
			molecules++;
		else if (first_bad < 0)
			first_bad = m;
	}

	printf("first releases: ");
	for (m = 0; m < SHOWN; m++)
		printf("%.3s ", released + 3 * m);
	printf("...\n");
	printf("atoms released: %ld (expected %d)\n", atomic_load(&count), NUM_ATOMS);
	printf("molecules:      %ld (expected %d)\n", molecules, NUM_MOLECULES);

	if (atomic_load(&count) != NUM_ATOMS || molecules != NUM_MOLECULES) {
		if (first_bad >= 0)
			printf("group %ld is \"%.3s\": not a molecule of water\n",
			       first_bad + 1, released + 3 * first_bad);
		printf("No flag: the atoms did not leave as molecules.\n");
		return 1;
	}

	proof[0] = atomic_load(&count);
	proof[1] = molecules;

	return flag_print(proof, 2);
}

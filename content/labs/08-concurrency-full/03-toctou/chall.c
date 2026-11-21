// SPDX-License-Identifier: BSD-3-Clause

/*
 * Eight threads register user names in one registry, through
 * libregistry.so, and all of them want the same names: for every name, the
 * threads line up and ask for it at the same moment.  One of them has to
 * get it, and only one.  If that is what happened for every name, the flag
 * is printed.
 *
 *     ./chall [timeout]
 *
 * The timeout is in seconds, 10 if not given, and 0 means no timeout.
 */

#include <signal.h>
#include <stdarg.h>
#include <stdatomic.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <pthread.h>

#include "registry.h"
#include "flag.h"

#define NUM_THREADS	8
#define NUM_NAMES	500
#define TIMEOUT		10
#define MAX_COMPLAINTS	5

static struct registry *reg;
static pthread_barrier_t start_line;	/* where the threads line up       */
static atomic_int owners[NUM_NAMES];	/* threads that were given a name  */
static atomic_long errors;

/* Count something that went wrong, and print the first few. */
static void complain(const char *fmt, ...)
{
	va_list args;

	if (atomic_fetch_add(&errors, 1) >= MAX_COMPLAINTS)
		return;

	va_start(args, fmt);
	vfprintf(stderr, fmt, args);
	va_end(args);
}

/* The threads did not finish in time: say so, and give up. */
static void on_alarm(int sig)
{
	static const char msg[] =
		"Timed out: a thread is waiting for something that never comes.\n";
	ssize_t rc;

	(void)sig;
	rc = write(STDERR_FILENO, msg, sizeof(msg) - 1);
	(void)rc;
	_exit(2);
}

static void *register_names(void *arg)
{
	char name[NAME_LEN];
	int i;

	(void)arg;
	for (i = 0; i < NUM_NAMES; i++) {
		snprintf(name, sizeof(name), "user-%d", i);

		/* Everybody waits here until all the threads have arrived. */
		pthread_barrier_wait(&start_line);

		if (registry_register(reg, name))
			atomic_fetch_add(&owners[i], 1);
		if (!registry_contains(reg, name))
			complain("%s was asked for, and is not in the registry\n", name);
	}

	return NULL;
}

int main(int argc, char *argv[])
{
	pthread_t threads[NUM_THREADS];
	long registered = 0, once = 0;
	uint64_t proof[2];
	size_t i, count;
	int rc, n;

	signal(SIGALRM, on_alarm);
	alarm(argc > 1 ? atoi(argv[1]) : TIMEOUT);

	reg = registry_create();
	if (reg == NULL) {
		fprintf(stderr, "registry_create() failed\n");
		return 1;
	}
	pthread_barrier_init(&start_line, NULL, NUM_THREADS);

	for (i = 0; i < NUM_THREADS; i++) {
		rc = pthread_create(&threads[i], NULL, register_names, NULL);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	for (i = 0; i < NUM_THREADS; i++)
		pthread_join(threads[i], NULL);

	for (i = 0; i < NUM_NAMES; i++) {
		n = atomic_load(&owners[i]);
		registered += n;
		if (n == 1)
			once++;
		else
			complain("user-%zu was given to %d threads\n", i, n);
	}
	count = registry_count(reg);

	printf("names asked for:            %d, each by %d threads\n", NUM_NAMES,
	       NUM_THREADS);
	printf("names given to one thread:  %ld (expected %d)\n", once, NUM_NAMES);
	printf("successful registrations:   %ld (expected %d)\n", registered,
	       NUM_NAMES);
	printf("names in the registry:      %zu (expected %d)\n", count, NUM_NAMES);

	registry_destroy(reg);

	if (atomic_load(&errors) != 0) {
		printf("No flag: a name has more than one owner, or none.\n");
		return 1;
	}

	proof[0] = registered;
	proof[1] = count;

	return flag_print(proof, 2);
}

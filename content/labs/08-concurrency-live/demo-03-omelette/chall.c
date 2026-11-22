// SPDX-License-Identifier: BSD-3-Clause

/*
 * Three hens and a cook.  Every hen thread calls egg_create() for each egg
 * it lays, which takes it a moment, and the cook thread calls
 * omelette_make() for each omelette, as fast as it can.
 * Both functions are in libkitchen.so, and both use the basket, which is
 * here.  If every omelette was made with three eggs that were really in the
 * basket, and no two threads were ever in the basket together, the flag is
 * printed.
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

#include "kitchen.h"
#include "flag.h"

#define NUM_HENS	3
#define NUM_OMELETTES	1000
#define EGGS_PER_HEN	(NUM_OMELETTES * EGGS_PER_OMELETTE / NUM_HENS)
#define LAYING_TIME	20	/* microseconds a hen needs for an egg */
#define TIMEOUT		10
#define MAX_COMPLAINTS	5

static int basket;		/* eggs in the basket right now             */
static long eggs_put;		/* eggs ever put in the basket              */
static long omelettes;		/* omelettes made                           */
static atomic_int in_basket;	/* is a thread using the basket right now?  */
static atomic_long errors;	/* times a rule of the basket was broken    */

/* Count a broken rule, and print the first few of them. */
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

/* A thread comes to the basket; nobody else may be there. */
static void basket_enter(const char *who)
{
	if (atomic_exchange(&in_basket, 1))
		complain("the %s came to the basket while another thread was using it\n",
			 who);
}

static void basket_leave(void)
{
	atomic_store(&in_basket, 0);
}

void basket_put_egg(void)
{
	basket_enter("hen");
	basket++;
	eggs_put++;
	basket_leave();
}

void basket_take_eggs(void)
{
	basket_enter("cook");
	if (basket < EGGS_PER_OMELETTE)
		complain("the cook started an omelette with %d egg(s) in the basket\n",
			 basket);
	basket -= EGGS_PER_OMELETTE;
	omelettes++;
	basket_leave();
}

static void *hen(void *arg)
{
	int i;

	(void)arg;
	for (i = 0; i < EGGS_PER_HEN; i++) {
		usleep(LAYING_TIME);
		egg_create();
	}

	return NULL;
}

static void *cook(void *arg)
{
	int i;

	(void)arg;
	for (i = 0; i < NUM_OMELETTES; i++)
		omelette_make();

	return NULL;
}

int main(int argc, char *argv[])
{
	pthread_t hens[NUM_HENS], cook_thread;
	uint64_t proof[3];
	int i, rc;

	signal(SIGALRM, on_alarm);
	alarm(argc > 1 ? atoi(argv[1]) : TIMEOUT);

	kitchen_init();

	rc = pthread_create(&cook_thread, NULL, cook, NULL);
	if (rc != 0) {
		fprintf(stderr, "pthread_create: %s\n", strerror(rc));
		return 1;
	}
	for (i = 0; i < NUM_HENS; i++) {
		rc = pthread_create(&hens[i], NULL, hen, NULL);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	for (i = 0; i < NUM_HENS; i++)
		pthread_join(hens[i], NULL);
	pthread_join(cook_thread, NULL);

	printf("eggs put in the basket: %ld (expected %d)\n", eggs_put,
	       NUM_HENS * EGGS_PER_HEN);
	printf("omelettes made:         %ld (expected %d)\n", omelettes,
	       NUM_OMELETTES);
	printf("eggs left:              %d (expected 0)\n", basket);
	printf("rules broken:           %ld\n", atomic_load(&errors));

	if (atomic_load(&errors) != 0) {
		printf("No flag: the basket was not used by the rules.\n");
		return 1;
	}

	proof[0] = eggs_put;
	proof[1] = omelettes;
	proof[2] = basket;

	return flag_print(proof, 3);
}

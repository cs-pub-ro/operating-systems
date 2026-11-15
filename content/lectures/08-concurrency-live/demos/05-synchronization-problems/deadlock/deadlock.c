/*
 * Two accounts, each with its own lock, and two threads moving money
 * between them in opposite directions.  A transfer locks the account it
 * takes from, then the account it gives to.
 *
 *   (nothing)         each thread locks "from" first: opposite orders
 *   -DORDERED_LOCKS   both threads lock the lower-numbered account first
 */

#include <stdio.h>
#include <pthread.h>

#include "utils.h"

#define NUM_ROUNDS	1000000

struct account {
	int id;
	long balance;
	pthread_mutex_t lock;
};

static struct account a = { 1, 1000, PTHREAD_MUTEX_INITIALIZER };
static struct account b = { 2, 1000, PTHREAD_MUTEX_INITIALIZER };

static void transfer(struct account *from, struct account *to, long amount)
{
#ifdef ORDERED_LOCKS
	struct account *first = from->id < to->id ? from : to;
	struct account *second = from->id < to->id ? to : from;
#else
	struct account *first = from;
	struct account *second = to;
#endif

	pthread_mutex_lock(&first->lock);
	pthread_mutex_lock(&second->lock);

	from->balance -= amount;
	to->balance += amount;

	pthread_mutex_unlock(&second->lock);
	pthread_mutex_unlock(&first->lock);
}

static void *a_to_b(void *arg)
{
	size_t i;

	for (i = 0; i < NUM_ROUNDS; i++)
		transfer(&a, &b, 1);

	return NULL;
}

static void *b_to_a(void *arg)
{
	size_t i;

	for (i = 0; i < NUM_ROUNDS; i++)
		transfer(&b, &a, 1);

	return NULL;
}

int main(void)
{
	pthread_t th[2];
	int rc;

	rc = pthread_create(&th[0], NULL, a_to_b, NULL);
	DIE(rc != 0, "pthread_create");
	rc = pthread_create(&th[1], NULL, b_to_a, NULL);
	DIE(rc != 0, "pthread_create");

	printf("transfers started\n");
	fflush(stdout);

	pthread_join(th[0], NULL);
	pthread_join(th[1], NULL);

	printf("transfers done: a = %ld, b = %ld, total = %ld\n",
	       a.balance, b.balance, a.balance + b.balance);

	return 0;
}

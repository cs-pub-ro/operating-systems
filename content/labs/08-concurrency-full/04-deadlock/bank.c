// SPDX-License-Identifier: BSD-3-Clause

/*
 * A bank: accounts, and transfers of money between them, which several
 * threads may ask for at the same time.
 *
 * Every account has a mutex of its own, so that transfers between
 * different pairs of accounts do not wait for each other.  A transfer
 * holds the locks of both its accounts: the money leaves one and reaches
 * the other in one step, as far as anybody else can see.
 *
 * Every thread takes the two locks in the same order, lower address first,
 * whichever way the money goes.  Two threads can then never each hold one
 * lock and wait for the other.
 */

#include <stdlib.h>
#include <pthread.h>

#include "bank.h"

struct account {
	long balance;
	pthread_mutex_t lock;	/* protects the balance */
};

struct account *account_create(long balance)
{
	struct account *account;

	account = malloc(sizeof(*account));
	if (account == NULL)
		return NULL;

	account->balance = balance;
	pthread_mutex_init(&account->lock, NULL);

	return account;
}

void account_destroy(struct account *account)
{
	pthread_mutex_destroy(&account->lock);
	free(account);
}

long account_balance(struct account *account)
{
	long balance;

	pthread_mutex_lock(&account->lock);
	balance = account->balance;
	pthread_mutex_unlock(&account->lock);

	return balance;
}

/*
 * The order in which the locks are taken has nothing to do with the
 * direction of the transfer: it is the order of the accounts in memory,
 * which is the same for every thread.  A transfer from A to B and one from
 * B to A both lock the lower of the two first, so one of them gets both
 * locks and the other waits holding none.
 */
void bank_transfer(struct account *from, struct account *to, long amount)
{
	struct account *first = from < to ? from : to;
	struct account *second = from < to ? to : from;

	pthread_mutex_lock(&first->lock);
	pthread_mutex_lock(&second->lock);

	from->balance -= amount;
	to->balance += amount;

	pthread_mutex_unlock(&second->lock);
	pthread_mutex_unlock(&first->lock);
}

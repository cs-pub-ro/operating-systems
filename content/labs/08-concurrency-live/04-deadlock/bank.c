// SPDX-License-Identifier: BSD-3-Clause

/*
 * A bank: accounts, and transfers of money between them, which several
 * threads may ask for at the same time.
 *
 * Every account has a mutex of its own, so that transfers between
 * different pairs of accounts do not wait for each other.  A transfer
 * holds the locks of both its accounts: the money leaves one and reaches
 * the other in one step, as far as anybody else can see.
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
 * TODO: nothing here is unprotected, and the program stops for ever.  Work
 * out what two threads must be holding, and waiting for, when that happens,
 * and change the function so that it cannot.
 */
void bank_transfer(struct account *from, struct account *to, long amount)
{
	pthread_mutex_lock(&from->lock);
	pthread_mutex_lock(&to->lock);

	from->balance -= amount;
	to->balance += amount;

	pthread_mutex_unlock(&to->lock);
	pthread_mutex_unlock(&from->lock);
}

/* SPDX-License-Identifier: BSD-3-Clause */

/*
 * A bank: accounts, and transfers of money between them, which several
 * threads may ask for at the same time.
 *
 * The library is libbank.so, built from bank.c.  `struct account` is
 * defined there: the executable only ever holds pointers to accounts.
 */

#ifndef BANK_H_
#define BANK_H_		1

struct account;

/* A new account holding `balance`; NULL if there is no memory for it. */
struct account *account_create(long balance);

void account_destroy(struct account *account);

/* The money in the account. */
long account_balance(struct account *account);

/*
 * Move `amount` from one account to the other.  The two accounts are never
 * the same one.  A balance is allowed to go below zero.
 */
void bank_transfer(struct account *from, struct account *to, long amount);

#endif

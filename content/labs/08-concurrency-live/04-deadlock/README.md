# Exercise: Transfers That Never End

**Tools:** GCC, Make, ps, GDB

## Goal

Find out why a program in which nothing is unprotected stops for ever, and fix it.
Afterwards you will be able to recognize a deadlock from outside, see which thread holds what with GDB, and prevent it by taking locks in one order.

## Background

`bank.c` is a small bank: accounts with a balance, and `bank_transfer()`, which moves money from one account to another.

Every account has a mutex of its own.
That is finer locking than one mutex for the whole bank: two transfers between different pairs of accounts do not wait for each other.
A transfer changes two balances, and nobody may see the money gone from one account and not yet arrived in the other, so a transfer holds the locks of both its accounts.

`chall` has four accounts in a ring and eight threads.
Half of the threads send money one way around the ring, and the other half the other way, a hundred thousand transfers each.
Every transfer is known in advance, so the balances at the end are too.

There is no race in this library.
What there is shows as soon as you run it.

A **deadlock** is a set of threads each of which waits for something that another thread in the set holds.
None of them can go on, so none of them will ever release what it holds.

## Your Task

1. Run `./chall`, and wait.
1. Run `./chall 0`, which never times out, and look at it from a second terminal: `ps -L -o lwp,stat,pcpu,wchan:20 -p $(pidof chall)`.
   What is every thread doing, and how much processor time is the program using?
1. Run it under GDB: `gdb ./chall`, then `run 0`, wait a moment, and press Ctrl-C.
   `thread apply all bt 6` shows where every thread is.
   For two of the threads, note the `from` and `to` arguments of `bank_transfer()` and the line each thread is at, and work out which lock each one holds and which one it waits for.
1. Change `bank_transfer()` so that this cannot happen, whatever the accounts are.
   Keep one mutex per account.

## Build & Run

```console
make
./chall
```

## Check Your Work

* The flag has to be printed on every run; run it twenty times.
* Draw, for the teaching assistant, the two threads of step 3, the two locks, and the arrows "holds" and "waits for".
  A deadlock is a cycle in that drawing.
* Say why your version cannot produce such a cycle, for any two accounts.
* A single mutex for the whole bank would also end the deadlock.
  Say what it would cost, and when it would start to matter.

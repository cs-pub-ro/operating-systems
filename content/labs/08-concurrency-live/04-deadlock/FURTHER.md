# Going Further: Transfers That Never End

Optional.

## Things to try

1. **One lock for the bank.**
   Replace the per-account locks in `bank_transfer()` with one global mutex, and time `./chall` against your version.
   Is there a difference?
   What would have to change in the program for one to appear?
1. **Try, and back off.**
   Lock the first account, then `pthread_mutex_trylock()` the second; if that fails, unlock the first and start again.
   Does it get the flag?
   Can it still fail to make progress, and what would that look like in `ps`?
1. **Ask the mutex who holds it.**
   In GDB, on the deadlocked program, go to the frame of `bank_transfer()` in one thread and print `to->lock.__data.__owner`.
   Compare the number with the LWP numbers in `info threads`.
1. **Three accounts, three threads.**
   On paper: thread 1 transfers A to B, thread 2 B to C, thread 3 C to A.
   No two of them use the same pair.
   Can they deadlock?

## Questions to answer

* The four conditions for a deadlock are mutual exclusion, hold and wait, no preemption, and circular wait.
  Which one does a lock order remove?
  Which one does the try-and-back-off version remove?
* Why is the address of the account a good thing to order by?
  What else would do?
* `account_balance()` locks one account.
  Can it take part in a deadlock?
* The executable prints the total of the four balances.
  A function `bank_total()` that locks each account in turn, reads it and unlocks it could be called while transfers are running.
  Would the total it returns be right?

## Discussion points

* **A deadlock is quiet.**
  No crash, no wrong number, no processor time used: the program just stops answering.
  The first step is always to look at where the threads are.
* **Deadlock is a property of the order of locking, not of the locks.**
  Each lock is used correctly; the mistake is in how two of them are combined.
* **Finer locks, more ways to go wrong.**
  One lock cannot deadlock with itself across threads.
  The moment there are two, their order is part of the design, and has to be written down.

## References

* `man 3 pthread_mutex_lock`, `man 3 pthread_mutex_trylock`
* Lecture 08, part 05, *Problems with synchronization* — the `deadlock` demo
* *Operating Systems: Three Easy Pieces*, chapter 32, *Common Concurrency Problems*

# Going Further: Transfers That Never End

With answers.

## Things to try

1. **One lock for the bank.**

   No measurable difference: 0.06 to 0.07 s with one lock, 0.06 to 0.08 s with ordered per-account locks.
   The critical section is two additions, and what the program spends its time on is taking and releasing locks, which it does in both versions.
   Per-account locks pay off when the critical section is long compared with the cost of a lock, and when the threads mostly work on different accounts.
   With four accounts and eight threads, neither is true.
1. **Try, and back off.**

   ```C
   for (;;) {
   	pthread_mutex_lock(&from->lock);
   	if (pthread_mutex_trylock(&to->lock) == 0)
   		break;
   	pthread_mutex_unlock(&from->lock);
   }
   ```

   The flag in 20 runs out of 20.
   A thread never sleeps while holding a lock, so there is nothing for a circle to form from.
   It can spin: two threads each take their first lock, fail on the second, release, and do it again, in step.
   In `ps` that would be threads in state `R` using a whole core each and transferring nothing, a *livelock*.
   Here it does not last, because the timing of two threads never stays in step for long; `user` time is still two to three times that of the ordered version.
1. **Ask the mutex who holds it.**

   `print to->lock.__data.__owner` gives the LWP of the owning thread, the same number that `info threads` and `ps -L` show.
   This is a detail of glibc and not part of the pthread interface; it is there to be read by people with a debugger.
1. **Three accounts, three threads.**

   Yes.
   Thread 1 locks A and wants B, thread 2 locks B and wants C, thread 3 locks C and wants A.
   The circle has three threads in it instead of two.
   A lock order prevents this as well: thread 3 would lock A before C, and would be waiting at A holding nothing.

## Questions to answer

* **Which condition does each fix remove?**
  The lock order removes the circular wait.
  Try-and-back-off removes hold and wait: a thread that cannot get the second lock gives up the first.
* **Why the address?**
  It is unique, it does not change, and every thread computes the same answer from the same two accounts.
  An account id works too; a balance does not, because it changes.
* **Can `account_balance()` take part in a deadlock?**
  No: it holds one lock and waits for no other.
  A thread needs to hold a lock while waiting for another to be part of a circle.
* **Would `bank_total()`, locking the accounts one at a time, be right?**
  No, and not because of a deadlock.
  A transfer from an account it has not read yet to one it has already read moves money past it: the total comes out too small.
  Every read is protected, and the sum is of four balances taken at four different moments, the TOCTOU of the previous exercise in another form.
  A correct total holds all four locks at once, taken in order.

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
* *Operating Systems: Three Easy Pieces*, chapter 32, *Common Concurrency Problems* — <https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf>

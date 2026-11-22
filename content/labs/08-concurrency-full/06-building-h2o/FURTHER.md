# Going Further: Building H2O

With answers.

## Things to try

1. **`if` instead of `while`.**

   The program finishes, with the wrong groups: no flag in 30 runs out of 30, and no time-out.
   The broadcast wakes every waiting thread, and with four hydrogen threads there can be three or four waiting for two tickets.
   The third one is woken up, does not test again, and takes a ticket that is not there: `tickets_h` goes to -1 and an atom leaves that belongs to no molecule.
1. **Release outside the lock.**

   ```C
   static int leaving;	/* of this molecule, with a ticket, not released yet */

   static void form(void)
   {
   	if (leaving == 0 && waiting_h >= 2 && waiting_o >= 1) {
   		waiting_h -= 2;
   		waiting_o -= 1;
   		tickets_h = 2;
   		tickets_o = 1;
   		leaving = 3;
   		pthread_cond_broadcast(&changed);
   	}
   }

   void hydrogen(void)
   {
   	pthread_mutex_lock(&lock);
   	waiting_h++;
   	form();
   	while (tickets_h == 0)
   		pthread_cond_wait(&changed, &lock);
   	tickets_h--;
   	pthread_mutex_unlock(&lock);

   	release_hydrogen();

   	pthread_mutex_lock(&lock);
   	leaving--;
   	form();
   	pthread_mutex_unlock(&lock);
   }
   ```

   The flag in 30 runs out of 30.
   The three releases of a molecule can now run at the same time, which buys nothing here, since a release is one store into an array.
   The price is a counter more and a second critical section in every function, and the guard in `form()` has to be on `leaving`, not on the tickets: tickets say who may go, `leaving` says who has gone.
1. **A different molecule.**

   For NH3 the test becomes `waiting_h >= 3 && waiting_n >= 1`, three hydrogen tickets are handed out and three are taken from the waiting count.
   Nothing else changes: the numbers of the molecule are in `form()` and nowhere else.
1. **Unequal supply.**

   A single hydrogen thread can be in `hydrogen()` once at a time, so `waiting_h` never gets past one and no molecule is ever formed: the program stops at the first.
   The same happens at the end of a run if every thread has a fixed number of atoms and the hydrogen threads do not finish together, which is why the threads of the executable share a counter.

## Questions to answer

* **Exercise 05 kept the work outside the lock; here the release is inside. What is different?**
  There the order of the work did not matter, only who took which block.
  Here the order of the releases is the thing asked for, and the lock is what gives an order.
  The rule is the same in both: lock what has to be seen as one step, and no more.
* **Two condition variables instead of one?**
  `form()` would signal the hydrogen one twice and the oxygen one once, and no thread would be woken up for nothing.
  With one condition variable shared by both kinds it has to be a broadcast; with `pthread_cond_signal()` the program times out in 30 runs out of 30, because three threads have to wake up and one does.
* **Are the three releases in a fixed order?**
  No: the three threads are woken together and get the lock back in whatever order the scheduler gives.
  That is why `HHO`, `HOH` and `OHH` all appear in the output.

## Discussion points

* **A counter is a promise.**
  `tickets_h == 0 && tickets_o == 0` means "the molecule before has left" only because the ticket is taken and the atom released in one critical section.
  With the release outside, the same test means "everybody has permission", which is weaker, and about a quarter of the groups come out wrong.
* **Who forms the next molecule?**
  The condition of `form()` can become true in two ways: an atom arrives, or the last ticket is used.
  Each has to be followed by a call, or the program stops with atoms for a molecule and nobody to say so.

## References

* `man 3 pthread_cond_wait`, `man 3 pthread_cond_broadcast`
* Allen B. Downey, *The Little Book of Semaphores*, section 5.6, *Building H2O* — <https://greenteapress.com/wp/semaphores/>

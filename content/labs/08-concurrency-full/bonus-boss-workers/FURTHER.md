# Going Further: A Boss and Its Workers

With answers.

## Things to try

1. **A poison pill.**

   ```C
   for (i = 0; i < nitems + nworkers; i++) {
   	pthread_mutex_lock(&lock);
   	while (desk_full)
   		pthread_cond_wait(&desk_empty, &lock);
   	desk = i < nitems ? i : -1;
   	desk_full = 1;
   	pthread_cond_signal(&desk_ready);
   	pthread_mutex_unlock(&lock);
   }
   ```

   A worker that takes `-1` ends instead of working.
   The end is now an item like any other: it goes through the desk, in order, after the last real item, so nothing can be lost in front of it, and each worker takes exactly one, so there is nothing to broadcast.
   Two of the three flaws cannot be made.
   The cost is a value that can no longer be a real item, and `nworkers` more trips through the desk.
   The flag in 20 runs out of 20, in the same 0.12 to 0.13 s.
1. **A boss that waits for the desk.**

   ```C
   pthread_mutex_lock(&lock);
   while (desk_full)
   	pthread_cond_wait(&desk_empty, &lock);
   stop = 1;
   pthread_cond_broadcast(&desk_ready);
   pthread_mutex_unlock(&lock);
   ```

   With this, `stop` is never set while an item is on the desk, and a worker that checks `stop` first is right: 20 flags in 20 runs.
   The check of the desk is still the better habit.
   It makes the worker correct by itself, whatever the boss does; the other version is correct only for as long as nobody changes the boss.
1. **A bigger desk.**

   With one slot, the boss and the workers pass through the lock in strict alternation: every item costs a wake-up of a worker and a wake-up of the boss.
   With a queue the boss can put several items down before it has to wait, and the workers can take several before the boss has to be woken.
   There are fewer context switches for the same work, which is the reason real servers queue.
1. **Workers that hand back results.**

   Each worker keeps a sum of its own, in a local variable or in a structure passed to it, and the boss adds the sums up after the joins.
   Nothing is shared, so nothing is locked: the partition of session 07.
   A single shared total would need a lock, or an atomic addition, on every item.

## Questions to answer

* **Why `signal` for an item and `broadcast` for the end?**
  One item can be used by one worker; waking eight for it wastes seven wake-ups.
  The end has to be seen by every worker, and a signal reaches one.
* **What does the boss do while all the workers are busy?**
  It sleeps on `desk_empty`, with the next item not yet handed out.
  The desk is a way of slowing the boss down to the speed of the workers, which is called back-pressure.
* **What does starting and ending the workers on every call cost?**
  Eight `pthread_create()` and eight `pthread_join()` per call, 160 of each over the run.
  That is small here, and it is exactly what the next task, the thread pool, removes: threads that are started once and stay.

## Discussion points

* **Starting is easy; stopping is the design.**
  Every scheme with waiting threads needs an answer to "how do they find out that it is over", and the answer has to reach all of them.
* **Drain before you leave.**
  "Stop" should mean "no more work is coming", not "drop what is there".
* **Signal for one, broadcast for all.**
  An item is of use to one worker; the end concerns every one of them.

## References

* `man 3 pthread_cond_signal`, `man 3 pthread_cond_broadcast`, `man 3 pthread_join`

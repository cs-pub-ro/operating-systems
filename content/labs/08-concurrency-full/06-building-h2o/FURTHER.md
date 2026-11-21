# Going Further: Building H2O

With answers.

## Things to try

1. **The barrier alone.**

   The first groups are mostly `HHH`: the barrier lets any three threads through, and there are four hydrogen threads to two oxygen.
   The hydrogen is used up three at a time instead of two, and runs out; the two oxygen threads are then alone at a barrier that needs three, and the program times out.
   The barrier counts threads.
   It takes the semaphores to say which threads.
1. **With a mutex and a condition variable.**

   The solution is in the tutorial: counters for the atoms waiting, for the permissions to leave, and for the atoms of the current molecule that have not left.
   About thirty lines for the two functions and a helper, against eight.
   The flag in 20 runs out of 20.
1. **A different molecule.**

   For NH3: the hydrogen semaphore starts at 3, the nitrogen one at 1, and the barrier is for 4 threads.
   Nothing else changes, which is a sign that the solution states the problem rather than working around it.
1. **Unequal supply.**

   A single hydrogen thread can be in `hydrogen()` once at a time, and a molecule needs two hydrogen threads at the barrier together.
   It takes the first place, waits at the barrier, and nobody can ever take the second: the program stops at the first molecule.
   The same happens at the end of a run if every thread has a fixed number of atoms and the hydrogen threads do not finish together, which is why the threads of the executable share a counter.

## Questions to answer

* **What does a mutex have that a semaphore of 1 lacks?**
  An owner.
  A mutex is unlocked by the thread that locked it, and tools and the library itself can check that.
  A semaphore can be posted by anybody, which is a feature when one thread wakes another, and a missing safety net when it is used as a lock.
* **Which would have made the omelette easier?**
  The semaphore: a hen does `sem_post()` once per egg and the cook does `sem_wait()` three times per omelette.
  The count of eggs is inside the semaphore, a post is never lost, and there is no `while` to forget.
* **Are the three releases in a fixed order?**
  No: the three threads leave the barrier together and run on to their release in whatever order the scheduler gives.
  That is why `HHO`, `HOH` and `OHH` all appear in the output, and why the release functions must be safe to call at the same time.

## Discussion points

* **Each tool states one thing.**
  A mutex says "one at a time", a semaphore "at most n", a barrier "exactly n, together", a condition variable "when this is true".
  Most synchronization problems are solved by finding which of these sentences the problem contains.
* **Order of release, order of return.**
  What a thread does after the meeting point, and when it gives up its place, decides whether the next group can overlap with this one.

## References

* `man 7 sem_overview`, `man 3 sem_wait`, `man 3 sem_post`
* `man 3 pthread_barrier_wait`
* Allen B. Downey, *The Little Book of Semaphores*, section 5.6, *Building H2O* — <https://greenteapress.com/wp/semaphores/>

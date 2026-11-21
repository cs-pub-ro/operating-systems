# Going Further: Building H2O

Optional.

## Things to try

1. **The barrier alone.**
   Take the semaphores out and keep only the barrier.
   What are the first groups, and why does the program then stop?
1. **With a mutex and a condition variable**, and no semaphore or barrier.
   Keep counts of the hydrogen and oxygen atoms that are waiting; when there are two and one, let exactly those out, and nobody else until they have left.
   It takes four or five counters.
   Compare the length of the two solutions.
1. **A different molecule.**
   Change your solution to build ammonia, NH3: three hydrogen and one nitrogen.
   Which numbers change?
1. **Unequal supply.**
   On paper: one thread brings all the hydrogen, one atom at a time, and another brings the oxygen.
   What happens?
   Why did the executable not have every thread bring a fixed number of atoms?

## Questions to answer

* A semaphore initialized to 1 looks like a mutex.
  Name one thing a mutex has that it lacks.
* `sem_post()` on a semaphore nobody waits for is not lost; `pthread_cond_signal()` on a condition variable nobody waits for is.
  Which of the two would have made the omelette demo easier, and how?
* The barrier lets three threads through "at once".
  Do their three releases happen in a fixed order?
  Does it matter?

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

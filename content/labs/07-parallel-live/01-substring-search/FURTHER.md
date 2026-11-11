# Going Further: A Parallel Substring Search

Optional.

## Things to try

1. **Use `time` on the whole program** instead of reading the time the program prints, with 1 and 8 threads.
   The two speed-ups are not the same.
   What does the program do that it does not time, and which thread does it?
1. **Search for a word that is not there**, such as `zzzz`, with 1 and 8 threads, and for a single letter, such as `e`.
   Does the speed-up depend on how many matches there are?
   Should it?
1. **Drop the shared total** and do it the session 06 way: a `count` field in each region, added up by the main thread after the joins.
   Time both versions.
   Which one would you rather maintain, and which one would you rather debug?
1. **Start more threads than the program allows**: raise `MAX_THREADS` to 4096 and run with 1000, then with 4000.
   Look at the time, and at `ulimit -u`.
1. **Find a needle that the overlap gets wrong.**
   The count does not allow occurrences to overlap, so `aa` occurs twice in `aaaa`.
   Work out, on paper, a short text and a split for which the parallel count of `aa` differs from the sequential one.

## Questions to answer

* The main thread reads `total` after the joins, without taking the lock.
  Why is that safe?
* A thread that holds the lock is preempted by the scheduler.
  What do the other threads that want the lock do, and for how long?
* Why does the version with one lock per match get slower as threads are added, when the version with one lock per thread gets faster?
* The mapping is read by every thread and locked by none.
  What is the rule that says it does not need a lock?

## Discussion points

* **A lock protects data, not code.**
  The mutex belongs to `total`: every statement that touches `total` while threads are running has to hold it, wherever in the program that statement is.
* **Correct first, then short.**
  A critical section that is too long gives a slow program; one that is too short gives a wrong one.
  Start from the one that is obviously correct and shrink it.
* **The best critical section is the one you do not need.**
  A count kept in a local variable needs no lock; only the last step, adding it to the shared total, does.

## References

* `man 3 pthread_mutex_lock`, `man 3 pthread_mutex_init`
* `man 1 time`, `man 1 nproc`

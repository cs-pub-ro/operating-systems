# Going Further: A Parallel Substring Search

With answers.

## Things to try

1. **Use `time` on the whole program** instead of reading the time the program prints.

   With one thread `real` is 0.532 s against a printed 0.519 s; with eight, 0.129 s against 0.116 s.
   The 13 ms of difference is the same in both: starting the program and mapping the file, which one thread does before the clock is read.
   The speed-up of the whole program is 4.1 where the search alone reaches 4.5.
   The sequential part is small here, about 2.5% of the one-thread time, and still sets a ceiling: by Amdahl's law, no more than 40 times faster on any machine.
1. **Search for a word that is not there**, and for a single letter.

   `zzzz`: 0.477 s with one thread, 0.115 s with eight.
   `e`, which occurs 38,678,336 times: 0.886 s and 0.154 s.
   The speed-up does not depend on the number of matches, and should not: every thread adds to the total once, however many matches it found.
   In the version with one lock per match it would depend on nothing else.
1. **Drop the shared total**, and add up a `count` field per region after the joins.

   The times are the same, to within the noise: one uncontended lock per thread is not measurable.
   This version has no mutex and nothing to get wrong, and is the one to prefer when the results can be handed back this way.
   The shared total is here to practise the mutex, and because not every result is a number that can wait for the join.
1. **Start thousands of threads.**

   With `MAX_THREADS` raised to 4096: 0.094 s with 12 threads, 0.103 s with 1000, 0.143 s with 4000.
   Each of 4000 threads searches 64 KiB, which takes about 0.1 ms; the rest is creating them.
   `ulimit -u` is the number of processes and threads a user may have, 29,894 on the reference machine; past it `pthread_create()` fails with `EAGAIN`, and the program reports it.
1. **Find a needle that the overlap gets wrong.**

   The text `aaa`, the needle `aa`, two threads.
   Sequentially there is one match: the search finds `aa` at position 0 and resumes at position 2, where one `a` is left.
   Split in two, the first region is `a` plus one byte of overlap, `aa`, one match; the second is `aa`, one match: two in all.

   ```console
   printf 'aaa' > aaa.txt
   ./search aaa.txt aa 1
   ./search aaa.txt aa 2
   ```

   The count without overlapping occurrences depends on where the search starts, and a region boundary is a new start.
   The overlap rule is right for needles that cannot overlap themselves, which covers ordinary words; a parallel search that has to match the sequential one for every needle has to count overlapping occurrences, or let a region know where the previous one's last match ended.

## Questions to answer

* **The main thread reads `total` after the joins, without taking the lock.
  Why is that safe?**
  A race needs two threads.
  After the last join the main thread is the only one, and everything the others wrote is visible to it.
* **A thread that holds the lock is preempted.
  What do the others do?**
  The ones that want the lock wait, asleep, until the holder runs again and unlocks.
  That is why a critical section should be short and should never wait for anything itself: its length is the others' waiting time.
* **Why does one lock per match get slower with more threads?**
  The work between two lock operations is a few dozen bytes of search.
  With more threads the lock is more often held when a thread arrives, and a thread that finds it held goes through the kernel to sleep and be woken, which costs thousands of times more than the work it was about to do.
* **The mapping is read by every thread and locked by none.
  What is the rule?**
  A race takes at least one writer.
  Memory that every thread only reads, for as long as the threads exist, needs no protection.

## Discussion points

* **A lock protects data, not code.**
  `total_lock` belongs to `total`, and every statement that touches `total` while threads are running has to hold it, wherever in the program that statement is.
* **Correct first, then short.**
  A critical section that is too long gives a slow program; one that is too short gives a wrong one.
  Start from the one that is obviously correct and shrink it.
* **The best critical section is the one you do not need.**
  A count in a local variable needs no lock; only the last step, adding it to the shared total, does.

## References

* `man 3 pthread_mutex_lock`, `man 3 pthread_mutex_init`
* `man 1 time`, `man 1 nproc`
* `ulimit -u`, in `man 1 bash`

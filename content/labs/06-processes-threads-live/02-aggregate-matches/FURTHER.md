# Going Further: Adding Up What the Threads Found

Optional.

## Things to try

1. **Return the count itself, cast to `void *`**, instead of a pointer to it, and cast it back after the join.
   It works.
   Find the case where it would not, and the reason the `count` field is the better design anyway.
1. **Return a `malloc()`'d result** from each thread, and free it in the main thread after reading.
   Who owns that memory, and at what point does ownership change hands?
1. **Count in one shared variable instead**: a global `total` that every thread adds to, without any lock.
   Run with 8 threads a few dozen times and compare with `grep -o`.
   Do not fix it; session 08 does.
1. **Overlap by too much.**
   Make every part reach a whole `strlen(needle)` bytes into the next one, instead of one less, and find a needle for which the total is now too high.
1. **Make the file bigger** (`./gen_text big.txt 512`) and time 1, 2, 4 and 8 threads with `time`.
   Compare with `nproc`.

## Questions to answer

* Why is reading `regions[i].count` after `pthread_join(threads[i], ...)` safe, when reading it before would not be?
* The overlap is `strlen(needle) - 1` bytes.
  Why not `strlen(needle)`, and why not 0?
* The output of this exercise is in thread order and the demo's was not, with the same threads doing the same work.
  What changed?
* `pthread_join()` can only be called once per thread.
  What would a second call do, and what does that say about where the thread's return value is kept?

## Discussion points

* **Returning a pointer from a thread is a promise about lifetime.**
  The pointed-to memory has to outlive the thread, which rules out the thread's own stack and leaves the heap, a global, or a structure the creator owns.
* **The join is the synchronisation.**
  After `pthread_join()` returns, everything the thread wrote is visible to the joiner, and the thread is gone, so nothing can change it any more.
  No lock is needed for a value that is written before a join and read after it.
* **Partition, compute, reduce.**
  Split the input so that each worker owns a part, let the workers run with nothing shared, then combine the results in one place.
  This exercise is the pattern at its smallest; session 07 is the same pattern with the speed-up measured.

## References

* `man 3 pthread_create`, `man 3 pthread_join`, `man 3 pthread_exit`
* `man 7 pthreads` — what threads share and what they do not

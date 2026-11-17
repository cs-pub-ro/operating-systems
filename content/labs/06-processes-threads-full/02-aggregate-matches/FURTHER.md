# Going Further: Adding Up What the Threads Found

With answers.

## Things to try

1. **Return the count itself, cast to `void *`.**

   `return (void *) count;` in the thread, `total += (size_t) result;` in `main()`.
   It works on every platform where `size_t` fits in a pointer, which is every platform this class touches, and it is a hack: the type system is being told a number is an address.
   It breaks the moment the result is a struct, a `double`, or two numbers, which is why the field in the region is the general design and the cast is a shortcut.
1. **Return a `malloc()`'d result.**

   The thread allocates, writes, returns the pointer; `main()` reads and frees after the join.
   Ownership passes from the thread to the joiner at `pthread_join()`, and the heap is the one place both can reach that outlives the thread.
   This is the design for results whose size is not known in advance; Valgrind confirms there is nothing left at exit.
1. **Count in one shared variable without a lock.**

   `total++` from 8 threads on a 64 MiB file: the result is below 569,022 and differs between runs, because `total++` is a read, an add and a write, and two threads can read the same old value.
   This is the race the session's design avoided, and session 08's first exercise.
1. **Overlap by a whole `strlen(needle)`.**

   A match that starts exactly at a boundary is then counted by both parts.
   The planted words straddle boundaries rather than start on them, so with `kernel` the total is still right; use a needle that starts on a boundary (for 2 threads, the 6 bytes at offset 33,554,432, which `dd if=big.txt bs=1 skip=33554432 count=6` prints) and the total comes out one too high.
1. **Make the file bigger and time it.**

   At 512 MiB the single-threaded search takes about 0.2 s on this machine, and 2, 4 and 8 threads halve it each time, down to 0.03 s, because the machine has 24 cores and the file is in the page cache.
   `nproc` bounds the useful thread count, and a laptop with 4 cores stops improving at 4.
   Session 07 measures this properly.

## Questions to answer

* **Why is reading `regions[i].count` after the join safe, and before it not?**
  Before the join, the thread may still be running, and the field may be mid-write or not yet written.
  `pthread_join()` returns only after the thread has ended, and everything the thread wrote is visible to the joiner from then on.
* **Why `strlen(needle) - 1` and not `strlen(needle)` or 0?**
  Zero loses every match that straddles a boundary.
  `strlen(needle)` lets a match that starts on the boundary be counted by both sides.
  `strlen(needle) - 1` is enough to finish any match that started inside the part and not enough to begin one at the boundary.
* **What changed between the demo's unordered output and this one's?**
  Who prints.
  The demo's threads printed as they finished; here the main thread prints as it joins, and it joins in order.
* **What would a second `pthread_join()` on the same thread do?**
  Undefined behaviour; in practice `ESRCH` or worse.
  The return value is kept in the thread's own bookkeeping until it is joined, and the join releases it, which is also why every thread must be joined (or detached) or its bookkeeping leaks.

## Discussion points

* **Returning a pointer from a thread is a promise about lifetime.**
  The memory has to outlive the thread: the heap, a global, or a structure the creator owns and joins before freeing.
* **The join is the synchronisation.**
  A value written before a join and read after it needs no lock; everything else does.
* **Partition, compute, reduce.**
  Each worker owns a part, nothing is shared during the work, and one place combines the results.
  The overlap is the price of partitioning something that has structure across the cut; most real inputs have some.

## References

* `man 3 pthread_join`, `man 3 pthread_exit`, `man 3 pthread_detach`
* `man 7 pthreads`

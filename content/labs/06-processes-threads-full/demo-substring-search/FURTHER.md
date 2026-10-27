# Going Further: Searching a File With Several Threads

With answers.

## Things to try

1. **Pass `&i` instead of `&regions[i]`.**

   Every thread reads `i` through the same pointer, at whatever value the loop has reached by the time the thread gets to run.
   Typically several threads see the same region, one region is searched twice and another not at all, and the counts change from run to run.
   The fix is what the demo does: one struct per thread, filled in before the thread starts, never written again.
1. **Take the join loop out.**

   `main()` returns, the process ends, and the threads are killed in whatever state they were in.
   On a 64 MiB file nothing is printed at all: `main()` reaches `return` before any thread has got through its 16 MiB.
   The exit status is 0, and the program looks like it did nothing, which is exactly what it did.
1. **Forget the remainder: give every region `chunk` bytes.**
   Generate a file whose size is not a multiple of the thread count, such as 7 threads on 64 MiB, and compare the total with `grep -o`.

   The last `size % nthreads` bytes are never searched.
   On a file of random words the loss is a few bytes and rarely a match, which is what makes the bug easy to ship.
1. **Count the `clone3()` calls and look at the stacks.**

   ```console
   strace -f -e trace=clone3,mmap ./search big.txt kernel 4 2>&1 | grep -c clone3
   ```

   Four, one per thread, each preceded by an `mmap()` of 8 MiB plus a guard page for the thread's stack.
   `ulimit -s` is the default thread stack size; `pthread_attr_setstacksize()` changes it.
1. **Time it.**

   ```console
   time ./search big.txt kernel 1
   time ./search big.txt kernel 8
   ```

   On this machine the single-threaded search of 64 MiB takes about 30 ms, which is too little to see a difference: starting a thread costs tens of microseconds, and the rest is memory bandwidth.
   Make the file a gigabyte, or use a word whose first letter is common, and the difference shows.
   Measuring speed-ups properly is session 07.

## Questions to answer

* **Why is there no race in this program, when all the threads read the same mapping?**
  Reading is not a race; two threads writing the same location, or one writing while another reads, is.
  The mapping is read-only, and the only writes are each thread's own `count`, a local on its own stack, and the `printf()`, which the C library serialises line by line.
* **Where does each thread's `count` live?**
  On that thread's stack, which no other thread has a pointer to.
  Stack variables are per thread; globals and the heap are shared.
* **Why does `pthread_create()` take a `void *` and not, say, an `int`?**
  So that it can pass anything: a pointer to a struct is one word, and a struct can hold whatever the thread needs.
  Casting an integer to `void *` to avoid the struct works and is a habit worth not acquiring.
* **What does the process look like in `ps` while the threads run?**
  One process with four threads: `ps -L` or `top -H` lists them separately, with the same PID and different TIDs (thread IDs).
  To the scheduler they are four runnable tasks; to the memory system, one address space.

## Discussion points

* **Threads share memory; processes copy it.**
  Handing a thread a pointer is free, and the thread sees every later change.
  Handing a child process a pointer is useless: it points into the child's copy.
* **Partition, then run.**
  Every structure the threads use was built before the first `pthread_create()` and not changed until after the last `pthread_join()`.
  Within that window each thread owns its region and nothing else, which is a design that needs no locks, and the one to reach for first.
* **The output order is not the start order.**
  The first thing every student notices, and the right thing to notice: once started, threads are independent, and the program has to say explicitly where they meet again.

## References

* `man 3 pthread_create`, `man 3 pthread_join`, `man 3 pthread_attr_setstacksize`, `man 7 pthreads`
* `man 2 clone`
* `man 1 ps` — `-L`, for threads

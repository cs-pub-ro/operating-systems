# Going Further: How Much Faster Do More Threads Make It?

With answers.

## Things to try

1. **Count straight into the region.**
   Replace the call to `count_char()` in the thread function with a loop that increments `r->count` for every match, instead of a local variable.

   ```C
   for (i = 0; i < r->len; i++)
   	if (r->start[i] == TARGET)
   		r->count++;
   ```

   The answer is the same, and no two threads write the same variable, so there is still no race.
   The times are another matter: 0.29 s with one thread, **0.49 s with two**, 0.28 s with four, 0.16 s with twelve.
   Two threads are slower than one.

   The regions are neighbours in one array, 24 bytes each, and a processor's cache works in lines of 64 bytes.
   Two threads' `count` fields sit in the same line, and every write by one core takes the line away from the other, a million times a second.
   This is **false sharing**: the variables are not shared, the cache line is.
   The local variable in `count_char()` lives on the thread's own stack, megabytes away from anyone else's, which is one more reason to compute in locals and store once.
1. **Parallelize the filling too**, with the same regions and a second round of threads.

   The sequential part drops from 27% to the few percent that starting the program and `malloc()` take, and the whole-program speed-up follows the counting's.
   What was the limit is gone, and the next one, whatever is still sequential, takes its place.
1. **Pin the program to one processor**: `taskset -c 0 ./count_chars 8`.

   Eight threads take turns on one core and finish in the time of one thread, 0.27 s: the threads are there, the parallelism is not.
   Then `taskset -c 0,1 ./count_chars 8`.
   On the reference machine that gives 0.22 s, nowhere near half: processors 0 and 1 are the two hardware threads of the same core, and `lscpu -e` shows which processors share one.
   A hardware thread is not a core.
1. **Build with `-O2`** in `CFLAGS` and run the benchmark again.

   The counting takes 0.065 s with one thread, four times less than before, and 0.012 s with twelve: a speed-up of 5.4 where the unoptimized loop reached 6.5.
   The faster the loop, the sooner it is limited by how fast memory can be read, and the threads share the memory bus.
   It is also worth noticing that the compiler flag bought as much as four cores did.

## Questions to answer

* **The `user` time is the same with one thread and with four.
  What does that say?**
  The program does the same amount of computation; it does it on four cores at once.
  Threads do not reduce work, they spread it.
  When `user` goes up with the thread count, the extra is overhead.
* **`user` is greater than `real` with four threads.
  Is the clock wrong?**
  `real` is time on the wall; `user` is processor time, added up over all the cores.
  Four cores busy for 0.07 s make 0.28 s of `user` time.
* **Which is the right number of threads?**
  For work that only computes, the number of cores, and `nproc` or `sysconf(_SC_NPROCESSORS_ONLN)` says what that is on the machine the program runs on.
  A number written into the source is right for one machine.
* **A program is 95% parallelizable.
  What is the most that 64 cores can do for it?**
  1 / (0.05 + 0.95 / 64) = 15.4, and no number of cores gives more than 20.

## Discussion points

* **Measure the whole program, not the part you parallelized.**
  The counting's 6.5 is what was worked for; the program's 2.65 is what the user gets.
* **The sequential part is what to look at next.**
  Amdahl's law is a way of choosing what to work on: past a point, more threads on the parallel part gain nothing, and the remaining gain is all in the part that was left alone.
* **Threads are not free.**
  A stack, a system call, a scheduler entry, and a share of the caches each.
  A program that creates a thread per item of work has decided that every item is worth that.

## References

* `man 1 taskset`, `man 1 lscpu`
* `man 3 sysconf` — `_SC_NPROCESSORS_ONLN`
* `getconf LEVEL1_DCACHE_LINESIZE` — the size of a cache line

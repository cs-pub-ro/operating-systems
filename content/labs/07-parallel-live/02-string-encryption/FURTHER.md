# Going Further: Parallel String Encryption

Optional.

## Things to try

1. **Split the remainder fairly.**
   Giving all the leftover characters to the last thread is simple; with 64 threads and a size that leaves 63 over it hardly matters, and with a small string it would.
   Give the first `size % nthreads` parts one character more each instead, and check the round trip.
1. **Time the whole program** with `time`, for 1 and 8 threads, and compare with the time the program prints.
   Filling the string, checking it and decrypting it are all done by one thread.
   What is the best `real` time any number of threads could give?
1. **Parallelize the decryption too**, with a second round of threads, and check with `time` how much of the answer to the previous question changed.
   The check is then no longer independent of the code it checks: what kind of mistake would it now miss?
1. **Ask for more parts than there are characters**: shrink the string to a few bytes in the source and run with 64 threads.
   What is `chunk`, what does each thread do, and is the result still right?
1. **Build with `-O2`** added to `CFLAGS`, and time 1 and 8 threads again.
   Unlike most loops, this one hardly gets faster.
   One operation in it is expensive whatever the compiler does; find it, and write the loop without it.

## Questions to answer

* Two threads write to the same array at the same time, and there is no race.
  State the rule that makes that true.
* Why is the key byte chosen by the position in the whole string, not in the part?
  What would decryption have to know if it were the other way round?
* The key is read by every thread.
  Does that need a lock?
* A key whose length divides the part size hides the key-phase mistake.
  What does that say about test inputs that are powers of two?

## Discussion points

* **Disjoint parts need no lock.**
  The partition is the synchronization: each thread owns its characters from the moment it starts until it is joined.
* **A parallel version has to give the sequential answer.**
  Not an answer that is as good: the same bytes.
  A sequential reference to compare with is the cheapest test there is, which is why the program keeps one.
* **Offsets are where parallel programs go wrong.**
  The first byte, the last byte, the leftover bytes, and anything that depends on position, such as the key here or the matches across a cut in the search.

## References

* `man 3 pthread_create`, `man 3 pthread_join`
* `man 1 time`

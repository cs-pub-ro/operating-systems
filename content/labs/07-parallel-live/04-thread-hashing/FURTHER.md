# Going Further: Hashing Files With Several Threads

Optional.

## Things to try

1. **A fixed number of threads, and a shared index.**
   One thread per file is 256 threads for 256 files.
   Start `nproc` threads instead; each one, in a loop, takes the next file that nobody has taken yet, hashes it, and stops when there are none left.
   "The next file" is a shared variable that every thread reads and changes: protect it with a mutex, and keep the hashing itself outside the lock.
1. **Take the mutex out of that version**, on purpose, and run it a few dozen times on many small files (`./gen_files.sh 200 1`).
   The output stays right, which does not mean the program is.
   Count, per file, how many times it was hashed, and look for a count that is not 1.
1. **Hold the lock for too long**: in the shared-index version, lock before taking the index and unlock after the hashing.
   The output is right.
   Time it, and say how many threads are hashing at any moment.
1. **Give two threads one `struct md5_ctx`.**
   Read `md5_update()` and say, without running anything, what two threads calling it on the same context would do to `buflen`.
   That is why `md5_file()` has its context as a local variable.
1. **Make one file much larger than the others** (`head -c 512M /dev/urandom > data/file-01.bin`) and time the run.
   What decides the total time now, and would more threads help?

## Questions to answer

* The threads all call `md5_file()` at the same time, and it uses no lock.
  What would it have to contain for that to be wrong?
* Each thread writes into its own element of an array that the main thread later reads.
  Why is there no race on the array?
* The lines came out in a different order on every run in the previous exercise, and come out in list order here.
  The work is done in the same unpredictable order in both; what is different?
* A thread that hits an unreadable file reports it through its struct.
  What would have happened to the whole program if it had called `exit(1)` instead?

## Discussion points

* **Threads can hand back data; processes hand back a status.**
  The result here is a string in shared memory, read after a join.
  The previous exercise had no such place, and let every child print for itself.
* **A function is safe for threads when it keeps its state to itself.**
  Locals, and memory the caller owns, are per call.
  Globals and `static` variables are per program, and a function that uses them needs a lock or a rewrite.
* **A work queue is a shared variable.**
  The moment the threads decide for themselves what to work on next, that decision is a critical section, and a short one.

## References

* `man 3 pthread_create`, `man 3 pthread_join`, `man 3 pthread_mutex_lock`
* RFC 1321, *The MD5 Message-Digest Algorithm*

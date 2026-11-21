# Going Further: A Name With Two Owners

Optional.

## Things to try

1. **Wrap instead of restructure.**
   Keep `registry_register()` as it is and put a lock around its body, with the same mutex.
   Run it with `./chall 0` and look at the threads with `ps -L -o lwp,stat,wchan:20 -p $(pidof chall)`.
1. **Run the broken library under Helgrind**: `valgrind --tool=helgrind ./chall 0`.
   Read the summary.
   What does that tell you about what Helgrind looks for, and what it cannot see?
1. **The same bug with files.**
   A program checks with `access("report.txt", W_OK)` that the user may write a file, and then opens it with `open("report.txt", O_WRONLY)`.
   What can another process do between the two calls?
   Look at what `O_CREAT | O_EXCL` does, in `man 2 open`, and say which problem of this exercise it solves.

## Questions to answer

* In the broken library, no two threads are ever inside the array at once.
  Is there a data race in it?
  Is there a race condition?
* The executable makes the threads wait at a barrier before every name.
  What would the output look like without the barrier, and would the library be any more correct?
* `registry_contains()` is still in the interface after your fix.
  A caller writes `if (!registry_contains(reg, name)) registry_register(reg, name);`.
  Is that a bug?

## Discussion points

* **Atomic steps do not add up to an atomic operation.**
  Two functions that are each correct under concurrency can be combined into one that is not.
* **The interface decides what can be done safely.**
  A registry that offered only `contains` and `add` could not be used correctly by anybody.
  `register`, which does both in one step, is the operation the callers needed all along.
* **TOCTOU is also a security problem.**
  The classic cases are in file systems, where the check and the use are two system calls, and somebody else changes the file in between.

## References

* `man 3 pthread_mutex_lock`
* `man 2 open` — `O_EXCL`
* Lecture 08, part 05, *Problems with synchronization* — the `toctou` demo

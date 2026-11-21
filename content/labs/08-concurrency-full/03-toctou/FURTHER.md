# Going Further: A Name With Two Owners

With answers.

## Things to try

1. **Wrap instead of restructure.**

   The program stops on the first name, and the time-out reports it.
   `ps -L` shows all nine threads asleep in `futex_wait_queue`.
   One thread locked the mutex in `registry_register()` and then again in `registry_contains()`, and waits for itself; the other seven wait for it at the first lock, and the main thread waits for all of them in `pthread_join()`.
1. **Run the broken library under Helgrind.**

   ```text
   names given to one thread:  500 (expected 500)
   ERROR SUMMARY: 0 errors from 0 contexts
   ```

   No errors, and no duplicates either: the broken library gets the flag.
   Helgrind looks for memory that two threads touch with no lock in common, and here every access has the lock.
   The flaw is in the logic, in what the code assumes between two critical sections, and no tool that looks at accesses can see an assumption.
   And Valgrind runs the threads one at a time, switching rarely, so the window between the check and the act is hardly ever hit.
   A clean run under a tool is evidence about the kind of bug that tool looks for, and about nothing else.
1. **The same bug with files.**

   Between `access()` and `open()`, another process can replace `report.txt` with a symbolic link to a file the user may not write; a program that runs with more rights than its user, and checks on the user's behalf, then writes where it should not.
   The fix has the same shape as the fix here: one call that checks and acts.
   `open()` with `O_CREAT | O_EXCL` fails if the file exists and creates it if not, as one operation inside the kernel: the file system's `registry_register()`.

## Questions to answer

* **Is there a data race?
  Is there a race condition?**
  No data race: every access to the array is under the lock.
  A race condition, yes: the result depends on the order in which the threads run.
  The two are different things, and this exercise is the one where they come apart.
* **What would the output look like without the barrier?**
  Fewer duplicates, perhaps none on most runs, because the threads would rarely ask for the same name within the same microsecond.
  The library would be exactly as wrong.
  The barrier does not create the bug; it makes the window wide enough to hit.
* **Is `if (!registry_contains(...)) registry_register(...)` a bug?**
  No, only redundant: `registry_register()` checks again, under its own lock, and its answer is the one that counts.
  A caller that acted on the answer of `registry_contains()` alone, by telling the user "this name is free", would be reporting something that may no longer be true.

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
* `man 2 access` — the warning in its NOTES section
* MITRE, *CWE-367: Time-of-check Time-of-use (TOCTOU) Race Condition* — <https://cwe.mitre.org/data/definitions/367.html>

# Going Further: Debugging an In-Memory Database with GDB and Valgrind

Optional.

## Things to try

1. **Fix the bugs in the wrong order.**
   Try to fix the leak first, before the crash.
   You cannot get to it: the leak lives in a function the program never reaches while it still segfaults.
   In what order does a program let you fix its bugs?
1. **Watch the array move.**
   Put a breakpoint on `db_grow()` and print `db->records` on entry and on exit.

   ```console
   (gdb) break db_grow
   (gdb) commands
   > print db->records
   > continue
   > end
   ```

   Sometimes the address changes and sometimes it does not.
   What does a pointer that is only *sometimes* dangling do to your testing?
1. **Reproduce bug 1 without the crash.**
   Pre-allocate the array so `capacity` is never 0, then put the buggy `count == capacity - 1` condition back.
   The bug disappears.
   What does that say about test data that never exercises the empty case?
1. **Make bug 3 visible without Valgrind.**
   Call the leaking function ten thousand times and watch the process's memory grow in `top` or `/proc/<pid>/status`.
1. **Turn the by-hand growth into a real `realloc()`.**
   Rewrite `db_grow()` as a single `realloc()` call.
   Does the dangling-pointer bug still happen? Why?

## Questions to answer

* `capacity - 1` where `capacity` is a `size_t` and equals 0 — what is the value, and why is it not `-1`?
* Why did the crash happen where it did, rather than in the function with the actual mistake?
* Valgrind's use-after-free report names three lines. What is each of them, and which one is the bug?
* Bug 3 leaked memory and produced perfect output. What kind of program does that bug actually break, and after how long?
* If you only had `gdb` and not Valgrind, how would you find bug 3?

## Discussion points

* **The symptom picks the tool.**
  A crash hands you a location for free — run it under `gdb` and read the backtrace.
  A wrong answer does not, so you aim the microscope yourself.
  No visible symptom at all needs a tool that audits the whole run, and that means Valgrind.
  All three appear in this one program on purpose.
* **Unsigned arithmetic does not go negative.**
  Every subtraction on a `size_t` that can reach zero is a candidate bug.
  `count == capacity` needs no subtraction, which is why it is the right way to write it.
* **A pointer into a container is valid only until the container changes shape.**
  Storing an index instead is almost always safer.
* **The last bug is the important one.**
  A program that produces exactly the right output is not necessarily a correct program.
* **Fix one thing, rebuild, rerun.**
  Debugging a stale binary is the most common way to waste twenty minutes.

## References

* `man 1 gdb`, and the [GDB documentation on breakpoints](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Breakpoints.html)
* `man 1 valgrind`, and the [Valgrind quick start guide](https://valgrind.org/docs/manual/quick-start.html)
* `man 3 realloc`, `man 3 free`

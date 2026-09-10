# Going Further: Debugging an In-Memory Database with GDB and Valgrind

## Things to try

1. **Fix the bugs in the wrong order.**
   Start from the buggy version and try to fix the leak first, before the crash.
   Valgrind's leak report is buried under the segfault, and the program never reaches `db_print_sorted()` anyway.
   Bugs queue up, and the queue is ordered by how loudly each one fails.
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
   A pointer that is only *sometimes* dangling is worse than one that always is.
1. **Reproduce bug 1 without the crash.**
   Change `db_add()` back to `count == capacity - 1` but pre-allocate the array first, so `capacity` is never 0.
   The bug disappears.
   What does that say about test data that never exercises the empty case?
1. **Make bug 3 visible without Valgrind.**
   Call `db_print_sorted()` in a loop ten thousand times and watch the process's memory grow in `top` or in `/proc/<pid>/status`.
   This is what a leak looks like when nobody is running Memcheck: a server that has to be restarted every few days.
1. **Turn the by-hand growth into a real `realloc()`.**
   Rewrite `db_grow()` as a single `realloc()` call using the temporary-pointer idiom from session 03.
   Does the use-after-free in bug 2 still happen? Why?
1. **Try `gdb`'s `watch` on the crash.**
   `watch db->records` before the first `db_add()`, then `continue`.
   Compare that experience with reading the backtrace: which one would you rather use on a bug you have never seen before?

## Questions to answer

* `capacity - 1` where `capacity` is a `size_t` and equals 0.
  What is the value, and why is it not `-1`?
* Why did the crash happen in `db_add()` rather than in `db_grow()`?
* Valgrind's use-after-free report names three lines.
  What is each of them, and which one is the bug?
* Bug 3 leaked 360 bytes and produced perfect output.
  What kind of program does that bug actually break, and after how long?
* If you only had `gdb` and not Valgrind, how would you find bug 3?

## Discussion points

* **The symptom picks the tool.**
  A crash hands you a location for free — run it under `gdb` and read the backtrace.
  A wrong answer does not, so you have to aim the microscope yourself.
  No visible symptom at all needs a tool that audits the whole run, and that means Valgrind.
  All three appear in this one program on purpose.
* **Unsigned arithmetic does not go negative.**
  Every subtraction on a `size_t` that can reach zero is a candidate bug.
  `count == capacity` needs no subtraction at all, which is why it is the right way to write it.
* **A pointer into a container is only valid until the container changes shape.**
  Storing an index instead is almost always the safer habit.
* **The last bug is the important one.**
  A program that produces exactly the right output is not necessarily a correct program.
  This is the idea the rest of the session is built on.
* **Fix one thing, rebuild, rerun.**
  Debugging a stale binary is the most common way to waste twenty minutes.

## References

* `man 1 gdb` — and the [GDB documentation on breakpoints](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Breakpoints.html)
* `man 1 valgrind`, and the [Valgrind quick start guide](https://valgrind.org/docs/manual/quick-start.html)
* `man 3 realloc`, `man 3 free`

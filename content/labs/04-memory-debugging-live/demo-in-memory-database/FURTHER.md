# Going Further: Debugging an In-Memory Database

Optional.

## Things to try

1. **Print the address of the array.**
   Add a print of `db.records` after every `db_add()` in `main()` and run the program.
   The address changes a few times.
   What happens to a pointer into the old array each time it does?
1. **Reproduce bug 1 without the crash.**
   Pre-allocate the array so that `capacity` is never 0, then put the buggy `count == capacity - 1` condition back.
   The bug disappears.
   What does that say about test data that never exercises the empty case?
1. **Turn the by-hand growth into a real `realloc()`.**
   Rewrite `db_grow()` as a single `realloc()` call.
   Does the dangling-pointer bug still happen?
   Why?
1. **Read the whole Valgrind report for bug 2.**
   It names three places: where the freed memory was read, where it was freed, and where it was allocated.
   Which of the three is the bug?

## Questions to answer

* `capacity - 1` where `capacity` is a `size_t` equal to 0: what is the value, and why is it not `-1`?
* Why did the crash happen in `db_add()` rather than in the function with the actual mistake?
* The wrong record id printed by bug 2 differs from run to run.
  Where does that number come from?
* If the program had printed the right record by luck, how would you have found bug 2?

## Discussion points

* **The symptom picks the tool.**
  A crash tells you where: run it under GDB and read the backtrace.
  A wrong answer does not: print what the code computes and compare it with what you expect.
  Valgrind audits the whole run, and catches what neither of the other two shows.
* **Unsigned arithmetic does not go negative.**
  Every subtraction on a `size_t` that can reach zero is a candidate bug.
  `count == capacity` needs no subtraction, which is why it is the right way to write it.
* **A pointer into a container is valid only until the container changes shape.**
  Storing an index instead is almost always safer.
* **Fix one thing, rebuild, rerun.**
  Debugging a stale binary is the most common way to waste twenty minutes.

## References

* `man 1 gdb`, and the [GDB documentation on backtraces](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Backtrace.html)
* `man 1 valgrind`, and the [Valgrind quick start guide](https://valgrind.org/docs/manual/quick-start.html)
* `man 3 realloc`, `man 3 free`

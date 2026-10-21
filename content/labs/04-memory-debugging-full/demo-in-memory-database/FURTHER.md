# Going Further: Debugging an In-Memory Database

## Things to try

1. **Print the address of the array.**
   Add a print of `db.records` after every `db_add()` in `main()` and run the buggy version with bug 1 fixed.
   The address changes after the fourth and the eighth record, each time `db_grow()` runs, and `first` keeps the first address.
   From that moment on it points at a block that has been freed, and what is read through it is whatever the allocator has done with the memory since.
   A pointer that is only *sometimes* dangling is worse than one that always is: the test data decides whether the bug shows.
1. **Reproduce bug 1 without the crash.**
   Change `db_add()` back to `count == capacity - 1` but pre-allocate the array first, so that `capacity` is never 0.
   The bug disappears: with `capacity` at 4 the condition becomes `count == 3`, the array grows one record early, and nothing visible goes wrong.
   Test data that never exercises the empty case never finds the underflow, which is why every container test should start from empty.
1. **Turn the by-hand growth into a real `realloc()`.**
   Rewrite `db_grow()` as a single `realloc()` call using the temporary-pointer idiom from session 03.
   Bug 2 still happens: `realloc()` is allowed to move the block, and does whenever it cannot extend it in place, so `first` dangles exactly as before.
   The by-hand version only makes the move visible.
1. **Read the whole Valgrind report for bug 2.**
   It names three places: the read at line 178, the `free()` in `db_grow()` at line 68, and the `malloc()` in `db_grow()` at line 62.
   None of them is the bug.
   The bug is `first = &db.records[0]`, which is on no stack trace because, at the moment it ran, it was perfectly legal.

## Questions to answer

* **`capacity - 1` where `capacity` is a `size_t` and equals 0: what is the value, and why is it not `-1`?**
  `SIZE_MAX`, which is 18,446,744,073,709,551,615 on a 64-bit machine.
  Unsigned arithmetic wraps around modulo 2^64; there is no negative value for it to become.
* **Why did the crash happen in `db_add()` rather than in the function with the actual mistake?**
  The mistake *is* in `db_add()`, in the condition; the crash is three lines below it, at the first store through the `NULL` array.
  In general a crash is where a bad value is *used*, and the mistake is where it was *made*; here the two happen to be close.
* **The wrong record id printed by bug 2 differs from run to run. Where does that number come from?**
  From whatever the allocator wrote into the freed block afterwards: bookkeeping, or the contents of a later allocation.
  Reading freed memory has no defined answer, and the variation between runs is the giveaway.
* **If the program had printed the right record by luck, how would you have found bug 2?**
  Only with Valgrind, which reports the read of freed memory whether or not the value happens to be intact.
  That is the case the leak demo and the three leak exercises are about: no symptom, and a tool that audits the whole run.

## Discussion points

* **The symptom picks the tool.**
  A crash tells you where: run it under GDB and read the backtrace.
  A wrong answer does not: print what the code computes and compare it with what you expect.
  Valgrind audits the whole run, and catches what neither of the other two shows.
  Both appear in this one program on purpose, and the leak demo adds the third.
* **Unsigned arithmetic does not go negative.**
  Every subtraction on a `size_t` that can reach zero is a candidate bug.
  `count == capacity` needs no subtraction at all, which is why it is the right way to write it.
* **A pointer into a container is only valid until the container changes shape.**
  Storing an index instead is almost always the safer habit.
* **Fix one thing, rebuild, rerun.**
  Debugging a stale binary is the most common way to waste twenty minutes.

## References

* `man 1 gdb`, and the [GDB documentation on backtraces](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Backtrace.html)
* `man 1 valgrind`, and the [Valgrind quick start guide](https://valgrind.org/docs/manual/quick-start.html)
* `man 3 realloc`, `man 3 free`

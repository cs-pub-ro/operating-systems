# Going Further: The Histogram That Counts Too Much

Optional.

## Things to try

1. **Rebuild with AddressSanitizer** and rerun:

   ```console
   gcc -Wall -Wextra -g -fsanitize=address -o histogram main.c
   ./histogram < input.txt
   ```

   Does it catch what Valgrind missed?
   Compare the two tools' models of what "out of bounds" means — one of them knows the shape of the struct and the other only knows the shape of the allocation.
1. **Make the struct tell you.**
   Move the `total` field so it sits *before* the bucket array rather than after it, rebuild, and rerun the original buggy version.
   What breaks instead? What does that say about how reliable "it works" is as evidence?
1. **Ask the compiler for help.**
   Try `-fsanitize=undefined`, and try declaring the bucket array with a size the compiler can see at the point of the write.
   Which, if any, of these turns the bug into a diagnostic?
1. **Conditional breakpoints properly.**
   `break record_grade if grade == 100`, then `bt`, `info args`, `print *st`.
   Learn `x/11dw st->counts` to dump the whole array at once.
1. Write the same bug with a plain stack array instead of a heap struct.
   Does Valgrind find it then? Why or why not?

## Questions to answer

* Why did Valgrind report nothing?
  What does Memcheck actually track, and what is it blind to?
* `main()` validates that every grade is in `0..100`.
  Why was that not enough?
* How many buckets does a `0..100` range with ten-point buckets actually need?
  Write down the arithmetic before looking at the code.
* The program printed a plausible histogram the whole time.
  What would have had to be different about the input for the bug to be obvious?

## Discussion points

* **Validating the input is not the same as validating the index you compute from it.**
  The check on the grade was correct; the mapping from grade to bucket was not.
* **Valgrind's blind spot matters.**
  Memcheck works at the granularity of *allocations*, not *fields*.
  A write past the end of an array that is still inside the same `malloc`ed block is invisible to it — it hit the wrong field, not the wrong block.
  This is exactly why "Valgrind is clean" is necessary but not sufficient.
* **An inclusive upper bound is a classic off-by-one generator.**
  `0..100` is 101 values, not 100, and every ten-point bucketing scheme has to decide where 100 goes.
* **GDB and Valgrind answer different questions.**
  Valgrind audits the whole run for memory-safety violations it can see; GDB is a microscope on one run, and needs you to aim it.
  This exercise is the case where only the microscope works.

## References

* `man 1 gdb`, and the [GDB documentation on breakpoints](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Breakpoints.html)
* [AddressSanitizer](https://github.com/google/sanitizers/wiki/AddressSanitizer)
* `man 1 valgrind`

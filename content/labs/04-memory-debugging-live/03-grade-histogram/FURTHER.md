# Going Further: The Histogram That Counts Too Much

Optional.

## Things to try

1. **Rebuild with AddressSanitizer** and rerun the buggy version:

   ```console
   gcc -Wall -Wextra -g -fsanitize=address -o histogram main.c
   ./histogram < input.txt
   ```

   Does it catch what Valgrind missed?
   Compare the two tools' models of what "out of bounds" means: one of them knows the shape of the struct and the other only knows the shape of the allocation.
1. **Ask the compiler for help.**
   Try `-fsanitize=undefined` on the buggy version.
   Which tool, if any, turns the bug into a message with a line number?
1. **Move `total` before the array** in the struct, rebuild the buggy version and rerun.
   What breaks instead?
   What does that say about how reliable "it works" is as evidence?
1. **Write the same bug with a plain stack array** instead of a heap struct.
   Does Valgrind find it then?
   Why or why not?
1. **Print less.**
   Change your debugging print so that it only fires when the bucket is out of range.
   A print with a condition is a breakpoint you wrote yourself.

## Questions to answer

* Why did Valgrind report nothing?
  What does it actually track, and what is it blind to?
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
  It works at the level of *allocations*, not fields.
  A write past the end of an array that is still inside the same `malloc`ed block is invisible to it.
  This is why "Valgrind is clean" is necessary but not sufficient.
* **An inclusive upper bound is a classic off-by-one generator.**
  `0..100` is 101 values, not 100, and every ten-point bucketing has to decide where 100 goes.
* **When a value is wrong, print the values it was computed from.**
  One line of output next to the suspicious line beats an hour of reading.

## References

* [AddressSanitizer](https://github.com/google/sanitizers/wiki/AddressSanitizer)
* [UndefinedBehaviorSanitizer](https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html)
* `man 1 valgrind`

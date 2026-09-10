# Going Further: The Program That Is Right and Still Broken

Optional.

## Things to try

1. **Make the leak grow.**
   Feed the program a file whose words get steadily longer (`python3 -c "[print('a'*i) for i in range(1,2000)]"`).
   Watch the leaked byte count in Valgrind scale with the input.
   This is what a leak looks like in a long-running process.
1. **Introduce the opposite bug.**
   Free the old string *after* assigning the new pointer over it, then run Valgrind.
   You have traded a leak for a use-after-free or a double free — read what Valgrind says about each.
1. **Use `--show-leak-kinds=all`** and compare "definitely lost", "indirectly lost", "possibly lost" and "still reachable" on this program.
   Construct an input or a small change that produces each category.
1. **Try AddressSanitizer** (`-fsanitize=address` with `ASAN_OPTIONS=detect_leaks=1`).
   Compare the report with Valgrind's: which is easier to read, and which one slowed the program down more?
1. **Restructure so the bug cannot happen.**
   Use a fixed-size buffer, or `realloc` the existing block instead of allocating a new one.
   Which version would you rather maintain?

## Questions to answer

* How many heap allocations does the program make for `input.txt`, and how many should it free?
  Valgrind prints both numbers — predict them first.
* Why is `free(NULL)` safe, and what does that let you leave out of your fix?
* What exactly does "definitely lost" mean, as distinct from "still reachable"?
* The output was correct throughout.
  What kind of program does this bug actually break, and after how long?

## Discussion points

* **The struct owns the string.**
  Once you say that out loud, the fix writes itself: an owner must release the old resource before taking a new one.
  Most memory bugs are unclear ownership rather than unclear code.
* **A leak has no moment.**
  It is the *absence* of an event, which is why the stack trace in a leak report points at the **allocation** site rather than at "where the leak happened".
* **A correct answer is not a correctness proof.**
  This program passes every functional test anyone would write for it.
* **The obvious fix can introduce a worse bug.**
  Freeing in the wrong order turns a leak into a use-after-free — a leak wastes memory, a use-after-free is a security vulnerability.

## References

* `man 3 free` — on `free(NULL)`
* [Valgrind manual — memory leak categories](https://valgrind.org/docs/manual/mc-manual.html#mc-manual.leaks)
* [AddressSanitizer](https://github.com/google/sanitizers/wiki/AddressSanitizer)

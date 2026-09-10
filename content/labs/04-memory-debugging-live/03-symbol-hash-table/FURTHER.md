# Going Further: The Symbol Table With Three Bugs

Optional.

## Things to try

1. **Make the table big enough and see what does *not* change.**
   Change `symtab_create(8)` to `symtab_create(1024)` and run the buggy version.
   Twelve symbols in a thousand buckets means no collisions — and it still crashes.
   Which of the three bugs actually needed a chain to fire, and which did not?
   What does the small table buy you, if not the bugs themselves?
1. **Swap `malloc()` for `calloc()`** in `symtab_insert()` without adding the missing pointer assignment.
   One bug disappears.
   Is that a fix, or an accident of the allocator? Which would you rather read in six months?
1. **Remove a middle node instead of a head.**
   Fix the first bug only, then change the driver to remove a symbol that is the *second* entry in its bucket rather than the first (`g_log_buffer`).
   One of the remaining bugs stops firing. Then remove the head of that same bucket and it comes back.
   What does it mean for a bug to depend on *which* entry you touch?
1. **Count the allocations by hand** before running Valgrind, then reconcile your number with the total Memcheck reports.
1. **Add a resize** that rehashes every entry when the table gets too full.
   You now have a third place that walks every chain — do your `symtab_remove()` assumptions still hold there?
1. **Use `--track-origins=yes`** on the buggy version and see how much closer it gets you to the uninitialised-value bug.

## Questions to answer

* Why did the first crash appear inside `printf` rather than in the hash table code?
  How do you get from there to the frame that matters?
* Memcheck reported "Conditional jump depends on uninitialised value(s)" during the very first insert.
  Which line, and why is a *test* of a value already an error, before any dereference?
* Why does the head-removal bug not fire when you remove from the middle of a chain?
* A use-after-free report names three lines. Which of them is the bug, and which are only where its effects surfaced?
* How many heap blocks does one entry own, and how many places have to free them?
* Which of these three bugs would a unit test have caught, and what would the test have had to do?

## Discussion points

* **`malloc()` does not zero; `calloc()` does.**
  A freshly allocated struct is uninitialised in every field.
  Setting three of four is the version that hides best, because the fourth usually holds something plausible.
* **A singly linked list has two removal shapes.**
  The head has no predecessor to relink, so code that only tests `prev != NULL` handles one of the two cases and silently corrupts the other.
* **Test data has to produce the structures you claim to support.**
  A hash table tested without a single collision has not been tested as a hash table.
* **The frees must mirror the allocations.**
  Count the owned blocks per object, then check every teardown path frees all of them.
* **Each bug hides the next.**
  There is no run on which all three are visible, so code review does not converge.
  Fix, rebuild, rerun, and let the new symptom pick the next tool.

## References

* `man 1 gdb`, and the [GDB documentation](https://sourceware.org/gdb/current/onlinedocs/gdb.html/)
* `man 1 valgrind`, the [Memcheck manual](https://valgrind.org/docs/manual/mc-manual.html), and its [`--track-origins`](https://valgrind.org/docs/manual/mc-manual.html#opt.track-origins) option
* `man 3 malloc`, `man 3 calloc`, `man 3 strdup`

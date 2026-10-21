# Going Further: The Symbol Table With Two Bugs

Optional.

## Things to try

1. **Make the table big enough and see what does *not* change.**
   Change `symtab_create(8)` to `symtab_create(1024)` and run the buggy version.
   Twelve symbols in a thousand buckets means no collisions, and it still crashes.
   Which of the two bugs needed a chain to fire, and which did not?
1. **Swap `malloc()` for `calloc()`** in `symtab_insert()` without adding the missing assignment.
   Does anything change?
   Is `calloc()` a fix for this bug, and what would the right fix say that `calloc()` does not?
1. **Remove a middle node instead of a head.**
   Fix the missing-symbols bug only, then change the driver to remove `g_log_buffer`, the second entry in its bucket, instead of `g_retry_limit`.
   The crash stops firing.
   Then remove the head of that same bucket, and it comes back.
   What does it mean for a bug to depend on *which* entry you touch?
1. **Forget the name.**
   In the fixed version, remove the `free(entry->name)` from `symtab_remove()` and run `valgrind --leak-check=full`.
   A third kind of bug, with no symptom at all, and the report that finds it.
1. **Use `--track-origins=yes`** on the buggy version and see how much closer it gets you to the uninitialised field.

## Questions to answer

* Why did the crash appear inside `printf()` rather than in the hash table code?
  How do you get from there to the frame that matters?
* Valgrind reported "Conditional jump or move depends on uninitialised value(s)" during the very first insert.
  Which line, and why is a *test* of a value already an error, before any dereference?
* The field nobody set happened to be zero, and the program lost symbols instead of crashing.
  What would have happened on a machine where it was not zero?
* Why does the head-removal bug not fire when you remove from the middle of a chain?
* A use-after-free report names three lines.
  Which of them is the bug, and which are only where its effects surfaced?

## Discussion points

* **`malloc()` does not zero; `calloc()` does.**
  A freshly allocated struct is uninitialised in every field, and uninitialised memory often *looks* initialised, which is the worst thing about it.
  Setting three of four fields is the version that hides best.
* **A singly linked list has two removal shapes.**
  The head has no predecessor to relink, so code that only tests `prev != NULL` handles one of the two cases and silently corrupts the other.
* **Test data has to produce the structures you claim to support.**
  A hash table tested without a single collision has not been tested as a hash table.
* **Read the whole output, not just the last line.**
  The crash was the loud bug; the header disagreeing with the list above it was the quiet one, and it was on the screen the whole time.

## References

* `man 1 gdb`, and the [GDB documentation](https://sourceware.org/gdb/current/onlinedocs/gdb.html/)
* `man 1 valgrind`, the [Memcheck manual](https://valgrind.org/docs/manual/mc-manual.html), and its [`--track-origins`](https://valgrind.org/docs/manual/mc-manual.html#opt.track-origins) option
* `man 3 malloc`, `man 3 calloc`, `man 3 strdup`

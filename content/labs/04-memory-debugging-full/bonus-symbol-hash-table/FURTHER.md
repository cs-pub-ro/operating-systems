# Going Further: The Symbol Table With Two Bugs

## Things to try

1. **Make the table big enough and see what does *not* change.**
   Change `symtab_create(8)` in `main.c` to `symtab_create(1024)` and run the *buggy* version.
   Twelve symbols in a thousand buckets means no collisions at all, so nothing is dropped and the first dump is complete; and it still segfaults after the removal, because a lone entry in a bucket is still that bucket's head.
   The uninitialised `next` is still there too, and Memcheck still flags it on every insert.
   What the undersized table actually buys is *observability*: with chains of two and three you can see the dropped symbols, and you can contrast removing a head with removing a middle node, which is the experiment two items down.
1. **Swap `malloc()` for `calloc()`** in `symtab_insert()` without adding the `entry->next` assignment.
   Nothing visible changes, because on this machine `next` was already reading as zero: the dump still lists six symbols.
   `calloc()` makes the zero guaranteed rather than accidental, so Memcheck stops complaining about uninitialised values, and the program is still wrong, because `NULL` is not the value `next` should have.
   The right fix says what the field means: the previous head of the bucket.
1. **Remove a middle node instead of a head.**
   Fix the `next` bug only, then change the driver to remove `g_log_buffer`, the second of the three entries in bucket 6, rather than `g_retry_limit`.
   The program now runs to completion with exit status 0 and a clean Memcheck report.
   The head bug is still in the code and does not fire.
   Then remove `usage_message`, the head of that same bucket, and the crash is back.
   One bug, two inputs, opposite verdicts, which is what it means for a bug to be about structure rather than about a value.
1. **Forget the name.**
   In the fixed version, remove the `free(entry->name)` from `symtab_remove()` and run `valgrind --leak-check=full`.
   The program is correct in every visible respect, and Memcheck reports `14 bytes in 1 blocks are definitely lost`, allocated by the `strdup()` in `symtab_insert()`: `g_retry_limit` is thirteen characters plus a terminator.
   A third kind of bug with no symptom at all, and the same report as the session's leak exercises.
1. **Use `--track-origins=yes`** on the original buggy version:

   ```console
   valgrind --track-origins=yes ./symtab
   ```

   Memcheck will now tell you not just that a value is uninitialised, but which allocation it came from.
   On the `next` bug that is the `malloc()` in `symtab_insert()` at line 119, which is the answer handed over directly.

## Questions to answer

* **Why did the crash appear inside `printf()` rather than in the hash table code?**
  `printf("%s", entry->name)` was handed a pointer that does not point at a string, so `strlen()` inside libc walked off into unmapped memory.
  The frame that matters is the first one belonging to this program, `symtab_print()`, and getting there means walking down the backtrace.
  A crash location is where the effect surfaced, not where the bug is.
* **Memcheck reported "Conditional jump or move depends on uninitialised value(s)" during the very first insert. Which line, and why is a *test* already an error?**
  `while (entry != NULL)` in `find_entry()`, line 97.
  Reading an uninitialised value is undefined behaviour whether or not you dereference it; the compiler is entitled to assume it never happens.
  This is why Memcheck complains on the first insert, when nothing visible has gone wrong yet.
* **The field nobody set happened to be zero. What would have happened on a machine where it was not?**
  `find_entry()` would have followed the stale pointer into whatever the block used to hold, and `strcmp()` or `printf()` would have crashed on the first colliding insert or in the first dump.
  Same bug, different symptom, chosen by the allocator rather than by the code; which is the argument for Memcheck's uninitialised-value check, and for never trusting a run that happens to work.
* **Why does the head-removal bug not fire when removing from the middle of a chain?**
  Because the middle case has a `prev` to relink, and the buggy code handles exactly that case.
  The head has no predecessor, so the pointer that has to change is the array slot, and nothing changed it.
* **Valgrind names three lines in a use-after-free report. Which of them is the bug?**
  None of them, strictly.
  It names where the memory was read, where the block was freed, and where it was allocated.
  The bug is the missing assignment that left a pointer to the freed block behind, and it is on none of those three lines.

## Discussion points

* **`malloc()` does not zero; `calloc()` does.**
  A freshly allocated struct is uninitialised in *every* field, and uninitialised memory often reads as zero, which is why the bug hides.
  Assigning three of four is the version that hides best.
* **A singly linked list has two removal shapes.**
  Head and middle are different operations, and code that only tests `prev != NULL` implements one of them.
  This is one of the most common bugs in hand-written list code, and it is worth recognising on sight.
* **Test data has to produce the structures you claim to support.**
  A hash table tested without a single collision has not been tested as a hash table.
  Eight buckets and twelve symbols is not a stress test; it is the minimum honest one.
* **Read the whole output.**
  The crash was the loud bug; the header disagreeing with the list above it was the quiet one, and it was on the screen the whole time.
  Fix, rebuild, rerun, and let what is left pick the next tool.

## References

* `man 1 gdb`, and the [GDB documentation](https://sourceware.org/gdb/current/onlinedocs/gdb.html/)
* `man 1 valgrind`, the [Memcheck manual](https://valgrind.org/docs/manual/mc-manual.html), and its [`--track-origins`](https://valgrind.org/docs/manual/mc-manual.html#opt.track-origins) option
* `man 3 malloc`, `man 3 calloc`, `man 3 strdup`
* [djb2 and other string hashes](http://www.cse.yorku.ca/~oz/hash.html)

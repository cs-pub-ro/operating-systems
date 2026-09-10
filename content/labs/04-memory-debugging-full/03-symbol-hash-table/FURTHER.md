# Going Further: The Symbol Table With Three Bugs

## Things to try

1. **Make the table big enough and see what does *not* change.**
   Change `symtab_create(8)` in `main.c` to `symtab_create(1024)` and run the *buggy* version.
   Twelve symbols in a thousand buckets means no collisions at all — and it still segfaults, with more Memcheck errors rather than fewer.
   Neither bug 1 nor bug 2 needs a chain: `next` is uninitialised whether or not anything follows it, and a lone entry in a bucket is still that bucket's head.
   What the undersized table actually buys is *observability*.
   With chains of two and three you can see bug 1 truncating them, and you can contrast removing a head with removing a middle node — which is the experiment two items down.
1. **Swap `malloc()` for `calloc()`** in `symtab_insert()` without adding the `entry->next` assignment.
   Bug 1 disappears, because zeroed memory makes `next` a valid `NULL`.
   It is a fix, and it is the worse one: it makes the code correct by accident of the allocator rather than by saying what the field should be.
   Which would you rather read in six months?
1. **Remove a middle node instead of a head.**
   Fix bug 1 only, then change the driver to remove `g_log_buffer` — the second of the three entries in bucket 6 — rather than `g_retry_limit`.
   The program now runs to completion with exit status 0, and the only thing Memcheck reports is bug 3's leak (13 bytes this time: `g_log_buffer` is twelve characters plus a terminator).
   Bug 2 is still in the code and does not fire.
   Then remove `usage_message`, the head of that same bucket, and the crash is back.
   One bug, two inputs, opposite verdicts — which is what it means for a bug to be about structure rather than about a value.
1. **Count the allocations by hand** before running Valgrind.
   Twelve entries, each a node plus a `strdup()`ed name; plus the table and the bucket array.
   Compare with the twenty-seven Memcheck reports and work out where the remainder comes from.
1. **Add a resize.**
   Grow the table and rehash every entry when `count / capacity` passes 0.75.
   You now have a third place that walks every chain and moves nodes between buckets — write it, then check whether your `symtab_remove()` assumptions still hold.
1. **Make the leak louder.**
   Insert and remove ten thousand symbols in a loop with the third bug present, and watch the leak total scale.
   A 14-byte leak on one removal is 140 KB on ten thousand.
1. **Use `--track-origins=yes`** on the original buggy version:

   ```console
   valgrind --track-origins=yes ./symtab
   ```

   Memcheck will now tell you not just that a value is uninitialised, but which allocation it came from.
   On bug 1 that is the `malloc()` in `symtab_insert()`, which is the answer handed over directly.

## Questions to answer

* **Why did the crash appear inside `printf` rather than in the hash table code?**
  `printf("%s", entry->name)` was handed a pointer that does not point at a string, so `strlen()` inside libc walked off into unmapped memory.
  The frame that matters is the first one belonging to this program — `symtab_print` — and getting there means walking up the backtrace.
  A crash location is where the effect surfaced, not where the bug is.
* **Memcheck reported "Conditional jump depends on uninitialised value(s)" during the very first insert. Which line, and why is a *test* already an error?**
  `while (entry != NULL)` in `find_entry()`.
  Reading an uninitialised value is undefined behaviour whether or not you dereference it; the compiler is entitled to assume it never happens.
  This is why Memcheck complains long before the segfault.
* **Why does the head-removal bug not fire when removing from the middle of a chain?**
  Because the middle case has a `prev` to relink, and the buggy code handles exactly that case.
  The head has no predecessor, so the pointer that has to change is the array slot, and nothing changed it.
* **Valgrind names three lines in a use-after-free report. Which of them is the bug?**
  None of them, strictly.
  It names where the memory was read, where the block was freed, and where it was allocated.
  The bug is the missing assignment that left a pointer to the freed block behind, and it is on none of those three lines.
* **How many heap blocks does one `symbol_entry_t` own, and how many teardown paths are there?**
  Two blocks — the node and the name — and two paths, `symtab_remove()` and `symtab_destroy()`.
  Four combinations, and the buggy version got three of them right.
* **Would a unit test have caught any of these?**
  Bug 1 crashes on essentially any input, so yes.
  Bug 2 needs the test to actually *remove* something, and to remove a node that is the head of its chain — which, in a sparsely populated table, is every node.
  Bug 3 passes every functional test there is, and always will.

## Discussion points

* **`malloc()` does not zero; `calloc()` does.**
  A freshly allocated struct is uninitialised in *every* field.
  Assigning three of four is the version that hides best, because the fourth usually contains something plausible.
* **A singly linked list has two removal shapes.**
  Head and middle are different operations, and code that only tests `prev != NULL` implements one of them.
  This is one of the most common bugs in hand-written list code, and it is worth recognising on sight.
* **Test data has to produce the structures you claim to support.**
  A hash table tested without a single collision has not been tested as a hash table.
  Eight buckets and twelve symbols is not a stress test; it is the minimum honest one.
* **The frees must mirror the allocations.**
  Count the owned blocks per object, then check every teardown path frees all of them.
* **Each bug hides the next.**
  There is no run on which all three are visible, so code review does not converge and the tools have to be used in sequence.
  Fix, rebuild, rerun, and let the new symptom pick the next tool.

## References

* `man 1 gdb`, and the [GDB documentation](https://sourceware.org/gdb/current/onlinedocs/gdb.html/)
* `man 1 valgrind`, the [Memcheck manual](https://valgrind.org/docs/manual/mc-manual.html), and its [`--track-origins`](https://valgrind.org/docs/manual/mc-manual.html#opt.track-origins) option
* `man 3 malloc`, `man 3 calloc`, `man 3 strdup`
* [djb2 and other string hashes](http://www.cse.yorku.ca/~oz/hash.html)

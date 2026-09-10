# Going Further: The Program That Is Right and Still Broken

## Things to try

1. **Make the leak grow.**
   Feed the buggy version a file whose words get steadily longer, so that every single word sets a new record:

   ```console
   python3 -c "[print('a' * i) for i in range(1, 2000)]" | valgrind --leak-check=full ./longest
   ```

   Every word but the last is leaked, and the total climbs into the megabytes.
   This is what the same bug looks like in a process that stays up for a month.
1. **Introduce the opposite bug.**
   Free the old string *after* assigning the new pointer over it:

   ```C
   t->longest = copy;
   free(t->longest);	/* wrong: this frees the new one */
   ```

   Then try freeing `t->longest` twice.
   Read what Valgrind says about each — `Invalid read of size 1` inside `printf`, or `Invalid free() / delete / delete[]`.
   You have traded a leak for a use-after-free, which is a security vulnerability rather than a resource problem.
1. **Break the allocation-failure path.**
   Move the `free(t->longest)` *above* the `strdup()`.
   The program still works — until `strdup()` fails, at which point the previous winner has already been destroyed and `t->longest` points at freed memory.
   Simulate it by making `strdup()` return `NULL` on the third call.
   This is why the fix allocates first and releases second.
1. **Use `--show-leak-kinds=all`** on both versions and compare "definitely lost", "indirectly lost", "possibly lost" and "still reachable".
   Then construct an input or a small change that produces each category.
   A struct that owns a list of children, leaked as a whole, is the easiest way to see "indirectly lost".
1. **Try AddressSanitizer:**

   ```console
   gcc -Wall -Wextra -g -O0 -fsanitize=address -o longest main.c
   ASAN_OPTIONS=detect_leaks=1 ./longest < input.txt
   ```

   It finds this one, unlike the histogram exercise.
   Compare the report with Valgrind's: which is easier to read, and which slowed the program down more?
1. **Restructure so the bug cannot happen.**
   Keep a fixed-size buffer and `strcpy()` into it, or `realloc()` the existing block to the new length instead of allocating a fresh one.
   Both remove the ownership transfer entirely, and with it the class of bug.
   Which version would you rather maintain?

## Questions to answer

* **How many heap allocations does the program make for `input.txt`, and how many should it free?**
  Four `strdup()` calls, for `the`, `quick`, `jumped` and `extraordinarily` — the four words that each beat everything before them.
  All four must be freed.
  Valgrind reports six allocations in total; the other two are stdio's internal buffers, which the C library cleans up itself.
* **Why is `free(NULL)` safe, and what does that let you leave out of your fix?**
  It is explicitly defined by the standard to do nothing.
  That removes the `if (t->longest != NULL)` guard around the `free()`, and with it the special case for the very first word.
* **What exactly does "definitely lost" mean, as distinct from "still reachable"?**
  Definitely lost: at exit, no pointer to the block existed anywhere in the program, so it could never have been freed.
  Still reachable: a pointer did exist — the program simply chose not to free it before exiting.
  The second is usually benign; the first is always a bug in a program that runs for a long time.
* **Why does the leak report point at `strdup()` rather than at the line that overwrote the pointer?**
  Because a leak is the absence of an event.
  There is no instruction that "leaked"; the tool can only tell you where the orphaned block came from.
* **The output was correct throughout. What kind of program does this bug actually break, and after how long?**
  Anything long-running that processes a stream: a server, a daemon, a log parser.
  It breaks when the process exhausts its memory, which is a function of traffic, not of correctness — so it happens in production, under load, and never in testing.

## Discussion points

* **The struct owns the string.**
  Once you say that out loud, the fix writes itself: an owner must release the old resource before taking a new one.
  Most memory bugs are unclear ownership rather than unclear code.
* **A leak has no moment.**
  It is the *absence* of an event, which is why the stack trace in a leak report points at the allocation site rather than at "where the leak happened".
* **A correct answer is not a correctness proof.**
  This program passes every functional test anyone would write for it.
* **The obvious fix can introduce a worse bug.**
  Freeing in the wrong order turns a leak into a use-after-free.
  A leak wastes memory; a use-after-free is a security vulnerability.
  Ordering the three statements as allocate, release, assign is not fussiness — each of the other orders is a distinct bug.
* **This is the counterpart to `01-grade-histogram`.**
  There, Valgrind was blind and only `gdb` worked.
  Here there is nothing for `gdb` to break on, and only Valgrind works.
  Neither tool is the debugger; the pair is.

## References

* `man 3 strdup`, `man 3 free`
* `man 1 valgrind`, and the [Valgrind manual on leak categories](https://valgrind.org/docs/manual/mc-manual.html#mc-manual.leaks)
* [AddressSanitizer](https://github.com/google/sanitizers/wiki/AddressSanitizer), and [LeakSanitizer](https://github.com/google/sanitizers/wiki/AddressSanitizerLeakSanitizer)

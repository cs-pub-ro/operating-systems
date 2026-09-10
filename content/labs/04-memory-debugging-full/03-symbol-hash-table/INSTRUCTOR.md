# Instructor Notes: The Symbol Table With Three Bugs

## Purpose

The big exercise of the session, and the only one that needs the whole toolkit.
It is deliberately built so that **reading the source does not work**: the three bugs hide each other, there is no run on which all of them are visible, and the only way through is fix, rebuild, rerun.

Budget accordingly.
This is substantially longer than the two exercises before it put together, and a group that has not finished it has still had the more valuable half of the session.

## The three bugs

| # | Where | Fix |
| --- | --- | --- |
| 1 | `symtab_insert()` | `entry->next = table->buckets[index];` before linking |
| 2 | `symtab_remove()` | `if (prev == NULL) table->buckets[index] = entry->next; else ...` |
| 3 | `symtab_remove()` | `free(entry->name);` alongside `free(entry)` |

## What each stage looks like

Verified, and worth having in front of you — students will ask whether what they are seeing is progress.

| Stage | Behaviour |
| --- | --- |
| As shipped | Segfault during the **first** dump, at `symbol_hash_table.c:185`, inside `printf`. Buckets list at most one symbol each; the header still claims 12 entries. |
| Bug 1 fixed | Gets through the first dump, the lookups and the `g_version` update. Segfaults in the **second** dump, immediately after printing `bucket 7:`. |
| Bugs 1 and 2 fixed | Exit 0, output correct in every respect. `valgrind --leak-check=full` reports **14 bytes in 1 block definitely lost**. |
| All three fixed | 27 allocs, 27 frees, 4,722 bytes, 0 errors from 0 contexts. |

Fourteen bytes is `g_retry_limit` — thirteen characters plus the terminator.

## Points to hammer

* **`malloc()` does not zero; `calloc()` does.**
  Bug 1 is one missing assignment out of four, and the missing one is the pointer.
  Ask which fields `symtab_insert()` sets, and count.
* **The crash is in libc, and that is normal.**
  The backtrace opens with `__strlen_evex` and `__printf_buffer`; students freeze.
  Teach `frame N` once: walk up until you reach a function whose name you recognise, and start there.
  Frame 4 is `symtab_print`.
* **A singly linked list has two removal shapes.**
  Head and middle are different operations.
  Code that only tests `prev != NULL` implements the middle one and silently corrupts the other.
  This is worth a diagram on the board — it is the most reusable thing in the exercise.
* **Valgrind names the read, not the bug.**
  The use-after-free report points into `symtab_print`.
  The bug is in `symtab_remove`, several calls earlier.
  Ask, every time: *is that where the bug is, or where its effects surfaced?*
* **Count the owned blocks.**
  A `symbol_entry_t` owns two, and there are two teardown paths.
  Four chances to get it wrong; the buggy version got three of them right.

## Steering the room

The single most common failure mode is a student reading `symbol_hash_table.c` from top to bottom hunting for all three bugs before running anything.
Interrupt that.
The exercise is designed to defeat it, and the students who try hardest tend to be the ones who lose the most time.

The prompt that works: *"you have a segfault. What is the fastest way to find out where?"*

Then, after each fix, insist on the same three questions before any editing:

1. What is the observable symptom — crash, wrong output, or nothing at all?
1. Which tool is going to tell me where it happens?
1. Is the line the tool named the bug, or the place the effect surfaced?

## Other things students get wrong

* **Adding `entry->next = NULL;` instead of `entry->next = table->buckets[index];`.**
  Watch for this one; it is the most instructive wrong answer in the exercise.
  The first dump now completes, so it looks like progress, but every colliding symbol has been silently dropped: each insert makes its bucket a one-element list.
  The dump lists **six** symbols under a header that still says twelve, and `compute_sum -> not found` even though it was inserted.
  Then it segfaults later anyway, because bug 2 is untouched.
  Have them compare the dump against the twelve symbols in `main.c`; the header and the body of the same dump disagreeing is the tell.
* **Switching `malloc()` to `calloc()`** and stopping there.
  It works. Ask whether the code now *says* what `next` should be, or merely happens to get away with it.
* **Fixing bug 2 by making `symtab_remove()` refuse to remove heads**, or by never freeing.
* **Freeing `entry->name` in `symtab_destroy()` twice** after adding the free to `symtab_remove()`, producing an invalid free.
* **Declaring victory after the program stops crashing.**
  Bug 3 is invisible without `--leak-check=full`.

## Practical notes

* The table is 8 buckets for 12 symbols on purpose.
  If a student "fixes" the collisions by enlarging it, note that the buggy version still crashes — chains are about observability here, not about whether the bugs fire.
  See `FURTHER.md` for the experiment.
* Needs both `gdb` and Valgrind to be working.
  Check the `ulimit -n 1024` issue from the session-level notes beforehand.
* Built with `-g -O0`, and split into two translation units, so `make` after an edit rebuilds only what changed.

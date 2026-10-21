# Instructor Notes: The Symbol Table With Two Bugs

## Purpose

The first bonus, and the only task that needs the whole toolkit on one program.
It is deliberately built so that **reading the source does not work well**: the loud bug draws the attention, the quiet one sits in the same output, and the way through is fix, rebuild, rerun.

It used to be a core exercise with three bugs; the leak was dropped, and the two that remain are the ones that need GDB and Valgrind respectively.
A group that reaches it has done the four core exercises, so expect them to know the routine and let them run.

## The two bugs

| # | Where | Symptom | Fix |
| --- | --- | --- | --- |
| 1 | `symtab_remove()` | segfault in the dump after the removal | `if (prev == NULL) table->buckets[index] = entry->next; else ...` |
| 2 | `symtab_insert()` | six symbols listed under a header that says twelve; `compute_sum -> not found` | `entry->next = table->buckets[index];` before linking |

## What each stage looks like

Verified, and worth having in front of you: students will ask whether what they are seeing is progress.

| Stage | Behaviour |
| --- | --- |
| As shipped | First dump: header `12 entries`, six symbols listed, one per bucket. `compute_sum -> not found`. Segfault in the **second** dump, right after `bucket 7:`, at `symbol_hash_table.c:185` inside `printf()`. Memcheck: 51 errors from 20 contexts; the first is an uninitialised test at line 97 during the first insert, later ones are reads of the block freed at line 157. |
| Bug 1 fixed (head relink) | Exit 0. Still six symbols under a header of twelve, and `compute_sum -> not found`. Memcheck: 28 errors from 9 contexts, all uninitialised values, plus 7 blocks definitely lost, which are the dropped entries. |
| Bug 2 fixed (`next`) | First dump complete, twelve symbols, lookups right. Segfault in the second dump. Memcheck: 28 errors from 16 contexts, the first an invalid read at line 185 of a block freed at line 157. |
| Both fixed | 27 allocs, 27 frees, 4,722 bytes, 0 errors from 0 contexts. |

The order students fix them in does not matter; the table has both.

## Why the first dump does not crash here

The uninitialised `next` reads as `NULL` on this machine, because the entries come from fresh heap that the kernel hands over zeroed.
So instead of walking into garbage, every insert truncates its bucket to one element and the earlier entries are silently dropped.
On a system where `malloc()` recycles blocks before the inserts, the same code crashes in the first dump instead.
Say this explicitly: uninitialised memory that happens to be zero is the kind that ships, and it is the reason Memcheck checks the *test* of the value and not only the dereference.

## Points to hammer

* **Read the whole output.**
  The header says twelve and the list has six, two screens above the crash.
  Students who only look at the last line find one bug.
* **The crash is in libc, and that is normal.**
  The backtrace opens with `__strlen_evex` and `__printf_buffer`; students who did `04-csv-report` have seen this and should walk down to frame 4 on their own.
  If they freeze, the prompt is the same as there: *which is the first frame in a file you wrote?*
* **Valgrind names the read, not the bug.**
  The use-after-free report points into `symtab_print()`.
  The bug is in `symtab_remove()`, several calls earlier.
  Ask, every time: *is that where the bug is, or where its effects surfaced?*
* **A singly linked list has two removal shapes.**
  Head and middle are different operations.
  Code that only tests `prev != NULL` implements the middle one and silently corrupts the other.
  This is worth a diagram on the board; it is the most reusable thing in the exercise.
* **`malloc()` does not zero; `calloc()` does.**
  Bug 2 is one missing assignment out of four, and the missing one is the pointer.
  Ask which fields `symtab_insert()` sets, and count.

## Steering the room

The single most common failure mode is a student reading `symbol_hash_table.c` from top to bottom hunting for both bugs before running anything.
Interrupt that.

The prompt that works: *"you have a segfault. What is the fastest way to find out where?"*

Then, after the first fix, insist on the same three questions before any editing:

1. What is the observable symptom: crash, wrong output, or nothing at all?
1. Which tool is going to tell me where it happens?
1. Is the line the tool named the bug, or the place the effect surfaced?

For bug 2, the question that lands is: *"the header says twelve; where did the other six go?"*
A print in `symtab_insert()` of `entry->next` next to the old bucket head answers it in one run.

## Other things students get wrong

* **Adding `entry->next = NULL;` instead of `entry->next = table->buckets[index];`.**
  Nothing visible changes, because `next` was already reading as zero, and that is the most instructive wrong answer in the exercise: the student has written down the accident the allocator was already providing.
  The dump still lists six symbols under a header of twelve; have them compare the two.
* **Switching `malloc()` to `calloc()`** and stopping there.
  Same effect, same conversation.
  Ask whether the code now *says* what `next` should be, or merely happens to get away with it.
* **Fixing bug 1 by making `symtab_remove()` refuse to remove heads**, or by never freeing.
* **Declaring victory after the program stops crashing**, without noticing the count, or without a final `valgrind --leak-check=full` run.
  The head fix alone leaves 28 uninitialised-value errors and 7 lost blocks; the report is not clean.

## Practical notes

* Run the buggy program on a terminal, not through a pipe or into a file: `stdout` is block-buffered when it is not a terminal, and everything printed before the crash is lost with the buffer.
  Both the six-of-twelve dump and the "crashes right after `bucket 7:`" observation need the terminal.
* The table is 8 buckets for 12 symbols on purpose.
  If a student "fixes" the collisions by enlarging it, note that the buggy version still crashes: the removal still hits a head.
  See `FURTHER.md` for the experiment.
* Needs both GDB and Valgrind to be working.
  Check the `ulimit -n 1024` issue from the session-level notes beforehand.
* Built with `-g` and no `-O` flag, and split into two translation units, so `make` after an edit rebuilds only what changed.

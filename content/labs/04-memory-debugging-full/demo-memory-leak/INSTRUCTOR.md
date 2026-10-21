# Instructor Notes: Finding a Memory Leak With Valgrind

## Purpose

The second demo, and the one that teaches Valgrind as a tool rather than as a checkbox.
Everything the three leak exercises ask for is shown here once: run with `--leak-check=full`, read the heap summary, read the loss record, go to the allocation, find the owner, write the `free()`, rerun.

It is short on purpose.
The program is forty lines and has one bug, so that all the attention goes to the report.

## Sequencing

1. **Build and run.**
   The output is correct.
   Ask whether the program is finished, and take a show of hands; the disagreement is the teachable moment.
1. **Run plain `valgrind`.**
   The `LEAK SUMMARY` says `definitely lost: 241 bytes in 6 blocks`, and the last line says `Rerun with --leak-check=full`.
   Do what it says.
1. **Read the full report aloud, top to bottom.**
   Heap summary: eight allocations, two frees, six blocks unaccounted for.
   Loss record: 241 bytes in 6 blocks, allocated in `upper_copy()` at line 25, called from `main()` at line 44.
   Stop on the stack trace and ask what it points at: the allocation, not the leak.
   Say why: a leak is a `free()` that never ran, and there is no line for that.
1. **Do the arithmetic.**
   Six lines in `input.txt`, six blocks.
   `wc -c input.txt` is 235; plus six terminators is 241.
   Have someone predict the numbers before confirming them.
1. **Find the owner.**
   Read the comment above `upper_copy()`: "whoever calls this function owns the copy".
   So `main()` frees, and it frees as soon as it is done with the copy, which is after the `printf()`.
1. **Fix, rebuild, rerun.**
   `All heap blocks were freed -- no leaks are possible`, eight allocations and eight frees.
1. **Make it big.**
   `seq 1 10000 | valgrind --leak-check=full ./shout > /dev/null` on the buggy binary: 10,000 blocks, about 60 KB, one block per line of input.
   One sentence on what that means for a process that runs for a month.

## Points to hammer

* **The report points at the allocation.**
  Students go to line 25 and try to fix `malloc()`.
  The line to change is somewhere *after* the allocation, wherever the pointer was last used.
* **Ownership is the question.**
  "Who frees this?" is answered by the comment above the function that allocated it.
  A function that returns heap memory without such a comment is a bug waiting for a caller.
* **Where the `free()` goes matters.**
  Before the `printf()` is a use after free; after the loop frees one copy out of six.
  Inside the loop, after the last use, is the only right place.
* **The two extra allocations are stdio's.**
  Someone always asks why eight and not six.
  `stdin` and `stdout` each get a buffer on first use, and the C library frees them.
* **Correct output proves nothing.**
  Say it here, and again at the end of the session.

## Things that go wrong in the room

* **Valgrind refuses to start** on a high open-file limit; see the session-level notes for `ulimit -n 1024`.
* **Someone frees inside `upper_copy()`** before returning the pointer, or in `main()` before the `printf()`.
  `gcc` 14 already warns about the second with `-Wuse-after-free`; rerun Valgrind anyway for a flood of `Invalid read` errors inside `printf()`, and a good moment to say that the owner frees, and only after the last use.
* **Someone adds `if (shout != NULL) free(shout);`.**
  Harmless; `free(NULL)` is defined to do nothing, and the `NULL` case already returned.
* **Someone asks why the compiler did not warn.**
  Because nothing is wrong on any single line; the bug is a missing line, and compilers do not see those.

## Verified reference values

| Version | Result |
| --- | --- |
| Buggy, `input.txt` | output correct; 8 allocs, 2 frees; 241 bytes in 6 blocks definitely lost; 1 error from 1 context |
| Buggy, 10,000 lines from `seq` | 10,002 allocs, 2 frees; 58,894 bytes in 10,000 blocks definitely lost |
| Fixed | identical output; 8 allocs, 8 frees, 8,433 bytes; 0 errors from 0 contexts |

## Practical notes

* Built with `-g` and no `-O` flag, like everything else in the session.
* The leak exercise that follows, `01-config-parser`, has two loss records and two owners; tell students that the report they have just read is the one they are about to see twice.

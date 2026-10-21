# Instructor Notes: Session 04 — Memory Debugging

Notes for preparing and running the session.
Per-task notes are in `INSTRUCTOR.md` inside each task directory.

## Check this before the session: Valgrind

On machines with a very high open-file limit — common in containers and on some lab images — Valgrind refuses to start:

```text
Valgrind: FATAL: Private file creation failed.
The current file descriptor limit is 1073741804.
```

The fix is `ulimit -n 1024` in the shell first.
Valgrind is required by seven of the nine tasks here, so a lab image that fails this way costs the whole session.
Test it beforehand and tell everyone up front, because the message has nothing to do with the student's code.

## Shape of the session

Two demos first, worked through together; then the four core exercises in order; the three bonuses for whoever gets there, or as take-home work.

* `demo-in-memory-database` teaches the crash and the wrong answer: GDB for the location, a print for the cause, Valgrind to confirm.
* `demo-memory-leak` teaches the invisible bug: one leak, one report, read line by line.
* `01-config-parser` is the leak demo with two allocation sites and two owners; `02-longest-word` is a leak caused by an assignment; `03-grade-histogram` is a wrong answer that Valgrind cannot see; `04-csv-report` is a crash inside the C library.
* The bonuses are, in order, the hash table with two bugs, the JSON parser's one-byte overflow, and the binary with no source.

Deliberately no fixed minute budget is published to students: groups move at different speeds and different assistants prefer different rhythms.
That said, the four core exercises are short on purpose, and most groups should reach the bonus list.
If you have to cut, cut from the bonuses, never from the demos: the demos are where the routine is taught, and every exercise afterwards assumes it.

## The through-line

Session 03 taught writing correct memory code; this one is about what to do when it is already wrong.
Two ideas carry the whole session, and both are worth stating out loud rather than hoping they are inferred.

**The symptom picks the tool.**

1. **A crash** hands you a location for free: run it under GDB, read the backtrace down to your own code, print the variables there.
   Then a print before the line says what it was given.
1. **A wrong answer** does not: print what the code computes next to the line that computes it, and compare.
1. **No visible symptom at all** needs a tool that audits the whole run, which means Valgrind.

**Neither tool sees everything.**

* `03-grade-histogram` is the case **only a print** solves.
  Memcheck works at the granularity of *allocations*, not fields.
  A write past the end of an array that is still inside the same `malloc()`ed block is invisible to it.
* `bonus-json-parser` is the case **only Valgrind** solves.
  One byte past the end of a block, on a run whose output is perfect from start to finish.
* `bonus-symbol-hash-table` needs **both**, in the same program, in the same sitting.

The slogan to leave them with: *"Valgrind is clean" is necessary, not sufficient.*

## The policy on GDB

This session uses GDB for one thing: finding out where a program died, and what its variables held at that moment.
`run`, `backtrace`, `frame N`, `print`, and nothing else is taught in the room.

The reason is worth saying to the students, because some of them have heard that "real programmers use the debugger".
Breakpoints, stepping and watchpoints are investigation tools: they are good for confirming a theory about one run, slow for forming one, and their output is gone when the session ends.
A print next to the suspicious line is faster to write, reads on its own, and works identically for everyone in the room.
The full README's cheatsheet lists the stepping commands for students who want them; do not demonstrate them.

Students who already know GDB and reach for `break` and `next` are not wrong.
Let them, and ask at the end which of the two was faster for the bug at hand.

## What students consistently get wrong

* **Reading the source instead of running the program.**
  This is the big one, and it is worth interrupting.
  The instinct is to code-review until the bug appears; the skill being taught is to reproduce first, then let the tool point at a line.
  `bonus-symbol-hash-table` is explicitly designed to punish code review: two bugs in one run, one loud and one quiet, and the quiet one is the harder to see in the source.
* **Panicking at libc frames in a backtrace.**
  `04-csv-report` and the hash table both crash inside the C library.
  Students need to be told once to walk down with `frame N` until they recognise their own file, and that the library is the victim, not the culprit.
* **Fixing where the tool pointed rather than where the bug is.**
  Valgrind names the line that *touched* freed memory, not the line that failed to unlink it; a leak report names the allocation, not the missing `free()`.
  Ask "is that where the bug is, or where its effects surfaced?" every single time.
* **Stopping at the first clean run.**
  The leak demo, the config parser and the longest word all print the right answer.
  Say out loud that correct output proves nothing about memory, and say it again at the end.
* **Printing "got here" instead of values.**
  A print that does not show the inputs of the suspicious line has not done its job; make them add the numbers.
* **Not rebuilding between fixes**, then debugging a stale binary.
* **Leaving the prints in.**
  Part of the exercise is removing them once the bug is fixed; a `DEBUG` macro is the grown-up answer, and the cheatsheet shows one.

## Verified reference values

Measured on Ubuntu 25.04 / gcc 14.2 / glibc 2.41 / valgrind 3.24 / x86-64.
Byte totals, addresses and garbage values will differ elsewhere; the block counts and the error shapes should not.

| Task | Buggy version | Fixed version |
| --- | --- | --- |
| `demo-in-memory-database` | segfault, exit 139; with bug 1 fixed, a garbage first record and 12 Memcheck errors from 5 contexts | 6 allocs, 6 frees, 9,416 bytes, 0 errors |
| `demo-memory-leak` | output correct; 241 bytes in 6 blocks definitely lost | 8 allocs, 8 frees, 8,433 bytes, 0 errors |
| `01-config-parser` | output correct; 88 bytes in 9 blocks definitely lost, in two records of 3 and 6 blocks | 18 allocs, 18 frees, 8,805 bytes, 0 errors |
| `02-longest-word` | output correct; 17 bytes in 3 blocks definitely lost | 6 allocs, 6 frees, 8,225 bytes, 0 errors |
| `03-grade-histogram` | "processed 13 grades", bars sum to 11, Valgrind silent | processed 12, bars sum to 12 |
| `04-csv-report` | segfault inside `strtol()` via `atoi()`, exit 139 | one warning for line 7; engineering 4 / 21,600, marketing 3 / 11,700, support 2 / 5,900; top earner carol, 6,100 |
| `bonus-symbol-hash-table` | six symbols listed under a header of twelve, then segfault in the dump after the removal, exit 139; 51 Memcheck errors from 20 contexts | 27 allocs, 27 frees, 4,722 bytes, 0 errors |
| `bonus-json-parser` | exit 0 and perfect output; Memcheck reports "Invalid write of size 1" | 98 allocs, 98 frees, 7,753 bytes, 0 errors |
| `bonus-binary-issue` | exit 139 on a 200-byte line | exit 0, input truncated to 63 characters |

For `bonus-binary-issue` the shipped binary is a fixed artefact, so these are exact for everyone: the buggy instruction is `mov esi,0x80` at virtual address `0x401221`, its immediate is at file offset `0x1222`, and the buffer is `lea rax,[rbp-0x40]`, i.e. 64 bytes.

## Practical notes

* Every task builds with `-g` and no `-O` flag.
  Say why once: at `-O2` variables are optimised into registers and GDB starts answering `<optimized out>`.
* GDB on a recent Ubuntu asks about debuginfod on the first run.
  Tell students to answer `n`; it only decorates the library frames they are going to walk past.
* The database demo, the CSV report and the hash table crash.
  Check `ulimit -c` and the core-dump handling on the lab image if you plan to show core files; nothing in the material requires them.
* `bonus-binary-issue` needs Python 3 and assumes x86-64.
  It will not work on an ARM laptop, and there is no fallback.
* Nothing in this session is timing-sensitive.

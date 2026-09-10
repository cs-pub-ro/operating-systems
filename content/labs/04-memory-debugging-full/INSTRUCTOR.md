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
Valgrind is required by five of the six tasks here, so a lab image that fails this way costs the whole session.
Test it beforehand and tell everyone up front, because the message has nothing to do with the student's code.

## Shape of the session

The demo first, worked through together; then the three core exercises in order; the two bonuses for whoever gets there, or as take-home work.

Deliberately no fixed minute budget is published to students: groups move at different speeds and different assistants prefer different rhythms.
That said, `03-symbol-hash-table` is substantially bigger than the two exercises before it, and most groups will not reach the bonuses in the room.
If you have to cut, cut from the bonuses, never from the demo — the demo is where the workflow is taught, and every exercise afterwards assumes it.

## The through-line

Session 03 taught writing correct memory code; this one is about what to do when it is already wrong.
Two ideas carry the whole session, and both are worth stating out loud rather than hoping they are inferred.

**The symptom picks the tool.**

1. **A crash** hands you a location for free: run it under `gdb`, read the backtrace.
1. **A wrong answer** does not: you have to aim the microscope yourself, with a conditional breakpoint or a watchpoint.
1. **No visible symptom at all** needs a tool that audits the whole run, which means Valgrind.

**Neither tool sees everything.**
This is the pairing the exercises are built around, and it is the most valuable thing in the session:

* `01-grade-histogram` is the case **only `gdb`** solves.
  Memcheck works at the granularity of *allocations*, not fields.
  A write past the end of an array that is still inside the same `malloc`ed block is invisible to it — the write hit the wrong field, not the wrong block.
* `bonus-json-parser` is the case **only Valgrind** solves.
  One byte past the end of a block, on a run whose output is perfect from start to finish.
* `03-symbol-hash-table` needs **both**, in the same program, in the same sitting.

The slogan to leave them with: *"Valgrind is clean" is necessary, not sufficient.*

## What students consistently get wrong

* **Reading the source instead of running the program.**
  This is the big one, and it is worth interrupting.
  The instinct is to code-review until the bug appears; the skill being taught is to reproduce first, then let the tool point at a line.
  `03-symbol-hash-table` is explicitly designed to punish code review: three bugs, and they do not all surface on the same run.
* **Fixing where the tool pointed rather than where the bug is.**
  Valgrind names the line that *touched* freed memory, not the line that failed to unlink it.
  Ask "is that where the bug is, or where its effects surfaced?" every single time.
* **Stopping at the first clean run.**
  The demo's third bug and the hash table's third bug both exist to make the point that a program that produces exactly the right output is not necessarily correct.
* **Not rebuilding between fixes**, then debugging a stale binary.
* **Panicking at libc frames in a backtrace.**
  On the hash table crash the top frames are inside `printf`; students need to be told once to keep walking up with `frame N` until they recognise their own code.

## Verified reference values

Measured on Ubuntu 24.04 / gcc 14.2 / valgrind 3.24 / x86-64.
Byte totals and addresses will differ elsewhere; the block counts and the error shapes should not.

| Task | Buggy version | Fixed version |
| --- | --- | --- |
| `demo-in-memory-database` | segfault, exit 139 | 6 allocs, 6 frees, 9,416 bytes, 0 errors |
| `01-grade-histogram` | "processed 13 grades", bars sum to 11, Valgrind silent | processed 12, bars sum to 12 |
| `02-longest-word` | 17 bytes in 3 blocks definitely lost, output already correct | 6 allocs, 6 frees, 8,225 bytes, 0 errors |
| `03-symbol-hash-table` | segfault, exit 139; Memcheck reports uninitialised values | 27 allocs, 27 frees, 4,722 bytes, 0 errors |
| `bonus-json-parser` | exit 0 and perfect output; Memcheck reports "Invalid write of size 1" | 98 allocs, 98 frees, 7,753 bytes, 0 errors |
| `bonus-binary-issue` | exit 139 on a 200-byte line | exit 0, input truncated to 63 characters |

For `bonus-binary-issue` the shipped binary is a fixed artefact, so these are exact for everyone: the buggy instruction is `mov esi,0x80` at virtual address `0x401221`, its immediate is at file offset `0x1222`, and the buffer is `lea rax,[rbp-0x40]`, i.e. 64 bytes.

## Practical notes

* Every task builds with `-g -O0`.
  Say why once: at `-O2` variables are optimised into registers and `gdb` starts answering `<optimized out>`.
* The demo and `03-symbol-hash-table` both crash.
  Check `ulimit -c` and the core-dump handling on the lab image if you plan to show core files; nothing in the material requires them.
* `bonus-binary-issue` needs Python 3 and assumes x86-64.
  It will not work on an ARM laptop, and there is no fallback.
* Nothing in this session is timing-sensitive.

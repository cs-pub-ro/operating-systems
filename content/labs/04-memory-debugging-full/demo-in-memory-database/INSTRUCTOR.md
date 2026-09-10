# Instructor Notes: Debugging an In-Memory Database with GDB and Valgrind

## Purpose

This is where the session's workflow is taught.
Everything after it assumes the students have seen the loop once: **run it, observe how it fails, pick the tool that matches the failure, walk backwards to the line**.

If you present nothing else, present this.
The three exercises that follow are the same loop with the hand-holding removed.

## Sequencing

Work the three bugs in the order the program reveals them, and rebuild between each one.
Do not list the bugs up front — the whole point is that the next symptom is discovered, not announced.

1. **Run it.** It segfaults on the first record. Nobody has read the source yet, and that is deliberate.
1. **Bug 1, with `gdb`.** `run < input.txt`, `backtrace`, then `print *db` in the `db_add` frame.
   `records = 0x0` with `count = 0` and `capacity = 0` says the growth branch was skipped; ask why.
   Let someone work out what `capacity - 1` is when `capacity` is an unsigned zero.
1. **Rebuild and rerun.** It now completes, and prints `First record added: [-960466358]` with an empty name.
   A different symptom, so a different question.
1. **Bug 2, with `gdb` then Valgrind.**
   `gdb` gives the mechanism: break on `db_grow`, print `db->records` on entry and exit, watch the address change.
   Valgrind gives the timeline: invalid read, block freed here, by this function.
1. **Rebuild and rerun.** The output is now completely correct. Stop and ask whether the program is finished.
   Take a show of hands before running Valgrind — the disagreement is the teachable moment.
1. **Bug 3, with Valgrind.** 360 bytes in 1 block definitely lost, in a run that printed everything correctly.

## Points to hammer

* **`size_t` is unsigned.**
  `capacity - 1` with `capacity == 0` is `SIZE_MAX`, not `-1`.
  This is the single most transferable thing in the demo; the same bug appears in session 03's bonus exercise as `count <= capacity - CHUNK`.
  Writing the condition as `count == capacity` removes the subtraction entirely, which is the real lesson: prefer the form that cannot underflow over the form you have to reason about.
* **The array moves.**
  `db_grow()` is `realloc()` written out by hand — `malloc`, `memcpy`, `free` — and the `free` is what makes `first` dangling.
  Print the address before and after; the point lands much harder when they see it change.
* **Store indices, not pointers**, when the container can be reallocated.
* **Read a Valgrind use-after-free report as three facts**: what was touched, which block it belonged to, and where that block was freed.
  Students routinely fix the line Valgrind names first, which is the *read*, not the bug.
* **The output being right proves nothing.**
  Say this out loud at step 6 and again at the end of the session.

## Things that go wrong in the room

* **Someone reads the source and announces all three bugs in the first minute.**
  Thank them, then carry on with the tools anyway — the procedure is the deliverable, not the answers.
  It is worth saying that `03-symbol-hash-table` is built so that this shortcut does not work.
* **Not rebuilding between fixes**, then debugging a stale binary.
* **Backtrace confusion.**
  Bug 1 crashes in the students' own code, so the backtrace is clean here.
  Warn them now that in `03-symbol-hash-table` the top frames will be inside `printf`, and they will need `frame N` to walk up.
* **Valgrind refusing to start** on a high open-file limit; see the session-level notes for the `ulimit -n 1024` fix.

## Verified reference values

| Version | Result |
| --- | --- |
| Buggy, as shipped | segfault, exit 139 |
| Bug 1 fixed | runs to completion, prints `First record added: [-960466358]` with an empty name |
| Bugs 1 and 2 fixed | correct output; Valgrind reports 360 bytes in 1 block definitely lost |
| All three fixed | 6 allocs, 6 frees, 9,416 bytes; 0 errors from 0 contexts |

The garbage id in the middle row is whatever happened to be in freed memory on that run.
Expect a different number, and expect it to differ between runs on the same machine.

## Practical notes

* Built with `-g -O0`.
  Worth saying why once: at `-O2` the variables the demo prints would be optimised into registers and `gdb` would answer `<optimized out>`.
* The demo is the same database as session 03's `01-in-memory-db`, so students who did that exercise already know the data structure.
  Lean on that — no time needs to be spent on what the program does.

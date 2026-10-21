# Instructor Notes: Debugging an In-Memory Database

## Purpose

This is where the session's routine is taught.
Everything after it assumes the students have seen the loop once: **run it, look at how it fails, pick the tool that matches the failure, go to the line, then read the code**.

If you present nothing else, present this and the leak demo.
The four exercises that follow are the same loop with the hand-holding removed.

## Sequencing

Work the two bugs in the order the program reveals them, and rebuild between them.
Do not list the bugs up front: the whole point is that the next symptom is discovered, not announced.

1. **Run it.**
   It segfaults on the first record.
   Nobody has read the source yet, and that is deliberate.
1. **Bug 1, where: GDB.**
   `run < input.txt`, `backtrace`, then `print *db`.
   `records = 0x0` with `count = 0` and `capacity = 0` says the growth branch was skipped; ask why.
1. **Bug 1, why: a print.**
   Add one `fprintf(stderr, ...)` in front of the condition, showing `count`, `capacity` and `capacity - 1`.
   The third value is `18446744073709551615`.
   Let someone say what `0 - 1` is when both sides are unsigned, then show that `print db->capacity - 1` in GDB gives the same, now that you know what to ask.
1. **Rebuild and rerun.**
   It now completes, and prints `First record added: [1143873501]` with an empty name and a different number every run.
   A different symptom, so a different question.
1. **Bug 2, why: a print.**
   Print `db.records` and `first` after every insertion.
   The array address changes at the fifth and the ninth record; `first` does not.
   Ask what is at the old address now.
1. **Bug 2, confirmed: Valgrind.**
   `valgrind ./db < input.txt`: invalid read at line 178, block freed by `db_grow()` at line 68.
   Read the three parts of the report aloud: touched here, freed here, allocated here.
   Ask which of the three lines is the bug; the answer is none of them.
1. **Fix, rebuild, rerun under Valgrind.**
   `0 errors from 0 contexts` and `All heap blocks were freed`.
   Say that this is the result to aim for every time.

## Points to hammer

* **`size_t` is unsigned.**
  `capacity - 1` with `capacity == 0` is `SIZE_MAX`, not `-1`.
  This is the single most transferable thing in the demo; the same bug appears in session 03's bonus exercise as `count <= capacity - CHUNK`.
  Writing the condition as `count == capacity` removes the subtraction entirely, which is the real lesson: prefer the form that cannot underflow over the form you have to reason about.
* **GDB says where, a print says why.**
  The backtrace took ten seconds and named the line; the print took one more line of code and named the cause.
  That division of labour is the whole session's policy on GDB, and this is the place to state it.
* **The array moves.**
  `db_grow()` is `realloc()` written out by hand, `malloc`, `memcpy`, `free`, and the `free` is what makes `first` dangling.
  The address print lands this much harder than an explanation.
* **Store indices, not pointers**, when the container can be reallocated.
* **Read a Valgrind use-after-free report as three facts**: what was touched, where the block was freed, and where it was allocated.
  Students routinely "fix" the line Valgrind names first, which is the *read*, not the bug.
* **Remove the prints** once the bug is fixed, and say so.

## Things that go wrong in the room

* **Someone reads the source and announces both bugs in the first minute.**
  Thank them, then carry on with the tools anyway: the routine is the deliverable, not the answers.
  It is worth saying that `bonus-symbol-hash-table` is built so that this shortcut works badly.
* **Not rebuilding between fixes**, then debugging a stale binary.
* **The debuginfod question** on the first GDB run.
  Answer `n` on the projector and say why: it only decorates library frames.
* **`%p` with a `struct record *`.**
  `gcc -Wextra` wants the cast to `(void *)`; have it in the print from the start rather than fighting the warning live.
* **Valgrind refusing to start** on a high open-file limit; see the session-level notes for the `ulimit -n 1024` fix.

## Verified reference values

| Version | Result |
| --- | --- |
| Buggy, as shipped | segfault at `main.c:88` in `db_add()`, exit 139 |
| Bug 1 fixed | runs to completion, prints `First record added: [1143873501]` with an empty name; Valgrind reports 12 errors from 5 contexts, the first an invalid read at `main.c:178` of a block freed at `main.c:68` |
| Both fixed | 6 allocs, 6 frees, 9,416 bytes; 0 errors from 0 contexts |

The garbage id in the middle row is whatever happened to be in freed memory on that run.
Expect a different number, and expect it to differ between runs on the same machine.
The array moves after the fourth and the eighth insertion with `CHUNK` at 4; the addresses themselves differ per run.

## Practical notes

* Built with `-g` and no `-O` flag.
  Worth saying why once: at `-O2` the variables the demo prints would be optimised into registers and GDB would answer `<optimized out>`.
* The demo is the same database as session 03's `03-in-memory-db`, so students who did that exercise already know the data structure.
  Lean on that; no time needs to be spent on what the program does.
* The leak that used to be the demo's third bug is now its own demo, `demo-memory-leak`, which comes next.

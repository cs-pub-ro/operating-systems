# Instructor Notes: A Race Condition, and a Mutex

## Purpose

The one new mechanism of the session, on the smallest program that needs it.
Students leave with three things: a race is a result that depends on how the threads' operations interleave, a critical section is the statements that must not be interleaved, and a mutex is declared once, shared by all, and locked around the critical section and nothing more.

The shared thing is a file, written three calls per line, rather than a counter.
For one integer an atomic increment is the better tool, and a student who has heard of compare-and-swap would be right to say so; for three system calls there is no such instruction, and the mutex is the tool one would actually use.

## Sequencing

1. **Read `messages.c` together and ask for a prediction.**
   Four threads, a thousand messages each.
   Most of the room says four thousand whole lines; let them.
1. **Run `./messages 4 1000` three or four times.**
   A different count each time, and far below 4,000.
   Then show the file: `grep -v '^thread [0-9]*: message [0-9]*$' messages.txt | head`.
   Ask whether any message was lost, and let `wc -l messages.txt` answer: 4,000 lines, every piece there, in the wrong place.
1. **Run `./messages 2 3` several times.**
   All six lines whole, most of the time.
   Ask whether the program is correct now, then keep running until a run breaks.
   This is the most important minute of the demo: a race that does not show is still there.
1. **Explain the interleaving** on the board, with two threads and their three calls each: each call is whole, and what goes wrong is what comes between them.
   `strace -f -e trace=write` in `FURTHER.md` shows it on a real run if the room wants proof.
1. **TODO 1, 2, 3**: declare, initialize and destroy, lock and unlock.
   Type them in that order; run after the last.
   Point out that the two `snprintf()` calls stay outside the lock: they use the thread's own buffers.
1. **`time` it, before and after**, and then `time ./messages 1 400000`.
   The mutex costs nothing visible, and one thread is the fastest: the kernel lets one `write()` at a time into the file anyway.
   That is the hand-over to the second demo: threads pay off when the work can be split, and a single shared file cannot.

## Points to hammer

* **Each call is whole; the message is not.**
  The kernel keeps one `write()` together, and nothing keeps three together.
* **The critical section is defined by what has to look indivisible**: here, a message.
  It protects no variable of the program.
* **The mutex is shared; that is the whole point of it.**
  One mutex per shared thing, visible to every thread that uses it.
* **Lock, critical section, unlock, and nothing else in between.**
* **Not everything needs a lock**: `who`, `num` and `i` are on the thread's own stack.

## Things that go wrong in the room

* **The race does not show.**
  On a VM with one core most runs can come out whole.
  Raise the count to 100,000 messages per thread, and check `nproc`.
* **"Just use an atomic", or "compare-and-swap".**
  Right for a counter, and session 08 shows it.
  Ask which single instruction would write three pieces of a line to a file; there is none.
  The one real alternative is to write each message in one call, which is `FURTHER.md`, item 3: it works because the kernel takes a lock of its own around every `write()`, so the lock has moved, not gone.
* **The lock around one `put()` only, or around two of the three.**
  Fewer broken lines, still broken ones.
  Good to let happen: the critical section is all of the calls that make up one message.
* **The mutex declared inside `write_messages()`.**
  Compiles, runs, protects nothing.
  Worth doing on purpose if nobody does it by accident.
* **`pthread_mutex_init()` called inside the thread function**, by every thread.
  Re-initializing a mutex that is in use is undefined behaviour and, in practice, broken lines.
* **A missing unlock.**
  The program hangs after one message; `top` shows it using no processor time.
* **Someone prints to the terminal instead.**
  The program writes to a file because a file gives the guarantee that one call stays whole; a terminal does not, and the output there is harder to count.

## Verified reference values

Measured on Ubuntu 24.04, gcc 13.3, glibc 2.39, x86-64, an Intel Core Ultra 7 165H with 22 logical CPUs, on ext4.
The session's other values come from a different machine; compare shapes, not absolute times.

| Fact | Value |
| --- | --- |
| `./messages 4 1000`, no mutex | 11, 129, 362 whole lines of 4,000 on three runs; 4,000 lines in the file |
| `./messages 2 3`, no mutex | all 6 lines whole on 23 of 30 runs |
| `./messages 4 1000`, mutex | 4,000 whole lines on every run |
| `time ./messages 4 100000`, no mutex | `real` 1.09 s, `user` 0.20 s, `sys` 3.96 s; between about 28,000 and 54,000 whole lines |
| Same, mutex | `real` 1.13 s, `user` 0.40 s, `sys` 1.33 s |
| `time ./messages 1 400000` | `real` 0.70 s |
| Lock around the whole loop, 4 × 100,000 | all whole; `real` 0.71 s |
| One `write()` per message, no mutex, 4 × 100,000 | all whole; `real` 0.45 s |
| Each thread opens the file itself, mutex, 4 × 1,000 | 1,000 lines left of 4,000; all 4,000 with `O_APPEND` |
| Missing unlock, `./messages 4 10` | hangs after one message, no processor time |
| `make test` | 1, 2, 4, 8 threads, five runs of 10,000 messages each, every line whole |

## Practical notes

* The live `messages.c` has no mutex and three TODOs; the full one is the result of the demo.
* `messages.txt` is written in the current directory, overwritten on every run, and removed by `make clean`.
* `test.sh` only makes sense on the version with the mutex.
* Do not introduce `PTHREAD_MUTEX_INITIALIZER` first: the session's prompt asks for declare, initialize, use, and the explicit call makes the lifetime visible.
  Mention the initializer at the end, since `01-substring-search` uses it.

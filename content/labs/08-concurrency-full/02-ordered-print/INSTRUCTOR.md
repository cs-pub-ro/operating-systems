# Instructor Notes: Five Threads That Take Turns

## Purpose

The condition-variable demo, done alone and from nothing.
The skeleton has no synchronization to read and repair: this is the one core exercise where students write the wait themselves, and it is early so that the broken waits of the later tasks are read by people who have written a correct one.

## Expected answers

* **TODO 1**: `static int turn;`, a mutex, a condition variable; `turn = 0` in `turns_init()`.
* **TODO 2**: lock, `while (turn != id) pthread_cond_wait(...)`, unlock.
* **TODO 3**: lock, `turn = (id + 1) % num_threads`, `pthread_cond_broadcast(...)`, unlock.

An array of condition variables with `signal`, or an array of semaphores, is as good, and better in wake-ups; both are in `FURTHER.md`.

## Things students get wrong

* **Keeping the mutex locked from `turn_take()` to `turn_pass()`.**
  This works, 20 flags in 20 runs, and is what the demo did: the lock is held across the print.
  Accept it, and ask two things: what a reader of `turn_take()` alone would think of a function that returns with a mutex locked, and what happens to a thread that only wants to look at `turn` while another is printing.
* **`signal` with one condition variable.**
  Time-out, on every run.
* **`if` instead of `while`.**
  Out of order, then a time-out.
* **Busy waiting**: `while (turn != id) { unlock; lock; }` or a loop with `sched_yield()`.
  Gets the flag.
  Have them look at `user` in `time ./chall`, and ask what the four threads that are not printing are doing.
* **`turn = turn + 1` without the modulo.**
  One round, then a time-out.

## Verified reference values

| Fact | Value |
| --- | --- |
| Empty library | about 3,000 of 10,000 messages counted, about 2,000 in place |
| Reference, `make test` | the flag, 20 runs out of 20; 0.02 to 0.03 s a run |
| `signal`, one condition variable, 10 runs | 10 time-outs |
| `if`, 20 runs | 20 time-outs, after messages out of order |
| Mutex held from `turn_take()` to `turn_pass()`, 20 runs | 20 flags |
| One condition variable per thread, `signal`, 20 runs | 20 flags |
| One semaphore per thread, 20 runs | 20 flags |
| Proof passed to `flag_print()` | 10000, 100030000 |

## Practical notes

* Only the first four rounds are printed; the check is on all two thousand.
* The second number of the proof is the sum, over the messages, of the thread id times the position: it is right only for the exact sequence.
* `flag.h` is regenerated with `../utils/gen_flag.py flag 10000 100030000 > flag.h`.

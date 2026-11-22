# Instructor Notes: A Queue That Loses Items

## Purpose

The classic, and the place where the two decisions of `demo-02-ordered-print` are made again, this time by finding them wrong in somebody else's code.
The task is staged on purpose: fixing the first flaw alone turns a wrong result into a hang, and students should see both before they see the flag.

## Expected answers

* **First flaw**: `while` instead of `if` around both waits.
* **Second flaw**: two condition variables, `not_full` and `not_empty`, with each function waiting on one and signalling the other; or one condition variable with `pthread_cond_broadcast()`.

## Things students get wrong

* **Fixing both at once**, from memory of the lecture.
  Ask them to undo the second fix and explain the hang; the understanding is in the sequence of steps, not in the flag.
* **Waiting on `not_full` and signalling `not_full`** in the same function.
  Time-out: each side wakes its own kind.
* **`while` in one function only.**
  Fewer wrong items, still wrong.
* **Signalling only when the queue goes from empty to one item**, "because otherwise nobody is waiting".
  With several consumers asleep and several items put before any of them runs, only the first put signals and the other consumers sleep on with items in the queue.
* **Calling the hang a deadlock.**
  Nobody holds anything; it is a lost wake-up.
  The distinction decides the fix: a lock order would do nothing here.

## Verified reference values

| Fact | Value |
| --- | --- |
| Skeleton | 6,600 to 11,200 of 80,000 items out once; single items out dozens of times |
| `while`, one condition variable, `signal`, 20 runs | 20 time-outs |
| The same with a capacity of 4, 20 runs | 20 flags |
| `while`, one condition variable, `broadcast`, 30 runs | 30 flags; 0.08 to 0.10 s |
| `if`, two condition variables, 20 runs | 20 "no flag" |
| Reference, `make test` | the flag, 50 runs out of 50; 0.08 to 0.10 s |
| Semaphores and a mutex, 20 runs | 20 flags; 0.10 s |
| Proof passed to `flag_print()` | 80000, 3200040000 |

## Practical notes

* The capacity of 2 is deliberate, and is in `chall.c`; with 4 the second flaw does not show on this machine.
* When `count` wraps around in the broken library, an item "that nobody put in" can also be reported, read from a slot of the buffer that was never written.
* `flag.h` is regenerated with `../utils/gen_flag.py flag 80000 3200040000 > flag.h`.

# Instructor Notes: A Boss and Its Workers

## Purpose

The producer-consumer pattern with the part the previous exercise left out: how it ends.
Three flaws, two of them repeats (the shared condition variable, `signal` where `broadcast` is needed) and one new: the item that is on the desk when the end is announced.

## Expected answers

* **TODO 2**: two condition variables, or `broadcast` on the one.
* **TODO 3**: `pthread_cond_broadcast()` after `stop = 1`.
* **TODO 1**: the worker leaves `if (!desk_full)`, not `if (stop)`.
  A boss that waits for the desk to be empty before it sets `stop` is the other correct answer.

They show in the order 2 and 3 together, as a hang, then 1.

## Things students get wrong

* **Fixing the end and not the hand-over**, or the other way round.
  The program still hangs, and it is not obvious from `ps` which sleep is which.
  Counting threads helps: with only the end fixed, the boss is one of the sleepers; with only the hand-over fixed, the boss is in `pthread_join()` and seven workers are asleep.
* **Setting `stop` without the lock.**
  A worker can test `stop`, find it clear, be about to wait, and miss the broadcast that comes in between: a lost wake-up of the kind `pthread_cond_wait()` exists to prevent, and it only prevents it when the flag is changed under the mutex.
* **Calling `do_work()` with the lock held.**
  The flag, and no parallelism.
* **Blaming the lost item on a race in `work()`.**
  It is always the last item; that is the clue.

## Verified reference values

| Fact | Value |
| --- | --- |
| Skeleton | time-out on every run |
| `broadcast` for the end only, 10 runs | 10 time-outs |
| `broadcast` everywhere, one condition variable, 20 runs | 20 "no flag": item 1999 not done in a few of the 20 rounds |
| That, with `if (!desk_full)`, 20 runs | 20 flags; 0.10 s |
| Reference, `make test` | the flag, 50 runs out of 50; 0.12 to 0.14 s a run |
| Poison pill, 20 runs | 20 flags; 0.12 s |
| Boss waits for the desk before `stop`, 20 runs | 20 flags |
| Proof passed to `flag_print()` | 20, 40000 |

## Practical notes

* The state of the library is in global variables, and `boss_run()` resets it; it is not meant to be called from two threads at once.
* Twenty rounds are there for the last-item bug, which shows in only some rounds.
* `flag.h` is regenerated with `../utils/gen_flag.py flag 20 40000 > flag.h`.

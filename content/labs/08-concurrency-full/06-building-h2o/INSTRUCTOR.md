# Instructor Notes: Building H2O

## Purpose

No new tool: a mutex and a condition variable, on a problem that is about grouping threads rather than protecting data.
What is new is that the condition is written on counters the library keeps for the purpose, and that the meaning of a counter depends on where the code around it is.

The skeleton already has the counters and the tickets, and gets the composition right.
The work is in separating one molecule from the next: a guard in `form()`, the release moved under the lock, and a second call to `form()`.
The checks of the task README ask for the argument, not only for the flag.

## Expected answers

In `form()`, return when `tickets_h > 0 || tickets_o > 0`.
In `hydrogen()` and `oxygen()`, the release before the unlock, followed by `form()`.

A fifth counter, `leaving`, with the release outside the lock and a second critical section after it, is as good, and is in `FURTHER.md`.
Students who took "do not hold a lock while you work" from exercise 05 as a rule tend to go that way.

## Things students get wrong

* **The guard without moving the release.**
  The most common half-solution: about 7,300 molecules of 10,000, never the flag.
  Ask what "no ticket left" proves about the atoms.
* **Moving the release without the guard.**
  Six tickets out; 5,200 to 6,700 molecules.
* **No `form()` after the release.**
  The flag on two runs out of three and a time-out on the third, when the last ticket is used while every thread is already waiting.
  This is the reason the task says thirty runs.
* **`pthread_cond_signal()`**, "since one molecule was formed".
  A time-out on every run: three threads have to wake up.
* **`if` around the wait.**
  No flag and no time-out; `tickets_h` goes below zero.
* **A second mutex around the release**, to "make it safe".
  The release functions are safe; a second mutex orders nothing unless it is the one the tickets are under.
* **Sleeping after the unlock** to "let the others release".
  It moves the numbers and proves nothing; say so.

## Verified reference values

| Fact | Value |
| --- | --- |
| Skeleton | 4,000 to 5,400 molecules of 10,000; never the flag |
| Release under the lock, no guard, 30 runs | 5,200 to 6,700 molecules; 0 flags |
| Guard, release after the unlock, 30 runs | 7,100 to 7,600 molecules; 0 flags |
| Reference, `make test` | the flag, 50 runs out of 50; 0.02 to 0.03 s a run |
| Reference without the `form()` after the release, 30 runs | 20 flags, 10 time-outs |
| Reference with `pthread_cond_signal()`, 30 runs | 30 time-outs |
| Reference with `if`, 30 runs | 0 flags, 0 time-outs |
| `leaving` counter, release outside the lock, 30 runs | 30 flags |
| Proof passed to `flag_print()` | 30000, 10000 |

## Practical notes

* The threads of a kind share a counter of atoms left to bring.
  With a fixed number of atoms per thread, a correct library can time out at the end of a run, when one hydrogen thread is left with atoms and no partner; the first version of the executable did exactly that to the reference solution.
* The problem is from *The Little Book of Semaphores*, and is also LeetCode 1117; solutions are easy to find, most of them with semaphores, which this session does not use, and the explanation asked for in the checks is not.
* `flag.h` is regenerated with `../utils/gen_flag.py flag 30000 10000 > flag.h`.

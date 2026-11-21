# Instructor Notes: Building H2O

## Purpose

Two new tools, the semaphore and the barrier, on a problem that is about grouping threads rather than protecting data.
The solution is two added lines and one moved; the work is in the argument for why those lines are enough, and the checks of the task README ask for that argument.

Nothing before this task used a semaphore.
The background section of the task README is the whole introduction; allow a few minutes at the whiteboard for it if the lecture did not get that far.

## Expected answers

A `pthread_barrier_t` for three threads, initialized in `h2o_init()`; `pthread_barrier_wait()` between `sem_wait()` and the release, in both functions; `sem_post()` after the release.

A solution with a mutex, a condition variable and counters is acceptable and is in the tutorial.
It takes most students much longer.

## Things students get wrong

* **`sem_post()` before the release**, or before the barrier.
  Before the barrier it is the skeleton again.
  Between the barrier and the release it nearly works: 1 flag in 30 runs here, and on a slower machine it may pass more often.
  This is the reason the task says thirty runs.
* **A barrier of two for hydrogen and the oxygen let through separately.**
  Two hydrogen leave together and the oxygen whenever it likes.
* **Removing the semaphores**, "since the barrier does the waiting".
  `HHH`, then a time-out.
* **A mutex around the release**, to "make it safe".
  Not needed, the release functions are safe, and harmless.
* **Using the return value of `pthread_barrier_wait()`** as an error.
  It returns `PTHREAD_BARRIER_SERIAL_THREAD`, which is not zero, to one of the threads; that is not a failure.

## Verified reference values

| Fact | Value |
| --- | --- |
| Skeleton | 2,900 to 4,000 molecules of 10,000; the first groups are `HHH` |
| Barrier only | time-out |
| Semaphores and barrier, `sem_post()` before the release, 30 runs | 1 flag |
| Reference, `make test` | the flag, 50 runs out of 50; 0.02 to 0.03 s a run |
| Mutex, condition variable and counters, 20 runs | 20 flags; 0.02 s |
| Proof passed to `flag_print()` | 30000, 10000 |

## Practical notes

* The threads of a kind share a counter of atoms left to bring.
  With a fixed number of atoms per thread, a correct library can time out at the end of a run, when one hydrogen thread is left with atoms and no partner; the first version of the executable did exactly that to the reference solution.
* The problem is from *The Little Book of Semaphores*, and is also LeetCode 1117; solutions are easy to find, and the explanation asked for in the checks is not.
* `flag.h` is regenerated with `../utils/gen_flag.py flag 30000 10000 > flag.h`.

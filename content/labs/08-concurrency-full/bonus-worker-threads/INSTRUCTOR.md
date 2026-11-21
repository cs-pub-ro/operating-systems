# Instructor Notes: A Pool of Worker Threads

## Purpose

The last step of the build-up from the producer-consumer queue: a thread pool, which is what most real programs use instead of creating threads by hand.
The new idea is the definition of "finished" when tasks create tasks, and the count that implements it.

## Expected answers

* **TODO 1**: unlock before `task->fn(task->arg)`.
* **TODO 2**: a `pending` counter, incremented in `pool_submit()` and decremented in `worker()` after the task returns, both under the lock; a second condition variable, broadcast when the counter reaches zero; `pool_wait()` as a `while` around `pthread_cond_wait()`.
* **TODO 3**: `stop` set under the lock, and `pthread_cond_broadcast()`.

They show in the order 1, 3, 2.

## Things students get wrong

* **Decrementing `pending` when the task is dequeued.**
  `pool_wait()` returns early, less often than in the skeleton.
  Ask for the values of the counter over the first three tasks.
* **Waiting for `pending == 0` on `has_work`.**
  Works if every change broadcasts; with signals, a wake-up meant for a worker reaches `pool_wait()` and the other way round, the shared-condition-variable flaw once more.
* **Keeping the `usleep()` loop and only fixing its condition**, with the lock around the read.
  It can get the flag.
  It is polling: point at `time ./chall` and at what the main thread does ten thousand times a second, and ask for the condition variable.
* **A recursive mutex for TODO 1.**
  The flag, and no parallelism; `FURTHER.md` has the timing.
* **Freeing the task before calling it**, when moving lines around.
  A use after free that usually works.

## Verified reference values

| Fact | Value |
| --- | --- |
| Skeleton | time-out on every run; one worker blocked in `pool_submit()` called from its own task |
| TODO 1 only, 10 runs | 10 time-outs |
| TODO 1 and 3, 20 runs | 2 flags, 18 early returns of `pool_wait()` |
| Reference, `make test` | the flag, 50 runs out of 50; 0.016 to 0.020 s, `user` 0.10 to 0.15 s |
| Lock kept across the task, recursive mutex | the flag; 0.09 to 0.11 s, `user` equal to `real` |
| Tasks run | 6,262 |
| Proof passed to `flag_print()` | 3079999890000000, 6262 |

## Practical notes

* With the skeleton, the main thread is also found blocked in `pool_submit()`: `pool_wait()` returned as soon as the first task left the queue, and `main()` went on to submit the second round.
* The ranges are large (`LEAF_SIZE` 100,000) so that the last tasks of a round run for long enough for the early return of `pool_wait()` to be caught; with small leaves the polling version passed nearly every time.
* The proof holds the number of tasks, which depends on `ROUND_SIZE` and `LEAF_SIZE`: change either and `flag.h` has to be regenerated, with the two numbers a correct run prints.
* `flag.h` is regenerated with `../utils/gen_flag.py flag 3079999890000000 6262 > flag.h`.

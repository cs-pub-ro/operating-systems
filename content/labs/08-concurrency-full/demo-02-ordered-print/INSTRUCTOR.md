# Instructor Notes: Three Threads That Take Turns

## Purpose

The condition variable, introduced on the smallest problem that needs one.
This is the demo to protect: seven of the challenges after it use `pthread_cond_wait()`, and the two decisions made here, `while` and `broadcast`, are the two bugs planted in most of them.

## Running it

1. `./ordered`, then `./ordered 2000 | sort | uniq -c`: no order at all.
1. Ask whether a mutex around the `printf()` would fix it.
   It would not: it makes the prints whole, not ordered.
1. TODO 1, 2 and 3 with the room, with `while` and `broadcast`.
1. Change `while` to `if`, `./ordered 2000 | grep -vc '1 2 3'`.
1. Change it back, change `broadcast` to `signal`, `./ordered 200`: it stops.
   `ps -L -o lwp,stat,wchan:20 -p $(pidof ordered)` in a second terminal shows every thread in `futex_wait_queue`.

## Expected answers

* **TODO 1**: `static int turn;`, a mutex and a condition variable with their static initializers.
* **TODO 2**: lock, `while (turn != id) pthread_cond_wait(&cond, &lock);`.
* **TODO 3**: `turn = (turn + 1) % NUM_THREADS;`, `pthread_cond_broadcast(&cond);`, unlock.

## Things students get wrong

* **`pthread_cond_wait()` without holding the mutex.**
  Undefined; in practice it often appears to work, then hangs.
* **Testing `turn` before taking the lock.**
  The test and the wait have to be under the same lock, or the wake-up can fall between them.
* **Unlocking before `pthread_cond_wait()`**, "so that the others can get in".
  The call does that itself, atomically, which is the whole point of its second argument.
* **Thinking the condition variable remembers a signal.**
  A signal sent when nobody waits is gone.
  This is the difference from a semaphore, and comes back in `06-building-h2o`.

## Verified reference values

| Fact | Value |
| --- | --- |
| Skeleton, `./ordered 2000` | about 1,450 lines that are a lone `3` |
| Reference, `make test` | 20 runs of 2,000 rounds, every line `1 2 3` |
| `if` instead of `while`, 20 runs of 2,000 rounds | 0 runs in order |
| `signal` instead of `broadcast`, 20 runs of 200 rounds | 4 finished, 16 stopped with every thread asleep |

## Practical notes

* The prompt for this demo gives the sequence as "1, 2, 3, 1, 2, 1, 2, 3"; it is read as 1, 2, 3 repeated.
* The run with `signal` does not always hang; if it finishes on the projector, run it again.

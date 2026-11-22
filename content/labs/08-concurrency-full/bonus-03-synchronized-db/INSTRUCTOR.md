# Instructor Notes: A Database Behind a Read-Write Lock

## Purpose

A review exercise in the form of a challenge: three bugs, one of each kind met in the session (a lock not released, a critical section that is not exclusive, a TOCTOU), in the largest piece of code of the day, with a new tool, the read-write lock.
Take-home for nearly everybody.

## Expected answers

* **TODO 1**, `db_add()`: `pthread_rwlock_wrlock()` instead of `rdlock`.
* **TODO 2**, `db_find()`: unlock on the not-found path, or one way out.
* **TODO 3**, `db_update()`: the search and the change under one write lock.

The order in which they show is 2, 1, 3.

## Things students get wrong

* **Fixing `db_update()` by searching again under the write lock, after the read-locked search.**
  Correct, and it is the "release, take again, check again" pattern; ask what the first search was for.
* **Taking the write lock while holding the read lock.**
  Hangs.
  It is in `FURTHER.md`.
* **Making everything a write lock.**
  Gets the flag, and is a mutex with extra cost.
  Fine as a step; the last check of the task README is the discussion.
* **Looking for a bug in `db_remove()`**, because it is the longest function.
  It is correct.
  The swap with the last record in it is what turns the stale index of `db_update()` into a visible wrong name.
* **Expecting the read-write lock to be faster on `./chall`.**
  It is slower than a mutex there; `readers.c` shows the other side.

## Verified reference values

| Fact | Value |
| --- | --- |
| Skeleton, 20 runs | 20 time-outs |
| TODO 2 fixed, 20 runs | 19 `realloc(): invalid old size`, 1 segmentation fault |
| TODO 2 and 1 fixed, 20 runs | 20 "no flag"; 30 to 50 of 6,000 records misnamed |
| Reference, `make test` | the flag, 50 runs out of 50; 0.08 to 0.09 s a run |
| Reference with a mutex in place of the read-write lock | the flag; 0.06 s |
| `./readers`, read-write lock / mutex | 0.07 s / 0.48 s |
| Second `wrlock` by the owner, glibc 2.41 | returns `EDEADLK` |
| `wrlock` while holding the read lock | hangs |
| Proof passed to `flag_print()` | 6000, 6000, 12715780213544 |

## Practical notes

* An earlier version of the skeleton had the missing unlock in `db_remove()`, on the write lock.
  It did not hang: glibc returns `EDEADLK` to a thread that asks again for a write lock it holds, the code ignored that, and the next unlock released the lock.
  The bug was invisible, so it was moved to the read lock of `db_find()`, where a leaked lock stops every writer.
* `CHUNK` is 64 here, against 4 in session 07, to keep the run short; the array still moves a hundred times.
* `flag.h` is regenerated with `../utils/gen_flag.py flag 6000 6000 12715780213544 > flag.h`.

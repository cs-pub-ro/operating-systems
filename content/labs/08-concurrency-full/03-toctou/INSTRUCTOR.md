# Instructor Notes: A Name With Two Owners

## Purpose

The exercise that separates "data race" from "race condition".
Up to here, the fix for everything was to put a lock around the access.
Here every access has its lock, and students have to reason about what a thread knows, and for how long.

## Expected answers

One critical section in `registry_register()` that covers the search and the store.
The reference moves the search into a helper without a lock, `find_name()`, and does the store inline.
Keeping `registry_add()` and giving it an unlocked twin is as good.

## Things students get wrong

* **A lock around the body of `registry_register()`, calling the functions that lock.**
  Time-out on the first name.
  The task README warns about it in one sentence; most students find out by doing it.
  It is a useful mistake: have them look at the threads before they undo it.
* **A second mutex around the two calls.**
  Gives the flag.
  Accept it only with the answer to the last check of the README: what breaks it later.
* **A recursive mutex.**
  Gives the flag.
  The same conversation as in `01-binary-tree`.
* **Checking again inside `registry_add()`** and returning 0 if the name is there.
  Correct: that is check and act under one lock, done in the other function.
  Then the check in `registry_register()` is an optimization, and can stay.
* **"The barrier is the bug."**
  It is the microscope.

## Verified reference values

| Fact | Value |
| --- | --- |
| Skeleton | 260 to 330 of 500 names with one owner, 830 to 980 registrations, some names given to 3 threads |
| Lock around the calls that lock | time-out |
| Second mutex around the two calls, 20 runs | 20 flags |
| Skeleton under Helgrind | 0 errors, 500 names with one owner, the flag |
| Reference, `make test` | the flag, 20 runs out of 20; 0.01 s a run |
| Proof passed to `flag_print()` | 500, 500 |

## Practical notes

* `MAX_NAMES` is 4,096 so that the broken library, which can store up to 8 × 500 names, never fills the registry and adds a second kind of failure to explain.
* The lookup is a linear search on purpose: as the registry fills, the check takes longer and the window gets wider.
* `flag.h` is regenerated with `../utils/gen_flag.py flag 500 500 > flag.h`.

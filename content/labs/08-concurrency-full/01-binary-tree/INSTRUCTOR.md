# Instructor Notes: A Binary Search Tree for Eight Threads

## Purpose

The first exercise done alone, and deliberately the list demo over again, so that the format of a challenge is the only new thing for the first ten minutes.
Then two things the list did not have: recursion, which decides where the lock goes, and a reader, which decides whether students believe the test or the code.

## Expected answers

* **TODO 1**: `pthread_mutex_t lock` in `struct tree`, `pthread_mutex_init()` in `tree_create()`, `pthread_mutex_destroy()` in `tree_destroy()`.
* **TODO 2**: lock and unlock in `tree_insert()` and `tree_remove()`, around the call of the helper and the change of `size`.
* **TODO 3**: lock in `tree_contains()`, with the loop changed to `break` out, or an unlock before each `return`.
* **TODO 4**: lock in `tree_size()` and `tree_walk()`.
  Not needed for the flag; needed for the explanation.

## Things students get wrong

* **The lock in `insert_node()`.**
  Time-out on the first insertion.
  Let them find it with `ps -L`; "who holds the lock you are waiting for?" is the question.
* **`return 1` in `tree_contains()` with the lock held.**
  Time-out, at once.
* **Stopping when the flag appears**, with no lock in the readers.
  This is planned for: the third and fourth checks in the task README are about it.
  Do not accept the flag without the lock in `tree_contains()`.
* **A global mutex.**
  Works; ask what happens with two trees.
* **Unlocking between the helper and `size++`.**
  Passes; the size and the nodes disagree for a moment, and nothing here reads in that moment.

## Verified reference values

| Fact | Value |
| --- | --- |
| Skeleton, 30 runs | 24 wrong numbers, 5 aborts in the allocator, 1 segmentation fault |
| Skeleton, typical | about 15,900 to 16,050 keys walked, size 2,500 to 4,500 of 16,000 |
| Locks in the two writers only, 50 runs | 47 flags, 3 "no flag" |
| That version under Helgrind | `Possible data race ... at tree_contains (tree.c:...)` |
| Reference under Helgrind | 0 errors, and the flag |
| Lock in `insert_node()`, or `return` with the lock held | time-out |
| Reference, `make test` | the flag, 20 runs out of 20; 0.05 s a run |
| Proof passed to `flag_print()` | 16000, 16000, 256193168 |

## Practical notes

* The keys are shuffled with a fixed seed per thread, so the tree is not a list and the expected sum is the same on every machine.
* An unprotected tree can end up with a cycle; a thread then walks it for ever, and the time-out message says "or is lost in the tree" for that reason.
* Helgrind needs `./chall 0`: with the default time-out the alarm goes off before the run ends.
* `flag.h` is regenerated with `../utils/gen_flag.py flag 16000 16000 256193168 > flag.h`.

# Instructor Notes: A Synchronized In-Memory Database

## Purpose

The mutex applied to a data structure rather than to one variable: several fields tied by an invariant, more than one function, an early return, and a reader that needs the lock.
It is the session's hardest task and is meant as take-home; a student who does it has understood what a critical section is, as opposed to where to type `pthread_mutex_lock()`.

## Expected answers

* **TODO 1**: `pthread_create()` on `run_commands` with `&workers[i]`, then a join loop that also adds up the tallies.
* **TODO 2**: `pthread_mutex_t lock` in `struct database`, `pthread_mutex_init()` in `db_init()`, `pthread_mutex_destroy()` in `db_free()`.
* **TODO 3**: lock from before the `count == capacity` test to after `count++`, with the unlock on the failure path of `realloc()` too.
  Building the record in a local first is the refinement; a solution that copies the name inside the lock is correct.
* **TODO 4**: lock around the loop in `db_find()`, released on both the found and the not-found path.

Locking in `db_summary()` is not required, since it runs after the joins; the reference does it for uniformity.

## Things students get wrong

* **The lock in `run_commands()`, around each command or around the whole loop.**
  Correct.
  Around the loop it is sequential; around each command, parsing included, it is nearly so.
  The README says where the mutex belongs and why; hold them to it.
* **`return -1` with the lock held**, on the `realloc()` failure path.
  Never triggers in the lab, since `realloc()` does not fail, so the student never sees the deadlock.
  It has to be found by reading; ask "which lines can leave this function?".
* **`break` out of the loop in `db_find()` and then `return` before the unlock**, the same mistake in the other function, and this one does trigger: the first successful `find` leaves the mutex locked and the program hangs at once.
  The reference keeps a single unlock after the loop.
* **No lock in `db_find()`**, "because it only reads".
  Segmentation fault, on every run with eight files.
  This is the conversation the exercise exists for.
* **Two locks, one for `count` and one for `records`.**
  The fields are one invariant; two locks protect neither.
* **Unlocking between the capacity check and the store.**
  Two short critical sections where one is needed.
* **A global mutex instead of a field.**
  Works for this program; ask what happens with two databases.
* **Concluding the mutex is wrong because the speed-up is small.**
  It is right; the data structure is the limit.
  The last check in the README asks for exactly this reasoning.

## Verified reference values

| Fact | Value |
| --- | --- |
| `./gen_commands.sh` | 4 files, 10,000 lines each |
| Sequential skeleton, 4 files | 20,000 records, id sum 50,049,990,000, 20,000 of 20,000 found; 0.14 s |
| Reference, 4 threads | the same summary on every run; 0.10 s |
| Threads, no mutex, 4 files of 5000, 30 runs | 26 `realloc(): invalid old size`, 3 segmentation faults, 1 `realloc(): invalid next size` |
| Threads, no mutex, 4 files of 50, 60 runs | 50 aborts, 2 correct, the rest short by 3 to 17 records |
| Lock in `db_add()` only, 8 files, 20 runs | 20 segmentation faults |
| One lock around the loop of `run_commands()` | correct; 0.15 s |
| `CHUNK` 4096 | 0.10 s, unchanged |
| Helgrind, 4 files of 200, reference | `ERROR SUMMARY: 0 errors` |
| `make test` | 8 threads, 10 runs, 16,000 records, id sum 72,015,992,000 |

## Practical notes

* The starting point is the reference solution of session 03's `03-in-memory-db`, with `db_find()`, the command files and `run_commands()` added, and `scanf()` on standard input replaced by one file per worker, so that each thread has an input of its own.
* The program without the mutex can **hang** instead of crashing, when the allocator's lists are damaged; Ctrl-C, and say that it is one more face of the same bug.
* Each `find` looks for a record that the same file added earlier, so every lookup succeeds whatever the interleaving, and the expected summary does not depend on timing.
  That is what makes the output checkable.
* Ids are different in every file (file number times a million, plus the line), so the sum of the ids is a checksum of which records are present.
* Helgrind slows the program about a hundred times; use `./gen_commands.sh 4 200`.
* `valgrind` is checked by `check-prerequisites.sh` as optional for this session.

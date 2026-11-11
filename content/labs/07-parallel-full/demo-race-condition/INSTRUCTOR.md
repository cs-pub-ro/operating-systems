# Instructor Notes: A Race Condition, and a Mutex

## Purpose

The one new mechanism of the session, on the smallest program that needs it.
Students leave with three things: a race is lost updates caused by interleaving, a critical section is the statements that must not be interleaved, and a mutex is declared once, shared by all, and locked around the critical section and nothing more.

## Sequencing

1. **Read `counter.c` together and ask for a prediction.**
   Four threads, a million increments each.
   Most of the room says four million; let them.
1. **Run it three or four times.**
   Different wrong answers each time.
   Ask why the answer is never above four million.
1. **Run `./counter 2 1000`.**
   Correct.
   Ask whether the program is correct now.
   This is the most important minute of the demo: a race that does not show is still there.
1. **Explain `counter++` as load, add, store**, on the board, with two threads and the value 41.
   The `objdump` line in `FURTHER.md` shows the three instructions if the room wants proof.
1. **TODO 1, 2, 3**: declare, initialize and destroy, lock and unlock.
   Type them in that order; run after the last.
1. **`time` it, before and after.**
   Then `time ./counter 1 4000000`: one thread is faster than four.
   Leave the question of how to get both right and fast for the first exercise; the answer is in `FURTHER.md`, item 3.

## Points to hammer

* **`counter++` is not one step.**
* **The mutex is shared; that is the whole point of it.**
  One mutex per shared piece of data, visible to every thread that touches the data.
* **Lock, critical section, unlock, and nothing else in between.**
* **The lock has a cost, and contention has a much bigger one.**
* **Not everything needs a lock**: `i` is on the thread's stack.

## Things that go wrong in the room

* **The race does not show.**
  On a VM with one core the unprotected counter is often right.
  Raise the increments to ten million, and check `nproc`.
* **Someone compiles with `-O2`** and the race disappears, because the loop became one addition.
  Explain rather than avoid; it is `FURTHER.md`, item 6.
* **The mutex declared inside `increment()`.**
  Compiles, runs, protects nothing.
  Worth doing on purpose if nobody does it by accident.
* **`pthread_mutex_init()` called inside the thread function**, by every thread.
  Re-initializing a mutex that is in use is undefined behaviour and, in practice, a wrong count.
* **A missing unlock.**
  The program hangs; `top` shows it using no processor time.

## Verified reference values

| Fact | Value |
| --- | --- |
| `./counter 4 1000000`, no mutex | 1,066,750; 1,102,530; 1,443,792 on three runs |
| `./counter 2 1000`, no mutex | 2,000 |
| `./counter 2 10000`, no mutex | 12,998 |
| `./counter 4 1000000`, mutex | 4,000,000; `real` 0.233 s, `user` 0.376 s, `sys` 0.438 s |
| Same, no mutex | `real` 0.012 s |
| `./counter 1 4000000`, mutex | `real` 0.051 s |
| `make test` | 1, 2, 4, 8 threads, five runs each, all exact |

## Practical notes

* The live `counter.c` has no mutex and three TODOs; the full one is the result of the demo.
* `test.sh` only makes sense on the version with the mutex.
* Do not introduce `PTHREAD_MUTEX_INITIALIZER` first: the prompt for the session asks for declare, initialize, use, and the explicit call makes the lifetime visible.
  Mention the initializer at the end, since `01-substring-search` uses it.

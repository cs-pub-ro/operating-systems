# Session 08: Troubleshooting Concurrency — Full Contents

This directory holds the complete version of session 08: reference solutions, full explanations, the output of every program before and after it is fixed, and a test script for every task.

Use it after the live session for a full view of the solutions and the reasoning behind them.
The corresponding directory used during the session, with skeletons and task descriptions, is [`08-concurrency-live/`](../08-concurrency-live).

## Learning objectives

By the end of this session you should be able to:

* Put a mutex inside a data structure and take it in every function that reads or changes the structure.
* Make a thread wait for a condition with `pthread_cond_wait()`, in a loop, and wake it up with `pthread_cond_signal()` or `pthread_cond_broadcast()`, and say which of the two a situation calls for.
* Recognize a check-then-act (TOCTOU) bug in code where every access is locked, and close it.
* Recognize a deadlock, find which threads hold what with `ps` and GDB, and remove it by taking locks in one order.
* Tell the symptoms apart: a wrong result, a crash, a program that never ends.
* Use a semaphore and a barrier where they fit better than a mutex and a condition variable.
* Read synchronization code that somebody else wrote, and say what is wrong with it before running it.
* Say what a read-write lock adds to a mutex, and what it takes away.

## Prerequisites and required tools

* Session 07: `pthread_mutex_lock()` and `pthread_mutex_unlock()`, the critical section, the race condition.
* Session 01, for the challenges: what a shared library is, and how an executable finds it when it starts.
* Lecture 08, for the vocabulary: lost update, TOCTOU, deadlock.
* A Linux environment on an x86-64 machine, with `gcc`, `make`, `gdb`, `ps` and `nproc` installed; Valgrind, for Helgrind, in some of the `FURTHER.md` files.

## Contents

| Task | Type | Objective |
| --- | --- | --- |
| [`demo-list-mutex`](demo-list-mutex) | Demo | One mutex for a whole linked list; the critical section starts at the first read. |
| [`demo-ordered-print`](demo-ordered-print) | Demo | `pthread_cond_wait()` in a `while`, and `broadcast` when the waiters are not alike. |
| [`demo-omelette`](demo-omelette) | Demo, challenge | Waiting for "at least three": test, wait and act under one lock. |
| [`01-binary-tree`](01-binary-tree) | Core, challenge | The lock goes in the interface, not in the recursion; readers need it too. |
| [`02-ordered-print`](02-ordered-print) | Core, challenge | Turn-taking for any number of threads, written from nothing. |
| [`03-toctou`](03-toctou) | Core, challenge | Two critical sections where one is needed: the check goes stale. |
| [`04-deadlock`](04-deadlock) | Core, challenge | Two locks taken in two orders, and the lock order that fixes it. |
| [`05-string-encryption`](05-string-encryption) | Core, challenge | Lock the shared cursor, not the work. |
| [`06-building-h2o`](06-building-h2o) | Core, challenge | Semaphores count places, a barrier makes threads leave together. |
| [`07-producer-consumer`](07-producer-consumer) | Core, challenge | `while` instead of `if`, and a condition variable for each thing waited for. |
| [`bonus-boss-workers`](bonus-boss-workers) | Bonus, challenge | Ending: the last item, and telling every worker. |
| [`bonus-worker-threads`](bonus-worker-threads) | Bonus, challenge | A thread pool: tasks run outside the lock, and "done" is a count, not an empty queue. |
| [`bonus-synchronized-db`](bonus-synchronized-db) | Bonus, challenge | A read-write lock: the right mode, one critical section, one way out. |

Each task directory contains:

* `README.md` — the tutorial: goal, background, how to build and run, and what the results mean.
* `FURTHER.md` — optional extensions and discussion points, with answers (not for the demos).
* `INSTRUCTOR.md` — notes for whoever runs the session.
* `prompt.txt` — the note the exercise was written from.
* `test.sh`, run by `make test` — the reference solution run many times over; every run has to end with the flag.

A challenge directory also holds the complete source of the executable: `chall.c`, `flag.h` with the key in it, and the `flag` itself.
`make` builds both the library and the executable.
[`INSTRUCTOR.md`](INSTRUCTOR.md) describes how the executables of the live half are produced from here.

## How a challenge is checked

The executable never looks inside the library.
It checks what it can see from outside, and it is built so that what it sees does not depend on how the threads were interleaved, as long as the library is right.

* Where the library guards something, the thing guarded is in the executable: the basket of `demo-omelette`, the printing of `02-ordered-print`, the release of atoms in `06-building-h2o`.
  The library calls back into the executable, which notices two threads inside at once, or an action taken when its condition was false.
* Where the library is a data structure, every thread works on keys of its own, so each call has one right answer and the final content is known in advance.
* Every executable has an alarm: a run that has not finished in ten seconds is declared stuck.

The flag is decrypted with a key that is mixed with the numbers the run ended with, so a run with the wrong numbers cannot print it.
That keeps honest people honest, and no more: the key is in the executable, for anyone who learned in session 05 how to look for it.

One thing an executable cannot do is prove that a library is correct.
It reports the bugs that showed during one run.
`01-binary-tree` has a bug that almost never shows, on purpose, and its tutorial is about that.

## The through-line of the session

Session 07 ended with a mutex and the sentence "the mutex is the only tool used".
This session starts there and goes in two directions: more tools, and more ways for code that uses them to be wrong.

1. **`demo-list-mutex`** is session 07's lesson once more, on a structure: a list that crashes within milliseconds without a lock and never with one.
   The detail to argue about is where the critical section starts: at the change, or at the read of the size that the change relies on.
1. **`demo-ordered-print`** introduces the condition variable, the tool for "wait until this is true".
   The two choices in it come back in every later task: `while` or `if` around the wait, `signal` or `broadcast` for the wake-up.
1. **`demo-omelette`** is the first challenge and the first piece of broken code: a wait that tests once, an update outside the lock, and an action taken after the lock was released.
1. **`01-binary-tree`** applies the first demo to a structure with recursion and with functions that only read.
   It is also where the session admits that passing the test is not the same as being right.
1. **`02-ordered-print`** applies the second demo, from an empty file.
1. **`03-toctou`** has a lock around every access and is wrong all the same: the check and the act are in different critical sections.
1. **`04-deadlock`** is the opposite failure, too much locking in the wrong order, and the first task whose symptom is silence.
1. **`05-string-encryption`** has a lock, in the wrong place: around the work, which needs none, instead of around the cursor the threads share.
1. **`06-building-h2o`** brings the semaphore and the barrier, for a problem that is about groups of threads rather than about data.
1. **`07-producer-consumer`** is the classic, with the two classic mistakes.
1. **`bonus-boss-workers`**, **`bonus-worker-threads`** and **`bonus-synchronized-db`** are larger pieces of code with several bugs each, of the kinds already met, to be found by reading.

Three questions carry the session, and are worth asking of every piece of code in it.

* **What is true when this thread wakes up, or gets the lock back?**
  Only what it tests again.
* **What did this thread learn under a lock that it is still using after releasing it?**
  That is a TOCTOU.
* **Which locks can a thread hold while it waits for another?**
  That is where a deadlock comes from.

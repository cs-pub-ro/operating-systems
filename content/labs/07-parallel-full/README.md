# Session 07: Parallelizing Execution — Full Contents

This directory holds the complete version of session 07: reference solutions, full explanations, the reference output of every command the exercises ask for, and a test script for every task.

Use it after the live session for a full view of the solutions and the reasoning behind them.
The corresponding directory used during the session, with skeletons and task descriptions, is [`07-parallel-live/`](../07-parallel-live).

## Learning objectives

By the end of this session you should be able to:

* Take a sequential loop over a block of data and split it between threads, with every element in exactly one thread's part.
* Recognize a race condition in a program, and in its output, and say which statements form the critical section.
* Protect a critical section with `pthread_mutex_lock()` and `pthread_mutex_unlock()`, and keep it as short as it can be.
* Tell the data that needs a lock, because several threads write it, from the data that does not, because the partition gives each thread its own.
* Measure a speed-up, and explain with Amdahl's law, the number of cores and the cost of the threads themselves why it stops growing and then falls.
* Run several processes at the same time with `fork()` and `exec()`, and wait for all of them.
* Say what is different between doing the same work in several processes and in several threads.
* Find the critical sections of a shared data structure, including the ones in functions that only read.

## Prerequisites and required tools

* Session 06: `fork()`, `exec()` and `waitpid()`; `pthread_create()` and `pthread_join()`; splitting a region between threads.
* Session 03, for the bonus: the growable in-memory database.
* A Linux environment with `gcc`, `make`, `strace`, `md5sum` and `nproc` installed; Valgrind, for Helgrind, in the bonus's `FURTHER.md`.

## Contents

| Task | Type | Objective |
| --- | --- | --- |
| [`demo-race-condition`](demo-race-condition) | Demo | A shared file written three calls per line, broken lines, and `pthread_mutex_t` declared, initialized and used. |
| [`demo-thread-scaling`](demo-thread-scaling) | Demo | A counting loop split between threads and timed: the speed-up, where it stops, and why. |
| [`01-substring-search`](01-substring-search) | Core | A sequential search made parallel; a shared total, one lock per thread rather than one per match. |
| [`02-string-encryption`](02-string-encryption) | Core | Threads that write disjoint parts of one string: offsets, lengths, the remainder, the phase of the key. |
| [`03-process-hashing`](03-process-hashing) | Core | One `md5sum` process per file: a loop that starts them all, then a loop that waits. |
| [`04-thread-hashing`](04-thread-hashing) | Core | One thread per file and an MD5 function; results handed back through memory, printed in order. |
| [`bonus-synchronized-db`](bonus-synchronized-db) | Bonus | The session 03 database shared by several threads: a mutex inside the structure, around the least it can cover. |

Each task directory contains:

* `README.md` — the tutorial: goal, background, how to build and run, and what the results mean.
* `FURTHER.md` — optional extensions and discussion points, with answers.
* `INSTRUCTOR.md` — notes for whoever runs the session.
* `prompt.txt` — the note the exercise was written from.
* `test.sh`, run by `make test` — a check of the reference solution against an independent reference: `grep -o`, `md5sum`, a sequential pass, or the input itself.

## The through-line of the session

Session 06 started threads and processes; this session asks what they are **for**, and what they cost.
Every program starts sequential and correct, is made parallel, and is then held to two standards: it has to print what the sequential one printed, and it has to be measured.

1. **`demo-race-condition`** is the one program that cannot be partitioned: every thread writes to the same file.
   The lines come out broken, differently on every run, and a mutex around the three calls that write one line fixes it; `time` shows that four threads writing one file are no faster than one.
1. **`demo-thread-scaling`** is the opposite case: a loop over a buffer, cut into regions, with nothing shared for writing.
   The counting gets faster up to the number of cores and no further, and the program as a whole gets faster by much less, because filling the buffer is still one thread's work.
1. **`01-substring-search`** puts the two demos together: a partition for the search, and a mutex for the one shared total.
   How often the lock is taken turns out to matter more than whether it is: one lock per match is slower with twelve threads than with four.
1. **`02-string-encryption`** has threads that write, and no lock, because the parts are disjoint.
   The work is in the arithmetic: the remainder, and a key whose phase depends on where in the string a part starts.
1. **`03-process-hashing`** does parallelism with processes.
   The difference between sequential and parallel is where the `waitpid()` is: in the loop that forks, or in a second loop after it.
1. **`04-thread-hashing`** does the same work with threads, which can leave a result in memory for the main thread, so the output comes out in order.
   Comparing it with the previous exercise is comparing what processes share with what threads share.
1. **`bonus-synchronized-db`** is the case with no partition and more than one statement to protect: a growable array, where even a function that only reads needs the lock, because `realloc()` can move the array under it.

Two questions carry the session, and are worth asking of every task: **which memory do several threads write**, and **how much of the work is still done by one thread**.
The first says where a mutex goes; the second is Amdahl's law.

The mutex is the only synchronization tool used.
Semaphores, condition variables, atomic variables and read-write locks are session 08's.

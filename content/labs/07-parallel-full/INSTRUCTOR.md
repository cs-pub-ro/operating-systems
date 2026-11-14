# Instructor Notes: Session 07 — Parallelizing Execution

Notes for preparing and running the session.
Per-task notes are in `INSTRUCTOR.md` inside each task directory.

## Shape of the session

Two demos, four core exercises, one bonus.
The demos are the two halves of the topic: the first is a race and the mutex that fixes it, the second is a speed-up and the point where it stops.
Every exercise after them is one or both of those ideas applied to a program that starts out sequential.

The demos together should take about a third of the session.
The first is short; the second needs its runs and a few minutes of discussion, and is the one to protect.

## The through-line

1. **`demo-race-condition`** — the unpartitionable case: a shared file, broken lines, the critical section, `pthread_mutex_t`, and why four threads writing one file are no faster than one.
1. **`demo-thread-scaling`** — the partitionable case, timed: cores, Amdahl's law, and the cost of threads.
1. **`01-substring-search`** — both: a partition plus one shared total; lock once per thread, not once per match.
1. **`02-string-encryption`** — threads that write disjoint parts; no lock; the remainder and the phase of the key.
1. **`03-process-hashing`** — start all, then wait for all; where the `waitpid()` is decides whether it is parallel.
1. **`04-thread-hashing`** — the same with threads; results through memory; ordered output.
1. **`bonus-synchronized-db`** — a shared structure with several critical sections, and a reader that needs the lock.

## One tool only

`pthread_mutex_lock()` and `pthread_mutex_unlock()` are the whole of the synchronization in this session.
No semaphores, no condition variables, no atomics, no read-write locks, no `trylock`; a student who knows one of them and proposes it is right that it would work, and should be told that session 08 is where the choice between them is made.

The session is equally about **not** locking.
Three of the four core exercises need no mutex at all in their reference solution, and the one that does takes it once per thread.
A student who puts a lock around `xor_buffer()` "to be safe" has a correct program and has missed the point; ask what the lock protects.

## Session 06 said mutexes were for session 08

The material of session 06 was written when the mutex was planned for session 08, and says so in several places.
Tell students that the plan moved: the mutex is introduced here, and session 08 takes the rest.

## The programs are sequential and correct to start with

Every skeleton builds and runs before a line is changed, and prints the right answer with one thread, whatever thread count it is given.
Have everyone run it first and write down the output and the time: that is the reference, and "did the answer change?" is the first check of every exercise.
The exception is `03-process-hashing`, whose skeleton hashes nothing, because the `fork()` and `exec()` are the exercise.

A consequence to say out loud: until the TODOs are done, the summary line prints the thread count that was asked for, not the one that was used.

## The bugs the session is built around

* **Three `write()` calls per line without a lock** (`demo-race-condition`) — most lines broken with four threads, often none with two threads and three messages.
* **A lock taken once per item** (`01-substring-search`) — right, and slower with more threads.
* **A match across a cut** — as in session 06; the overlap is `strlen(needle) - 1`.
* **The remainder of the division** — in the search, the count and the encryption.
* **The key restarted in every part** (`02-string-encryption`) — hidden when the key length divides the part size, which with power-of-two sizes means keys of 1, 2, 4 or 8 characters.
* **`waitpid()` in the loop that forks** (`03-process-hashing`) — correct output, sequential execution.
* **A child that survives a failed `exec()`** — and goes on to run the parent's loop, forking in its turn.
* **Printing from the threads** (`04-thread-hashing`) — works, in a random order.
* **A reader without the lock** (`bonus-synchronized-db`) — a segmentation fault in `db_find()`, on memory that `realloc()` freed.
* **A `return` between lock and unlock** — the next thread to call the function waits for ever.

## Timing and pacing

The four core exercises fit a session for a group that finished session 06's thread exercises.
`01-substring-search` is the longest, because it has the split, the overlap and the lock; a group that is slow there should skip its last two checks rather than skip `02-string-encryption`.
`03-process-hashing` and `04-thread-hashing` are short and are best done back to back, since the comparison between them is the point.
The bonus is take-home for nearly everyone.

If the demos ran long, compress the first: run the unprotected program, show the broken lines, add the mutex, and move on.
The second should not be compressed below "four runs and the Amdahl question".

## Measurements need cores

Every timing in this session depends on the machine.
Before the session, check `nproc` in the student VM: with one core nothing speeds up, and with two the curve is flat after two threads.
Ask for at least four cores in the VM settings, and have students write `nproc` on top of every table of timings.

The programs are built with `-g` and no optimization, on purpose: the loops are slow enough to time on buffers that fit in a small VM.
With `-O2` the sequential times drop about four times over, and the speed-ups are somewhat lower, because the loops are then closer to being limited by memory bandwidth than by the processor.

## Demonstrations worth the time

* **`./messages 2 3` several times, then `./messages 4 1000`.**
  Usually whole, then broken: a race that does not show is still a race.
* **`time ./messages 4 100000` before and after the mutex, then `time ./messages 1 400000`.**
  About 1.1 s either way, and 0.7 s with one thread: the kernel lets one `write()` at a time into the file, so threads cannot speed this program up.
  The cost of a lock taken too often is measured in `01-substring-search` instead.
* **`./bench.sh` in the full `demo-thread-scaling`**, on the projector, next to `nproc`.
  The two speed-up columns side by side are Amdahl's law without the formula.
* **`strace -e trace=clone,wait4 ./hash_files files.txt > /dev/null`**: sixteen `clone` lines, then sixteen `wait4` lines.
  With the wait in the first loop they alternate.

## Verified reference values

Measured on Ubuntu 24.04, gcc 13.3, glibc 2.39, x86-64, an Intel Core i5-12400: 6 cores, 12 hardware threads.

| Fact | Value |
| --- | --- |
| `./messages 4 1000`, no mutex | a few dozen to a few hundred whole lines of 4,000 (on the machine of the demo's notes) |
| `./messages 4 1000`, mutex | 4,000 whole lines on every run |
| `./count_chars`, 256 MiB | 10,457,088 occurrences of `e` |
| `./count_chars`, counting, 1 / 2 / 4 / 8 / 16 / 32 / 1024 threads | 0.262 / 0.137 / 0.071 / 0.057 / 0.044 / 0.041 / 0.052 s |
| `./count_chars`, whole program, 1 / 4 / 32 threads | 0.358 / 0.164 / 0.136 s |
| `./gen_text big.txt 256` | 268,435,456 bytes; `grep -o kernel` finds 2,275,966 |
| `./search big.txt kernel`, 1 / 2 / 4 / 8 / 12 / 32 threads | 0.511 / 0.293 / 0.140 / 0.114 / 0.085 / 0.088 s |
| The search with one lock per match, 1 / 4 / 12 threads | 0.526 / 0.234 / 0.336 s |
| `./encrypt secret`, 1 / 2 / 4 / 8 / 12 / 32 threads | 0.629 / 0.324 / 0.164 / 0.152 / 0.114 / 0.116 s |
| `03-process-hashing`, 16 files of 16 MiB | 0.045 s; 0.35 s with the wait in the first loop |
| `04-thread-hashing`, same files | 0.98 s sequential, 0.20 s with 16 threads |
| `md5sum` on the same files, one process | 0.32 s |
| `bonus-synchronized-db`, 4 files | 20,000 records, id sum 50,049,990,000, 20,000 finds found; 0.14 s sequential, 0.10 s with 4 threads |

The absolute times will differ on every machine; the shapes should not.

## Practical notes

* **Memory.**
  `count_chars` and `encrypt` allocate 256 MiB, and `big.txt` is 256 MiB on disk and in the page cache.
  On a VM with 2 GiB or less, pass a smaller size: `./count_chars 4 64`, `./encrypt secret 4 64M`, `./gen_text big.txt 64`.
* **Disk.**
  `gen_files.sh` writes 256 MiB under `data/`, in each of the two hashing exercises; copying `data/` and `files.txt` from one to the other saves the second half.
* **`time` is the shell keyword here**, and that is enough: `real` is the number to read, and `user` greater than `real` is the sign that several cores were used.
* **Unused-variable warnings** in the skeleton of `03-process-hashing` (`pids`) go away with the first TODO.
* **Every full task has `make test`.**
  The live directories have no test scripts, by design: choosing the reference to compare with (`grep -o`, `md5sum`, the sequential run) is part of each exercise.
  The tests of the two hashing exercises recreate `data/` and remove it afterwards.
* **`bench.sh`** exists only in the full `demo-thread-scaling`.
* `check-prerequisites.sh` checks for `strace`, `md5sum` and `nproc` for this session, and for `valgrind` as optional.

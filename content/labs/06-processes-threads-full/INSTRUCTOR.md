# Instructor Notes: Session 06 — Processes and Threads

Notes for preparing and running the session.
Per-task notes are in `INSTRUCTOR.md` inside each task directory.

## Shape of the session

Two demos, one per half of the topic, then three core exercises that are the demos with the hand-holding removed, then two bonuses that extend a core exercise each.
The demos together should take at most half the session; if they are running long, do the shell demo in full and describe the search demo while introducing `02-aggregate-matches`, whose skeleton is the search demo solved.

## The through-line

Two ways of getting a second thing to run, and what each one shares with the first:

1. **`demo-minimal-shell`** — `fork()` copies, `exec()` replaces, `waitpid()` waits; the child shares nothing once it exists.
1. **`demo-substring-search`** — the same `clone` underneath, with the flags that keep memory shared; a pointer handed to a thread is the memory itself.
1. **`01-shell-chaining`** — the argument array and the exit status: the two conventions a process lives by.
1. **`02-aggregate-matches`** — a thread's return value, its lifetime, the join as the synchronisation, and the first boundary problem.
1. **`03-file-encryptor`** — a partition of tasks rather than bytes, threads that write, and disjointness as the correctness argument.
1. **`bonus-incomplete-batches`** — the second boundary problem.
1. **`bonus-background-processes`** — zombies, and the parent's duty to wait.

## No synchronisation, by design

Mutexes, semaphores and atomics have not been taught and are not used.
Every thread exercise is built so that **no two threads write the same memory**: each thread has its own struct, its own region or batch, and a result field only it writes; the main thread reads results after the join.
Say this out loud at the start of the thread demo, and again when a student asks "but what if two threads..."; the answer is that the exercises are designed so that they do not, that the design is called partitioning, and that session 08 is where sharing starts.

The one place a student can break the rule by accident is `02-aggregate-matches`, by adding to a global total from inside the threads.
It works most of the time on this file, which is the worst outcome; `FURTHER.md` there has the experiment that shows it failing.

## The TODOs say what, not how

As in the other sessions, the skeletons' TODO comments describe what is needed and why, and the READMEs likewise; the lines to type are in this directory, for after.
The I/O is written for them (`map_file()`, `read_line()`, `tokenize()`, `gen_text`, `gen_files.sh`), because file descriptors have not been taught yet; students call those functions and do not need to read them.
There are no `make test` targets: `grep -o`, `cmp`, `diff -r`, `ps` and `bash` itself are the references, and choosing them is part of the exercise.

## The bugs the session is built around

* **`exec()` without `fork()`** — the shell disappears.
  The demo is sequenced so that everyone sees it.
* **No `exit()` after a failed `exec()`** — two shells on one terminal.
* **`&i` as the thread argument** — every thread reads the loop variable through the same pointer; counts vary between runs.
* **Returning the address of a local from a thread** — gcc warns, replaces the return value with a null pointer, and the join dereferences it.
* **The remainder of an integer division** — the last region's bytes, the last batch's files, the thread count rounded down.
* **A match across a cut** — seen by neither side; the fix is an overlap of `strlen(needle) - 1`, and one more than that double-counts.
* **`WEXITSTATUS()` on a signalled child** — 0, so `sleep 10 && echo done` prints `done` when the sleep is killed.
* **Batches that overlap by one file** — right or wrong depending on timing; the one-pass `cmp` check is what catches the files in nobody's batch.
* **A `SIGCHLD` handler without `SA_RESTART`** — the interrupted `fgets()` returns `NULL` and the shell exits when a background child ends; and `waitpid(-1)` in the handler competes with the foreground `waitpid()`.

All of them read as obviously correct. Let students hit them.

## Timing and pacing

The shell demo is the one to do in full; it is where `fork()` returning twice and `exec()` not returning are seen rather than told.
The search demo is short, three loops, and can be compressed.

The three core exercises fit a session for a group that has done sessions 01 to 03 properly.
`01-shell-chaining` takes the longest, because of the status macros and the chaining logic; `02-aggregate-matches` is three small TODOs on a solved demo; `03-file-encryptor` is the demo's two loops plus a pointer-arithmetic partition.
A group that is short of time can skip `03-file-encryptor`'s Check Your Work beyond the two-pass restore, but should not skip the exercise, because it is the one where the threads write.

Both bonuses are genuinely take-home: each needs the student's own finished core exercise, and each is twenty minutes once that exists.

## Demonstrations worth the time

* **The shell demo in three stages**: exec alone, fork added, wait added, running `ls` after each.
  Thirty seconds per stage and nothing else in the session lands as well.
* **`strace -f -e trace=execve,clone,wait4`** on one `ls`: `fork()` is `clone()`, `execlp()` is one `execve()` per `PATH` directory, `waitpid()` is `wait4()`, and the `SIGCHLD` at the end is the hook for the second bonus.
* **`strace -f -e trace=clone3`** on the search: the same system call as `fork()`, with `CLONE_VM | CLONE_THREAD`, and an 8 MiB stack per thread.
* **Four threads, four runs, four orders** of output in the search demo.
  Then `02-aggregate-matches` prints in order, because the main thread prints.
* **The zombie** in the second bonus: `sleep 1 & sleep 2 ; ps -C sleep -o pid,ppid,stat,cmd` on one line, and a `Z` in the output.

## Verified reference values

Measured on Ubuntu 25.04 / gcc 14.2 / glibc 2.41 / x86-64, 24 cores.

| Fact | Value |
| --- | --- |
| `./gen_text big.txt 64` | 67,108,864 bytes, identical on every machine |
| `grep -o kernel big.txt \| wc -l` | 569,022 |
| Demo search, 2 / 4 / 8 threads, summed | 569,021 / 569,019 / 569,015: one match lost per boundary |
| `02-aggregate-matches`, any thread count | 569,022 |
| `02-aggregate-matches`, 512 MiB, 1 / 2 / 4 / 8 threads | 0.21 / 0.11 / 0.06 / 0.03 s |
| `./gen_files.sh` | 64 files, 64 KiB to about 576 KiB, about 23 MiB |
| `03-file-encryptor`, batch 8 | 8 threads; 64 files changed after one pass, restored after two |
| `bonus-incomplete-batches`, 57 files, batch 10 | 6 threads, last batch 7 files |
| `01-shell-chaining`, `false && echo yes \|\| echo no` | `[exit status 1]`, `no`; 2 `clone()`, 2 `wait4()` |
| `01-shell-chaining`, child killed with `kill -9` | `[killed by signal 9]`, status 137 |
| `bonus-background-processes`, `sleep 1 & sleep 2 ; ps -C sleep -o pid,ppid,stat,cmd` | one `Z    [sleep] <defunct>` line, PPID the shell |

Nothing in the session is timing-sensitive; the 512 MiB timings are for the curious and depend on the core count.

## Practical notes

* **Operators need spaces around them** in the shell exercises: the tokenizer splits at whitespace only, so `a&&b` is one word.
  Say it once at the start.
* **The student's shell has no globbing**: `data/*.bin` has to be typed into `bash`, not into `./shell`.
* **`-pthread` is in every Makefile** that needs it; a student compiling by hand on an older toolchain gets undefined references.
* **`big.txt` is 64 MiB and `gen_text` holds it in memory** while writing; on a VM with little memory use `./gen_text big.txt 16` and expect a different count (the `grep -o` reference still applies).
* **`data/` and `data.orig/` are random** and git-ignored; `gen_files.sh` needs `bash`.
* **Ctrl-C in the student's shell kills the shell** as well as the foreground child, because there is no signal handling; Ctrl-D is the clean exit.
* **The `ps` one-liner for the zombie** has to be one line, because the shell reaps before every prompt.
* **`strace -f` on the shell is noisy** because of the `PATH` search; `-e trace=execve,clone,wait4` keeps it readable.
* `check-prerequisites.sh` checks for `strace` and `ps` for this session.

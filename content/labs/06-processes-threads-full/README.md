# Session 06: Processes and Threads — Full Contents

This directory holds the complete version of session 06: reference solutions, full explanations, and the reference output of every command the exercises ask for.

Use it after the live session for a full view of the solutions and the reasoning behind them.
The corresponding directory used during the session, with skeletons and task descriptions, is [`06-processes-threads-live/`](../06-processes-threads-live).

## Learning objectives

By the end of this session you should be able to:

* Start a program from your own with `fork()` and `execvp()`, and explain why it takes two calls rather than one.
* Wait for a child process with `waitpid()`, take its exit status apart, and act on it.
* Write a shell that runs commands with arguments, chains them with `;`, `&&` and `||`, and runs them in the background with `&`.
* Say what a zombie process is, and collect finished children without blocking.
* Start threads with `pthread_create()`, pass each one its own work through a struct, and collect what it returns with `pthread_join()`.
* Split a memory region, or an array of tasks, between threads so that each one works on its own part, with nothing shared for writing and therefore nothing to lock.
* Handle the boundaries of a partition: the bytes left over, the matches that straddle a cut, the batch that is smaller than the others.
* Say what a process and a thread each have of their own, and what they share.

## Prerequisites and required tools

* Session 03 concepts: what `mmap()` does with a file.
  All file handling in this session is provided.
* Comfort with C pointers, `struct`s and arrays of strings.
* A Linux environment with `gcc`, `make`, `strace` and `ps` installed.

## Contents

| Task | Type | Objective |
| --- | --- | --- |
| [`demo-minimal-shell`](demo-minimal-shell) | Demo | `fork()`, `exec()`, `waitpid()`: one command at a time, no arguments. |
| [`demo-substring-search`](demo-substring-search) | Demo | `pthread_create()`, `pthread_join()`, and a mapped file cut into one region per thread. |
| [`01-shell-chaining`](01-shell-chaining) | Core | `execvp()` with an argument array, the exit status unpacked, and `;`, `&&`, `\|\|`. |
| [`02-aggregate-matches`](02-aggregate-matches) | Core | A result returned from each thread, collected in order, and the matches lost at the cuts. |
| [`03-file-encryptor`](03-file-encryptor) | Core | An array of files partitioned into batches, one thread each, writing through shared mappings. |
| [`bonus-incomplete-batches`](bonus-incomplete-batches) | Bonus | The thread count rounded up and the last batch clamped. |
| [`bonus-background-processes`](bonus-background-processes) | Bonus | `&`, zombies, and `waitpid()` with `WNOHANG`. |

Each task directory contains:

* `README.md` — the tutorial: goal, background, how to build and run, and what the results mean.
* `FURTHER.md` — optional extensions and discussion points, with answers.
* `INSTRUCTOR.md` — notes for whoever runs the session.
* `prompt.txt` — the note the exercise was written from.

## The through-line of the session

The session is about **two ways of getting a second thing to run**, and what each one shares with the first.

1. **`demo-minimal-shell`** starts a process: a copy of the shell, made by `fork()`, whose program is replaced by `exec()`, and which the shell waits for with `waitpid()`.
   The copy shares nothing with the original once it exists; what it inherits, it inherits as a copy.
1. **`demo-substring-search`** starts threads: the same system call underneath, `clone`, with the flags that keep the memory, the files and the signal handlers shared.
   A pointer handed to a thread is the memory, not a copy, which is what makes threads useful and what makes them dangerous.
1. **`01-shell-chaining`** is the process half with the two things the demo left out: the argument array, which is the convention between a shell and a program, and the exit status, which is the one byte a process says to its parent, and on which every `&&`, `||` and `if` is built.
1. **`02-aggregate-matches`** is the thread half with the thing the demo could not do: use the results.
   A thread returns a pointer, the pointer has to outlive the thread, and the join is what makes the result safe to read.
   The matches lost at the cuts are the first boundary problem.
1. **`03-file-encryptor`** partitions an array of tasks instead of a region of bytes, and the threads write.
   It is safe because the batches are disjoint, and that argument, not a lock, is what makes it correct.
1. **`bonus-incomplete-batches`** is the second boundary problem: *n* items into batches of *k* when *k* does not divide *n*.
1. **`bonus-background-processes`** closes the process half: a child that ends while nobody is waiting is a zombie, and a parent's duty to wait does not go away because it was busy.

The design rule that runs through every thread exercise is **partition, compute, reduce**: split the input so that each worker owns a part, let the workers run with nothing shared for writing, then combine the results in one place after the joins.
No mutex, no atomic, no shared counter appears in this session, and students should hear that this is a choice that works whenever the partition is right, not an omission.
Session 07 measures what the partition buys; session 08 is what to do when the partition is impossible.

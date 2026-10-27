# Session 06: Processes and Threads

This session is about getting the operating system to run things for you: a second program, started from your own, and a second flow of control inside your own program.

* Starting a new process with `fork()` and replacing its program with `exec()`.
* Waiting for a process with `waitpid()`, and reading how it ended.
* Starting threads with `pthread_create()` and waiting for them with `pthread_join()`.
* Splitting a piece of work between threads so that no two of them touch the same memory.

## Learning objectives

By the end of this session you should be able to:

* Start a program from your own with `fork()` and `execvp()`, and explain why it takes two calls rather than one.
* Wait for a child process with `waitpid()`, take its exit status apart, and act on it.
* Write a shell that runs commands with arguments and chains them with `;`, `&&` and `||`.
* Start threads with `pthread_create()`, pass each one its own work through a struct, and collect what it returns with `pthread_join()`.
* Split a memory region, or an array of tasks, between threads so that each one works on its own part, with nothing shared for writing and therefore nothing to lock.
* Say what a process and a thread each have of their own, and what they share.

## Prerequisites and required tools

* Session 03 concepts: what `mmap()` does with a file.
  All file handling in this session is written for you; you call it.
* Comfort with C pointers, `struct`s and arrays of strings (`argv`).
* A Linux environment with `gcc`, `make`, `strace` and `ps` installed.

Check that your system has all it needs for the lab, by downloading and running the [`check-prerequisites.sh` script](https://github.com/cs-pub-ro/operating-systems/blob/main/scripts/check-prerequisites.sh):

```console
wget http://raw.githubusercontent.com/cs-pub-ro/operating-systems/refs/heads/main/scripts/check-prerequisites.sh
chmod a+x check-prerequisites.sh
./check-prerequisites.sh
```

The script installs nothing.
It reports what is missing and prints the command that installs it on your distribution.

If something is missing, be sure to install and configure it.

## Getting the lab archive

Download [`06-processes-threads.zip`](https://github.com/cs-pub-ro/operating-systems/raw/lab-archives/06-processes-threads.zip), then unzip it and change into the directory it creates:

```console
wget https://github.com/cs-pub-ro/operating-systems/raw/lab-archives/06-processes-threads.zip
unzip 06-processes-threads.zip
cd 06-processes-threads/
```

Work inside that directory for the rest of the session.

## Task order

The two demos come first, solved together with the teaching assistant: one for processes, one for threads.
The core exercises are then solved individually or in teams, in the numeric order shown.
Bonus exercises are optional: start them if you finish the core exercises, or take them home.

| Order | Task | Type | Objective |
| --- | --- | --- | --- |
| 1 | [`demo-minimal-shell`](demo-minimal-shell) | Demo | Run a command as a new process: `fork()`, `exec()`, `waitpid()`. |
| 2 | [`demo-substring-search`](demo-substring-search) | Demo | Search a mapped file with several threads, each on its own part of it. |
| 3 | [`01-shell-chaining`](01-shell-chaining) | Core | Commands with arguments, and `;`, `&&`, `\|\|` driven by the exit status. |
| 4 | [`02-aggregate-matches`](02-aggregate-matches) | Core | Threads that return a result, and a main thread that adds them up. |
| 5 | [`03-file-encryptor`](03-file-encryptor) | Core | Threads that each take a batch of files. |
| 6 | [`bonus-incomplete-batches`](bonus-incomplete-batches) | Bonus | 57 files in batches of 10: the last batch is smaller. |
| 7 | [`bonus-background-processes`](bonus-background-processes) | Bonus | `&`: run a command without waiting, and collect it later. |

The two demos each start a thread of their own through the session.
The shell demo becomes `01-shell-chaining` and then `bonus-background-processes`; the search demo becomes `02-aggregate-matches`, and `03-file-encryptor` applies the same split to an array of files instead of a region of bytes.
`bonus-incomplete-batches` starts from **your finished `encryptor.c`** of `03-file-encryptor`, and `bonus-background-processes` from **your finished `shell.c`** of `01-shell-chaining`, so do those core exercises first.

One rule holds for every thread in this session: **each thread works on memory that no other thread touches**, and the results are read only after the thread has been joined.
That is why no mutex appears anywhere; sharing memory for writing, and the tools for it, are the subject of session 08.

Each exercise directory has a `README.md` with the task itself.
Where there is also a `FURTHER.md`, it holds optional extensions and questions to dig into once the task is done.

# Session 07: Parallelizing Execution

This session is about taking a program that does its work in one flow of control and making it do the same work in several, and about what that buys and what it costs.

* Turning a sequential program into a parallel one, with threads and with processes.
* Measuring the result: how much faster, and where it stops getting faster.
* The race condition: what goes wrong when two threads write the same variable.
* The mutex, the simplest tool against it.

## Learning objectives

By the end of this session you should be able to:

* Take a sequential loop over a block of data and split it between threads, with every element in exactly one thread's part.
* Recognize a race condition in a program, and in its output, and say which statement is the critical section.
* Protect a critical section with `pthread_mutex_lock()` and `pthread_mutex_unlock()`, and keep it as short as it can be.
* Tell the data that needs a lock, because several threads write it, from the data that does not, because the partition gives each thread its own.
* Measure a speed-up with `time`, and explain why it stops at some number of threads, and why it can turn into a slow-down.
* Run several processes at the same time with `fork()` and `exec()`, and wait for all of them.
* Say what is different between doing the same work in several processes and in several threads.

## Prerequisites and required tools

* Session 06: `fork()`, `exec()` and `waitpid()`; `pthread_create()` and `pthread_join()`; splitting a region between threads.
* Session 03, for the bonus: the growable in-memory database.
* A Linux environment with `gcc`, `make`, `strace`, `md5sum` and `nproc` installed.

Check that your system has all it needs for the lab, by downloading and running the [`check-prerequisites.sh` script](https://github.com/cs-pub-ro/operating-systems/blob/main/scripts/check-prerequisites.sh):

```console
wget http://raw.githubusercontent.com/cs-pub-ro/operating-systems/refs/heads/main/scripts/check-prerequisites.sh
chmod a+x check-prerequisites.sh
./check-prerequisites.sh
```

The script installs nothing.
It reports what is missing and prints the command that installs it on your distribution.

If something is missing, be sure to install and configure it.

Find out how many cores your machine has, with `nproc`, before you start.
Every measurement in this session is to be read against that number, and a virtual machine with one core will show no speed-up at all: give it at least four.

## Getting the lab archive

Download [`07-parallel.zip`](https://github.com/cs-pub-ro/operating-systems/raw/lab-archives/07-parallel.zip), then unzip it and change into the directory it creates:

```console
wget https://github.com/cs-pub-ro/operating-systems/raw/lab-archives/07-parallel.zip
unzip 07-parallel.zip
cd 07-parallel/
```

Work inside that directory for the rest of the session.

## Task order

The two demos come first, solved together with the teaching assistant.
The core exercises are then solved individually or in teams, in the numeric order shown.
The bonus exercise is optional: start it if you finish the core exercises, or take it home.

| Order | Task | Type | Objective |
| --- | --- | --- | --- |
| 1 | [`demo-race-condition`](demo-race-condition) | Demo | Threads that increment one shared counter: the race, and the mutex that fixes it. |
| 2 | [`demo-thread-scaling`](demo-thread-scaling) | Demo | Count a letter in a large buffer with 1, 4, 8, 32 threads, and time it. |
| 3 | [`01-substring-search`](01-substring-search) | Core | A sequential search made parallel, with a shared total behind a mutex. |
| 4 | [`02-string-encryption`](02-string-encryption) | Core | A sequential XOR cipher made parallel: offsets, lengths and the remainder. |
| 5 | [`03-process-hashing`](03-process-hashing) | Core | One `md5sum` process per file: start all of them, then wait for all of them. |
| 6 | [`04-thread-hashing`](04-thread-hashing) | Core | The same hashing with one thread per file and an MD5 function. |
| 7 | [`bonus-synchronized-db`](bonus-synchronized-db) | Bonus | The in-memory database of session 03, used by several threads at once. |

Every program in this session starts out sequential and correct, apart from `03-process-hashing`, where the part that is missing is the whole point.
Run each one before you change it and write down what it prints and how long it takes: that is the reference the parallel version is compared with.
Until you have done the TODOs, the programs take a thread count and ignore it.

Two questions are worth asking of every task: **which memory do several threads write**, and **how much of the work is still done by one thread**.
The answer to the first says where a mutex is needed, and the answer to the second says how much faster the program can get.

The mutex is the only synchronization tool used in this session.
Semaphores, condition variables and atomic variables are for session 08.

Each exercise directory has a `README.md` with the task itself.
Where there is also a `FURTHER.md`, it holds optional extensions and questions to dig into once the task is done.

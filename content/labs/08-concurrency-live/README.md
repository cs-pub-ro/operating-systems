# Session 08: Troubleshooting Concurrency

Session 07 made programs parallel and met the first thing that goes wrong, the race condition, and the first tool against it, the mutex.
This session is about the rest: code that already has locks in it and is still wrong.

* Protecting a whole data structure, a list and then a tree, with one mutex.
* Waiting for something to become true, with a condition variable.
* Three ways in which synchronized code fails: a check that is out of date by the time it is acted on, threads that wait for each other for ever, and a wake-up that reaches the wrong thread or nobody.
* Classic problems to practise on: producer-consumer, building H2O, a boss and its workers.

## Learning objectives

By the end of this session you should be able to:

* Put a mutex inside a data structure and take it in every function that reads or changes the structure.
* Make a thread wait for a condition with `pthread_cond_wait()`, in a loop, and wake it up with `pthread_cond_signal()` or `pthread_cond_broadcast()`, and say which of the two a situation calls for.
* Recognize a check-then-act (TOCTOU) bug in code where every access is locked, and close it.
* Recognize a deadlock, find which threads hold what with `ps` and GDB, and remove it by taking locks in one order.
* Tell the symptoms apart: a wrong result, a crash, a program that never ends.
* Make threads wait for each other, in groups, with a condition variable and counters that say who may go.
* Read synchronization code that somebody else wrote, and say what is wrong with it before running it.

## Prerequisites and required tools

* Session 07: `pthread_mutex_lock()` and `pthread_mutex_unlock()`, the critical section, the race condition.
* Session 01, for the challenges: what a shared library is, and how an executable finds it when it starts.
* Lecture 08, for the vocabulary: lost update, TOCTOU, deadlock.
* A Linux environment on an **x86-64** machine, with `gcc`, `make`, `gdb`, `ps` and `nproc` installed.
  The executables of the challenges are given already built, for x86-64.

Check that your system has all it needs for the lab, by downloading and running the [`check-prerequisites.sh` script](https://github.com/cs-pub-ro/operating-systems/blob/main/scripts/check-prerequisites.sh):

```console
wget http://raw.githubusercontent.com/cs-pub-ro/operating-systems/refs/heads/main/scripts/check-prerequisites.sh
chmod a+x check-prerequisites.sh
./check-prerequisites.sh
```

The script installs nothing.
It reports what is missing and prints the command that installs it on your distribution.

If something is missing, be sure to install and configure it.

Give your virtual machine at least four cores, and check with `nproc`.
With one core most of the bugs of this session hide, which does not mean they are gone.

## Getting the lab archive

Download [`08-concurrency.zip`](https://github.com/cs-pub-ro/operating-systems/raw/lab-archives/08-concurrency.zip), then unzip it and change into the directory it creates:

```console
wget https://github.com/cs-pub-ro/operating-systems/raw/lab-archives/08-concurrency.zip
unzip 08-concurrency.zip
cd 08-concurrency/
```

Work inside that directory for the rest of the session.

## Task order

The three demos come first, solved together with the teaching assistant.
The core exercises are then solved individually or in teams, in the numeric order shown.
The bonus exercises are optional: start them if you finish the core exercises, or take them home.

| Order | Task | Type | Objective |
| --- | --- | --- | --- |
| 1 | [`demo-01-list-mutex`](demo-01-list-mutex) | Demo | A linked list that ten threads change at once, and the one mutex that keeps it whole. |
| 2 | [`demo-02-ordered-print`](demo-02-ordered-print) | Demo | Three threads that print 1 2 3 in order, with a condition variable. |
| 3 | [`demo-03-omelette`](demo-03-omelette) | Demo, challenge | Hens, a cook and a basket: three eggs make an omelette, and the cook has to wait for them properly. |
| 4 | [`01-binary-tree`](01-binary-tree) | Core, challenge | Make a binary search tree safe for eight threads. |
| 5 | [`02-ordered-print`](02-ordered-print) | Core, challenge | Five threads that take turns, written from an empty library. |
| 6 | [`03-toctou`](03-toctou) | Core, challenge | A registry where every access is locked, and names still get two owners. |
| 7 | [`04-deadlock`](04-deadlock) | Core, challenge | Bank transfers that stop for ever. |
| 8 | [`05-string-encryption`](05-string-encryption) | Core, challenge | The cipher of session 07 with threads that share out blocks, and a lock in the wrong place. |
| 9 | [`06-building-h2o`](06-building-h2o) | Core, challenge | Two hydrogen and one oxygen at a time, and one molecule after another. |
| 10 | [`07-producer-consumer`](07-producer-consumer) | Core, challenge | A bounded queue that loses items, and sometimes sleeps for ever. |
| 11 | [`bonus-01-boss-workers`](bonus-01-boss-workers) | Bonus, challenge | A boss that hands out work, and workers that have to be told when to go home. |
| 12 | [`bonus-02-worker-threads`](bonus-02-worker-threads) | Bonus, challenge | A pool of worker threads, built up from the previous task. |
| 13 | [`bonus-03-synchronized-db`](bonus-03-synchronized-db) | Bonus, challenge | The database of session 07 behind a read-write lock that is not used the way it should be. |

## How a challenge works

Most tasks of this session are challenges, and all of them are built the same way.
The directory of a challenge holds:

* `chall` - an executable, already built.
  It starts threads, makes them call the functions of a shared library, checks what came out, and prints a **flag** if all of it was right.
* `chall.c` and `flag.h` - the source of the executable, for you to read.
  The flag is kept encrypted inside the executable, and the key was taken out of this copy of the source.
* a header, such as `tree.h` - the interface of the library: the functions the executable calls.
  Do not change it; the executable was built against it.
* a C file, such as `tree.c` - the library itself.
  **This is the file you work on.**
  It builds, and its synchronization is missing or wrong.
* a `Makefile` that builds the library, `lib<name>.so`, from that file.

The cycle is the same every time:

```console
make
./chall
```

`chall` looks for the library in its own directory, so it fails to start until you have run `make`.
Run it before you change anything: how it fails is the first thing to understand.

Three habits make these challenges tractable.

* **Run it more than once.**
  A concurrency bug does not show on every run, and one good run proves nothing.
  When you think you are done, run the executable twenty times: `for i in $(seq 20); do ./chall | tail -n 1; done`.
* **Read the symptom.**
  A wrong number, a crash and a program that never ends point at different kinds of mistake.
  A program that never ends is stopped after ten seconds, with a message; `./chall 0` turns that off, for when you want to look at the stuck threads with `ps` or GDB.
* **Read the code before you change it.**
  Every broken library here can be fixed by changing a handful of lines.
  The work is in finding out which.

The flag is what you show the teaching assistant, together with the explanation of what was wrong.
The flag without the explanation is worth nothing: the point of the session is the second.

Each exercise directory has a `README.md` with the task itself.
Where there is also a `FURTHER.md`, it holds optional extensions and questions to dig into once the task is done.

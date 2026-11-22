# Instructor Notes: Session 08 — Troubleshooting Concurrency

Notes for preparing and running the session.
Per-task notes are in `INSTRUCTOR.md` inside each task directory.

## Shape of the session

Three demos, seven core exercises, three bonuses.
Eleven of the thirteen tasks are challenges: a prebuilt executable, a shared library whose synchronization is missing or wrong, and a flag when it is right.

It is more than fits in a hundred minutes, on purpose.
A group that follows the demos and does `01` to `04` has covered the session: the mutex in a structure, the condition variable, TOCTOU and deadlock.
`05` to `07` are for the faster half of the room, and the bonuses are take-home.

The demos together should take about a third of the session.
`demo-02-ordered-print` is the one to protect: `while` against `if` and `broadcast` against `signal`, both tried both ways, are what seven later tasks are built on.
`demo-01-list-mutex` can be compressed to "run, crash, two lines, run".

## The through-line

1. **`demo-01-list-mutex`** — one mutex around a whole structure; where the critical section starts.
1. **`demo-02-ordered-print`** — the condition variable: wait in a loop, wake everybody when the waiters differ.
1. **`demo-03-omelette`** — the format of a challenge; test, wait and act under one lock.
1. **`01-binary-tree`** — the lock in the interface, not in the recursion; readers need it; a passing test is not a proof.
1. **`02-ordered-print`** — the wait written from nothing.
1. **`03-toctou`** — every access locked, and the operation still not atomic.
1. **`04-deadlock`** — two locks, two orders; `ps` and GDB on a stuck program.
1. **`05-string-encryption`** — the lock around the work instead of around the shared cursor: wrong and slow at once.
1. **`06-building-h2o`** — waiting for other threads: counters, tickets, and what "no ticket left" proves.
1. **`07-producer-consumer`** — `if` instead of `while`, one condition variable for two conditions.
1. **`bonus-01-boss-workers`** — how waiting threads are told that it is over.
1. **`bonus-02-worker-threads`** — a thread pool; "done" as a count.
1. **`bonus-03-synchronized-db`** — a read-write lock, and three bugs of the three kinds.

## The format of a challenge

Explain it once, in `demo-03-omelette`, and write the cycle on the board: `make`, `./chall`, read, change the library, again.

* The executable is given built, and is linked to look for `lib<name>.so` in its own directory.
  Before the first `make` it fails with a loader error, which is the first thing to show.
* Students change one file, the C file of the library.
  The header is fixed: the executable was built against it.
* `./chall` gives up after ten seconds (twenty for `05` and the database) with a message.
  `./chall 0` never gives up, for looking at a stuck program.
* The flag is submitted on the SO CTF platform, <https://ctf.security.cs.pub.ro/so/challenges>, where `demo-03-omelette`, the seven exercises and the three bonus exercises each have a challenge that gives points.
  Students need an account; those who did session 05 have one.
  Have them log in at the start, and submit the flag of the demo together, so that nobody meets the platform for the first time in the middle of an exercise.
* The platform checks the flag and nothing else.
  Keep asking for the explanation: every task README has questions for the assistant in *Check Your Work*, and they are where the session is.

### What the flag is worth

The flag is kept encrypted in the executable.
The key it is decrypted with is mixed with the numbers the run ended with, so skipping the check in a debugger is not enough, and the key bytes were taken out of the source students get.
They are in the executable all the same.
A student who dumps them and decrypts the flag by hand has done session 05's work, not this session's, and gets the points on the platform all the same; the explanation is what tells the two apart.

### What a flag does not prove

The executables report the bugs that showed.
Three versions that are wrong, or poor, and get a flag are known and deliberate, and the task READMEs ask about each of them:

* `01-binary-tree` with no lock in `tree_contains()`: 47 flags in 50 runs.
* `05-string-encryption` with the lock around the whole loop body: correct, and eight times slower.
* `bonus-02-worker-threads` with a recursive mutex held across the task: correct, and sequential.

## Producing the live half

The executables in `08-concurrency-live/` are built from this directory.

```console
./utils/publish.sh              # every challenge
./utils/publish.sh 03-toctou    # one
```

For every task directory here that has a `flag`, the script runs `make`, and copies to the live task `chall`, `chall.c`, the header of the library, and `flag.h` with the key array replaced by a single zero byte.
The skeleton of the library, the `Makefile` and the `README.md` of a live task are written by hand and are not touched.

Run it after any change to a `chall.c`, a header or a `flag.h`, and commit the new `chall` files.

The flags are also configured in the challenges of the CTF platform.
A flag changed here has to be changed there as well, or correct submissions are refused.

To change a flag, or after a change to the numbers a correct run ends with:

```console
cd 03-toctou
../utils/gen_flag.py flag 500 500 > flag.h
make test
cd .. && ./utils/publish.sh 03-toctou
```

The numbers after `flag` are the proof: the values `chall.c` passes to `flag_print()`, in order.
Each task's `INSTRUCTOR.md` gives its own.
If they are wrong, the reference solution prints "No flag: the run did not end with the expected numbers", which is how to find them: print the proof, and regenerate.

## The executables are x86-64

They were built on Ubuntu 25.04, with GCC 14.2 and glibc 2.41, and need nothing newer than glibc 2.34, so they run on Ubuntu 22.04 and later, and on the class virtual machine.
They do not run on an ARM machine.
Students on Apple Silicon need the emulated x86-64 virtual machine, where everything is several times slower: the ten-second alarm may need raising, `./chall 60`, and bugs that depend on timing may show less often, or more.

The alternative, for an assistant with an ARM room, is to build the executables there from this directory and hand them out.

## Timing depends on the machine

Every count in the task notes, "20 time-outs in 20 runs", "47 flags in 50", was measured on one machine with 24 cores.
On a four-core virtual machine the proportions will differ.
What should not differ is which versions are wrong.

With one core most of the races stop showing.
Check `nproc` in the virtual machine before the session, and ask for at least four cores.

## Looking at a stuck program

Several tasks end in a hang, and students should look before they restart.

```console
./chall 0 &
ps -L -o pid,lwp,stat,pcpu,wchan:22,comm -p $(pidof chall)
```

Threads in state `S` with no processor time, waiting in `futex_wait_queue`, are asleep on a mutex or a condition variable.
A thread in state `R` near 100 % is spinning.

`gdb -p` is refused on Ubuntu unless run as root (`kernel.yama.ptrace_scope` is 1).
Start the program from GDB instead:

```console
gdb ./chall
(gdb) run 0
^C
(gdb) thread apply all bt 8
```

A thread stopped in `pthread_mutex_lock()` waits for a lock; one stopped in `pthread_cond_wait()` waits for a wake-up.
The first is a deadlock if the owner is waiting too; the second is a lost wake-up if nobody is left to send one.
That distinction is the main diagnostic skill of the session, and `04-deadlock` and `07-producer-consumer` are where it is practised.

## The bugs the session is built around

* **`if` around `pthread_cond_wait()`** — `demo-02-ordered-print`, `demo-03-omelette`, `07-producer-consumer`.
* **`signal` where the waiters differ, or where all must hear** — `demo-02-ordered-print`, `07-producer-consumer`, both pool bonuses.
* **Acting after the unlock on what was learned before it (TOCTOU)** — `demo-03-omelette`, `03-toctou`, `05-string-encryption`, `db_update()` in the database.
* **A `return` between lock and unlock** — `01-binary-tree`, `db_find()` in the database.
* **Locking twice from one thread** — the lock in the recursion of `01`, the wrapper of `03`, the task of `bonus-02-worker-threads`.
* **Two locks in two orders** — `04-deadlock`.
* **The lock around the wrong thing** — `05-string-encryption`.
* **A read lock around a write** — `db_add()` in the database.
* **Dropping work at the end** — `bonus-01-boss-workers`.
* **"Empty" taken for "done"** — `bonus-02-worker-threads`.

## Practical notes

* **Every full task has `make test`**, which runs the reference many times and wants the flag every time.
  The live directories have no tests: the executable is the test.
* **Helgrind** is used in `01-binary-tree` and in several `FURTHER.md` files.
  It needs `./chall 0`, because the program runs many times slower under it.
* **Memory.**
  `05-string-encryption` allocates 64 MiB.
* **`chall` is a tracked binary in each live task**, like the executables of session 05.
  `*.so` is in the top-level `.gitignore`, so the libraries students build are never committed.
* `check-prerequisites.sh` checks for an x86-64 machine, `gdb`, `ps` and `nproc` for this session, and for `valgrind` as optional.

# Demo: A Race Condition, and a Mutex

**Tools:** GCC, Make, time

## Goal

See a race condition happen, find the statements responsible, and fix it with a mutex.
Afterwards you will be able to say what a critical section is, and to declare, initialize, lock, unlock and destroy a `pthread_mutex_t`.

## Background

Session 06 kept its threads apart: each one had its own region and its own result, and nothing was written by two of them.
Here every thread writes to the **same** file, through the same file descriptor, and there is no way to give each thread a part of it.

A message is one line, and each thread writes it in three calls:

```C
put(who);		/* "thread 2"     */
put(": message ");
put(num);		/* "17\n"         */
```

`put()` is one `write()`, and the kernel carries out each `write()` to a file whole: a line is never cut in the middle of a call.
Nothing, though, stops another thread's call from coming **between** two of this thread's.
Then the file holds `thread 2thread 0: message ...`, and the line is broken.
Whether that happens depends on how the calls of the threads are interleaved, which is what makes this a **race condition**: the result depends on timing.

The statements that must not be interleaved with another thread's are a **critical section**.
Here it is the three calls, and it protects no variable of the program at all: what is shared is the file.
A **mutex** (mutual exclusion lock) is how a thread says "nobody else in here until I am out":

```C
int pthread_mutex_init(pthread_mutex_t *mutex, const pthread_mutexattr_t *attr);
int pthread_mutex_lock(pthread_mutex_t *mutex);
int pthread_mutex_unlock(pthread_mutex_t *mutex);
int pthread_mutex_destroy(pthread_mutex_t *mutex);
```

A mutex is either free or held by one thread.
`pthread_mutex_lock()` takes it if it is free, and otherwise waits until it is; `pthread_mutex_unlock()` frees it.

Files:

* `messages.c` — the messages, with the mutex in.
  It writes `messages.txt`, then reads it back and counts the lines that are whole messages.
* `test.sh` — runs it several times with 1, 2, 4 and 8 threads and checks that every line is whole.

## Build & Run

```console
make
./messages 4 1000
```

Without the mutex, which is the program the live directory ships, three runs give three different answers, all wrong:

```text
messages written: 4000
whole lines:      11
```

```text
messages written: 4000
whole lines:      129
```

```text
messages written: 4000
whole lines:      362
```

With the mutex, every run gives the same one:

```text
messages written: 4000
whole lines:      4000
```

## Results and Explanations

### The race

The broken lines are easy to find:

```console
grep -v '^thread [0-9]*: message [0-9]*$' messages.txt | head
```

```text
thread 1thread 0: message : message 0
0
thread 1thread 0: message : message 1
1
```

Thread 1 wrote its name, thread 0 wrote its name, both wrote the `: message` in the middle, and then both wrote their numbers.
Nothing is lost: `wc -l messages.txt` still says 4000, and every piece of every message is in the file.
The pieces are in the wrong lines.

The damage depends on how long the threads run side by side.

```console
./messages 2 3
./messages 2 1000
```

With three messages each, all six lines are whole on most runs: the first thread is often finished before the second has been started.
Run it a few more times, and one run in four or five breaks.
The program is just as wrong when it happens to come out right, and a test that runs it once would pass it.
A race that does not show is still a race.

### Step 1 — declare the mutex

```C
static pthread_mutex_t log_lock;
```

The mutex is global for the same reason as the file descriptor: every thread has to use the same one.
A mutex that each thread declared for itself, as a local, would protect nothing.

### Step 2 — initialize it, and destroy it

```C
pthread_mutex_init(&log_lock, NULL);
/* create the threads, join the threads */
pthread_mutex_destroy(&log_lock);
```

Initialization comes before the first thread is created, and destruction after the last one is joined.
The second argument is for attributes; `NULL` gives an ordinary mutex.

A global mutex can also be initialized where it is declared, with no call at all, which is the form the exercises use:

```C
static pthread_mutex_t log_lock = PTHREAD_MUTEX_INITIALIZER;
```

### Step 3 — lock around the critical section

```C
snprintf(who, sizeof(who), "thread %ld", id);
snprintf(num, sizeof(num), "%ld\n", i);

pthread_mutex_lock(&log_lock);
put(who);
put(": message ");
put(num);
pthread_mutex_unlock(&log_lock);
```

The critical section is the three calls that touch the file.
The two `snprintf()` calls write the thread's own buffers, on its own stack, and stay outside; so does the loop variable `i`.

The mutex and the file are connected only by the program's discipline: nothing in C says that `log_lock` protects `log_fd`.
One `write()` somewhere that does not take the lock, and the race is back.

### What the lock costs

```console
time ./messages 4 100000
time ./messages 1 400000
```

| Version | `real` | `user` | `sys` |
| --- | --- | --- | --- |
| No mutex, 4 threads, broken lines | 1.09 s | 0.20 s | 3.96 s |
| Mutex, 4 threads | 1.13 s | 0.40 s | 1.33 s |
| Mutex, 1 thread, 400,000 messages | 0.70 s | 0.22 s | 0.48 s |

Measured on 22 logical CPUs; the shape matters, not the numbers.
The correct program takes as long as the broken one, and one thread writing all the messages is the **fastest** of the three.

The time goes into the `write()` calls, and the kernel lets only one of them at a time into the file: that is how it keeps each call whole.
Four threads writing one file therefore wait for each other with or without the mutex.
Without it they wait inside the kernel, three times per message, and the `sys` column shows what that fighting costs; with it they wait for the mutex, once per message, and the kernel's own lock is always free when they get there.

The file is the one thing every thread uses, so threads cannot make this program faster.
Threads pay off when each has its own part of the work, which is the next demo.

### Why not an atomic instruction?

For one shared integer, such as a counter that several threads increment, there is something cheaper than a mutex: an atomic read-modify-write, built on an instruction such as compare-and-swap, which updates the integer in one indivisible step.
Session 08 shows it.
There is no such instruction for three system calls, nor for any critical section that is several operations: on a file, on several variables at once, on a data structure.
That is what a mutex is for.

## References

* `man 3 pthread_mutex_lock`, `man 3 pthread_mutex_init`, `man 3 pthread_mutex_destroy`
* `man 2 write`, its BUGS section: what POSIX promises about `write()` calls from several threads at once
* `man 7 pthreads`

# Demo: A Race Condition, and a Mutex

**Tools:** GCC, Make, time

## Goal

See a race condition happen, find the statement responsible, and fix it with a mutex.
Afterwards you will be able to say what a critical section is, and to declare, initialize, lock, unlock and destroy a `pthread_mutex_t`.

## Background

Session 06 kept its threads apart: each one had its own region and its own result, and nothing was written by two of them.
Here every thread writes the **same** variable, a global `counter`, and there is no way to cut one `long` into a part per thread.

```C
static long counter;

for (i = 0; i < increments; i++)
	counter++;
```

`counter++` is one statement and three steps: read the value from memory, add one, write the result back.
Two threads can both read 41, both add one, and both write 42: two increments, and the counter went up by one.
An update was lost.
Whether that happens depends on how the steps of the two threads are interleaved, which is what makes this a **race condition**: the result depends on timing.

The statements that must not be interleaved with another thread's are a **critical section**.
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

* `counter.c` — the counter, with the mutex in.
* `test.sh` — runs it several times with 1, 2, 4 and 8 threads and checks every total.

## Build & Run

```console
make
./counter 4 1000000
```

Without the mutex, which is the program the live directory ships, three runs give three wrong answers:

```text
expected: 4000000
counter:  1443792
```

```text
expected: 4000000
counter:  1102530
```

```text
expected: 4000000
counter:  1066750
```

With the mutex, every run gives the same one:

```text
expected: 4000000
counter:  4000000
```

## Results and Explanations

### The race

Between a quarter and a third of the increments survive.
The rest were overwritten by a thread that had read the counter before another thread's write and wrote its own result after it.

The damage depends on how long the threads run side by side.

```console
./counter 2 1000
./counter 2 10000
./counter 2 1000000
```

With a thousand increments each, the total is right on almost every run: the first thread is finished before the second has been started.
The program is just as wrong as before, and no test would show it.
A race that does not show is still a race.

### Step 1 — declare the mutex

```C
static pthread_mutex_t counter_lock;
```

The mutex is a variable like the counter, and global for the same reason: every thread has to use the same one.
A mutex that each thread declared for itself, as a local, would protect nothing.

### Step 2 — initialize it, and destroy it

```C
pthread_mutex_init(&counter_lock, NULL);
/* create the threads, join the threads */
pthread_mutex_destroy(&counter_lock);
```

Initialization comes before the first thread is created, and destruction after the last one is joined.
The second argument is for attributes; `NULL` gives an ordinary mutex.

A global mutex can also be initialized where it is declared, with no call at all, which is the form the exercises use:

```C
static pthread_mutex_t counter_lock = PTHREAD_MUTEX_INITIALIZER;
```

### Step 3 — lock around the critical section

```C
for (i = 0; i < increments; i++) {
	pthread_mutex_lock(&counter_lock);
	counter++;
	pthread_mutex_unlock(&counter_lock);
}
```

The critical section is the one statement that touches the shared variable.
The loop variable `i` is a local, on the thread's own stack, and needs nothing.

The mutex and the counter are connected only by the program's discipline: nothing in C says that `counter_lock` protects `counter`.
One statement somewhere that changes the counter without taking the lock, and the race is back.

### What the lock costs

```console
time ./counter 4 1000000
```

| Version | `real` | `user` | `sys` |
| --- | --- | --- | --- |
| No mutex, 4 threads, wrong answer | 0.012 s | 0.041 s | 0.001 s |
| Mutex, 4 threads | 0.233 s | 0.376 s | 0.438 s |
| Mutex, 1 thread, 4,000,000 increments | 0.051 s | 0.051 s | 0.000 s |

The correct program is twenty times slower than the wrong one.
The last line is the one to think about: one thread doing all four million locked increments is more than four times **faster** than four threads sharing them.

Taking a free mutex is cheap, a few instructions in user space.
Taking one that another thread holds means asking the kernel to put the thread to sleep and wake it later, and that is where the `sys` time comes from.
Four threads that do nothing but fight over one lock spend their time waiting for each other, and do the work one at a time anyway.

This program is all critical section, so threads cannot make it faster.
Real programs are not, and the art is in keeping the locked part small next to the rest, which is what the exercises of this session are about.

## References

* `man 3 pthread_mutex_lock`, `man 3 pthread_mutex_init`, `man 3 pthread_mutex_destroy`
* `man 7 pthreads`
* `man 7 futex` — what a contended mutex asks of the kernel

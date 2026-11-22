# Demo 02: Three Threads That Take Turns

**Tools:** GCC, Make

**Directory**: `demo-02-ordered-print/`

## Goal

Reference version of the turn-taking demo: three threads print 1, 2 and 3, always in that order, by waiting on a condition variable until a shared variable says the turn is theirs.

## Background

A mutex answers the question "may I go in?".
It cannot answer "is it my turn?": the thread that gets the lock is whichever asked at the right moment.

A thread that needs something to be true before it goes on could test in a loop, taking and releasing the mutex each time.
That works and burns a core doing nothing.
A **condition variable** is the alternative: a place to sleep until another thread says that something changed.

```C
pthread_mutex_lock(&lock);
while (!condition)
	pthread_cond_wait(&cond, &lock);
/* the condition is true, and the lock is held */
pthread_mutex_unlock(&lock);
```

Three rules come with it.

* **A condition variable always works with a mutex.**
  The condition is a test on shared data, so it is made with the mutex held.
  `pthread_cond_wait()` releases the mutex and puts the thread to sleep in one step, and takes the mutex again before it returns.
  If the release and the sleep were two steps, a wake-up sent between them would be lost.
* **The condition variable does not hold the condition.**
  It is only the place where threads sleep.
  The condition is the shared variable, here `turn`.
* **Being woken up does not mean the condition is true.**
  It means something changed.
  The thread tests again, which is why the wait is in a `while`.

The other side changes the data and wakes sleepers up, with `pthread_cond_signal()`, which wakes one thread, or `pthread_cond_broadcast()`, which wakes all of them.

## Build & Run

```console
make
./ordered
```

```text
1 2 3
1 2 3
1 2 3
1 2 3
1 2 3
```

`./ordered 2000` runs two thousand rounds; `make test` does that twenty times and checks every line.

## Results and Explanations

### Before

With no synchronization, each thread runs its whole loop as soon as it starts:

```text
1 1 1 1 1 2 2 2 2 2 3
3
3
3
3
```

With two thousand rounds the threads overlap and the lines are a mix: of 2,000 lines, about 1,450 were a lone `3`.

### The solution

```C
static int turn;
static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t turn_changed = PTHREAD_COND_INITIALIZER;
```

```C
pthread_mutex_lock(&lock);

while (turn != id)
	pthread_cond_wait(&turn_changed, &lock);

printf("%d%s", id + 1, id == NUM_THREADS - 1 ? "\n" : " ");

turn = (turn + 1) % NUM_THREADS;
pthread_cond_broadcast(&turn_changed);

pthread_mutex_unlock(&lock);
```

The thread whose turn it is finds the condition true and never sleeps.
The other two sleep inside `pthread_cond_wait()`, with the mutex released, which is what lets the first one in.

### `while`, not `if`

With `if (turn != id)` the thread tests once, sleeps once, and prints as soon as it is woken up.
The broadcast wakes both sleepers, and only one of them is next; the other prints out of turn.

```text
1 2 1 1 2 1 1 3
3
2 2 3
2 3
3
```

Twenty runs of two thousand rounds, and not one came out in order.

There is a second reason for the loop, which holds even with one waiter: `pthread_cond_wait()` is allowed to return with nobody having signalled, a *spurious wake-up*.
The loop makes both cases harmless.

### `broadcast`, not `signal`

With `pthread_cond_signal()` one sleeper is woken up, and the system chooses which.
Two threads sleep on the same condition variable waiting for different things: one for `turn == 1`, the other for `turn == 2`.
If the wrong one is woken up, it tests, finds the turn is not its own, and goes back to sleep; the right one was never woken, and nobody is left to signal again.
The program stops, with every thread asleep.

```console
timeout 2 ./ordered 200; echo $?
```

With `signal`, 16 runs out of 20 of two hundred rounds ended like that, printing a few lines and then nothing, with `timeout` reporting 124.

The rule: `signal` is for when any one waiter will do, because all of them wait for the same thing and one can use it.
`broadcast` is for when the waiters differ, or when more than one can go on.
The other way to make `signal` right is to give each thread a condition variable of its own, so that the signal has only one place to go; `02-ordered-print` comes back to it.

### The mutex is held while printing

Here the thread prints with the lock held, and that is fine: only one thread may print at a time anyway.
`02-ordered-print` is built differently, with the lock released before the print, and it is worth working out why that is also safe.

## References

* `man 3 pthread_cond_wait`, `man 3 pthread_cond_signal`, `man 3 pthread_cond_broadcast`
* *Operating Systems: Three Easy Pieces*, chapter 30, *Condition Variables* — <https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf>

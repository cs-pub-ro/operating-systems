# Exercise: Five Threads That Take Turns

**Tools:** GCC, Make

## Goal

Reference solution of the turn-taking challenge: a shared `turn`, a mutex and one condition variable, with the wait in `turn_take()` and the hand-over in `turn_pass()`.

## Background

```C
turn_take(id);
print_message(id);
turn_pass(id);
```

Five threads run this loop two thousand times each: ten thousand messages, which have to come out as `1 2 3 4 5` two thousand times.
`print_message()`, in the executable, records which thread called it, and complains when two threads are inside at once.
At the end the executable compares the whole recorded sequence with the expected one.

Files:

* `turns.c`, `turns.h` — the library, and its interface.
* `chall.c`, `flag.h`, `flag` — the executable, the encrypted flag with its key, and the flag in clear.
* `test.sh` — twenty runs, each of which has to print the flag.

## Build & Run

```console
make
./chall
```

```text
1 2 3 4 5
1 2 3 4 5
1 2 3 4 5
1 2 3 4 5
...
messages printed:  10000 (expected 10000)
messages in order: 10000 (expected 10000)
flag: SO{...}
```

## Results and Explanations

### The empty library

```text
thread 2 printed while another thread was printing
thread 3 printed while another thread was printing
1 1 1 1 1 2 1 2 1 2 1 1 1 1 1 1 1 1 3 3 3 1 ...
messages printed:  3054 (expected 10000)
messages in order: 1990 (expected 10000)
No flag: the threads did not take turns.
```

Nothing is in order, threads are inside `print_message()` together, and the count of messages is short by two thirds: the counter in the executable is a plain variable, incremented by five threads at once, and loses updates.
The executable is as unsafe as the basket of the omelette demo, on purpose.

### The solution

```C
static int num_threads;
static int turn;	/* the id that goes next; protected by `lock` */
static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t turn_changed = PTHREAD_COND_INITIALIZER;

void turn_take(int id)
{
	pthread_mutex_lock(&lock);
	while (turn != id)
		pthread_cond_wait(&turn_changed, &lock);
	pthread_mutex_unlock(&lock);
}

void turn_pass(int id)
{
	pthread_mutex_lock(&lock);
	turn = (id + 1) % num_threads;
	pthread_cond_broadcast(&turn_changed);
	pthread_mutex_unlock(&lock);
}
```

### What keeps the others out while one prints

Not the mutex: `turn_take()` releases it before it returns, and `print_message()` runs with no lock held.
(Returning with the mutex locked, and unlocking in `turn_pass()`, also works, and is what the demo did inside one function; a lock taken in one function and released in another is easy to get wrong the day somebody adds a second way out.)

What keeps the others out is `turn`.
It is equal to `id` when `turn_take(id)` returns, and the only code that changes it is `turn_pass()`, which only the thread that has the turn calls.
Until then, every other thread that looks finds `turn != id` and waits.

The mutex protects `turn` for the few instructions that read or write it.
The turn itself is a longer-lived thing, built out of that variable: a lock that the library made, which is held across function calls and passed from one thread to a specific other one.
This is the usual way condition variables are used: a short critical section around some state, and the state standing for something that lasts longer.

### `while`, and `broadcast`

Both choices are the ones of the demo, and both failures are worse here.

| Version | 20 runs |
| --- | --- |
| `if` instead of `while` | no flag in any; messages out of order, then a time-out |
| `pthread_cond_signal()` instead of `broadcast` | time-out in every one |

With `signal`, four threads sleep on the one condition variable, each waiting for a different value of `turn`, and one of them is woken up.
One time in four it is the right one.
Otherwise the thread that was woken up tests, goes back to sleep, and the turn has been passed to a thread that will never hear of it.

With `if`, a thread that is woken up by a broadcast meant for another goes ahead and prints, and then passes the turn on from its own id, so the turn jumps.
Sooner or later it lands on a thread that is asleep with nobody left to wake it.

### One condition variable, or five

The broadcast wakes four threads so that one can go on.
The other three take the mutex in turn, test, and go back to sleep.

The alternative is one condition variable per thread, so that the hand-over can name its target:

```C
static pthread_cond_t my_turn[MAX_THREADS];

/* in turn_take() */
while (turn != id)
	pthread_cond_wait(&my_turn[id], &lock);

/* in turn_pass() */
turn = (id + 1) % num_threads;
pthread_cond_signal(&my_turn[turn]);
```

Now `signal` is right: only one thread ever sleeps on `my_turn[turn]`, and it is the one that can go on.
The `while` stays, for the spurious wake-up, and because the next thread may not be asleep at all when the signal is sent, in which case it finds `turn == id` by testing.

Both versions get the flag on every run, in about 0.02 s; with five threads the saving is not measurable, and with five hundred it would be.

## References

* `man 3 pthread_cond_wait`, `man 3 pthread_cond_signal`, `man 3 pthread_cond_broadcast`
* *Operating Systems: Three Easy Pieces*, chapter 30, *Condition Variables* — <https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf>

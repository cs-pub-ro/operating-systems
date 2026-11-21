# Bonus: A Boss and Its Workers

**Tools:** GCC, Make, ps

## Goal

Reference solution of the boss-workers challenge: a one-item desk with a condition variable for the boss and one for the workers, a worker that leaves only when it is over and the desk is empty, and an end that is announced to everybody.

## Background

```C
static int desk;		/* the item on the desk                  */
static int desk_full;		/* is there an item on the desk?         */
static int stop;		/* no more items will come               */
static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t desk_empty = PTHREAD_COND_INITIALIZER;	/* the boss waits here    */
static pthread_cond_t desk_ready = PTHREAD_COND_INITIALIZER;	/* the workers wait here  */
```

`boss_run(work, nitems, nworkers)` starts the workers, hands out the items, announces the end and joins the workers.
The executable calls it twenty times with eight workers and 2,000 items; `work()` adds one to a counter kept for each item, and after each call every counter has to be at one.

Files:

* `boss.c`, `boss.h` — the library, and its interface.
* `chall.c`, `flag.h`, `flag` — the executable, the encrypted flag with its key, and the flag in clear.
* `test.sh` — fifty runs, each of which has to print the flag.

## Build & Run

```console
make
./chall
```

```text
rounds:                 20, of 2000 items each
items done once:        40000 (expected 40000)
things that went wrong: 0
flag: SO{...}
```

## Results and Explanations

The three flaws show in order.

| Library | Result |
| --- | --- |
| As given | time-out on every run |
| Broadcast for the end only | time-out on every run |
| Broadcast everywhere, on the one condition variable | no flag in 20 runs out of 20: the last item of some rounds is not done |
| That, and the worker checks the desk before it leaves | the flag, 20 runs out of 20 |

### The wrong thread is woken up (TODO 2)

The skeleton has one condition variable, `changed`.
The boss sleeps on it when the desk is full, and the workers sleep on it when the desk is empty.
`pthread_cond_signal()` wakes one sleeper.

A worker takes an item and signals "the desk is free".
That news is for the boss.
If seven other workers are asleep on the same condition variable, the signal is seven times more likely to wake one of them; that worker finds the desk empty and goes back to sleep.
The boss was not told and never puts the next item down, and the workers wait for an item for ever.
This is the lost wake-up of `07-producer-consumer`, and it has the same two fixes: broadcast, or a condition variable for each kind of waiter.

```C
/* worker, after taking the item */
pthread_cond_signal(&desk_empty);

/* boss, after putting an item down */
pthread_cond_signal(&desk_ready);
```

With two condition variables, `signal` is right for both: one item is of use to one worker, and there is only one boss.

### Not everybody is told (TODO 3)

```C
pthread_mutex_lock(&lock);
stop = 1;
pthread_cond_signal(&changed);
pthread_mutex_unlock(&lock);
```

One signal, eight workers.
One of them wakes up, sees `stop`, and ends.
The other seven go on sleeping, and the boss sleeps too, in `pthread_join()`, waiting for the second worker to end.

```C
pthread_cond_broadcast(&desk_ready);
```

An item concerns one worker.
The end concerns all of them.

### The last item (TODO 1)

With the two fixes above the program runs to the end, and says:

```text
round 6: item 1999 was done 0 times
round 11: item 1999 was done 0 times
round 13: item 1999 was done 0 times
```

Always item 1999, the last one, and not in every round.

```C
while (!desk_full && !stop)
	pthread_cond_wait(&changed, &lock);
if (stop) {
	pthread_mutex_unlock(&lock);
	break;
}
```

The boss puts item 1999 on the desk, releases the lock, and has nothing left to hand out, so it does not wait for the desk to be emptied: it takes the lock again and sets `stop`.
If no worker took the item in between, the workers wake up to an item on the desk **and** `stop` set.
The test asks about `stop` first, and every worker leaves, with the item still there.

Whether a worker gets to the desk before the boss gets back to the lock is a matter of timing, which is why it happens in some rounds.

```C
if (!desk_full) {
	pthread_mutex_unlock(&lock);
	break;
}
```

A worker leaves when there is nothing on the desk, which, after the loop, can only be because it is over.
If there is an item, it takes it, whatever `stop` says.
`stop` means that no more work is coming, not that the work on the desk is to be dropped.

### Outside the lock

```C
item = desk;
desk_full = 0;
pthread_cond_signal(&desk_empty);
pthread_mutex_unlock(&lock);

do_work(item);
```

The worker copies the item into a local variable, frees the desk, releases the lock, and only then works.
With `do_work()` inside the lock the program would be correct, and one worker would work at a time: a boss, eight workers, and the throughput of one.

## References

* `man 3 pthread_cond_signal`, `man 3 pthread_cond_broadcast`, `man 3 pthread_join`
* *Operating Systems: Three Easy Pieces*, chapter 30, *Condition Variables* — <https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf>

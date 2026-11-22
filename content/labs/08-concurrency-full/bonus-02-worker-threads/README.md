# Bonus 02: A Pool of Worker Threads

**Tools:** GCC, Make, ps, GDB

**Directory**: `bonus-02-worker-threads/`

## Goal

Reference solution of the thread-pool challenge: tasks run with the lock released, a count of pending tasks says when the work is done, and `pool_wait()` and the workers are woken up by the threads that have news for them.

## Background

```C
struct pool {
	pthread_t *threads;
	int nworkers;
	struct task *head;	/* the task that runs next; NULL if none   */
	struct task *tail;	/* the last task in the queue              */
	size_t pending;		/* tasks submitted and not yet finished    */
	int stop;		/* the pool is being destroyed             */
	pthread_mutex_t lock;	/* protects the queue, `pending`, `stop`   */
	pthread_cond_t has_work;	/* where the workers wait         */
	pthread_cond_t all_done;	/* where pool_wait() waits        */
};
```

The executable adds up the numbers from 0 to `n - 1` by divide and conquer, for ten values of `n` from four to forty million.
A task for a range larger than 100,000 submits two tasks, one for each half; a task for a smaller range adds it up and adds the result to an atomic total.
One call of `pool_submit()` from `main()` grows into a tree of tasks, 6,262 over the ten rounds.
After each `pool_wait()` the total is compared with `n * (n - 1) / 2`.

Files:

* `pool.c`, `pool.h` — the library, and its interface.
* `chall.c`, `flag.h`, `flag` — the executable, the encrypted flag with its key, and the flag in clear.
* `test.sh` — fifty runs, each of which has to print the flag.

## Build & Run

```console
make
./chall
```

```text
rounds with the complete sum: 10 (expected 10)
tasks run:                    6262
flag: SO{...}
```

## Results and Explanations

| Library | Result |
| --- | --- |
| As given | time-out on every run |
| Task run outside the lock | time-out on every run, in `pool_destroy()` |
| That, and `pool_destroy()` fixed | the flag in 2 runs out of 20; in the others `pool_wait()` returned early |
| All three | the flag, 50 runs out of 50 |

### A task that submits (TODO 1)

```C
task = pool->head;
pool->head = task->next;
if (pool->head == NULL)
	pool->tail = NULL;

task->fn(task->arg);
free(task);
pthread_mutex_unlock(&pool->lock);
```

The worker calls the task with the pool's mutex locked.
The first task of the executable calls `pool_submit()`, and `pool_submit()` locks the pool's mutex.

```text
Thread 2 (LWP 587623):
#3  ___pthread_mutex_lock (mutex=0x5555555592c8)
#4  pool_submit (pool=0x5555555592a0, fn=<sum_range>, ...) at pool.c:109
#5  submit_range (lo=0, hi=2000000) at chall.c:92
#6  sum_range (arg=0x555555559c80) at chall.c:73
#7  worker (arg=0x5555555592a0) at pool.c:62
```

Read from the bottom: a worker, at line 62, is running a task; the task submits; the submission waits for a mutex.
The thread that holds that mutex is this same thread: it has held it since it came back from `pthread_cond_wait()` at the top of its loop.
It waits for itself, and the other seven workers wait in `pthread_cond_wait()` for work that cannot be queued.

There is a second thing wrong with the same line, which would remain even if tasks never submitted: with the lock held across the task, one task runs at a time.
Eight workers, one of them working.

```C
pthread_mutex_unlock(&pool->lock);

task->fn(task->arg);
free(task);
```

The lock is for the queue.
A task is somebody else's code, of unknown length, that may want the pool for itself: it is never called with a lock held.

### Everybody has to be told (TODO 3)

```C
pool->stop = 1;
pthread_cond_signal(&pool->has_work);
```

The end of `bonus-01-boss-workers`, with both of its mistakes: `stop` is written without the lock, and one worker of eight is woken up.
The joins wait for ever for the second.

```C
pthread_mutex_lock(&pool->lock);
pool->stop = 1;
pthread_cond_broadcast(&pool->has_work);
pthread_mutex_unlock(&pool->lock);
```

The worker's exit test is already the right one, `if (pool->head == NULL)` after the wait, so tasks still in the queue when the pool is destroyed are run before the workers leave.

### What "done" means (TODO 2)

```C
void pool_wait(struct pool *pool)
{
	while (pool->head != NULL)
		usleep(100);
}
```

```text
round 2: pool_wait() returned with the sum at 30185543031250 of 31999996000000
round 3: pool_wait() returned with the sum at 73091790781250 of 71999994000000
round 6: pool_wait() returned with the sum at 279624011812500 of 287999988000000
rounds with the complete sum: 6 (expected 10)
```

Three things are wrong with four lines.

* It **polls**: it wakes up ten thousand times a second to look, instead of being told.
* It reads `pool->head` **without the lock**, while workers write it.
* It waits for **the wrong condition**.
  The queue is empty when the last task has been taken, not when it has finished.
  At the end of a round the queue is empty and up to eight workers are still adding up their last ranges.
  At the start of a round it is worse: the one task in the queue is taken, the queue is empty, and that task is about to submit two more.

Round 3 above ended with a sum that is too **large**.
`pool_wait()` returned early in round 2; `main()` set the total back to zero and started round 3; and the stragglers of round 2 then added their results to round 3's total.
A function that returns too early spoils the caller's next step as well as this one.

The pool has to count what it is waiting for.

```C
/* in pool_submit(), under the lock */
pool->pending++;

/* in worker(), after the task has returned */
pthread_mutex_lock(&pool->lock);
pool->pending--;
if (pool->pending == 0)
	pthread_cond_broadcast(&pool->all_done);
pthread_mutex_unlock(&pool->lock);

/* pool_wait() */
pthread_mutex_lock(&pool->lock);
while (pool->pending > 0)
	pthread_cond_wait(&pool->all_done, &pool->lock);
pthread_mutex_unlock(&pool->lock);
```

`pending` is the number of tasks submitted and not yet finished, whether they are in the queue or in a worker's hands.

The place of the decrement matters: **after** the task function has returned.
Whatever the task submitted was counted, in `pool_submit()`, before that.
So `pending` goes 1, then 3 when the first task has submitted two, then 2 when it finishes, and can only reach zero when a task finishes that submitted nothing and nothing else is left.
Decrementing when the task is taken from the queue would let the count touch zero between the first task being taken and its two children being submitted, and `pool_wait()` would return with the work barely started.

`pool_wait()` has a condition variable of its own, because it waits for something else than the workers do.
It sleeps until a worker says that the count has reached zero, and then checks, in a loop, like every other wait in this session.

### What the pool is for

```console
time ./chall
```

```text
real	0m0.018s
user	0m0.130s
```

`user` is seven times `real`: the eight workers are adding at the same time.
A version that keeps the lock across the task, and makes the mutex recursive so that it does not hang, also gets the flag, in 0.09 s with `user` equal to `real`.
It is correct, and five times slower: the tasks run one at a time.

## References

* `man 3 pthread_cond_wait`, `man 3 pthread_cond_broadcast`
* *Operating Systems: Three Easy Pieces*, chapter 30, *Condition Variables* — <https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf>

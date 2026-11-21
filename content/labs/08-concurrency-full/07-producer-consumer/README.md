# Exercise: A Queue That Loses Items

**Tools:** GCC, Make, ps

## Goal

Reference solution of the producer-consumer challenge: a bounded queue whose two waits are in loops, with one condition variable for producers and one for consumers.

## Background

```C
struct queue {
	long *items;		/* the buffer: `capacity` slots            */
	size_t capacity;
	size_t count;		/* items in the buffer                     */
	size_t head;		/* slot of the item that leaves next       */
	size_t tail;		/* slot the next item goes into            */
	pthread_mutex_t lock;	/* protects all of the above               */
	pthread_cond_t not_full;	/* where producers wait             */
	pthread_cond_t not_empty;	/* where consumers wait             */
};
```

Four producers, four consumers, a queue with room for two items, and 80,000 items numbered from 1.
Producer `p` makes the items `p * 20000 + 1` to `p * 20000 + 20000`, and each consumer takes 20,000 items, whichever come.
The executable counts how many times each item came out.

Files:

* `queue.c`, `queue.h` — the library, and its interface.
* `chall.c`, `flag.h`, `flag` — the executable, the encrypted flag with its key, and the flag in clear.
* `test.sh` — fifty runs, each of which has to print the flag.

## Build & Run

```console
make
./chall
```

```text
items put in:                 80000
items that came out once:     80000 (expected 80000)
things that went wrong:       0
flag: SO{...}
```

## Results and Explanations

### The library as given

```C
long queue_get(struct queue *queue)
{
	long item;

	pthread_mutex_lock(&queue->lock);

	if (queue->count == 0)
		pthread_cond_wait(&queue->changed, &queue->lock);

	item = queue->items[queue->head];
	queue->head = (queue->head + 1) % queue->capacity;
	queue->count--;

	pthread_cond_signal(&queue->changed);
	pthread_mutex_unlock(&queue->lock);

	return item;
}
```

```text
item 1 came out 21 times
item 2 came out 51 times
item 3 came out 38 times
item 4 came out 8 times
item 6 came out 0 times
items put in:                 80000
items that came out once:     7298 (expected 80000)
things that went wrong:       72702
No flag: what came out of the queue is not what went in.
```

Nine items in ten are wrong: some came out dozens of times, most never.

### First flaw — `if` instead of `while`

| Step | Consumer A | Consumer B | Producer |
| --- | --- | --- | --- |
| 1 | finds `count == 0`, waits | | |
| 2 | | | puts an item, `count` is 1, signals |
| 3 | woken up; needs the lock to go on | takes the lock first | |
| 4 | | finds `count == 1`, takes the item, `count` is 0 | |
| 5 | gets the lock, does not test again | | |
| 6 | takes "the item" from an empty queue | | |

In step 6, consumer A reads a slot that holds an item already taken, or nothing yet, and does `count--` on a count of zero.
`count` is a `size_t`: it wraps around to the largest number there is.
From then on the queue is never empty and never full, as far as the tests can tell, and nobody ever waits again: consumers read the same two slots over and over, and producers overwrite items nobody has taken.
That is the item that came out fifty-one times.

Being woken up is not being given the item.
Between the signal and the moment the woken thread has the lock back, any thread may run, and here a thread that was never asleep, consumer B, takes what the signal was about.

```C
while (queue->count == 0)
	pthread_cond_wait(&queue->not_empty, &queue->lock);
```

The same in `queue_put()`, for a producer that is woken up and finds that another producer filled the slot.

### Second flaw — one condition variable for two conditions

With the two `if` changed to `while`, and nothing else, the library can no longer hand out an item twice.
It does this instead, in 20 runs out of 20:

```text
Timed out: threads are asleep, waiting for a wake-up that never comes.
```

`ps -L` shows every thread asleep, at no cost in processor time, exactly as in the deadlock exercise.

| Step | State of the queue | What happens |
| --- | --- | --- |
| 1 | empty | consumers A and B find nothing and wait |
| 2 | 1 item | producer P puts an item and signals: A is woken up |
| 3 | 2 items, full | P puts another, signals: B is woken up; P and Q then find the queue full and wait |
| 4 | 1 item | A takes an item and signals: the signal wakes **B**, a consumer, or it wakes a producer |

Everything depends on who the signal of step 4 reaches.
There is one condition variable, and on it sleep producers, who wait for a free slot, and consumers, who wait for an item.
`pthread_cond_signal()` wakes one of them and does not know the difference.
When a consumer's "there is room now" wakes another consumer, that one tests, finds nothing for it, and sleeps again; the producer that could have used the room was not told.
Do that a few times and everybody is asleep, each waiting for a signal that only a sleeping thread could send.

No thread holds anything that another wants, so this is not the circle of `04-deadlock`.
It is a **lost wake-up**: the news was delivered to the wrong address.

There are two ways out.

```C
pthread_cond_signal(&queue->not_empty);		/* in queue_put() */
pthread_cond_signal(&queue->not_full);		/* in queue_get() */
```

Two condition variables, one for each fact.
A producer's news goes to where only consumers sleep, and a consumer's to where only producers sleep, so the thread that is woken up can always use what it was woken for.
This is the reference.

The other is to keep one condition variable and use `pthread_cond_broadcast()`: wake everybody, and let the `while` loops send back to sleep those who have nothing to do.
It is correct, 30 flags in 30 runs, and with eight threads it costs nothing that can be measured: both versions take 0.08 to 0.10 s.
With hundreds of threads on the queue, every put and every get would wake all of them for one to go on.

### Why the queue is so small

With room for four items instead of two, the library with the first flaw fixed and the second left in printed the flag in 20 runs out of 20.
The lost wake-up needs sleeping producers and sleeping consumers at the same time, and a queue that is nearly always neither full nor empty rarely has both.
The bug was there, and the test did not reach it; a capacity of 2 against four producers makes it certain.
A larger buffer hides this kind of bug without removing it, which is worth remembering the day a queue that "has always worked" is moved to a busier server.

### The pattern, once more

```C
pthread_mutex_lock(&lock);
while (!condition)
	pthread_cond_wait(&that_condition, &lock);
/* act */
pthread_cond_signal(&the_condition_the_act_made_true);
pthread_mutex_unlock(&lock);
```

## References

* `man 3 pthread_cond_wait`, `man 3 pthread_cond_signal`, `man 3 pthread_cond_broadcast`
* *Operating Systems: Three Easy Pieces*, chapter 30, *Condition Variables* — <https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf>

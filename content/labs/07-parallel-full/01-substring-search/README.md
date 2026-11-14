# Exercise: A Parallel Substring Search

**Tools:** GCC, Make, grep, time

## Goal

Reference implementation of the parallel search.
A sequential count of the occurrences of a word in a mapped file is split between threads, and the threads add what they find to one shared total, protected by a mutex that each of them takes exactly once.

## Background

The sequential program is one call:

```C
total = count_matches(data, size, needle);
```

Making it parallel takes the two ideas of the demos.
The data is **partitioned**, as in the second demo: one region of the mapping per thread, read by that thread only.
The result is **shared**, as in the first: one global `total` that every thread adds to, and therefore a mutex.

```C
static size_t total;
static pthread_mutex_t total_lock = PTHREAD_MUTEX_INITIALIZER;
```

`PTHREAD_MUTEX_INITIALIZER` initializes a global mutex where it is declared, in place of a call to `pthread_mutex_init()`.

Files:

* `search.c` — the solution.
* `gen_text.c` — the generator of session 06: a file of random words, with `kernel` planted across the points where a split into 2, 4 or 8 parts falls.
* `test.sh` — compares the count with `grep -o` for five needles and eight thread counts.

## Build & Run

```console
make
./gen_text big.txt 256
grep -o kernel big.txt | wc -l
./search big.txt kernel 1
./search big.txt kernel 4
```

```text
wrote 268435456 bytes to big.txt
2275966
2275966 matches, 1 thread(s), 0.511 s
2275966 matches, 4 thread(s), 0.140 s
```

## Results and Explanations

### TODO 1 and 2 — the mutex and the thread function

```C
static void *search_region(void *arg)
{
	struct region *r = arg;
	size_t count;

	count = count_matches(r->start, r->len, r->needle);

	pthread_mutex_lock(&total_lock);
	total += count;
	pthread_mutex_unlock(&total_lock);

	return NULL;
}
```

The search itself runs with no lock held.
It reads the mapping, which nobody writes, and counts in `count`, a local variable on the thread's own stack.
Only the last step touches shared memory, and that step is the critical section: one addition, done once per thread.

`total += count` is three steps, a load, an add and a store, as a message of the first demo was three writes, and without the lock two threads finishing at the same moment can lose one of the two additions.
With four threads that is four additions in the whole run and the loss is rare, which makes it the worst kind of bug: the program is wrong and the tests pass.

### TODO 3 — the split

```C
chunk = size / nthreads;
overlap = strlen(needle) - 1;
for (i = 0; i < nthreads; i++) {
	offset = (size_t) i * chunk;
	regions[i].start = data + offset;
	regions[i].len = (i == nthreads - 1) ? size - offset : chunk + overlap;
	regions[i].needle = needle;
}
```

Two boundary problems, both from session 06.

The **remainder**: `size / nthreads` rounds down, and the last region takes everything from its start to the end of the file rather than `chunk` bytes.

The **matches across a cut**: a word that starts in one region and ends in the next is seen whole by neither.
Every region but the last therefore reads `strlen(needle) - 1` bytes into the next one.
That is far enough to finish any match that starts inside the region, and one byte short of being able to hold a match that starts outside it, so nothing is lost and nothing is counted twice.
The regions overlap, which is harmless: they are only read.

The generator plants `kernel` across the 2-, 4- and 8-way cuts, so a split without the overlap is short by one match per cut: 2,275,965 with two threads.

### TODO 4 and 5 — start and join

The two loops of session 06.
The join now has a second job: `total` is complete only when every thread has added its share, so the `printf()` comes after the last join.
The main thread reads `total` without the lock, which is safe for the same reason: by then no other thread exists.

### The measurements

| Threads | Time | Speed-up |
| --- | --- | --- |
| 1 | 0.511 s | 1.0 |
| 2 | 0.293 s | 1.7 |
| 4 | 0.140 s | 3.7 |
| 8 | 0.114 s | 4.5 |
| 12 | 0.085 s | 6.0 |
| 32 | 0.088 s | 5.8 |
| 64 | 0.086 s | 5.9 |

On 6 cores with 12 hardware threads: the same curve as the demo, near-linear up to the number of cores, flat after it.
The time the program prints covers the split, the threads and the joins, and not the mapping of the file, so nearly all of it is parallel work and the curve is the hardware's.

### One lock per match

The alternative that suggests itself is to add to `total` wherever a match is found, inside `count_matches()`:

```C
if (memcmp(buf + i, needle, nlen) == 0) {
	total++;
	i += nlen;
}
```

Without a lock, the load, add and store of `total++` from different threads interleave, and an addition written over by another thread is lost, on every run:

```text
2241436 matches, 4 thread(s), 0.150 s
2237440 matches, 4 thread(s), 0.145 s
2072447 matches, 12 thread(s), 0.095 s
```

With a lock around the `total++` the count is right, and the times are these:

| Threads | One lock per thread | One lock per match |
| --- | --- | --- |
| 1 | 0.511 s | 0.526 s |
| 4 | 0.140 s | 0.234 s |
| 12 | 0.085 s | 0.336 s |

With one thread the 2.3 million lock operations cost almost nothing, because a mutex that nobody else wants is taken and released in a few instructions.
With four threads they cost two thirds more time, and with twelve the program is **slower than with four**: the threads spend their time waiting for each other and being put to sleep and woken by the kernel.

Both versions are correct.
The difference is how often the threads meet: 12 times in one, 2.3 million times in the other.
Working in private and sharing at the end is the pattern, and it is worth more than any tuning of the lock.

## Going Further

`FURTHER.md` has the experiments with their results: the whole-program time, needles with no or many matches, thousands of threads, and the needle for which the overlap is wrong.

## References

* `man 3 pthread_mutex_lock`, `man 3 pthread_mutex_init`
* `man 3 pthread_create`, `man 3 pthread_join`
* `man 1 grep` — `-o`

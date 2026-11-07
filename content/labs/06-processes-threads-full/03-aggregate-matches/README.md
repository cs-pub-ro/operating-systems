# Exercise: Adding Up What the Threads Found

**Tools:** GCC, Make

## Goal

Reference implementation of the aggregating search.
Each thread counts the matches in its part of the file and returns the count; the main thread joins the threads in order, adds the counts up, and prints the total, which is the same number `grep -o` finds, for any number of threads.

## Background

A thread's return value is a `void *`, handed to `pthread_join()`'s second argument:

```C
int pthread_join(pthread_t thread, void **retval);
```

The pointer has to point at memory that still exists after the thread has ended.
The thread's stack does not, so a local variable of the thread function is the wrong place; the region struct, which `main()` owns, is the right one, and it gains a field for the purpose:

```C
struct region {
	int id;
	const char *start;
	size_t len;
	const char *needle;
	size_t count;		/* the result: matches found in the part   */
};
```

There is no shared counter.
Every thread writes its own `count`; the main thread reads each one after joining the thread that wrote it, and keeps the running total in a variable of its own.
A write before a `pthread_join()` and a read after it are ordered by the join, which is the one synchronisation this session uses.

Files:

* `count_matches.c` — the solution.
* `gen_text.c` — the demo's file generator, unchanged.

## Build & Run

```console
make
./gen_text big.txt 64
./count_matches big.txt kernel 4
grep -o kernel big.txt | wc -l
```

```text
thread 0: 142196 matches
thread 1: 142729 matches
thread 2: 142233 matches
thread 3: 141864 matches
total: 569022 matches
569022
```

With 1, 2, 7 or 8 threads: 569,022 every time.

## Results and Explanations

### TODO 1 — the thread's result

```C
static void *count_region(void *arg)
{
	struct region *r = arg;

	r->count = count_matches(r->start, r->len, r->needle);

	return &r->count;
}
```

The count goes into the region, and the thread returns the address of that field.
Either half would do on its own: the main thread could read `regions[i].count` directly after the join, or it could rely only on the returned pointer.
Doing both keeps `pthread_join()`'s second argument meaningful while making the lifetime obvious: the pointer points into `main()`'s array.

### TODO 2 — collecting

```C
total = 0;
for (i = 0; i < nthreads; i++) {
	pthread_join(threads[i], &result);
	printf("thread %d: %zu matches\n", i, *(size_t *) result);
	total += *(size_t *) result;
}
```

`result` is a `void *`, and `pthread_join()` is given its address.
After the call, the thread is gone and its `count` is final; the cast back to `size_t *` reads it.

The joins are in thread order, so the per-thread lines come out in thread order, every time: thread 3 may well finish first, but its line is printed when `main()` gets to it.
The demo printed from inside the threads and had no order; moving the printing to the collector is what bought it.

`total` is written by one thread only.
There is nothing to protect.

### TODO 3 — the boundaries

```C
chunk = size / nthreads;
overlap = strlen(needle) - 1;
for (i = 0; i < nthreads; i++) {
	size_t offset = (size_t) i * chunk;

	regions[i].start = data + offset;
	regions[i].len = (i == nthreads - 1) ? size - offset : chunk + overlap;
	...
}
```

With the demo's split, a `kernel` lying across the end of part 0 and the start of part 1 is `ker` to one thread and `nel` to the other, and neither counts it.
The generator plants one such word on each 2-, 4- and 8-way boundary, which is why 4 threads were 3 short.

The fix: every part but the last reaches `strlen(needle) - 1` bytes into the next.
That is exactly enough to finish a match that *starts* inside the part, and not enough to start a new one: a match that starts in the extra bytes would begin at or after the next part's first byte, so it belongs to the next part, which counts it.
`strlen(needle)` bytes of overlap would be one too many, and a word that starts exactly on the boundary would be counted twice.

The last part is unchanged: its end is the end of the file.

### What was not needed

No mutex, no atomic, no shared counter.
The threads were given disjoint work and private places to leave the result, and the main thread read the results after the threads were gone.
When the partition is right, the synchronisation is `pthread_join()` and nothing else; when it is not, no amount of locking will make the count right.

## References

* `man 3 pthread_create`, `man 3 pthread_join`, `man 3 pthread_exit`
* `man 7 pthreads`

# Demo: How Much Faster Do More Threads Make It?

**Tools:** GCC, Make, time, nproc

## Goal

Parallelize a counting loop, time it with more and more threads, and explain the shape of the result.
Afterwards you will be able to measure a speed-up, and to say why it stops growing: the number of cores, the part of the program that stayed sequential, and the cost of the threads themselves.

## Background

The program does two things, one after the other.

1. It **fills** a 256 MiB buffer with lowercase letters.
1. It **counts** how many of them are an `e`.

The counting is a loop over independent bytes, the easiest kind of work to split: cut the buffer into one region per thread, let each thread count in its own, and add the counts up after the joins.
This is the partition of session 06, and it needs no mutex, because each thread writes only its own `count`.

```C
struct region {
	const char *start;	/* first byte of this thread's part        */
	size_t len;		/* how many bytes it covers                */
	size_t count;		/* the result, written by the thread       */
};
```

The filling is left sequential, on purpose.

The **speed-up** with *n* threads is the time with one thread divided by the time with *n*.
The hope is that *n* threads give a speed-up of *n*.

Files:

* `count_chars.c` — the program, with the counting parallelized.
* `test.sh` — checks that every thread count finds the same number.
* `bench.sh` — times a series of thread counts and prints the speed-ups.

## Build & Run

```console
make
nproc
time ./count_chars 1
time ./count_chars 4
```

```text
12
'e' occurs 10457088 times in 256 MiB
fill:  0.082 s, 1 thread
count: 0.266 s, 1 thread(s)

real	0m0.362s
user	0m0.284s
sys	0m0.077s
'e' occurs 10457088 times in 256 MiB
fill:  0.081 s, 1 thread
count: 0.071 s, 4 thread(s)

real	0m0.164s
user	0m0.301s
sys	0m0.080s
```

`make bench` runs the whole series, three times each, and keeps the best:

```text
cores: 12
 threads  count (s)  speed-up  total (s)  speed-up
       1      0.262     1.00x      0.358     1.00x
       2      0.137     1.91x      0.230     1.56x
       4      0.071     3.69x      0.164     2.18x
       8      0.057     4.60x      0.153     2.34x
      16      0.044     5.95x      0.139     2.59x
      32      0.041     6.39x      0.136     2.64x
      64      0.040     6.55x      0.135     2.65x
     256      0.041     6.39x      0.137     2.61x
    1024      0.052     5.04x      0.149     2.40x
```

The machine is an Intel Core i5-12400: 6 cores, each with 2 hardware threads, which is why `nproc` says 12.

## Results and Explanations

### The parallel version

The four TODOs are the three loops of session 06 and a thread function:

```C
static void *count_region(void *arg)
{
	struct region *r = arg;

	r->count = count_char(r->start, r->len, TARGET);

	return NULL;
}
```

```C
chunk = size / nthreads;
for (i = 0; i < nthreads; i++) {
	regions[i].start = buf + (size_t) i * chunk;
	regions[i].len = (i == nthreads - 1) ? size - (size_t) i * chunk : chunk;
}
```

The last region takes the remainder of the division.
`count_char()` keeps its count in a local variable and the thread stores it once, at the end; the main thread reads `regions[i].count` after `pthread_join()`.
No two threads write the same memory, so there is no critical section and no mutex.

### Up to the number of cores, it scales

With 2 threads the counting is 1.91 times faster, with 4 threads 3.69 times: close to the ideal.
`user` time is the sign of what happened: 0.28 s with one thread and 0.30 s with four, in a `real` time that halved and halved again.
The same amount of processor work was done, on four cores at once.

### Past the number of cores, it stops

From 4 to 8 threads the gain is small, and from 16 on there is none.

A thread needs a core to run on.
With 6 cores, the seventh thread shares one: either with another thread of the program, taking turns, or as the second hardware thread of a core, which is not a second core and adds perhaps a third to what the core gets done.
The best counting time, about 0.040 s, is 6.5 times better than one thread's, on a machine with 6 cores.

More threads than cores do not make the program wrong, and for a while not slower: 16, 32 or 64 threads take turns on the same cores and finish at the same time.
There is also a second ceiling, lower than the first on some machines: every thread reads memory as fast as it can, and the memory bus is shared.

### Far past it, it gets worse

With 1024 threads the counting takes 0.052 s, against 0.040 s at best.
Each thread now has 256 KiB to count, which takes about 0.25 ms, and creating a thread takes tens of microseconds: an 8 MiB stack to map, a `clone` system call, a first scheduling.
Starting a thousand threads, one after another in a sequential loop, costs more than the work most of them are given, and the scheduler then has a thousand runnable tasks to share out among 12 processors, each switch costing time and cold caches.

The threads are overhead that grows with their number, set against work that does not.

### The whole program gains much less: Amdahl's law

The counting became 6.5 times faster.
The program became 2.65 times faster.

The filling takes 0.08 s whatever the thread count, and so does starting the program and allocating the buffer.
With one thread the program takes 0.358 s, of which 0.262 s, or 73%, is the counting, the part that was parallelized.
The other 27% is sequential.

**Amdahl's law** says what follows: if a fraction *p* of a program's time can be parallelized and the rest cannot, the speed-up with *n* threads is

```text
                 1
S(n) = ---------------------
        (1 - p)  +  p / n
```

and however large *n* is, it stays below `1 / (1 - p)`.
With *p* = 0.73, the limit is 1 / 0.27 = 3.7: an infinite number of cores would make this program 3.7 times faster, and no more.
With the 6.5 that the counting really reaches, the formula gives 1 / (0.27 + 0.73 / 6.5) = 2.6, which is what was measured.

The sequential part decides.
To do better, the filling would have to be parallelized as well, and then whatever is left after that becomes the limit.

### Three reasons, then

* **Hardware**: there are only so many cores, and they share the memory bus.
* **Amdahl's law**: the sequential part of the program does not shrink.
* **Overhead**: creating, scheduling and switching between threads costs time, more with every thread.

## References

* `man 3 pthread_create`, `man 1 nproc`, `man 1 time`
* `lscpu` — cores, and hardware threads per core
* G. Amdahl, *Validity of the single processor approach to achieving large scale computing capabilities*, 1967

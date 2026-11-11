# Exercise: A Parallel Substring Search

**Tools:** GCC, Make, grep, time

## Goal

Turn a sequential search for a word in a large file into a parallel one, with the threads adding what they find to one shared total.
Afterwards you will be able to parallelize a loop over a block of memory, protect the one variable the threads share, and measure what the threads bought.

## Background

`search.c` maps a file into memory and counts the occurrences of a word in it, with one call to `count_matches()` over the whole mapping.
It takes a thread count and, for now, ignores it.

In session 06 each thread kept its count in its own struct and the main thread added the counts up after the joins.
Here the threads add to **one global `total`**, as in the first demo, and so the addition needs a mutex:

```C
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

pthread_mutex_lock(&lock);
/* the critical section */
pthread_mutex_unlock(&lock);
```

The initializer does for a global mutex what `pthread_mutex_init()` did in the demo.

A lock costs time, and while one thread holds it the others that want it wait.
How often a thread takes the lock matters as much as taking it at all.

## Your Task

Run the sequential program first, and note the count and the time.
Then open `search.c` and complete the five TODOs.

1. **The mutex** — declare one for `total`.
1. **The thread function** — count the matches in the thread's region and add them to `total`.
   Decide where the count is kept while the thread is searching, and how many times the thread locks.
1. **The split** — one region per thread.
   The last region takes the bytes the division leaves over.
   A match that starts in one region and ends in the next must be counted once: how far past its end does a region have to look, for a word of *n* letters?
1. **Start** one thread per region.
1. **Join** all of them before `total` is printed.

## Build & Run

```console
make
./gen_text big.txt 256
./search big.txt kernel 4
```

The generator writes the same file every time, so there is no need to rerun it.
On a machine with little memory, generate 64 MiB instead.

## Check Your Work

* With any thread count, the total must be what `grep -o kernel big.txt | wc -l` prints, on every run.
  Try 1, 2, 4, 8, a count that does not divide the file size, such as 7, and a two-word needle, quoted.
* Run with 1, 2, 4, 8, 16 and 32 threads and write the times down next to `nproc`.
  Work out the speed-up for each, and find the thread count past which it stops growing.
* Take the lock out, on purpose, and move the addition into the search loop: one `total++` per match.
  Run with several threads a few times and compare with `grep -o`.
* Put the lock back around that `total++`, one lock per match, and time it with 1, 4 and 8 threads.
  The total is right again; explain what happened to the time, and why your first version does not have the problem.

# Exercise: Adding Up What the Threads Found

**Tools:** GCC, Make

## Goal

Extend the demo's search so that the threads hand their counts back to the main thread, which adds them up and prints one total.
Afterwards you will be able to return a result from a thread and collect it with `pthread_join()`, without any two threads writing the same memory.

## Background

In the demo each thread printed its own count and the program never knew the total.
A thread function returns a `void *`, and `pthread_join()` has a second argument that receives it:

```C
void *count_region(void *arg);
int pthread_join(pthread_t thread, void **retval);
```

Whatever the thread returns must still exist when the main thread reads it.
A local variable of the thread function does not: the thread's stack is gone with the thread.
The thread's own `struct region` does, because the array of regions lives in `main()`, which outlives the threads.
That is why the struct now has a `count` field.

There is no shared counter and no lock.
Each thread writes only its own `count`; the main thread reads each one after the thread that wrote it has been joined, and adds it to a `total` that only the main thread touches.

`count_matches.c` is the demo with the three TODOs solved, and three new ones.

## Your Task

1. **TODO 1, `count_region()`** — count the matches in the region, store the result in the region, and return a pointer to it.
1. **TODO 2, in `main()`** — join every thread, take what it returned, print it and add it to `total`.
   Print the per-thread counts in thread order, which the demo could not.
1. **TODO 3, the split** — leave the demo's split as it is until the total is in, then compare the total with `grep -o` for one thread and for several.
   A match that starts in one part and ends in the next is seen by neither.
   Change the split so that no match is lost and none is counted twice.
   How many bytes past its end does a part have to look, for a word of *n* letters?

## Build & Run

```console
make
./gen_text big.txt 64
./count_matches big.txt kernel 4
```

The generator writes the same file every time, so there is no need to rerun it.

## Check Your Work

* With one thread, the total must equal what `grep -o kernel big.txt | wc -l` prints.
* With 2, 4 and 8 threads, the total must be the same number.
  Before TODO 3 it is not; work out from the differences how many matches were lost, and where they must have been.
* Try a thread count that does not divide the file size, such as 7, and a two-word needle, such as `kernel schedules`, quoted; `grep -o` is still the reference.
* The per-thread lines now come out in thread order every time.
  Say why that is, when in the demo they did not.
* Return the address of a local variable from `count_region()` instead of the region's field, on purpose, and run with 8 threads.
  Whatever happens, explain why it is not guaranteed to happen.

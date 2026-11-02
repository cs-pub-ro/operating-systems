# Demo: Create and Join

Several threads each sum one slice of an array and return the partial sum; the main thread joins them and adds the results.

## Goal

Create threads from a function with `pthread_create()`, collect what each returns with `pthread_join()`, and see why no lock is needed when threads do not share writable memory.

## Background

`pthread_create(&tid, NULL, fn, arg)` starts `fn` running in a new thread with argument `arg`; `pthread_join(tid, &ret)` blocks until it returns and stores its return value in `ret`.
`create_join.c` splits a million-element array into four slices, gives each thread one slice through a `struct`, and each thread returns its slice's sum as the thread's return value.

The slices do not overlap, so no two threads ever touch the same element, and the main thread reads a result only after joining the thread that produced it.
That is why the program is correct without any mutex.

## Build and run

```console
make
./create_join
```

## Results and explanations

```text
$ ./create_join
thread 0 summed its slice: 31250125000
thread 1 summed its slice: 93750125000
thread 2 summed its slice: 156250125000
thread 3 summed its slice: 218750125000
total: 500000500000
matches single-threaded sum: yes
```

Each thread returned a number through `pthread_join()`, and the four add up to the same total a single loop produces.
The partial sums differ because the later slices hold larger numbers.
Nothing is shared for writing: each thread writes only its own stack and reads only its slice, and the main thread touches a result only after the join, when the thread has certainly finished.

## Going further

* Add a shared `long total` and have each thread add to it directly, with no join in between: the total comes out wrong, sometimes, and that is the race condition lecture 08 is about.
* Return a pointer to a local variable of the thread function instead of the sum: the variable is gone with the thread's stack by the time the main thread reads it.

## References

* `man 3 pthread_create`, `man 3 pthread_join`, `man 3 pthread_exit`

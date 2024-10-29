# Libraries for Parallel Processing

In `chapters/compute/threads/drills/tasks/sum-array/support/c/sum_array_threads.c` we spawned threads "manually" by using the `pthread_create()` function.
This is **not** a syscall, but a wrapper over the common syscall used by both `fork()` (which is also not a syscall) and `pthread_create()`.

Still, `pthread_create()` is not yet a syscall.
In order to see what syscall `pthread_create()` uses, check out [this section](./guides/clone.md).

Most programming languages provide a more advanced API for handling parallel computation.

## Array Sum in Python

Let's first probe this by implementing two parallel versions of the code in `sum-array/support/python/sum_array_sequential.py`.
One version should use threads and the other should use processes.
Run each of them using 1, 2, 4, and 8 threads / processes respectively and compare the running times.
Notice that the running times of the multithreaded implementation do not decrease.
This is because the GIL makes it so that those threads that you create essentially run sequentially.

The GIL also makes it so that individual Python instructions are atomic.
Run the code in `chapters/compute/synchronization/drills/tasks/race-condition/support/python/race_condition.py`.
Every time, `var` will be 0 because the GIL doesn't allow the two threads to run in parallel and reach the critical section at the same time.
This means that the instructions `var += 1` and `var -= 1` become atomic.

If you're having difficulties solving this exercise, go through [this](../../../guides/sum-array-threads.md) reading material.

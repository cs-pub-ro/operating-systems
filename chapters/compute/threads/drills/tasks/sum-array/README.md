# Libraries for Parallel Processing

In `sum-array/support/c/sum_array_threads.c` we spawned threads "manually" by using the `pthread_create()` function.
This is **not** a syscall, but a wrapper over the common syscall used by both `fork()` (which is also not a syscall) and `pthread_create()`.

Still, `pthread_create()` is not yet a syscall.
In order to see what syscall `pthread_create()` uses, check out [this section](./guides/clone.md).

Most programming languages provide a more advanced API for handling parallel computation.

## `std.parallelism` in D

D language's standard library exposes the [`std.parallelism`](https://dlang.org/phobos/std_parallelism.html), which provides a series of parallel processing functions.
One such function is `reduce()`, which splits an array between a given number of threads and applies a given operation to these chunks.
In our case, the operation simply adds the elements to an accumulator: `a + b`.
Follow and run the code in `sum-array/support/d/sum_array_threads_reduce.d`.

The number of threads is used within a [`TaskPool`](https://dlang.org/phobos/std_parallelism.html#.TaskPool).
This structure is a thread manager (not scheduler).
It silently creates the number of threads we request and then `reduce()` spreads its workload between these threads.

## OpenMP for C

Unlike D, C does not support parallel computation by design.
It needs a library to do advanced things, like `reduce()` from D.
We have chosen to use the OpenMP library for this.
Follow the code in `support/sum-array/c/sum_array_threads_openmp.c`.

The `#pragma` used in the code instructs the compiler to enable the `omp` module, and to parallelise the code.
In this case, we instruct the compiler to perform a reduce of the array, using the `+` operator, and to store the results in the `result` variable.
This reduction uses threads to calculate the sum, similar to `summ_array_threads.c`, but in a much more optimised form.

Now compile and run the `sum_array_threads_openmp` binary using 1, 2, 4, and 8 threads as before.
You'll see lower running times than `sum_array_threads` due to the highly-optimised code emitted by the compiler.
For this reason and because library functions are usually much better tested than your own code, it is always preferred to use a library function for a given task.

## Array Sum in Python

Let's first probe this by implementing two parallel versions of the code in `sum-array/support/python/sum_array_sequential.py`.
One version should use threads and the other should use processes.
Run each of them using 1, 2, 4, and 8 threads / processes respectively and compare the running times.
Notice that the running times of the multithreaded implementation do not decrease.
This is because the GIL makes it so that those threads that you create essentially run sequentially.

The GIL also makes it so that individual Python instructions are atomic.
Run the code in `race-condition/support/python/race_condition.py`.
Every time, `var` will be 0 because the GIL doesn't allow the two threads to run in parallel and reach the critical section at the same time.
This means that the instructions `var += 1` and `var -= 1` become atomic.

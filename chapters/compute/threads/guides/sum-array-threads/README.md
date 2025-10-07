# Sum Array Threads

## Spreading the Work Among Other Threads

Compile the code in `chapters/compute/threads/guides/sum-array-threads/support/c/sum_array_threads.c` and run it using 1, 2, 4 and 8 threads as you did before.
Each thread runs the `calculate_array_part_sum()` function and then finishes.
Running times should be _slightly_ smaller than the implementation using processes.
This slight time difference is caused by process creation actions, which are costlier than thread creation actions.
Because a process needs a separate virtual address space (VAS) and needs to duplicate some internal structures such as the file descriptor table and page table, it takes the operating system more time to create it than to create a thread.
On the other hand, threads belonging to the same process share the same VAS and, implicitly, the same OS-internal structures.
Therefore, they are more lightweight than processes.

## `std.parallelism` in D

The D language's standard library exposes the [`std.parallelism`](https://dlang.org/phobos/std_parallelism.html), which provides a series of parallel processing functions.
One such function is `reduce()`, which splits an array between a given number of threads and applies a given operation to these chunks.
In our case, the operation simply adds the elements to an accumulator: `a + b`.
Follow and run the code in `chapters/compute/threads/guides/sum-array-threads/support/d/sum_array_threads_reduce.d`.

The number of threads is used within a [`TaskPool`](https://dlang.org/phobos/std_parallelism.html#.TaskPool).
This structure manages a pool of worker threads (not a scheduler).
It creates the requested number of worker threads, `reduce()` then spreads the workload between them.

Now that you've seen how parallelism works in D, go in `chapters/compute/threads/guides/sum-array-threads/support/java/SumArrayThreads.java` and follow the TODOs.
The code is similar to the one written in D, and it uses `ThreadPoolExecutor`.
More about that [here](https://www.baeldung.com/thread-pool-java-and-guava).
To run the code use:

```java
javac SumArrayThreads.java
java SumArrayThreads 4
```

4 is the number of threads used, but you can replace the value with a number less than or equal to your available cores.

## OpenMP for C

Unlike D, C does not provide built-in high-level parallel constructs.
Libraries such as OpenMP or pthreads provide parallelism.
We have chosen to use the OpenMP library for this.
Follow the code in `chapters/compute/threads/guides/sum-array-threads/support/c/sum_array_threads_openmp.c`.

The `#pragma` used in the code instructs the compiler to enable the `omp` module, and to parallelise the code.
In this case, we instruct the compiler to perform a reduce of the array, using the `+` operator, and to store the results in the `result` variable.
This reduction uses threads to calculate the sum, similar to `sum_array_threads.c`, but in a much more optimised form.

One of the advantages of OpenMP is that it is relatively easy to use.
The syntax requires only a few additional lines of code and compiler options, thus converting sequential code into parallel code quickly.
For example, using `#pragma omp parallel for`, a developer can parallelize a `for loop`, enabling iterations to run across multiple threads.

OpenMP uses a `shared-memory model`, meaning all threads can access a common memory space.
This model is particularly useful for tasks that require frequent access to shared data, as it avoids the overhead of transferring data between threads.
However, shared memory can also introduce challenges, such as race conditions or synchronization issues, which can occur when multiple threads attempt to modify the same data simultaneously, but we'll talk about that later.
OpenMP offers constructs such as critical sections, atomic operations, and reductions to help manage these issues and ensure that parallel code executes safely and correctly.

Now compile and run the `sum_array_threads_openmp` binary using 1, 2, 4, and 8 threads as before.
You'll see lower running times than `sum_array_threads` due to the highly-optimised code emitted by the compiler.
For this reason and because library functions are usually much better tested than your own code, it is always preferred to use a library function for a given task.

For a challenge, enter `chapters/compute/threads/guides/sum-array-threads/support/c/add_array_threads_openmp.c`.
Use what you've learned from the previous exercise and add the value 100 to an array using OpenMP.

# Libraries for Parallel Processing

Enter the `sum-array/` directory (or `chapters/compute/threads/drills/tasks/sum-array/` if you are working directly in the repository).
In `./support/c/sum_array_threads.c` we spawned threads "manually" by using the `pthread_create()` function.
This is **not** a syscall, but a wrapper over the common syscall used by both `fork()` (which is also not a syscall) and `pthread_create()`.

Still, `pthread_create()` is not yet a syscall.
In order to see what syscall `pthread_create()` uses, check out [this section](./guides/clone.md).

Most programming languages provide a more advanced API for handling parallel computation.

## Array Sum in Python

First, let's navigate to the `sum-array/` directory (or `chapters/compute/threads/drills/tasks/sum-array/` if you are working directly in the repository).
Let's explore this by implementing two parallel versions of the sequential script located at `./support/python/sum_array_sequential.py`.
Create one version that uses threads and another that uses processes.

After implementing them, run each version using 1, 2, 4, and 8 workers for both threads and processes and compare their execution times.

You will likely notice that the running time of the multi-threaded implementation does not decrease as you add more threads.
This is due to CPython's Global Interpreter Lock (GIL), which prevents multiple native threads from executing Python bytecode at the same time.
For this reason, CPU-bound tasks in Python do not typically see a performance increase from multi-threading.

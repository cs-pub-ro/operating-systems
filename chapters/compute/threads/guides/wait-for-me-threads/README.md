# Wait for Me Once More

Go to `support/wait-for-me/wait_for_me_threads.c`.
Spawn a thread that executes the `negate_array()` function.
For now, do not wait for it to finish;
simply start it.

Compile the code and run the resulting executable several times.
See that the negative numbers appear from different indices.
This is precisely the nondeterminism that we talked about [in the previous section](tasks/wait-for-me-processes.md).

Now wait for that thread to finish and see that all the printed numbers are consistently negative.

As you can see, waiting is a very coarse form of synchronization.
If we only use waiting, we can expect no speedup as a result of parallelism, because one thread must finish completely before another can continue.
We will discuss more fine-grained synchronization mechanisms [later in this lab](reading/synchronization.md).

Also, at this point, you might be wondering why this exercise is written in D, while [the same exercise, but with processes](reading/processes.md#practice-wait-for-me) was written in Python.
There is a very good reason for this and has to do with how threads are synchronized by default in Python.
You can find out what this is about [in the Arena section](gil), after you have completed the [Synchronization section](reading/synchronization.md).

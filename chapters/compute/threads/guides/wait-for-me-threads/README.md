# Wait for Me Once More

Go to `chapters/compute/threads/guides/wait-for-me-threads/support/wait_for_me_threads.c`.
Spawn a thread that executes the `negate_array()` function.
For now, do not wait for it to finish;
simply start it.

Compile the code and run the resulting executable several times.
Note how the negative numbers appear at different indices on each run — this demonstrates the nondeterministic scheduling we discussed [in the previous section](tasks/wait-for-me-processes.md).

Now wait for that thread to finish and see that all the printed numbers are consistently negative.

Waiting is a coarse form of synchronization.
If you start a thread and then immediately wait for it to finish before starting the next, you serialize the work and will see no speedup.
Finer-grained synchronization or letting threads run concurrently without sequential waits is needed to gain parallel speedup.
We will discuss more fine-grained synchronization mechanisms [later in this lab](reading/synchronization.md).

Also, at this point, you might be wondering why this exercise is written in D, while [the same exercise, but with processes](reading/processes.md) was written in Python.
There is a very good reason for this and has to do with how threads are synchronized by default in Python.
You can read about it in this article on [Python Global Interpreter LOCK (GIL)](https://realpython.com/python-gil/), but it will make more sense after you have completed the [Synchronization section](reading/synchronization.md).

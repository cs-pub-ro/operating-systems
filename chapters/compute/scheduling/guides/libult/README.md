# User-Level Threads Scheduler

Go to `libult/support`.
It contains a minimalist **user-level threads** scheduler.
Compiling it produces a shared library called `libult.so`.
You can also consult its [documentation](https://www.schaertl.me/posts/a-bare-bones-user-level-thread-library/).
It explains the API as well as its implementation.
The API exposed by the scheduling library is very simple.
It is only made up of 3 functions:

- `threads_create()` creates a new ULT
- `threads_exit()` moves the current ULT to the COMPLETED state
- `threads_join()` waits for a given thread to end and saves its return value in the `result` argument

Look inside `libult/support/threads.c`.
Here you will find the 3 functions mentioned above.

The scheduler only uses 3 states: RUNNING, READY, COMPLETED.

[Quiz](../../drills/questions/number-of-running-ults.md)

The threads in the READY and COMPLETED states are kept in 2 separate queues.
When the scheduler wants to run a new thread, it retrieves it from the READY queue.
When a thread ends its execution, it is added to the COMPLETED queue, together with its return value.

[Quiz](../../drills/questions/why-use-completed-queue.md)

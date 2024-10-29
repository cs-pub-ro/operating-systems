# `apache2` Simulator - Semaphore

## Semaphores

Up to now, we've learned how to create critical sections that can be accessed by **only one thread** at a time.
These critical sections revolved around **data**.
Whenever we define a critical section, there is some specific data to which we cannot allow parallel access.
The reason why we can't allow it is, in general, data integrity, as we've seen in our examples in `chapters/compute/synchronization/drills/tasks/race-condition/support/`

But what if threads need to count?
Counting is inherently thread-unsafe because it's a _read-modify-write_ operation.
We read the counter, increment (modify) it and then write it back.
Think about our example with [`apache2`](../../process-threads-apache2/reading/processes-threads-apache2.md)
Let's say a `worker` has created a _pool_ of 3 threads.
They are not doing any work initially;
they are in the WAITING state.
As clients initiate connections, these threads are picked up and are used to serve **at most 3** connections at a time.
But the number of connections may be arbitrarily large.
Therefore, we need a way to keep track of it.
When serving a client, a thread should decrement it to inform the others that a connection has been finished.
In short, we need a counter that the dispatcher increments and that worker threads decrement.

Such a counter could be implemented using a **semaphore**.
For simplicity's sake, you can view a semaphore as simply a mutex whose internal variable can take any value and acts like a counter.
When a thread attempts to `acquire()` a semaphore, it will wait if this counter is less than or equal to 0.
Otherwise, the thread **decrements** the internal counter and the function returns.
The opposite of `acquire()` is `release()`, which increases the internal counter by a given value (by default 1).

Go to `chapters/compute/synchronization/guides/apache2-simulator-semaphore/support/apache2_simulator_semaphore.py`.
In the `main()` function we create a semaphore which we increment (`release()`) upon every new message.
Each thread decrements (`acquire()`) this semaphore to signal that it wants to retrieve a message from the list.
The retrieval means modifying a data structure, which is a critical section, so we use a **separate** mutex for this.
Otherwise, multiple threads could acquire the semaphore at the same time and try to modify the list at the same time.
Not good.

Locking this mutex (which in Python is called `Lock`) is done with the following statement: `with msg_mutex:`
This is a syntactic equivalent to:

```Python
event.acquire()
messages.append(msg)
event.release()
```

Since the length of the `messages` list is simply `len(messages)`, it may seem a bit redundant to use a semaphore to store essentially the same value.
In the next section, we'll look at a more refined mechanism for our use case: _condition variables_.

[Quiz](../../drills/questions/semaphore-equivalent.md)

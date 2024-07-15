# `apache2` Simulator

## Semaphore

Go to `apache2-simulator/support/apache2_simulator_semaphore.py`.
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

[Quiz](../../drills/questions/semaphore-equivalent.md)

Since the length of the `messages` list is simply `len(messages)`, it may seem a bit redundant to use a semaphore to store essentially the same value.
In the next section, we'll look at a more refined mechanism for our use case: _condition variables_.

## Condition

But this is not all, unfortunately.
Look at the code in `apache2-simulator/support/apache2_simulator_condition.py`.
See the main thread call `notify()` once it reads the message.
Notice that this call is preceded by an `acquire()` call, and succeeded by a `release()` call.

`acquire()` and `release()` are commonly associated with mutexes or semaphores.
What do they have to do with condition variables?

Well, a lock `Condition` variable also stores an inner lock (mutex).
It is this lock that we `acquire()` and `release()`.
In fact, the [documentation](https://docs.python.org/3/library/threading.html#condition-objects) states we should only call `Condition` methods with its inner lock taken.

Why is this necessary?
Take a look at the `worker()` function.
After `wait()`-ing (we'll explain the need for the loop in a bit), it extracts a message from the message queue.
This operation is **not** atomic, so it must be enclosed within a critical section.
Hence, the lock.

[Quiz](../../drills/questions/notify-only-with-mutex.md)

So now we know we cannot only use a mutex.
The mutex is used to access and modify the `messages` list atomically.
Now, you might be thinking that this code causes a deadlock:

```Python
event.acquire()
while len(messages) == 0:
    event.wait()
```

The thread gets the lock and then, if there are no messages, it switches its state to WAITING.
A classic deadlock, right?
No.
`wait()` also releases the inner lock of the `Condition` and being woken up reacquires it.
Neat!
And the `while` loop that checks if there are any new messages is necessary because `wait()` can return after an arbitrary long time.
This is because the thread waiting for the event was notified to wake up, but another thread has woken up before it and started handling the event earlier by reacquiring the lock.
All the other threads that woke up, but can't acquire the lock, must be put back to wait.
This situation is called a **spurious wakeup**.
Therefore, it's necessary to check for messages again when waking up.

So now we have both synchronization **and** signalling.
This is what conditions are for, ultimately.

Now that you understand the concept of synchronization, you should apply it in a broader context.
[In the Arena], you'll find an exercise asking you to make an existing array list implementation thread-safe.
Have fun!

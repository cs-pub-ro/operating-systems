# `apache2` Simulator - Condition

## Conditions

Another way we can implement our `apache2` simulator is to use a condition variable.
This one is probably the most intuitive synchronization primitive.
It's a means by which a thread can tell another one: "Hey, wake up, _this_ happened!".
So it's a way for threads to notify each other.
For this reason, the main methods associated with conditions are `notify()` and `wait()`.
As you might expect, they are complementary:

- `wait()` puts the thread in the WAITING state until it's woken up by another one
- `notify()` wakes up one or more `wait()`-ing threads.
If `notify()` is called before any thread has called `wait()`, the first thread that calls it will continue its execution unhindered.

Let's talk about a classic problem in synchronization and parallel computing: **The producer-consumer problem**
The problem states that one or more producers generate data and places it in a shared buffer (a queue for example), while one or more consumers take data from the buffer to further process it.
More about it in this [video](https://www.youtube.com/watch?v=Qx3P2wazwI0).
There are a few rules though, such as:

- The producer must not insert data when the buffer is full.
- The consumer must not retrieve data if the buffer is empty.
- The producer and the consumer can't access the shared buffer at the same time.

Now enter the `apache2-simulator-condition/` directory of the extracted archive (or `chapters/compute/synchronization/drills/tasks/apache2-simulator-condition/` if you are working directly in the repository) and run `make skels`.
Look at the code in `support/src/producer_consumer.py`.
We have one producer and one consumer for simplicity.
Observe that the producer calls `notify()` once there is data available, and the consumer calls `notify()`, when data is read.
Notice that this call is preceded by an `acquire()` call, and succeeded by a `release()` call.

`acquire()` and `release()` are commonly associated with mutexes or semaphores.
What do they have to do with condition variables?

Well, a lock `Condition` variable also stores an inner lock (mutex).
It is this lock that we `acquire()` and `release()`.
In fact, the [documentation](https://docs.python.org/3/library/threading.html#condition-objects) states we should only call `Condition` methods with its inner lock taken.

Why is this necessary?
We don't want both the consumer and the producer to modify a buffer at the same time, this could lead to a race condition, especially if we have more producers and more consumers.

So now we know we cannot only use a mutex.
The mutex is used to access and modify the `queue` atomically.
Now, you might be thinking that this code causes a deadlock:

```Python
condition.acquire()
    with condition:
    ...
    condition.wait()
```

The thread gets the lock and then, if there is no data, it switches its state to WAITING.
A classic deadlock, right?
No.
`wait()` also releases the inner lock of the `Condition` and being woken up reacquires it.
Neat!

So now we have both synchronization **and** signalling.
This is what conditions are for, ultimately.

Open the `apache2-simulator-condition/` directory of the extracted archive (or `chapters/compute/synchronization/drills/tasks/apache2-simulator-condition/` if you are working directly in the repository), then go to `support/src/apache2_simulator_condition.py` and follow the TODOs.
The code is similar to `apache2_simulator_semaphore.py`, but this time we use condition variables as shown in `producer_consumer.py`.

[Quiz](../../../drills/questions/notify-only-with-mutex.md)

# C: Race Conditions

Go to the `race-condition/` directory of the extracted archive (or `chapters/compute/synchronization/drills/tasks/race-condition/` if you are working directly in the repository), then open `support/c/race_condition_mutex.c` and notice the differences between this code and the buggy one.
We now use a `pthread_mutex_t` variable, which we `lock` at the beginning of a critical section, and we `unlock` at the end.
Generally speaking, `lock`-ing a mutex makes a thread enter a critical section, while calling `pthread_mutex_unlock()` makes the thread leave said critical section.
Therefore, as we said previously, the critical sections in our code are `var--` and `var++`.
Run the code multiple times to convince yourself that in the end, the value of `var` will always be 0.

Mutexes contain an internal variable which can be either 1 (locked) or 0 (unlocked).
When a thread calls `pthread_mutex_lock()`, it attempts to set that variable to 1.
If it was 0, the thread sets it to 1 and proceeds to execute the critical section.
Otherwise, it **suspends its execution** and waits until that variable is set to 0 again.

When calling `pthread_mutex_unlock()`, the internal variable is set to 0 and all waiting threads are woken up to try to acquire the mutex again.
**Be careful:** It is generally considered unsafe and [in many cases undefined behaviour](https://pubs.opengroup.org/onlinepubs/9699919799/functions/pthread_mutex_lock.html) to call `pthread_mutex_unlock()` from a different thread than the one that acquired the lock.
So the general workflow should look something like this:

```text
within a single thread:
    pthread_mutex_lock(&mutex)
    // do atomic stuff
    pthread_mutex_unlock(&mutex)
```

## Synchronization - Overhead

> There ain't no such thing as a free lunch

This saying is also true for multithreading.
Running threads in parallel is nice and efficient, but synchronization always comes with a penalty: overhead.
Use the `time` command to record the running times of `race_condition` and `race_condition_mutex`.
Notice that those of `race_condition_mutex` are larger than those of `race_condition`.

The cause of this is that now when one thread is executing the critical section, the other has to wait and do nothing.
Waiting means changing its state from RUNNING to WAITING, which brings further overhead from the scheduler.
This latter overhead comes from the **context switch** that is necessary for a thread to switch its state from RUNNING to WAITING and back.

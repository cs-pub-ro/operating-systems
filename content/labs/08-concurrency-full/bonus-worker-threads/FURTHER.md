# Going Further: A Pool of Worker Threads

With answers.

## Things to try

1. **Time it against one worker.**

   With tasks that only compute and share nothing, eight workers on eight or more cores finish close to eight times sooner than one.
   The executable itself shows the same thing in another way: `user` time is about seven times `real` time.
1. **A recursive mutex.**

   The flag, on every run, in 0.09 to 0.11 s against 0.02 s, with `user` equal to `real`.
   The self-deadlock is gone and so is the parallelism: a worker holds the lock for as long as its task runs, so the other seven wait.
   It also changes what the lock means.
   A task now runs inside the pool's critical section, and if it calls `pool_submit()` it changes the queue while the worker that called it is in the middle of its own use of the queue.
   Here that happens to be harmless, because the worker had finished with the queue; in general, a recursive mutex lets code re-enter a critical section whose invariant may not hold.
1. **A task that waits.**

   Every task that calls `pool_wait()` keeps its worker.
   With eight workers, the first three levels of the tree are 1, 2 and 4 tasks, seven workers all waiting for their children; the eighth worker takes a task of the fourth level, which submits and waits as well.
   Now every worker is waiting for tasks that are in the queue with nobody to run them.
   This is a deadlock without a single mutex in it: the resource the threads hold and wait for is the workers themselves.
   It is the reason pools offer "wait for all" to outside threads only, or let a waiting task run other tasks in the meantime.
1. **A bounded queue.**

   A task that submits to a full queue waits for room.
   Room is made by workers taking tasks, and if every worker is inside a task that is waiting to submit, nobody takes any.
   The same deadlock as above.
   Unlimited queues avoid it and can use unlimited memory instead; there is no free choice here.

## Questions to answer

* **What would break if the count went down when the task is taken?**
  The count would reach zero while tasks are running and about to submit more.
  `pool_wait()` would return in the gap, which is the bug of the skeleton with better manners.
* **Is a signal enough to wake `pool_wait()`?**
  If only one thread ever waits, yes.
  Nothing says so: two threads may call `pool_wait()`, and both have to return when the count reaches zero.
  News that every waiter can act on is a broadcast.
* **What happens to queued tasks at `pool_destroy()`?**
  They are run.
  A worker leaves only when `stop` is set and the queue is empty, the rule of `bonus-boss-workers`.
  Dropping them instead would be a legitimate design, as long as the documentation says so and something frees them.

## Discussion points

* **Done is a count, not an empty queue.**
  Work that has been taken and not finished is still work.
* **Never call unknown code with a lock held.**
  A task is somebody else's function; it may take long, and it may call back into the pool.
* **A pool is a queue with threads attached.**
  Everything in this file is the producer-consumer pattern plus two questions: when is it finished, and how does it end.

## References

* `man 3 pthread_cond_wait`, `man 3 pthread_cond_broadcast`
* `man 3 pthread_mutexattr_settype`

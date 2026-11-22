# Going Further: A Pool of Worker Threads

Optional.

## Things to try

1. **Time it against one worker.**
   Change nothing in the library; write a few lines of your own that create a pool of one worker and a pool of eight, submit the same hundred tasks to each, each task a loop of a few million additions, and time the two.
1. **A recursive mutex**, as a "fix" for the first flaw: let the worker keep the lock while the task runs, and let `pool_submit()` lock it again.
   Does the program get the flag?
   Look at `user` and `real` in `time ./chall`.
1. **A task that waits.**
   On paper: a task submits two sub-tasks and then calls `pool_wait()` to wait for them before it returns.
   With eight workers, and a tree of tasks more than three levels deep, what happens?
1. **A bounded queue.**
   Give the queue a limit, and make `pool_submit()` wait when it is full, as in `07-producer-consumer`.
   What can go wrong now that tasks submit tasks?

## Questions to answer

* The count of pending tasks goes down after the task function returns, not when the task is taken from the queue.
  What would break if it went down earlier?
* `pool_wait()` is woken by a broadcast, although usually one thread waits.
  Is a signal enough?
* The workers of `bonus-01-boss-workers` were told to stop with a flag, and so are these.
  What happens to tasks that are still in the queue when `pool_destroy()` is called, in your version?

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

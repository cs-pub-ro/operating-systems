# Going Further: A Binary Search Tree for Eight Threads

With answers.

## Things to try

1. **Put the lock in `insert_node()`.**

   The first call locks, recurses, and the second call locks the same mutex from the same thread.
   A default mutex does not know or care who holds it: the thread waits for itself.
   `ps -L` shows every thread asleep in `futex_wait_queue`: one waits for itself, and the other seven wait for it.
   A deadlock does not need two threads.
1. **Make the mutex recursive.**

   ```C
   pthread_mutexattr_t attr;

   pthread_mutexattr_init(&attr);
   pthread_mutexattr_settype(&attr, PTHREAD_MUTEX_RECURSIVE);
   pthread_mutex_init(&tree->lock, &attr);
   ```

   A recursive mutex counts how many times its owner locked it, and is free again when it has been unlocked as many times.
   The version that locks in `insert_node()` then stops hanging, provided every level unlocks before it returns.
   It is a poor reason to use one: the lock is now taken and released at every level for nothing, and the code no longer says where the critical section starts and ends.
   Recursive mutexes are for the rare case where a function that locks has to be callable both from outside and from code that already holds the lock; restructuring into a public function and a "lock held" helper, as here, is nearly always the cleaner answer.
1. **Return early from `tree_contains()` with the lock held.**

   The program stops at once: the first lookup that finds its key, which is the first lookup of all, leaves the mutex locked.
   Compare with the same mistake on a path that is rarely taken, such as a failed `malloc()`: the bug is the same and it can stay hidden for years.
1. **Time it.**

   `real` 0.054 s, `user` 0.049 s: about one core's worth of work, however many threads there are.
   Everything a thread does is done with the lock held, so there is nothing left to run in parallel.

## Questions to answer

* **What would have to happen for the unlocked lookup to go wrong?**
  Another thread has to remove a node on the lookup's path during the few tens of nanoseconds the lookup spends there: free it, so that the lookup reads memory the allocator has reused, or replace its key with its successor's, so that the lookup turns the wrong way.
  It happened in 3 runs out of 50.
* **What must `visit()` not do?**
  Call any function of the tree: it would lock a mutex its own thread holds.
  It should also be quick, since every other thread is waiting.
* **What is wrong with "nearly always"?**
  A read of a variable that another thread is writing is a data race, which C leaves undefined; and on a program that runs for a year, "nearly always" is "sometimes not".
* **Does having keys of their own make the threads independent?**
  No.
  The keys are private; the nodes are linked to each other.
  Inserting key 9 can hang a node under the node of key 8, which belongs to another thread, and removing 8 can move or free it.

## Discussion points

* **A test shows the presence of a bug, not its absence.**
  A race that needs two threads at the same node within a few nanoseconds can pass a thousand runs.
  Tools that look at the locks rather than at the result, such as Helgrind and ThreadSanitizer, find it on the first.
* **Lock at the boundary of the structure.**
  The functions other code calls take the lock; the helpers below them assume it is held, and say so in a comment.
* **One lock for the whole tree is correct and slow.**
  Finer locking, one lock per node, taken hand over hand on the way down, lets threads work in different subtrees at once, and is much harder to get right.
  `bonus-03-synchronized-db` takes a smaller step in that direction, with a lock that readers can share.

## References

* `man 3 pthread_mutex_init`, `man 3 pthread_mutexattr_settype`
* Valgrind manual, *Helgrind: a thread error detector* — <https://valgrind.org/docs/manual/hg-manual.html>

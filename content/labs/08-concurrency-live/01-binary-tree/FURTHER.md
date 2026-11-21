# Going Further: A Binary Search Tree for Eight Threads

Optional.

## Things to try

1. **Put the lock in `insert_node()`** instead of `tree_insert()`, at the top of the function, with the unlock before each `return`.
   Run it, with `./chall 0`, and look at the threads with `ps -L -o lwp,stat,wchan:20 -p $(pidof chall)`.
   Which thread is each one waiting for?
1. **Make the mutex recursive**: `pthread_mutexattr_settype()` with `PTHREAD_MUTEX_RECURSIVE`, passed to `pthread_mutex_init()`.
   The version of the previous point now runs.
   Is that a good reason to use a recursive mutex?
1. **Return early from `tree_contains()`** with the lock held, on the path where the key is found.
   How long does it take for the program to stop, and why that long?
1. **Time it.**
   `time ./chall` on your final version, and compare `user` with `real`.
   How much of the work did the eight threads do at the same time?

## Questions to answer

* The executable gives the flag, most of the time, to a library with no lock in `tree_contains()`.
  What would have to happen, and when, for that lookup to go wrong?
* `tree_walk()` holds the lock while it calls `visit()`, a function it knows nothing about.
  What must `visit()` not do?
* `tree_size()` could return `tree->size` without the lock and be right nearly always.
  What is wrong with "nearly always"?
* Every thread uses keys of its own.
  Does that make the threads independent of each other?

## Discussion points

* **A test shows the presence of a bug, not its absence.**
  A race that needs two threads at the same node within a few nanoseconds can pass a thousand runs.
  Tools that look at the locks rather than at the result, such as Helgrind and ThreadSanitizer, find it on the first.
* **Lock at the boundary of the structure.**
  The functions other code calls take the lock; the helpers below them assume it is held, and say so in a comment.
* **One lock for the whole tree is correct and slow.**
  Finer locking, one lock per node, taken hand over hand on the way down, lets threads work in different subtrees at once, and is much harder to get right.

## References

* `man 3 pthread_mutex_init`, `man 3 pthread_mutexattr_settype`
* Valgrind manual, *Helgrind: a thread error detector*

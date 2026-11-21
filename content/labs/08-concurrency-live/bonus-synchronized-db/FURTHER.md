# Going Further: A Database Behind a Read-Write Lock

Optional.

## Things to try

1. **Check what the lock functions return.**
   `pthread_rwlock_wrlock()` and the others return an error number, and `db.c` ignores it.
   Write a ten-line program that takes a read-write lock for writing twice from the same thread and prints what the second call returns, with `strerror()`.
   Then do the same with a `pthread_mutex_t`.
1. **Upgrade the lock.**
   In `db_update()`, it is tempting to search under the read lock and then, still holding it, take the write lock for the change.
   Try it.
   What happens, and what would happen if two threads did it at the same time?
1. **A workload for readers.**
   The executable's threads write about as often as they read.
   Write a small program of your own against `libdb.so` in which eight threads only call `db_find()` on a database of a hundred thousand records, and time it with the read-write lock and with a mutex.
1. **Starve a writer.**
   On paper: readers arrive all the time, each holding the lock for a moment, so that at every instant at least one reader is inside.
   When does a writer get in?
   Look for "writer preference" in `man 3 pthread_rwlockattr_setkind_np`.

## Questions to answer

* `db_find()` copies the record out instead of returning a pointer to it.
  Is that still needed with a read-write lock?
* `db_update()` changes a record and not the array.
  Could it take the lock for reading, since it does not move anything?
* `find_index()` takes no lock.
  How does a reader of the code know that this is right?

## Discussion points

* **A read-write lock is two promises, and the code has to keep both.**
  The lock cannot tell whether a function that asked for reading really only reads.
* **An index is knowledge about the structure.**
  It is good for as long as the lock under which it was obtained is held, and not a moment longer.
* **Faster is a claim about a workload.**
  A read-write lock costs more than a mutex to take and release, and pays that back only when readers are many, long, and at the same time.

## References

* `man 3 pthread_rwlock_rdlock`, `man 3 pthread_rwlock_wrlock`, `man 3 pthread_rwlock_unlock`
* Session 07, `bonus-synchronized-db` — the database with one mutex

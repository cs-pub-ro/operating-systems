# Going Further: A Database Behind a Read-Write Lock

With answers.

## Things to try

1. **Check what the lock functions return.**

   ```text
   wrlock: 0
   wrlock again: 35 (Resource deadlock avoided)
   ```

   glibc notices that the thread asking for the write lock already has it, and returns `EDEADLK` instead of waiting.
   Code that ignores the return value goes on as if it had the lock, which here it does, and then unlocks once too often.
   A default `pthread_mutex_t` does not check: the second lock waits for ever.
   Neither behaviour is something to rely on; the return value is there to be looked at, at least while debugging.
1. **Upgrade the lock.**

   A thread that holds the lock for reading and asks for it for writing waits for all readers to leave, and it is one of them: it waits for itself, and this time glibc does not notice.
   The program stops.
   Two threads doing it at once would deadlock even if the lock could tell: each waits for the other to stop reading.
   That is why read-write locks do not offer an upgrade, and the code has to release and take again, and then check again, or take the write lock from the start.
1. **A workload for readers.**

   `readers.c` in this directory: 0.07 s with the read-write lock, 0.48 s with the same `db.c` on a mutex.
   A lookup scans up to a hundred thousand records, so the lock is held for a long time compared with what it costs to take, and all eight threads can be scanning together.
   Both of those are needed for the read-write lock to pay.
1. **Starve a writer.**

   If the lock lets a new reader in whenever other readers are inside, a writer gets in only when the readers happen to leave a gap, which under a steady stream of them is never.
   The default in glibc prefers readers in this way.
   `PTHREAD_RWLOCK_PREFER_WRITER_NONRECURSIVE_NP` makes new readers queue behind a waiting writer, at the cost of some reader throughput.

## Questions to answer

* **Is copying the record out still needed?**
  Yes.
  A pointer into the array is good only while the lock is held, in either mode; after the unlock a writer may move the array or the record.
* **Could `db_update()` take the lock for reading?**
  No.
  Two threads renaming the same record would write the same bytes at once, and a `db_find()` copying that record out at that moment would get half of one name and half of another.
  Not moving anything is not the same as not writing.
* **How does a reader of the code know that `find_index()` needs no lock?**
  Only from the comment that says "called with the lock held", and from checking every caller.
  The convention is the whole of the protection, which is a reason to keep such helpers `static` and few.

## Discussion points

* **A read-write lock is two promises, and the code has to keep both.**
  The lock cannot tell whether a function that asked for reading really only reads.
* **An index is knowledge about the structure.**
  It is good for as long as the lock under which it was obtained is held, and not a moment longer.
* **Faster is a claim about a workload.**
  A read-write lock costs more than a mutex to take and release, and pays that back only when readers are many, long, and at the same time.

## References

* `man 3 pthread_rwlock_rdlock`, `man 3 pthread_rwlock_wrlock`, `man 3 pthread_rwlock_unlock`
* `man 3 pthread_rwlockattr_setkind_np`
* Session 07, `bonus-synchronized-db` — the database with one mutex

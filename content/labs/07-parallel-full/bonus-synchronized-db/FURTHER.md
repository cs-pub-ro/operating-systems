# Going Further: A Synchronized In-Memory Database

With answers.

## Things to try

1. **Lock the wrong thing.**

   With no mutex in the database and one lock held around the whole loop of `run_commands()`, the program is correct and takes 0.15 s, the time of the sequential version.
   It is the sequential version: each thread does its whole file while the others wait.
   A lock around the work, instead of around the data, is correct and useless.
1. **Return a pointer from `db_find()`.**

   The lookup locks, finds the record, unlocks, and returns `&db->records[i]`.
   The caller then reads `record->name`.
   Between the unlock and that read, another thread's `db_add()` can `realloc()` the array: the pointer now points into freed memory.
   Most of the time the old bytes are still there and the read gives the right name, which is why this bug survives testing; under Helgrind, or on the day the allocator reuses the block, it does not.
   The two safe forms are to copy the record out under the lock, as the reference does, or to make the caller hold the lock for as long as it uses the pointer.
1. **Run it under Helgrind.**

   ```console
   ./gen_commands.sh 4 200
   valgrind --tool=helgrind ./db commands-*.txt
   ```

   On the version without the mutex it reports `Possible data race during read of size 8 ... at db_add (db.c:...)`, with the other thread's conflicting access, also in `db_add()`, underneath, and goes on to report dozens more.
   On the reference it ends with `ERROR SUMMARY: 0 errors`.
   Helgrind watches every memory access and every lock operation and reports memory that two threads touch with no lock in common; it finds the race even on a run where nothing went wrong, which a test of the output cannot do.
1. **Add a `remove <id>` command.**

   ```C
   pthread_mutex_lock(&db->lock);
   for (i = 0; i < db->count; i++) {
   	if (db->records[i].id == id) {
   		db->records[i] = db->records[db->count - 1];
   		db->count--;
   		break;
   	}
   }
   pthread_mutex_unlock(&db->lock);
   ```

   The search and the removal are one critical section: found at index `i` is true only for as long as nobody else moves records.
   A `find` in another thread waits at its own lock and sees the array either before the removal or after it, never with the last record in two places.
   Without the lock in `db_find()`, it could look at the last slot after the record was copied out of it and `count` was decremented, and miss a record that exists.
1. **Grow less often.**

   With `CHUNK` at 4096 instead of 4, the time is unchanged, 0.10 s.
   Five thousand calls to `realloc()` became five, and it does not show, because `db_add()` was never where the time went.
   The lock is held longest in `db_find()`, which scans; measure before deciding what to shorten.

## Questions to answer

* **What goes wrong if the lock is released between the test of `count` and the increment?**
  Two threads both pass the test with one free slot left; both store at the same index, or the second stores past the end of the array.
  The test is only worth something while the thing tested cannot change, so check and act belong in one critical section.
* **`db_find()` changes nothing.
  Why does it need the lock?**
  Because a writer can free the array under it.
  Reading is safe without a lock only when nobody writes; one writer is enough to make every reader need protection.
* **What does building the record before taking the lock buy?**
  A shorter critical section: the string copy is done in parallel.
  The program would be correct with the copy inside, and slower by an amount too small to measure here; the habit is what matters.
* **Why is a thread's tally safe without a lock when `db->count` is not?**
  The tally is written by one thread and read by another only after a join.
  `db->count` is written by every thread, while the others are running.
* **What does holding the lock across the scan do as the database grows?**
  The scan gets longer, so the lock is held longer, so the threads wait longer for each other: the larger the database, the closer the program is to sequential.

## Discussion points

* **An invariant is what the lock protects.**
  `count <= capacity`, and `records` points at `capacity` records: true before the lock is taken and true when it is released, and allowed to be false only in between, where nobody else can look.
* **A pointer into a shared structure outlives the lock that made it safe.**
  Copy out under the lock, or keep the lock for as long as the pointer is used.
* **One exit, when a lock is held.**
  Every `return` between a lock and its unlock is a way of leaving the mutex held.
  `goto out`, with the unlock at `out`, is the C idiom for it.
* **Correct and parallel are different achievements.**
  One mutex makes the database safe, and makes every operation on it wait for every other.
  Making it fast as well takes finer locks, or locks that let readers share, which is where session 08 goes.

## References

* `man 3 pthread_mutex_init`, `man 3 pthread_mutex_lock`, `man 3 pthread_mutex_destroy`
* `man 3 realloc` — when the block moves
* Valgrind manual, *Helgrind: a thread error detector*

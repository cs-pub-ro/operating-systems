# Going Further: A Synchronized In-Memory Database

Optional.

## Things to try

1. **Lock the wrong thing.**
   Take the mutex out of the database and put one lock around the whole loop in `run_commands()` instead.
   The program is correct.
   Time it against the sequential version, and say what the threads are doing most of the time.
1. **Return a pointer from `db_find()`** instead of copying the record: `struct record *db_find(db, id)`, with the lock taken and released inside.
   Have the caller read the name through the pointer, and run with eight files a few dozen times.
   What can happen to the array between the unlock and the caller's read?
1. **Run it under Helgrind**, a Valgrind tool that watches the locks: `valgrind --tool=helgrind ./db commands-*.txt`, once on the version without the mutex and once on yours.
   Use small files (`./gen_commands.sh 4 200`); it is slow.
   Read one report from top to bottom: it names the two threads, the two statements, and the lock that was not held.
1. **Add a `remove <id>` command**: find the record, move the last record into its place, decrement `count`.
   Where does the critical section start and end?
   What happens to a `find` in another thread that was about to look at the last record?
1. **Grow less often.**
   Change `CHUNK` from 4 to 4096 and time the program.
   The lock is held for less time per `add`; does that show, and why is `find` unaffected?

## Questions to answer

* `count == capacity` is tested, and `count++` happens a dozen lines later.
  What goes wrong if the lock is released between the two and taken again?
* `db_find()` changes nothing.
  Why does it still need the lock?
* The record is built in a local variable before the lock is taken.
  What does that buy, and would the program be wrong without it?
* Each thread keeps its tally in its own `struct worker`, with no lock.
  Why is that safe when the database's `count` is not?
* The lock is held for the whole of a `find`, which looks at every record.
  What does that do to the speed-up as the database grows?

## Discussion points

* **An invariant is what the lock protects.**
  `count <= capacity`, and `records` points at `capacity` records: true before the lock is taken and true when it is released, and allowed to be false only in between, where nobody else can look.
* **A pointer into a shared structure outlives the lock that made it safe.**
  Copy out under the lock, or keep the lock for as long as the pointer is used.
* **Correct and parallel are different achievements.**
  One mutex makes the database safe, and makes every operation on it wait for every other.
  Making it fast as well takes finer locks, or locks that let readers share, which is where session 08 goes.

## References

* `man 3 pthread_mutex_init`, `man 3 pthread_mutex_lock`, `man 3 pthread_mutex_destroy`
* `man 3 realloc` — when the block moves
* Valgrind manual, *Helgrind: a thread error detector*

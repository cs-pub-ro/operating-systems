# Bonus: A Database Behind a Read-Write Lock

**Tools:** GCC, Make, GDB

## Goal

Reference solution of the database challenge: every function takes the read-write lock in the mode its work calls for, holds it across everything that depends on what it found, and releases it on every way out.

## Background

```C
struct database {
	struct record *records;	/* heap array of `capacity` records        */
	size_t count;		/* records currently in use                */
	size_t capacity;	/* records the array can hold              */
	pthread_rwlock_t lock;	/* protects the three fields, and the records */
};
```

| Function | What it does to the database | Mode |
| --- | --- | --- |
| `db_add()` | writes a record and `count`; may move the array | write |
| `db_find()` | reads | read |
| `db_update()` | writes a record | write |
| `db_remove()` | writes a record and `count` | write |
| `db_count()` | reads | read |

Eight threads each add 1,000 records with ids of their own, look every one up, rename the even-numbered ones and remove every fourth, twice, the second time expecting a failure.
At the end 6,000 records must be left, each with the name it should have.

Files:

* `db.c`, `db.h` — the library, and its interface.
* `chall.c`, `flag.h`, `flag` — the executable, the encrypted flag with its key, and the flag in clear.
* `readers.c` — a second program, lookups only, to time the lock with; see `FURTHER.md`.
* `test.sh` — fifty runs, each of which has to print the flag.

## Build & Run

```console
make
./chall
```

```text
records in the database:      6000 (expected 6000)
records with the right name:  6000 (expected 6000)
calls with a wrong result:    0
flag: SO{...}
```

## Results and Explanations

The three bugs show in a fixed order, each hiding the next.

| Library | 20 runs |
| --- | --- |
| As given | 20 time-outs |
| `db_find()` fixed | 19 aborts in the allocator, 1 segmentation fault |
| `db_find()` and `db_add()` fixed | 20 "no flag", with records misnamed |
| All three fixed | 20 flags |

### The hang — a lock that is not released (`db_find()`, TODO 2)

```C
pthread_rwlock_rdlock(&db->lock);

i = find_index(db, id);
if (i < 0)
	return -1;

*out = db->records[i];

pthread_rwlock_unlock(&db->lock);
```

```text
Timed out: a thread is waiting for a lock that is never released.
```

A lookup that finds nothing returns with the lock still held for reading.
The executable makes exactly such a lookup, on purpose, after every removal.

One reader that never leaves does not bother other readers, which is why the program runs for a moment.
It stops the first thread that asks for the lock for writing, because a writer waits until there are no readers at all, and this reader is never coming back.
After that every thread that needs to add, rename or remove is asleep, including, soon, the one that leaked the lock.

The fix is the one of the tree: one way out.

```C
pthread_rwlock_rdlock(&db->lock);
i = find_index(db, id);
if (i >= 0) {
	*out = db->records[i];
	rc = 0;
}
pthread_rwlock_unlock(&db->lock);

return rc;
```

### The crash — the wrong mode (`db_add()`, TODO 1)

```C
pthread_rwlock_rdlock(&db->lock);

if (db->count == db->capacity) {
	/* ... */
	tmp = realloc(db->records, new_capacity * sizeof(*tmp));
```

```text
realloc(): invalid old size
Aborted (core dumped)
```

`db_add()` takes the lock for reading, and a read lock lets any number of threads in.
Eight threads are then inside `db_add()` together, as if there were no lock, and it is session 07's bonus without its mutex: two threads see the array full and both pass the same pointer to `realloc()`, the second one after the first has had it freed.
The allocator notices and stops the program.

A read-write lock cannot check that a function that asked for reading only reads.
The mode is a promise made by the code.

```C
pthread_rwlock_wrlock(&db->lock);
```

### The wrong names — a stale index (`db_update()`, TODO 3)

```C
pthread_rwlock_rdlock(&db->lock);
i = find_index(db, id);
pthread_rwlock_unlock(&db->lock);

if (i < 0)
	return -1;

pthread_rwlock_wrlock(&db->lock);
strncpy(db->records[i].name, name, NAME_LEN - 1);
db->records[i].name[NAME_LEN - 1] = '\0';
pthread_rwlock_unlock(&db->lock);
```

```text
record 8000096 is named "user-7-96", and should be "renamed-7-96"
record 6000120 is named "user-5-120", and should be "renamed-5-120"
...
records in the database:      6000 (expected 6000)
records with the right name:  5957 (expected 6000)
```

The author wanted to do the search, which is long, under the read lock, so that other readers are not kept out, and to take the write lock only for the change, which is short.
The modes are right and the intention is good.

| Step | Thread A: `db_update(96)` | Thread B: `db_remove(57)` |
| --- | --- | --- |
| 1 | read lock; finds record 96 at index 310; unlock | |
| 2 | | write lock; record 57 is at index 200 |
| 3 | | moves the **last** record into index 200, `count--`; unlock |
| 4 | write lock; writes the new name at index 310 | |

If the record that A found was the last one, B has moved it, and index 310 is now past the end of the database: A writes its name into a slot nobody will read, and record 96 keeps its old name.
With other orders of events, index 310 holds a different record by step 4, and that record gets a name meant for another.

`i` is knowledge about the array, obtained under a lock, and used after that lock was released.
It is the TOCTOU of `03-toctou`, with two lock modes making it look like a deliberate optimization.

```C
pthread_rwlock_wrlock(&db->lock);
i = find_index(db, id);
if (i >= 0) {
	strncpy(db->records[i].name, name, NAME_LEN - 1);
	db->records[i].name[NAME_LEN - 1] = '\0';
	rc = 0;
}
pthread_rwlock_unlock(&db->lock);
```

The search and the change are one critical section, under the write lock from the start.
POSIX has no way of turning a read lock into a write lock without releasing it in between, so there is nothing cleverer to do with this lock.

### What the read-write lock buys

On the executable's workload, nothing:

| Lock | `./chall` |
| --- | --- |
| Read-write lock | 0.08 to 0.09 s |
| Mutex | 0.06 s |

The plain mutex is faster.
Half of what the threads do is writing, which is exclusive either way, and a read-write lock is a more complicated thing to take and release than a mutex.
`user` time is about equal to `real` time in both: there is hardly any parallelism to be had.

On a workload of readers, a great deal.
`readers.c` has eight threads doing nothing but lookups in a hundred thousand records:

| Lock | `./readers` |
| --- | --- |
| Read-write lock | 0.07 s |
| Mutex | 0.48 s |

Seven times faster, with eight threads, because the lookups now really run at the same time.
Session 07 ended on this database with the remark that the scan under the mutex was the whole program; this is what it takes to change that, and it holds only for as long as the workload is mostly reads.

## References

* `man 3 pthread_rwlock_rdlock`, `man 3 pthread_rwlock_wrlock`, `man 3 pthread_rwlock_unlock`
* Session 07, `bonus-synchronized-db` — the database with one mutex
* Session 03, `03-in-memory-db` — the database

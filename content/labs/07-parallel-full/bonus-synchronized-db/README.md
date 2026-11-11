# Bonus: A Synchronized In-Memory Database

**Tools:** GCC, Make, time

## Goal

Reference implementation of the database of session 03 made safe for several threads.
One mutex, inside the database, is held around the statements that read or change the shared array and its counters, and around nothing else.

## Background

```C
struct database {
	struct record *records;	/* heap array of `capacity` records        */
	size_t count;		/* records currently in use                */
	size_t capacity;	/* records the array can hold              */
	pthread_mutex_t lock;	/* protects the three fields above         */
};
```

Every exercise so far gave each thread a part of the data.
Here that is not possible: every thread adds to the same array, and the array, `count` and `capacity` are one piece of state.
They are tied together by an invariant, `count <= capacity` with `records` pointing at room for `capacity` records, and the code that changes them breaks the invariant for a moment before restoring it.
A thread that looks during that moment, or two threads changing at once, is what the mutex prevents.

The threads each run `run_commands()` on a file of their own: read a line, parse it, call `db_add()` or `db_find()`.
Reading and parsing touch only the thread's file and its local variables.
The lock is taken inside the two database functions, so a thread holds it only while it is in the shared structure.

Files:

* `db.c` — the solution.
* `gen_commands.sh` — writes the command files: by default four, of 5000 `add` and 5000 `find` each, every `find` looking for a record the same file added earlier.
* `test.sh` — ten runs with eight threads, checked against what the command files say.

## Build & Run

```console
make
./gen_commands.sh
./db commands-*.txt
```

```text
4 files of 5000 adds and 5000 finds each: commands-1.txt .. commands-4.txt
records: 20000 (capacity 20000)
id sum:  50049990000
adds:    20000
finds:   20000, found 20000
errors:  0
4 thread(s), 0.103 s
```

## Results and Explanations

### What goes wrong without the mutex

With the threads in and no lock, thirty runs on the default files went like this:

| Outcome | Runs |
| --- | --- |
| `realloc(): invalid old size`, abort | 26 |
| Segmentation fault | 3 |
| `realloc(): invalid next size`, abort | 1 |

Not one run finished.
On smaller files (`./gen_commands.sh 4 50`) most runs still abort, a few survive, and then the damage is quiet; once, the program hung instead, using no processor time.

```text
records: 197 (capacity 200)
finds:   200, found 197
```

Each failure is an interleaving of two threads in `db_add()`.

* **Lost records.**
  Two threads read the same `count`, write their records into the same slot, and both store `count + 1`.
  One record is gone, and its `find` fails.
* **A double `realloc()`.**
  Two threads both see `count == capacity` and both call `realloc(db->records, ...)` with the same old pointer.
  The first call may free that block; the second passes a freed pointer to the allocator, which notices, or does not, and corrupts the heap.
  This is the abort.
* **A write to freed memory.**
  One thread is storing a record at `db->records[db->count]` while another's `realloc()` moves the array.
  The record goes into the old block, already freed.
  This is the segmentation fault, or a silent corruption of the allocator's own bookkeeping that shows up later, as the other abort or as the hang.

### TODO 1 — the threads

```C
for (i = 0; i < nthreads; i++) {
	rc = pthread_create(&threads[i], NULL, run_commands, &workers[i]);
	if (rc != 0) {
		fprintf(stderr, "pthread_create: %s\n", strerror(rc));
		return 1;
	}
}

for (i = 0; i < nthreads; i++) {
	pthread_join(threads[i], NULL);
	adds += workers[i].adds;
	/* and the other tallies */
}
```

`run_commands()` already has the shape of a thread function, and each `struct worker` holds one thread's tally.
The tallies need no lock: each is written by one thread and read after its join.
The contrast with `db->count` is the lesson of the session in two variables.

### TODO 2 — the mutex belongs to the database

```C
pthread_mutex_init(&db->lock, NULL);       /* in db_init() */
pthread_mutex_destroy(&db->lock);          /* in db_free() */
```

The mutex is a field of the structure it protects, and lives exactly as long.
A global mutex would work for one database and silently serialize two.

### TODO 3 — `db_add()`

```C
record.id = id;
strncpy(record.name, name, NAME_LEN - 1);
record.name[NAME_LEN - 1] = '\0';

pthread_mutex_lock(&db->lock);

if (db->count == db->capacity) {
	/* ... */
	tmp = realloc(db->records, new_capacity * sizeof(*tmp));
	if (tmp == NULL) {
		rc = -1;
		goto out;
	}
	db->records = tmp;
	db->capacity = new_capacity;
}

db->records[db->count] = record;
db->count++;

out:
pthread_mutex_unlock(&db->lock);

return rc;
```

The critical section runs from the test of `count` to its increment.
It cannot be split: the test, the growth, the store and the increment all depend on `count` and `records` being the same throughout, so releasing the lock between any two of them lets another thread change what the next step relies on.

Two things were moved out of it.
The record is built in a local variable before the lock is taken, so the string copy is not done under the lock, and what remains inside is one struct assignment.
And the function has one exit: the early `return -1` of the original became a `goto out`, because returning with the mutex held would leave it locked for ever, and the next thread to call `db_add()` would wait for ever.

### TODO 4 — `db_find()`

```C
pthread_mutex_lock(&db->lock);

for (i = 0; i < db->count; i++) {
	if (db->records[i].id == id) {
		*out = db->records[i];
		rc = 0;
		break;
	}
}

pthread_mutex_unlock(&db->lock);
```

A function that changes nothing still needs the lock, because of what the writers do.
While this loop walks the array, a `db_add()` in another thread can `realloc()` it: the block moves, the old one is freed, and the loop goes on reading freed memory.
With the lock in `db_add()` only, eight threads crashed with a segmentation fault in twenty runs out of twenty.

The same reasoning is why `db_find()` copies the record out instead of returning a pointer to it.
A pointer into the array is valid only while the array cannot move, which is only while the lock is held, and the caller uses the result after the unlock.

`db_summary()` takes the lock as well, although it runs after the joins and does not need it: a function that touches the shared fields takes the lock, always, and nobody has to remember which callers are safe.

### The measurements

| Version | Time |
| --- | --- |
| Sequential, four files one after another | 0.14 s |
| Four threads, mutex in the database | 0.10 s |

The program is correct, and 1.4 times faster on four threads.

Amdahl's law says why.
Nearly all the time goes into `db_find()`, which looks at up to 20,000 records, and the whole search is inside the lock, so only one thread searches at a time.
What runs in parallel is reading and parsing the lines, a small part of the work.
The lock is as short as correctness allows, with this data structure, and the critical section is still most of the program.

Doing better takes a different design, not a better placement of the same mutex: a structure where a lookup is not a scan, a lock that lets several readers in together, or several locks, each for a part of the data.
Those are session 08's.

## References

* `man 3 pthread_mutex_init`, `man 3 pthread_mutex_lock`, `man 3 pthread_mutex_destroy`
* `man 3 realloc`
* Session 03, `03-in-memory-db` — the database this one starts from

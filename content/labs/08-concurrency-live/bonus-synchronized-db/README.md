# Bonus: A Database Behind a Read-Write Lock

**Tools:** GCC, Make, GDB

## Goal

Find three synchronization bugs in a database that uses a read-write lock, each of a kind you have already met, each with a different symptom.
Afterwards you will be able to say what a read-write lock offers over a mutex, and to review the locking of a small library function by function.

## Background

This is the in-memory database of session 03, which session 07's bonus made safe with one mutex.
That mutex made every lookup wait for every other lookup, although two threads that only read cannot harm each other.

A **read-write lock**, `pthread_rwlock_t`, makes that distinction.

* `pthread_rwlock_rdlock()` takes the lock for reading.
  Any number of threads can hold it for reading at the same time.
* `pthread_rwlock_wrlock()` takes the lock for writing.
  A thread that holds it for writing holds it alone: no other writer, and no reader.
* `pthread_rwlock_unlock()` releases either.

The rule that goes with it is simple: a function that only looks takes the lock for reading, and a function that changes anything takes it for writing.

`db.c` is the database as a library, with two operations added to those of session 07: `db_update()`, which renames a record, and `db_remove()`, which removes one by moving the last record into its place.
`chall` runs eight threads against it.
Each thread adds a thousand records of its own, looks them up, renames half of them and removes a quarter, and checks every result.

The comment at the top of `db.c` states the rule above.
Three of the functions under it do not follow it, or follow it and go wrong in another way.

## Your Task

There are three bugs, and they hide each other: you will see the next one only after fixing the one in front of it.
For each, read the symptom, find the function, and explain the bug before you change the code.

1. Run `./chall`.
   The program stops.
   Find the function that leaves the lock taken, and the path through it that does.
1. Run again, several times.
   Now the program dies, with a message from the memory allocator.
   Find the function that changes the database while other threads are allowed in.
1. Run again.
   Now the numbers are nearly right, and some records have the wrong name.
   Find the function that learns something under one lock and uses it under another.

The three TODOs in `db.c` are in the order of the file, not in the order in which the bugs show.

## Build & Run

```console
make
./chall
```

## Check Your Work

* The flag has to be printed on every run; run it twenty times.
* For the first bug: say which threads wait, and for whom, and why a thread that only took the lock for reading can stop everybody.
* For the second: say what two threads did to the array at the same time, in terms of `realloc()`.
* For the third: write the interleaving of two threads, one in `db_update()` and one in `db_remove()`, that puts a name on the wrong record.
  Say which exercise of this session had the same bug.
* Time your final version, and then replace the read-write lock with a plain mutex and time that.
  Explain the result to the teaching assistant; it may not be the one you expect.

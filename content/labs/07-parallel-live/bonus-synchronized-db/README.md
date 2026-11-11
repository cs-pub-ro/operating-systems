# Bonus: A Synchronized In-Memory Database

**Tools:** GCC, Make, time

## Goal

Let several threads use the growable in-memory database of session 03 at the same time, without losing a record or corrupting the array.
Afterwards you will be able to find the critical sections in a data structure that several threads share, and protect them with a mutex that is held no longer than it has to be.

## Background

The database is the one you wrote in session 03: a heap array of records that grows by `CHUNK` with `realloc()` when it is full, with a `count` and a `capacity`.
Two things are new, and both are written:

* `db_find()` looks a record up by its id, and **copies** it out instead of returning a pointer to it.
* The database is driven by files of commands, one per line, `add <id> <name>` or `find <id>`.
  `run_commands()` reads one file, parses each line and calls `db_add()` or `db_find()`.

`main()` calls `run_commands()` on each file in turn: the program is sequential, and correct.

Your job is to run the files at the same time, one thread per file.
All the threads then work on **one** `struct database`, and unlike every exercise so far there is no way to give each thread its own part of it: the array, `count` and `capacity` are shared, and written.

Not everything a thread does touches them.
Reading a line from its own file and parsing it into its own local variables is private to the thread, and should run in parallel with the other threads.
The mutex belongs inside the database, around the statements that read or change the shared fields, and nowhere else.

## Your Task

Run the sequential program first, and note what it prints.
Then open `db.c` and complete the four TODOs.

1. **The threads** — in `main()`, one thread per file, running `run_commands()`, all joined before the tallies are added up.
   Do this first, run it several times, and look at what happens.
1. **The mutex** — a field of `struct database`, initialized where the database is, destroyed where the database is.
1. **`db_add()`** — find the first and the last statement that must not be interleaved with another thread's, and lock around them.
   The function has more than one `return`.
1. **`db_find()`** — decide whether a function that only reads needs the lock, and why.

## Build & Run

```console
make
./gen_commands.sh
./db commands-*.txt
```

`gen_commands.sh` writes four files of 5000 `add` and 5000 `find` commands each.
Every `find` looks for a record that the same file added earlier.

## Check Your Work

* The summary must be the one the sequential program printed: the same number of records, the same sum of ids, every `find` successful.
  Run it at least ten times; one good run proves nothing.
* With the threads in and no mutex, the program fails in more than one way.
  Collect the different failures over several runs, and for each one say which two statements of two threads must have been interleaved.
* Check, by reading your code, that no thread holds the lock while it reads its file or parses a line.
* Lock in `db_add()` only, leaving `db_find()` as it was, and run a few times with more files (`./gen_commands.sh 8`).
  Explain the failure in terms of what `realloc()` does.
* Compare the time with the sequential version.
  The speed-up is far from the number of threads; work out which part of the work is still done by one thread at a time.

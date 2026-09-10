# Exercise: A Growable In-Memory Database

**Tools:** GCC, Make, Valgrind

## Goal

Build a heap array that grows on demand, using `malloc`/`realloc`/`free` correctly.
Afterwards you will be able to manage the capacity of a dynamic data structure yourself, and prove with Valgrind that it leaks nothing.

## Background

`main.c` reads records from standard input into a heap array and prints them back at the end.
You never know in advance how many records there will be, so the array has to grow on demand.
You write that part.

A record is a single row with two fields:

```C
struct record {
	int id;
	char name[NAME_LEN];   /* NAME_LEN == 32 */
};
```

The database is a heap array of records plus a little bookkeeping:

```C
struct database {
	struct record *records;   /* heap array of `capacity` records */
	size_t count;             /* records currently in use         */
	size_t capacity;          /* records the array can hold       */
};
```

The rule connecting the two counters is `count <= capacity`, and it must hold at every point in the program.

The array grows in **constant chunks** of `CHUNK` records, never one record at a time, and it is only ever expanded, never shrunk:

```text
CHUNK = 4

start:          records = NULL      count = 0   capacity = 0
add "1 alice":  need room -> grow   count = 1   capacity = 4    (realloc)
add "2 bob":    room available      count = 2   capacity = 4
add "3 carol":                      count = 3   capacity = 4
add "4 dave":                       count = 4   capacity = 4
add "5 erin":   full -> grow        count = 5   capacity = 8    (realloc)
```

## Your Task

Open `main.c` and complete the three TODOs.

1. **`db_init()`** — start empty: `records = NULL`, `count = 0`, `capacity = 0`.
1. **`db_add()`** — if `count == capacity`, grow the array by `CHUNK` records with `realloc`, and check the result before using it.
   Then copy the record into the slot at index `count` and increment `count`.
1. **`db_free()`** — release the array and reset the fields.

Two things to think about while writing `db_add()`:

* `realloc(NULL, size)` does exactly what `malloc(size)` does, so the same "grow when full" branch also covers the very first allocation.
  You should not need a special case for the empty database.
* If `realloc` returns `NULL` the original block is still valid and still yours.
  Assigning the result straight back over your only pointer therefore has a specific, unpleasant consequence — work out what it is before you write the line.

## Build & Run

```console
make
printf '1 alice\n2 bob\n3 carol\n4 dave\n5 erin\n' | ./db
```

There is also an `input.txt` you can redirect in.
Typing records by hand works too; finish with Ctrl-D.

## Check Your Work

* The summary line reports both the number of records and the capacity.
  For the five-record example above, work out from the growth rule what each should be, then check that the program agrees.
  Feed it four records, then five, and confirm the capacity changes where you predict it does.
* Every record you typed must come back, in order, with the right id and name.
* Run it under Valgrind:

  ```console
  valgrind --leak-check=full ./db < input.txt
  ```

  A correct solution reports no errors and no reachable or lost blocks at exit.
  Anything else — "definitely lost", "invalid write", "invalid read" — points at a specific line, and Valgrind will name it.
  Bring any output you cannot interpret to the teaching assistant.
* Try zero records: run `./db < /dev/null`.
  A correct solution prints an empty database and, importantly, does not crash in `db_free()`.

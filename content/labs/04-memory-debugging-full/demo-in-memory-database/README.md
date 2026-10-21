# Demo: Debugging an In-Memory Database

**Tools:** GCC, Make, GDB, Valgrind

## Goal

Reference version of the demo database, with both planted bugs removed.
The program is the growable in-memory database from session 03, and the point of the demo is not the database: it is the **routine** for going from "it failed" to "here is the line", once for a crash and once for a wrong answer.

## Background

The program reads `<id> <name>` pairs from standard input into a heap array that grows in chunks, prints the records, prints them again sorted by id, and finally reports which record was added first.

The version in [`04-memory-debugging-live/demo-in-memory-database`](../../04-memory-debugging-live/demo-in-memory-database) has two bugs in it, chosen so that they fail in different ways:

| Bug | Where | Symptom | Found with |
| --- | --- | --- | --- |
| 1 | `db_add()` | Segmentation fault, immediately | GDB for the line, one print for the cause |
| 2 | `main()` | Wrong record reported, no crash | A print of an address, confirmed by Valgrind |

Each fix is marked with a `FIX n` comment in `main.c`.

Files:

* `main.c` — the fixed implementation.
* `input.txt` — ten sample records.

## Build & Run

```console
make
./db < input.txt
```

```text
Database holds 10 record(s) (capacity 12):
  [7] grace
  [3] carol
  [1] alice
  [9] ivan
  [2] bob
  [10] judy
  [5] erin
  [4] dave
  [8] heidi
  [6] frank
Sorted by id:
  [1] alice
  [2] bob
  [3] carol
  [4] dave
  [5] erin
  [6] frank
  [7] grace
  [8] heidi
  [9] ivan
  [10] judy
First record added: [7] grace
```

The records come out in the order they appear in `input.txt`, which is not sorted; that is what the second listing is for.

## Results and Explanations

### FIX 1 — `db_add()`: the grow condition underflowed on an empty database

The buggy version asked whether the array was full like this:

```C
if (db->count == db->capacity - 1) {
```

Both fields are `size_t`, which is **unsigned**.
On an empty database `capacity` is 0, so `capacity - 1` does not become `-1`: it wraps around to `SIZE_MAX`, a number `count` will never reach.
The test was false, the array was never allocated, and the store immediately below dereferenced `NULL`.

```C
if (db->count == db->capacity) {
```

The array is full exactly when `count == capacity`.
Say that, and the empty case takes care of itself: no special case, no arithmetic to get wrong.

**Where: GDB.**
The program dies on the first record, so GDB needs no setup at all:

```console
gdb ./db
(gdb) run < input.txt
```

```text
Program received signal SIGSEGV, Segmentation fault.
0x00005555555553bd in db_add (db=0x7fffffffd690, id=7, name=0x7fffffffd6b0 "grace") at main.c:88
88		db->records[db->count].id = id;
(gdb) backtrace
#0  0x00005555555553bd in db_add (db=0x7fffffffd690, id=7, name=0x7fffffffd6b0 "grace") at main.c:88
#1  0x00005555555556fa in main () at main.c:163
(gdb) print *db
$1 = {records = 0x0, count = 0, capacity = 0}
```

Three lines of GDB give the line, the call that got there, and the state: `records` is `NULL` and nothing has been allocated.
So the branch that grows the array was skipped, and the question becomes why.

**Why: a print.**
Put one line in front of the condition, showing the values it compares:

```C
fprintf(stderr, "db_add: count=%zu capacity=%zu capacity-1=%zu records=%p\n",
	db->count, db->capacity, db->capacity - 1, (void *)db->records);
```

```text
db_add: count=0 capacity=0 capacity-1=18446744073709551615 records=(nil)
```

`capacity - 1` is not `-1`.
That one number is the bug, and the print found it faster than any amount of reading would have.
GDB can evaluate the same expression, `print db->capacity - 1`, once you know which expression to ask about; the print is how you find out.

This is the shape of an **unsigned underflow**, and it is worth recognising on sight: any subtraction on a `size_t` that can reach zero is a candidate.
`count <= capacity - CHUNK` is the same bug wearing a different hat, and it appears in session 03's bonus exercise.

### FIX 2 — `main()`: a cached record pointer survived the array moving

With the first bug fixed the program runs to the end, and the last line is wrong:

```text
First record added: [1143873501]
```

The id is garbage and the name is empty, and the garbage differs from run to run.

The buggy version kept a pointer to the first record and read through it after the loop:

```C
struct record *first = NULL;
...
if (db.count == 1)
	first = &db.records[0];
```

`db_add()` grows the array through `db_grow()`, which allocates a bigger block, copies the records across and **frees the old block**: the same thing `realloc()` does, written out by hand.
The array therefore **moves**, and when it does, every pointer into the old block dangles, `first` included.

**Why: a print.**
There is no crash to stop at, so print the two addresses after every insertion:

```C
fprintf(stderr, "after add %zu: records=%p first=%p\n",
	db.count, (void *)db.records, (void *)first);
```

```text
after add 1: records=0x6124e23452b0 first=(nil)
after add 2: records=0x6124e23452b0 first=0x6124e23452b0
after add 3: records=0x6124e23452b0 first=0x6124e23452b0
after add 4: records=0x6124e23452b0 first=0x6124e23452b0
after add 5: records=0x6124e2345350 first=0x6124e23452b0
...
after add 9: records=0x6124e2345480 first=0x6124e23452b0
after add 10: records=0x6124e2345480 first=0x6124e23452b0
```

The array moves at the fifth and ninth record, when `CHUNK` runs out, and `first` keeps pointing at where the array *was*.
From the fifth record on it points into freed memory.

**Confirmed: Valgrind.**

```console
valgrind ./db < input.txt
```

```text
==1479337== Invalid read of size 4
==1479337==    at 0x109798: main (main.c:178)
==1479337==  Address 0x4aa2080 is 0 bytes inside a block of size 144 free'd
==1479337==    at 0x484D8BF: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==1479337==    by 0x109330: db_grow (main.c:68)
==1479337==    by 0x109386: db_add (main.c:84)
==1479337==    by 0x1096F5: main (main.c:163)
==1479337==  Block was alloc'd at
==1479337==    at 0x484A858: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==1479337==    by 0x1092D4: db_grow (main.c:62)
==1479337==    by 0x109386: db_add (main.c:84)
==1479337==    by 0x1096F5: main (main.c:163)
```

Three facts in one report: what was touched (line 178, the final `printf()`), where the block was released (`db_grow()`, line 68), and where it came from (`db_grow()`, line 62).
That triple is the standard shape of every use-after-free report Valgrind produces, and none of the three lines is the bug: the bug is the assignment that kept the pointer.

The fix copies the data out at the moment it is still valid:

```C
if (db.count == 1) {
	first_id = db.records[0].id;
	strncpy(first_name, db.records[0].name, NAME_LEN - 1);
	first_name[NAME_LEN - 1] = '\0';
	have_first = 1;
}
```

Remembering the **index** and re-reading `db.records[0]` after the loop works just as well, and is usually the better habit: an index survives any reallocation, a pointer does not.

### Confirming the result

```console
valgrind --leak-check=full ./db < input.txt
```

```text
==1477142== HEAP SUMMARY:
==1477142==     in use at exit: 0 bytes in 0 blocks
==1477142==   total heap usage: 6 allocs, 6 frees, 9,416 bytes allocated
==1477142==
==1477142== All heap blocks were freed -- no leaks are possible
==1477142==
==1477142== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

**"All heap blocks were freed"** plus **"0 errors from 0 contexts"** is the result to aim for in every program from now on.

Note the order in which the two bugs were fixed: the crash first, because it hid everything behind it, then the wrong answer, which was only visible once the program ran to completion.
Bugs queue up, and the queue is ordered by how loudly each one fails.

## References

* `man 1 gdb`, and the [GDB documentation on backtraces](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Backtrace.html)
* `man 1 valgrind`, and the [Valgrind quick start guide](https://valgrind.org/docs/manual/quick-start.html)
* `man 3 realloc` — in particular what happens to the old block

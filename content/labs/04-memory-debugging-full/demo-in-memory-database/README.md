# Demo: Debugging an In-Memory Database with GDB and Valgrind

**Tools:** GCC, Make, GDB, Valgrind

## Goal

Reference version of the demo database, with all three planted bugs removed.
The program is the growable in-memory database from session 03, and the point of the demo is not the database: it is the **procedure** for going from "it failed" to "here is the line", once for each of the three ways a memory bug can show itself.

## Background

The program reads `<id> <name>` pairs from standard input into a heap array that grows in chunks, prints the records, prints them again sorted by id, and finally reports which record was added first.

The version in [`04-memory-debugging-work/demo-in-memory-database`](../../04-memory-debugging-work/demo-in-memory-database) has three bugs in it, chosen so that no two fail the same way:

| Bug | Where | Symptom | Tool that finds it |
| --- | --- | --- | --- |
| 1 | `db_add()` | Segmentation fault, immediately | `gdb` |
| 2 | `main()` | Wrong record reported, no crash | `gdb`, confirmed by Valgrind |
| 3 | `db_print_sorted()` | Nothing at all | Valgrind |

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
Say that, and the empty case takes care of itself — no special case, no arithmetic to get wrong.

**How it was found.** The program dies on the first record, so `gdb` needs no setup at all:

```console
gdb ./db
(gdb) run < input.txt
(gdb) backtrace
(gdb) print *db
```

`print *db` in the `db_add` frame shows `records = 0x0`, `count = 0`, `capacity = 0`, which says the growth branch was skipped.
The question "why was it skipped?" leads straight to the condition.

This is the shape of an **unsigned underflow**, and it is worth recognising on sight: any subtraction on a `size_t` that can reach zero is a candidate.
`count <= capacity - CHUNK` is the same bug wearing a different hat, and it appears in session 03's bonus exercise.

### FIX 2 — `main()`: a cached record pointer survived the array moving

The buggy version kept a pointer to the first record and read through it after the loop:

```C
struct record *first = NULL;
...
if (db.count == 1)
	first = &db.records[0];
```

`db_add()` grows the array through `db_grow()`, which allocates a bigger block, copies the records across and **frees the old block** — the same thing `realloc()` does, written out by hand.
The array therefore **moves**, and when it does, every pointer into the old block dangles, `first` included.
The program then reads through it anyway and prints whatever those bytes happen to be:

```text
First record added: [-960466358]
```

The id is garbage and the name is empty.
A dangling read has no defined answer: this is simply what happened to be in that memory on one particular run.

The fix copies the data out at the moment it is still valid:

```C
if (db.count == 1) {
	first_id = db.records[0].id;
	strncpy(first_name, db.records[0].name, NAME_LEN - 1);
	first_name[NAME_LEN - 1] = '\0';
	have_first = 1;
}
```

Remembering the **index** and re-deriving `db.records[0]` after the loop works just as well, and is usually the better habit: an index survives any reallocation, a pointer does not.

**How it was found.** `gdb` gives you the mechanism — print `db.records` before and after a growth and watch the address change — and Valgrind gives you the timeline:

```text
Invalid read of size 4
   at 0x10978C: main (main.c:176)
 Address 0x4aa1080 is 0 bytes inside a block of size 144 free'd
   at 0x484D8BF: free
   by 0x109330: db_grow (main.c:68)
   by 0x109386: db_add (main.c:84)
   by 0x1096E9: main (main.c:161)
```

Three facts in one report: what was touched, where it was released, and who released it.
That triple is the standard shape of every use-after-free report Memcheck produces.

### FIX 3 — `db_print_sorted()`: the temporary sorted copy was never freed

The function allocates a private scratch array, sorts it, prints it, and returns:

```C
	/* FIX 3: the scratch copy belongs to this function, free it here. */
	free(sorted);
```

360 bytes definitely lost, and **nothing visible in the output**.
This is the class of bug `gdb` cannot help with: there is no crash to break on and no wrong value to print.

The rule is ordinary and worth saying anyway: whoever allocates a scratch buffer frees it on **every** exit path, error branches included.

### Confirming the result

```console
valgrind --leak-check=full ./db < input.txt
```

```text
==2741272== HEAP SUMMARY:
==2741272==     in use at exit: 0 bytes in 0 blocks
==2741272==   total heap usage: 6 allocs, 6 frees, 9,416 bytes allocated
==2741272==
==2741272== All heap blocks were freed -- no leaks are possible
==2741272==
==2741272== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

**"All heap blocks were freed"** plus **"0 errors from 0 contexts"** is the result to aim for in every assignment from now on.

Note the order in which the three bugs were fixed: the crash first, because it hid everything behind it; then the wrong answer; then the leak, which was only reachable once the program ran to completion.
Bugs queue up, and the queue is ordered by how loudly each one fails.

## References

* `man 1 gdb`, and the [GDB documentation](https://sourceware.org/gdb/current/onlinedocs/gdb.html/)
* `man 1 valgrind`, and the [Valgrind quick start guide](https://valgrind.org/docs/manual/quick-start.html)
* `man 3 realloc` — in particular what happens to the old block

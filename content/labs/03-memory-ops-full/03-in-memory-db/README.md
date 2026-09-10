# Exercise: A Growable In-Memory Database

**Tools:** GCC, Make, Valgrind

## Goal

Reference implementation of the growable in-memory database.
A tiny database living entirely on the heap: records are read from standard input into a dynamically allocated array that **grows in chunks of `CHUNK` records** whenever it fills up, and is printed back out at the end.

## Background

```C
struct record {
	int id;
	char name[NAME_LEN];   /* NAME_LEN == 32 */
};

struct database {
	struct record *records;   /* heap array of `capacity` records */
	size_t count;             /* records currently in use         */
	size_t capacity;          /* records the array can hold       */
};
```

The invariant is `count <= capacity`, and it holds at every point.

`count` is what the user put in; `capacity` is what was paid for.
Conflating the two is the classic bug in every dynamic array ever written, which is why they are separate fields here rather than one counter and a resize call.

Files:

* `main.c` — the completed implementation.
* `input.txt` — ten sample records to feed on standard input.

## Build & Run

```console
make
./db < input.txt
```

```text
Database holds 10 record(s) (capacity 12):
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
```

## Results and Explanations

### The three functions

**`db_init()`** starts empty: `records = NULL`, `count = 0`, `capacity = 0`.
Nothing is allocated until the first record arrives.

**`db_add()`** grows with `realloc` when `count == capacity`, then stores the record at index `count` and increments it.

Because `realloc(NULL, size)` behaves exactly like `malloc(size)`, the same "grow when full" branch handles the very first allocation too — there is no special case for the empty database, and no separate `malloc` call anywhere in the program.

**`db_free()`** releases the array and resets the fields.
Setting `records = NULL` after the `free` is not required by the language, but it turns a use-after-free into a null-pointer dereference, which fails loudly rather than silently.

### The `realloc` idiom

The result must go into a temporary first:

```C
struct record *tmp;

tmp = realloc(db->records, new_capacity * sizeof(*tmp));
if (tmp == NULL)
	return -1;
db->records = tmp;
```

Writing `db->records = realloc(db->records, ...)` looks tidier and is a latent bug: if the allocation fails, `realloc` returns `NULL` **and leaves the original block untouched**.
Assigning `NULL` over the only surviving pointer to that block leaks it and loses every record already stored.

Note also `sizeof(*tmp)` rather than `sizeof(struct record)`.
It cannot go out of sync with the declaration if the type ever changes.

### Growth behaviour

Ten records needed three reallocations: the capacity went `0 -> 4 -> 8 -> 12`, growing on the arrival of the 1st, 5th and 9th records.
Feed it fewer and the final capacity rounds up to the next multiple of `CHUNK`.

Growing by a constant chunk means the number of reallocations is linear in the number of records, so adding *n* records costs O(n²) copying overall.
Doubling the capacity instead would make it amortised O(1) per insertion, which is what `std::vector` and every production dynamic array actually do.
The constant chunk is used here because it makes the capacity trivial to predict by hand — the point is the mechanism, not the asymptotics.

### Checking for leaks

```console
valgrind --leak-check=full ./db < input.txt
```

```text
    in use at exit: 0 bytes in 0 blocks
All heap blocks were freed -- no leaks are possible
ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

An empty input (`./db < /dev/null`) must also be clean: `db_free()` is called with `records == NULL`, and `free(NULL)` is explicitly defined to do nothing.

## References

* `man 3 malloc`, `man 3 realloc`, `man 3 free`
* `man 1 valgrind`, [Valgrind quick start](https://valgrind.org/docs/manual/quick-start.html)

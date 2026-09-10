# Bonus: A Shrinking In-Memory Database

**Tools:** GCC, Make, Valgrind

## Goal

Reference implementation of the shrinking database bonus: the array from `03-in-memory-db` extended so it can also **remove records** and **give memory back**.

## Background

* **grow** when `count == capacity` (the array is full) → `capacity + N`
* **shrink** when `count <= capacity - N` (a whole chunk is now unused) → `capacity - N`

with `N == CHUNK == 4`.

Growing at one threshold and shrinking at a different one is **hysteresis**, and it is the entire design idea.
Without the gap, a workload that sits on a chunk boundary would reallocate on every single add and remove.

Records stay **contiguous** at the front of the array, indices `0` to `count - 1`, with no holes, so removing from the middle means closing the gap first.

Files:

* `main.c` — the completed implementation, with the `add` / `del` command loop.
* `input.txt` — sample commands to feed on standard input.

## Build & Run

```console
make
./db < input.txt
```

`input.txt` adds six records, deletes three, adds one, then deletes one:

```text
add 1 alice
add 2 bob
add 3 carol
add 4 dave
add 5 erin
add 6 frank
del 6
del 5
del 4
add 7 grace
del 2
```

```text
Database holds 3 record(s) (capacity 4):
  [1] alice
  [3] carol
  [7] grace
```

Tracing the capacity: it grows `0 -> 4 -> 8` while the six records are added, stays at 8 through the first two deletions, shrinks to 4 when `count` reaches 4, and stays at 4 for the remainder.

## Results and Explanations

### `db_remove()`

```C
for (i = 0; i < db->count; i++)
	if (db->records[i].id == id)
		break;

if (i == db->count)
	return -1;		/* not found */

for (size_t j = i; j + 1 < db->count; j++)
	db->records[j] = db->records[j + 1];
db->count--;
```

This implementation uses **shift down**, which preserves insertion order — visible in the output above, where `alice`, `carol` and `grace` come out in the order they were added.
The alternative, copying the last record into the freed slot, is O(1) instead of O(n) but scrambles the order.
Either is acceptable; a student who chose the other one will get a different, equally correct ordering.

The "not found" case returns `-1` and changes nothing.
Deleting a nonexistent id must be harmless.

### The shrink logic

```C
if (db->capacity >= CHUNK && db->count <= db->capacity - CHUNK) {
	size_t new_capacity = db->capacity - CHUNK;
	...
}
```

The `db->capacity >= CHUNK` guard is doing real work.
`capacity` is a `size_t`, so if it were 0 the expression `db->capacity - CHUNK` would wrap around to a huge positive number and the condition would be true — followed by a `realloc` of about 18 exabytes.
This is the kind of unsigned-underflow bug that reads as obviously correct.

### Two edge cases

**New capacity of zero:**

```C
if (new_capacity == 0) {
	free(db->records);
	db->records = NULL;
	db->capacity = 0;
}
```

`realloc(ptr, 0)` is a trap.
C99 and C11 permitted it to either free the block and return `NULL`, or return a unique pointer that must itself be freed — so the caller could not tell whether it still owned anything.
C23 made it undefined behaviour outright.
Handling zero explicitly is the only portable option.

**A failing shrink:**

```C
tmp = realloc(db->records, new_capacity * sizeof(*tmp));
if (tmp != NULL) {
	db->records = tmp;
	db->capacity = new_capacity;
}
```

If the shrink fails, the old larger buffer is still valid and still holds the data, so the code simply keeps it and moves on.
This is the opposite of the growing case, where a failure has to be reported: here the operation was an optimisation, and being refused is a non-event.
Treating it as fatal would turn nothing into a crash.

### Checking for leaks

```console
valgrind --leak-check=full ./db < input.txt
```

```text
    in use at exit: 0 bytes in 0 blocks
All heap blocks were freed -- no leaks are possible
ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

Worth also running a sequence that deletes every record, so the `new_capacity == 0` branch is exercised and `db_free()` runs against a `NULL` array.

## References

* `man 3 realloc` — note the wording on zero size
* [C23 `realloc`](https://en.cppreference.com/w/c/memory/realloc) — the zero-size case
* `man 1 valgrind`

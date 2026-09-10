# Instructor Notes: A Shrinking In-Memory Database

## Purpose

The mirror image of the core exercise, and harder than it looks.
Students must copy their own working `main.c` across first, so a broken `03-in-memory-db` blocks this entirely.

## Expected behaviour

With the shipped `input.txt` (six adds, three deletes, one add, one delete):

```text
Database holds 3 record(s) (capacity 4):
  [1] alice
  [3] carol
  [7] grace
```

Capacity trace: `0 -> 4 -> 8` while adding, holds at 8 for two deletions, drops to 4 when `count` reaches 4.

The reference solution uses **shift down**, so order is preserved.
A student who chose **swap with last** will get the same three records in a different order.
That is correct — do not mark it wrong. Ask them to justify it instead.

## The three traps

1. **Unsigned underflow.**

   ```C
   if (db->count <= db->capacity - CHUNK)   /* WRONG without a guard */
   ```

   `capacity` is `size_t`. When it is 0, `capacity - CHUNK` wraps to a huge value, the condition is true, and the code tries to `realloc` roughly 18 exabytes.
   The guard `db->capacity >= CHUNK` is what prevents it.
   This reads as obviously correct and is the best bug in the session — worth letting them hit it.

1. **`realloc(ptr, 0)`.**
   C99/C11 allowed it either to free and return `NULL`, or to return a unique pointer the caller must free — so the caller could not tell what it owned.
   C23 made it undefined outright.
   The zero case must be handled explicitly with `free()`.

1. **Treating a failed shrink as fatal.**
   If a shrinking `realloc` returns `NULL`, the old larger buffer is still valid and still holds the data.
   The correct response is to keep it and carry on.
   This is the opposite of the growing case, and students who have just learned "always check `realloc`" often over-apply it.

## Points to hammer

* **Hysteresis is the design.**
  Grow at one threshold, shrink at a different one.
  Without the gap, a workload sitting on a boundary reallocates on every operation.
  The same reasoning appears in cache eviction, TCP windows and thermostats — worth naming, because students meet it repeatedly later.
* **Contiguity is a choice with a cost.**
  Packed records make iteration fast and indices meaningful, and make deletion O(n).

## Verification to insist on

* Delete an id that is not present — must be harmless.
* Delete everything — exercises the `new_capacity == 0` branch and leaves `db_free()` facing a `NULL` array.
* Alternate across a chunk boundary (`add 5, del 1, add 1, del 1, ...`) and confirm the capacity does not oscillate on every operation.
  If it does, the shrink condition is wrong.
* Valgrind clean after both growing and shrinking.

## Practical notes

* Same Valgrind caveat as the core exercise: on machines with a very high open-file limit it fails to start with "Private file creation failed".
  `ulimit -n 1024` first.
* The exercise asks students to write the `add`/`del` command loop themselves; `<string.h>` for `strcmp` is the usual missing include.

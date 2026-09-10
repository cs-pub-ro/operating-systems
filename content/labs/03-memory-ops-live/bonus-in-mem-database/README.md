# Bonus: A Shrinking In-Memory Database

**Tools:** GCC, Make, Valgrind

## Goal

Extend the database so it can remove records and **give memory back**, keeping the array contiguous and the invariants intact.

## Background

This builds directly on [`03-in-memory-db`](../03-in-memory-db).
Start from **your finished `main.c`** of that task and copy it here.
It assumes you already have working `db_init`, `db_add`, `db_print` and `db_free`, and that the array grows in chunks of `CHUNK` records — call it `N` from here on.

In the first task the capacity only ever went **up**, always a multiple of `N`.
Now we make it symmetric: when records are removed and everything fits inside one chunk less than the array currently owns, it shrinks back down.

* **grow** when `count == capacity` (the array is full) → `capacity + N`
* **shrink** when `count <= capacity - N` (a whole chunk is now unused) → `capacity - N`

```text
N = 4

capacity 8, count 5:  del one -> count 4 -> 4 <= 4  -> shrink to capacity 4
capacity 4, count 4:  del one -> count 3 -> 3 <= 0? no -> stay at 4
capacity 4, count 1:  del one -> count 0 -> 0 <= 0  -> shrink to capacity 0 (free)
```

Growing by `N` but only shrinking once a *full* chunk is free avoids thrashing — reallocating on every single add and remove around a boundary.

Records must stay **contiguous** at the front of the array, indices `0` to `count - 1`, with no holes.
Removing from the middle therefore means closing the gap first.
Two reasonable ways: shift everything after the removed record down one slot (keeps order), or copy the last record into the freed slot (cheaper, does not keep order).
Either is fine; pick one and be consistent.

## Your Task

1. **`db_remove(struct database *db, int id)`**
   * Find the record whose `id` matches; a linear scan is fine.
   * If none matches, do nothing and report it (return `-1`, say).
   * Otherwise rearrange so the remaining records stay contiguous, and decrement `count`.

1. **Shrink logic**, inside `db_remove` after `count` has been decreased.
   * If `capacity >= N` and `count <= capacity - N`, `realloc` down to `capacity - N`.
   * Handle the case where the new capacity would be `0` separately — look up what `realloc(ptr, 0)` is actually specified to do before deciding how.
   * Keep `count <= capacity` true at every step.
   * A shrinking `realloc` almost always succeeds, but the standard still permits it to fail.
     Think about what you should do if it does; the old buffer is still perfectly good.

1. **Drive it from stdin.**
   Replace the input loop in `main` so each line is a command:

   ```text
   add <id> <name>     add a record
   del <id>            remove a record by id
   ```

   Read until end-of-file, then `db_print` and `db_free` as before.
   You will want `<string.h>` for `strcmp`.

## Build & Run

```console
make
printf 'add 1 alice\nadd 2 bob\nadd 3 carol\nadd 4 dave\nadd 5 erin\ndel 5\ndel 4\n' | ./db
```

## Check Your Work

* Work out from the grow/shrink rules what the final capacity should be for the command sequence above, then check the program agrees.
  If you chose *swap with last*, the order of the remaining records may differ from the order they were added — that is expected, and worth being able to justify.
* Deleting an id that is not present must be harmless.
* Delete everything.
  The database should end up empty, and `db_free()` must still be safe to call afterwards.
* Run under Valgrind:

  ```console
  valgrind --leak-check=full ./db < input.txt
  ```

  No errors and no leaked blocks, **both** after growing and after shrinking.
* Hammer a chunk boundary: `add 5, del 1, add 1, del 1, ...` repeatedly.
  The capacity must follow the rules each time and never oscillate on every single operation.
  If it does, re-read the shrink condition.

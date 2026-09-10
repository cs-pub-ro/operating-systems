# Instructor Notes: A Growable In-Memory Database

## Purpose

The core exercise of the session.
Three short functions, but they contain the two mistakes that define manual memory management: losing a pointer on a failed `realloc`, and forgetting to free on some path.

## Expected answers

* `db_init()` — three assignments.
* `db_add()` — grow by `CHUNK` when `count == capacity`, store, increment.
* `db_free()` — `free` and reset.

Capacity for the shipped `input.txt` (10 records) is **12**, having gone `0 -> 4 -> 8 -> 12`.

## The mistake to look for

```C
db->records = realloc(db->records, new_capacity * sizeof(*db->records));
```

This is the line most students write, and it is wrong.
On failure `realloc` returns `NULL` **and leaves the original block allocated**.
Assigning over the only pointer to it leaks the block and destroys every record already stored.

The exercise README hints at this without stating it ("work out what it is before you write the line").
If a student writes it anyway, do not just correct it — ask them what `realloc` returns on failure and what happened to the old block.

The correct idiom uses a temporary, and `sizeof(*tmp)` rather than the type name so it cannot drift.

## Other things students get wrong

* **Growing before checking**, i.e. reallocating on every add rather than only when full.
  Works, passes Valgrind, and is O(n) reallocations. Catch it by asking them to print the capacity.
* **`count` and `capacity` conflated** — usually shows up as a capacity that equals the record count.
* **Forgetting `free(NULL)` is legal**, and adding a defensive `if (db->records)` around it.
  Harmless but worth mentioning: `free(NULL)` is explicitly defined to do nothing.
* **Off-by-one in the store**, writing at `count + 1` or failing to increment.

## Discussion worth having

Growing by a constant chunk gives a linear number of reallocations, so adding *n* records is O(n²) copying overall.
Doubling would be amortised O(1), and that is what `std::vector` and every production dynamic array do.
The constant chunk is here because it makes the capacity predictable by hand.

If a group is quick, have them switch to doubling and count the `realloc` calls both ways for 100 000 records.

## Practical notes

* **Valgrind may fail to start on machines with a very high open-file limit** (common in containers):

  ```text
  Valgrind: FATAL: Private file creation failed.
  The current file descriptor limit is 1073741804.
  ```

  Fix with `ulimit -n 1024` in the shell before running.
  Check this on the lab image beforehand — it is confusing and has nothing to do with the student's code.
* Insist on the empty-input case: `./db < /dev/null` must not crash.
  It is the case nobody tests and the one where a missing `NULL` guard shows up.
* A clean Valgrind run on the happy path proves little; the error paths were never taken.
  Say so.

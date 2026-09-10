# Going Further: A Shrinking In-Memory Database

Optional.

## Things to try

1. **Measure the thrashing you avoided.**
   Change the shrink rule to "shrink whenever `count < capacity`" and count `realloc` calls while alternating add and delete across a chunk boundary.
   Compare with the hysteresis rule you implemented.
1. **Compare the two rearrangement strategies.**
   Implement both *shift down* and *swap with last*, then delete the first record of a 100 000-record database with each.
   Time them.
   When would you still prefer the slower one?
1. **Make deletion by id fast.**
   The linear scan is O(n) per delete.
   Keep the array sorted by id and use binary search, or add a hash index.
   What does each cost you on `db_add`?
1. **Tombstones.**
   Instead of moving records, mark deleted slots and compact only when a threshold of dead entries is reached.
   This is how many real databases work.
   What does it do to `db_print`?
1. Add a `find <id>` command and make sure it never returns a pointer that a later `add` could invalidate.

## Questions to answer

* What is `realloc(ptr, 0)` specified to do?
  Why is it a bad idea to rely on it?
* Why shrink by a whole chunk rather than as soon as a single slot frees up?
* A shrinking `realloc` fails and returns `NULL`.
  Why is simply skipping the shrink the correct response, and what would happen if you treated it as a fatal error?
* After *swap with last*, in what order do records come out of `db_print`?
  Is that acceptable? Who decides?

## Discussion points

* **Hysteresis is the whole idea.**
  Grow at one threshold, shrink at a different one.
  Without the gap you get an operation that reallocates on every call once you sit on a boundary — the same reasoning appears in cache eviction, TCP window sizing, and thermostats.
* **`realloc(ptr, 0)` is a trap.**
  C99 and C11 allowed it to either free and return `NULL`, or return a unique allocatable pointer.
  C23 made it undefined outright.
  Handling zero explicitly is the only portable option.
* **A failing shrink is not an error.**
  You asked for less memory and were refused; the larger block you already hold is still perfectly usable.
  Treating it as fatal would turn a non-event into a crash.
* **Contiguity is a design choice with consequences.**
  Keeping records packed makes iteration fast and indices meaningful, but makes deletion O(n).
  Every real data structure trades these against each other.

## References

* `man 3 realloc` — note the wording about zero size
* `man 1 valgrind`
* [C23 changes to `realloc`](https://en.cppreference.com/w/c/memory/realloc) — the zero-size case

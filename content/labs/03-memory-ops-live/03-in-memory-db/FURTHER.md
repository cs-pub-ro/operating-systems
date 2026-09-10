# Going Further: A Growable In-Memory Database

Optional.

## Things to try

1. **Break `realloc` on purpose.**
   Write `db->records = realloc(db->records, ...)` and then make the allocation fail (ask for an absurd capacity).
   What happened to the records you already had?
   This is the reason the two-step idiom with a temporary pointer exists.
1. **Change the growth strategy.**
   Replace "grow by `CHUNK`" with "double the capacity".
   Add 100 000 records both ways and count the `realloc` calls in each.
   Which strategy does the C++ `std::vector` use, and why?
1. **Watch `realloc` move the block.**
   Print `db->records` before and after each growth.
   Sometimes the address stays the same, sometimes it changes.
   What does that tell you about any pointer you might have kept into the array?
1. **Store variable-length names.**
   Replace `char name[32]` with a `char *` and allocate each name separately.
   `db_free()` now has to free every name as well as the array — and Valgrind will tell you the moment you forget one.
1. Run with `valgrind --tool=massif ./db < input.txt` and look at the heap profile.
   The chunked growth should be visible as a staircase.

## Questions to answer

* Why does `realloc(NULL, size)` behave like `malloc(size)`?
  What does that buy you in `db_add()`?
* Why must the return value of `realloc` go into a temporary variable first?
* What is the largest number of records this program can hold before something goes wrong, and what goes wrong first?
* `db_free()` sets `records = NULL` after freeing.
  Why bother, given the structure is about to go out of scope?

## Discussion points

* **`count` and `capacity` are different things**, and conflating them is the classic bug in every dynamic array ever written.
  `count` is what the user put in; `capacity` is what you paid for.
* **Growing by a constant chunk is O(n²) in the number of reallocations** for large n, while doubling is amortised O(1).
  The chunk strategy is used here because it makes the capacity easy to predict by hand, not because it is the best choice.
* **`realloc` may move the block.**
  Any pointer into the old array is dangling afterwards.
  This is why storing indices is often safer than storing pointers.
* **Freeing on every path** is the habit this session is trying to build.
  Valgrind is not a formality here; it is the only way to be sure.

## References

* `man 3 malloc`, `man 3 realloc`, `man 3 free`
* `man 1 valgrind`, and the [Valgrind quick start guide](https://valgrind.org/docs/manual/quick-start.html)

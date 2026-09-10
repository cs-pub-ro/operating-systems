# Going Further: Sort Products by Price

## Things to try

1. **Prove the leak.**
   Delete the final `free_products` call, rebuild, and run under `valgrind --leak-check=full`.
   You will see "32 blocks definitely lost" — one per name.
   Put it back and watch the count balance again.
1. **Make the array dynamic too.**
   Read the product count from the first line of the file, then `malloc` the `struct product` array to that size instead of fixing it at `MAX_PRODUCTS`.
   Now *two* things are sized at run time. This is the direct bridge to `03-in-memory-db`, where even the count is unknown until the input ends.
1. **Store the name inline instead.**
   Replace `char *name` with `char name[64]` and drop the `malloc`/`free` entirely.
   What breaks for a 70-character name? What is wasted for a 5-character one? This is the trade-off the heap version exists to avoid.
1. **Break the comparator.**
   Change `by_price` to `return pa->price - pb->price;`.
   Find two prices where the `unsigned` subtraction wraps and the sort puts them in the wrong order.
1. **Sort by name** as a secondary key when prices are equal, using `strcmp` on the `name` pointers.
1. **Handle a malformed file** — an odd number of lines, or a price line that is not a number. What does `strtoul` return, and does the program stay leak-free on that path?

## Questions to answer

* Why is the `products` array not on the heap, when the names are?
* Why `malloc(strlen(name) + 1)` and not `malloc(strlen(name))`? What exactly does the extra byte hold?
* `name_buf` already holds the name — why copy it into a fresh allocation at all, instead of storing `&name_buf[0]` in the struct?
* The error path frees `count` names, not `MAX_PRODUCTS`. Why is that the right number?
* After `qsort`, were any strings moved, copied, or freed? What moved?

## Discussion points

* **Dynamic allocation is for the size you do not know.**
  The count is fixed, so the array is static; the name length is not, so the name is heap-allocated. Each quantity uses the tool that fits it.
* **A C string needs its terminator.**
  `+ 1` for the `'\0'` is the same off-by-one that appears everywhere strings are copied, and getting it wrong is a one-byte heap overflow (the exact bug the session-04 JSON parser has).
* **Ownership travels with the pointer.**
  The struct owns its name; whoever owns a `malloc`'d block is responsible for one `free`, on every path out.
* **A comparator compares, it does not subtract.**
  Subtracting unsigned values wraps; subtracting `int`s can overflow. The safe comparator is two comparisons and a return.
* **Sorting pointers is cheap.**
  `qsort` shuffles 16-byte structs, not strings; the heap blocks never move.

## References

* `man 3 malloc`, `man 3 free`, `man 3 realloc`
* `man 3 qsort`
* `man 3 fgets`, `man 3 strcspn`, `man 3 strtoul`

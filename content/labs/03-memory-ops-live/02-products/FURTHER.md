# Going Further: Sort Products by Price

Optional.

## Things to try

1. **See the leak.**
   Remove your `free` loop, rebuild, and run `valgrind --leak-check=full`.
   Read "definitely lost" — one block per name — then restore the loop.
1. **Make the array dynamic too.**
   Put the product count on the first line of the file, then `malloc` the array to that size instead of fixing it.
   Now two things are sized at run time — the step just before a fully growable structure.
1. **Store the name inline** as `char name[64]` and drop the `malloc`/`free`.
   What breaks for a long name? What is wasted for a short one?
1. **Break the comparator** to `return pa->price - pb->price;` and find two prices where the unsigned subtraction wraps.

## Questions to answer

* Why is the `products` array not on the heap, when the names are?
* Why `malloc(strlen(name) + 1)` and not `malloc(strlen(name))`?
* Why copy the name at all, instead of storing the address of the read buffer in the struct?
* If a `malloc` fails halfway through, how many names need freeing — and how does the code know?
* After sorting, were any strings moved, copied, or freed?

## Discussion points

* **Dynamic allocation is for the size you do not know.**
  Fixed count, static array; unknown name length, heap allocation. Each size gets the tool that fits.
* **A C string needs its terminator**, which is what the `+ 1` is for. Leaving it off is a one-byte heap overflow.
* **Ownership travels with the pointer.**
  The struct owns its name, and an owner frees exactly once, on every path out.
* **A comparator compares; it does not subtract.**
  Subtracting unsigned prices wraps around.

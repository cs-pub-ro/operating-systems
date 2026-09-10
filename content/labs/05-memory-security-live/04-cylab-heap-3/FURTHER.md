# Going Further: Use-After-Free (heap-3)

Optional.

## Things to try

1. In `gdb`, print `x` before and after *Free x*, then after *Allocate object*.
   Watch the freed pointer and the new allocation resolve to the same address.
1. Allocate a chunk of a clearly different size class after the free, and confirm the reclaim does *not* happen.
   What is glibc's tcache doing differently?
1. Read `x->flag` (option 3) after freeing but before reallocating.
   What do you see, and why is reading freed memory already undefined behaviour?

## Questions to answer

* Why does the allocator return the just-freed chunk for the next same-size request?
* What is the size you must request, and where does it come from in the struct?
* The bug is not an overflow. What single missing line in `free_memory()` would have prevented it?

## Discussion points

* **A dangling pointer is a write primitive** once the allocator recycles the chunk underneath it.
* **`free()` does not clear the pointer**; clearing it (`x = NULL`) is the fix, and `free(NULL)` is safe.
* **tcache is a performance feature** whose LIFO reuse is exactly what makes UAF exploitable.

## References

* `man 3 free`
* [glibc tcache overview](https://sourceware.org/glibc/wiki/MallocInternals)

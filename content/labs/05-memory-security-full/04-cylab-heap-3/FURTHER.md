# Going Further: Use-After-Free (heap-3)

## Things to try

1. In `gdb`, print `x` before the free, after the free, and after the re-allocation; watch the freed pointer and the new chunk resolve to the same address.
1. Allocate a clearly different size after the free and confirm the reclaim does *not* happen — the tcache bin is per-size.
1. Read `x->flag` after the free but before reallocating: already undefined behaviour, even though it often still "works".

## Questions to answer

* **Why does the allocator return the just-freed chunk?**
  glibc's tcache is a per-size-class LIFO free list; a `free()` pushes the chunk onto its bin, and the next `malloc()` of that size pops the same chunk straight back.
* **What size must you request, and where does it come from?**
  `sizeof(struct object)` = `10 + 10 + 10 + 5` = 35 bytes, which shares a tcache bin with the freed object.
* **What single line would have prevented the bug?**
  `x = NULL;` after `free(x)` in `free_memory()`. Then every later dereference is a NULL crash instead of a silent use-after-free, and `free(NULL)` is harmless.

## Discussion points

* **A dangling pointer becomes a write primitive** once the allocator recycles the chunk beneath it.
* **`free()` does not clear the pointer** — the caller must.
* **tcache's speed is exactly what makes UAF exploitable**: predictable, immediate reuse.

## References

* `man 3 free`
* [glibc malloc internals (tcache)](https://sourceware.org/glibc/wiki/MallocInternals)

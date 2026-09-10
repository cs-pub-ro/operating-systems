# Exercise: Use-After-Free (heap-3)

**Tools:** GDB, pwntools, Docker

## Goal

Reference solution for heap-3.
There is no overflow here — the write primitive comes from a freed pointer the program keeps using, plus an allocator that hands the same memory straight back.

## Background

The global object and its win condition:

```c
struct object {
        char a[10];
        char b[10];
        char c[10];
        char flag[5];
};

static struct object *x;
```

`check_win()` prints the flag as soon as `x->flag` reads `"pico"`; it starts as `"bico"`.
The filler fields `a`/`b`/`c` exist only to push `flag` away from the start of the struct, so the write has to respect the layout.

## The bug

`free_memory()` frees `x` but never clears it:

```c
static void free_memory(void) { free(x); }   /* x is never set to NULL */
```

Every other operation keeps dereferencing `x` — a textbook use-after-free.
`alloc_object()` then lets the player allocate a chunk of a chosen size and write a chosen string into it.
The returned pointer is discarded, but if the request lands in the same tcache bin as the just-freed object, glibc returns the identical chunk `x` still points to — so the write goes through `x`.

## The exploit

1. **Free `x`** (menu option 5). The chunk becomes the head of its tcache bin, and `x` dangles.
1. **Allocate a same-sized object.** `sizeof(struct object)` is `10 + 10 + 10 + 5 = 35` bytes; the tcache returns the old chunk. Write `a[10] + b[10] + c[10] + "pico"` so `"pico"` lands exactly on `flag`:

   ```python
   OBJECT_SIZE = 35
   PAYLOAD = b"A" * 10 + b"B" * 10 + b"C" * 10 + b"pico"
   ```

1. **Check the win condition.** `x->flag` now reads `"pico"`, because `x` and the "new" allocation are the same memory.

See `solve/exploit.py`.

## Build, run and solve

Docker is the only requirement.
Four-stage pipeline — `build/` (`-no-pie`) → `publish/` → `deploy/` (port `31013`) → `solve/`.
Shipping the exact glibc matters here: tcache reuse is an allocator implementation detail, so the matching `libc.so.6` travels with the binary.
The `flag` here is copied into the container as `flag.txt` at deploy time.

## References

* `man 3 free` — and note that clearing the pointer (`x = NULL`) is the fix; `free(NULL)` is safe
* [glibc malloc internals (tcache)](https://sourceware.org/glibc/wiki/MallocInternals)
* Original challenge: <https://learn.cylabacademy.org/library/440>

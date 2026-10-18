# Demo: Copy a File Using an `mmap` Buffer

**Tools:** GCC, Make, strace

## Goal

Copy a file through a buffer obtained from the kernel directly, with `mmap()`, skipping the allocator -- and see what that buys and what it costs compared with `malloc()`.

## Background

```C
void *mmap(void *addr, size_t length, int prot, int flags, int fd, off_t offset);
int munmap(void *addr, size_t length);
```

`mmap()` creates a new area in the process address space.
Usually that area is a view of a file; with `MAP_ANONYMOUS` there is no file at all, and the area is plain zero-filled memory:

| Parameter | For an anonymous buffer |
| --- | --- |
| `addr` | `NULL`: the kernel chooses the address. |
| `length` | the size wanted; the kernel rounds it up to whole pages. |
| `prot` | `PROT_READ \| PROT_WRITE`: the program reads and writes it. |
| `flags` | `MAP_PRIVATE \| MAP_ANONYMOUS`: this process only, no file. |
| `fd` | `-1`: there is no file. |
| `offset` | `0`. |

Returns the start of the area, or `MAP_FAILED` on error -- which is `(void *) -1`, **not** `NULL`.
`munmap()` removes the area; the memory is given back to the kernel at once.

This is what `malloc()` itself does for large requests (lecture 03: above 128 KB it stops using the heap and maps a fresh area per block).
Calling it yourself takes the allocator out of the picture: no heap bookkeeping, no reuse of old blocks, pages that are guaranteed zero and cost nothing until touched, and a release that reaches the kernel immediately.
The price is granularity -- the smallest area is a page, so it is no way to get 40 bytes -- and a system call for every allocation and every release.

## Build & Run

```console
make
dd if=/dev/urandom of=input.bin bs=1M count=4
./copy_file input.bin output.bin
diff input.bin output.bin && echo "Files are identical"
strace -e trace=brk,mmap,munmap ./copy_file input.bin output.bin
make clean
```

## Results and Explanations

### Step 1 -- map the buffer

```C
buffer = mmap(NULL, BUFFER_SIZE, PROT_READ | PROT_WRITE,
	      MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
if (buffer == MAP_FAILED) {
	perror("mmap");
	goto fail;
}
```

The check is against `MAP_FAILED`.
Testing for `NULL` compiles, runs, and silently accepts a failed mapping; the first use of the buffer then faults.

### Unmap on every exit

```C
fail_buffer:
	munmap(buffer, BUFFER_SIZE);
```

The same bookkeeping as the `malloc` variant, with a different function name and a second argument: `munmap()` needs the length, because the kernel does not keep a size per allocation the way the allocator does.
The label sits where `free(buffer)` sat, and the same `goto`s reach it.

### Step 2 -- the write

Unchanged: the short-write path jumps to `fail_dst` and falls through to the unmapping.

### Step 3 -- unmap on success

```C
munmap(buffer, BUFFER_SIZE);
```

The path everyone remembers, same as `free()` in the other variant.

### What the kernel saw

```text
$ strace -e trace=brk,mmap,munmap ./copy_file input.bin output.bin
...
mmap(NULL, 1048576, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f1c6a8c1000
...
munmap(0x7f1c6a8c1000, 1048576)         = 0
Copied 'input.bin' -> 'output.bin'
```

Run the `malloc` variant under the same `strace`, and the two traces have the same shape: one `mmap()` and one `munmap()`.
The `malloc` one asks for 1,052,672 bytes, the megabyte plus the allocator's header rounded up to pages; this one asks for exactly 1,048,576.
For a block this size, `malloc()` and `free()` were a thin wrapper around exactly these calls.
The difference is what happens for smaller blocks, and who decides: with `malloc()` the allocator chooses between the heap and a mapping; with `mmap()` the program has chosen.

### Comparing the four variants

| | Where the buffer lives | Sized at | Created by | Released by |
| --- | --- | --- | --- | --- |
| global | BSS | compile time | the loader, before `main()` | nobody; process exit |
| local | the stack | compile time | entering `main()` | returning from `main()` |
| `malloc` | the heap, or a mapping the allocator makes | run time | `malloc()` | `free()`, on every path |
| `mmap` | a mapping | run time | `mmap()` | `munmap()`, on every path |

Two of the four cost nothing to manage and cannot change size; two can be any size the program finds out at run time and have to be given back by hand.
The copy loop never noticed.

## References

* `man 2 mmap`, `man 2 munmap`
* `man 3 mallopt` -- `M_MMAP_THRESHOLD`, the size above which `malloc()` turns into `mmap()`
* `man 5 proc` -- `/proc/<pid>/maps` lists the areas of a running process, the anonymous buffer among them

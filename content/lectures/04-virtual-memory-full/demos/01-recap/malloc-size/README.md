# Demo: `malloc()` Under `strace`

The same 4 MB, once as a single `malloc()` and once as 1024 small ones, with `strace` counting what reaches the kernel.

## Goal

Recall that `malloc()` is a library function with an allocator behind it, and that the allocator reaches the kernel in two ways: `brk()` to extend the heap, `mmap()` for a block of its own.

## Background

`malloc_size_entire.c` takes a number of pages and calls `malloc()` once for all of them.
`malloc_size_pages.c` takes the same number and calls `malloc()` once per page.
Both pause before allocating, before freeing and before exiting, so they can also be watched with `pmap`; under `strace` the pauses are just Enter presses.

## Build and run

```console
make
strace -e trace=brk,mmap,munmap ./malloc_size_entire 1024
strace -c -e trace=brk,mmap,munmap ./malloc_size_pages 1024
```

## Results and explanations

### One `malloc()` of 4 MB

```text
$ strace -e trace=brk,mmap,munmap ./malloc_size_entire 1024
...
brk(NULL)                               = 0x60f1403e8000
brk(0x60f140409000)                     = 0x60f140409000
mmap(NULL, 4198400, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f29b7fff000
munmap(0x7f29b7fff000, 4198400)         = 0
+++ exited with 0 +++
```

The two `brk()` calls create a small heap for the allocator's own use.
The `malloc()` itself is the `mmap()`: 4,198,400 bytes, the 4 MB plus one page for the header, in an area of its own; the `free()` is the `munmap()`.
Above `M_MMAP_THRESHOLD` (128 KB by default) this is what every request becomes.

### 1024 `malloc()`s of 4 KB

```text
$ strace -c -e trace=brk,mmap,munmap ./malloc_size_pages 1024
% time     seconds  usecs/call     calls    errors syscall
------ ----------- ----------- --------- --------- ----------------
100.00    0.000093           2        35           brk
  0.00    0.000000           0         8           mmap
  0.00    0.000000           0         1           munmap
```

Thirty-five `brk()` calls for 1024 `malloc()`s: the allocator extends the heap by about 132 KB at a time and serves some thirty requests from each extension.
The eight `mmap()`s and the `munmap()` are the dynamic loader mapping libc before `main()`; the allocations themselves made none.

The point is the one lecture 02 made about libc: most calls never cross into the kernel, and the ones that do ask for more than was requested.
What this lecture adds is the question neither trace answers: of the 4 MB the kernel was asked for, how much is in physical memory?
The [memory-ops demo](../memory-ops) shows the two cases differ, and part 04 says why.

## Going further

* `MALLOC_MMAP_THRESHOLD_=4096 strace -e trace=brk,mmap ./malloc_size_pages 1024` moves the threshold down to a page and the 1024 `malloc()`s become 1024 `mmap()`s.
* `ltrace -e malloc+free ./malloc_size_pages 1024` shows the library side of the same run, next to the 35 system calls.
* Watch `malloc_size_pages` with `pmap -x` at its prompts: the heap's `RSS` grows with its size, because the allocator writes a header into every chunk.
  Watch `malloc_size_entire`: the mapping's `RSS` is 4 KB, the header page, and nothing else.

## References

* `man 3 malloc`, `man 3 mallopt`, `man 2 brk`, `man 2 mmap`
* The glibc manual, [The GNU Allocator](https://www.gnu.org/software/libc/manual/html_node/The-GNU-Allocator.html)

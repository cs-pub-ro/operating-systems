# Demo: What `malloc()` Asks the Kernel For

Ten `malloc()` calls of a size given on the command line, run under `strace`.
For 100 KB blocks the kernel sees six `brk()`s; for 1000 KB blocks it sees ten `mmap()`s.

## Goal

Show that `malloc()` is a library function with an allocator behind it, that the allocator asks the kernel only when it has to, and that it asks in two different ways depending on the size.

## Background

`malloc_kb.c` takes a number of kilobytes, calls `malloc()` ten times with that size, and frees the last block.
`strace -e trace=brk,mmap,munmap` prints only the memory system calls, so what remains is the allocator talking to the kernel.

glibc's allocator keeps the heap -- one area, extended at the top with `brk()` -- and serves small requests from it.
Above `M_MMAP_THRESHOLD`, 128 KB by default, a request is served by a private `mmap()` instead, and freeing it is a `munmap()`.

## Build and run

```console
make
strace -e trace=brk,mmap,munmap ./malloc_kb 100
strace -e trace=brk,mmap,munmap ./malloc_kb 1000
```

The first few lines of each trace are the dynamic loader mapping libc; the memory the program asks for starts after the second `brk(NULL)`.

## Results and explanations

### 100 KB: six `brk()`s for ten `malloc()`s

```text
$ strace -e trace=brk,mmap,munmap ./malloc_kb 100
...
brk(NULL)                               = 0x62161b3b5000
brk(0x62161b3d6000)                     = 0x62161b3d6000
brk(0x62161b408000)                     = 0x62161b408000
brk(0x62161b43a000)                     = 0x62161b43a000
brk(0x62161b46c000)                     = 0x62161b46c000
brk(0x62161b49e000)                     = 0x62161b49e000
brk(0x62161b4d0000)                     = 0x62161b4d0000
brk(0x62161b4b7000)                     = 0x62161b4b7000
+++ exited with 0 +++
```

`brk(NULL)` asks where the heap currently ends.
The first `brk()` then moves the end up by 132 KB: that is the first `malloc()`, which found no heap at all and created one, with room to spare.
Each later `brk()` adds 200 KB -- enough for two 100 KB blocks -- so ten `malloc()` calls cost six system calls, not ten.
The allocator asks for more than the request so that the next request is free.

The last `brk()` goes *down*, by 100 KB.
The program freed one block, the top one; the allocator noticed that the free space at the top of the heap exceeded `M_TRIM_THRESHOLD` (also 128 KB) and returned it.
Had the program freed a block in the middle, nothing would have been returned, because the heap is one contiguous area and can only shrink from its end.

### 1000 KB: ten `mmap()`s

```text
$ strace -e trace=brk,mmap,munmap ./malloc_kb 1000
...
brk(NULL)                               = 0x56608af6f000
brk(0x56608af90000)                     = 0x56608af90000
mmap(NULL, 1028096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x765b4323e000
mmap(NULL, 1028096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x765b42f05000
mmap(NULL, 1028096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x765b42e0a000
...
mmap(NULL, 1028096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x765b4272d000
munmap(0x765b4272d000, 1028096)         = 0
+++ exited with 0 +++
```

Every `malloc()` is now its own `mmap()` of 1,028,096 bytes -- the 1000 KB requested, plus a 16-byte header, rounded up to whole 4 KB pages -- and the one `free()` is a `munmap()` of exactly that block.
The heap is still created (the one `brk()`), but only for the allocator's own bookkeeping; none of the blocks live in it.

Large blocks go to `mmap()` for two reasons.
A megabyte in the middle of the heap would stop the heap from ever shrinking past it, and it would fragment the space around it; a mapping of its own can be returned in one piece, to the kernel, the moment it is freed.
The price is a system call per allocation, which for a block that size is a small tax.

### The point

`malloc()` is lecture 02's "libc decides when to cross" applied to memory.
Ten requests, six crossings; or ten requests, ten crossings, when each one is big enough to be worth it.
The allocator is the piece of libc that makes that decision, and the program never sees it.

## Going further

* `MALLOC_MMAP_THRESHOLD_=4096 strace -e trace=brk,mmap ./malloc_kb 100` moves the threshold down and turns the 100 KB blocks into `mmap()`s.
  `MALLOC_TOP_PAD_` changes how much extra the allocator asks `brk()` for.
* Free all ten blocks instead of one and the `100` run ends with a larger `brk()` down: everything above the first block is returned.
* `ltrace -e malloc+free ./malloc_kb 100` shows the ten library calls that the six system calls were made for; run it next to the `strace` to see both sides of the boundary.
* The allocator keeps a few bytes of header before every block it hands out (the 16 bytes in `1028096`).
  `malloc_usable_size()` tells you how much of a block you may actually use.

## References

* `man 3 malloc`, `man 3 mallopt` (`M_MMAP_THRESHOLD`, `M_TRIM_THRESHOLD`, `M_TOP_PAD`), `man 2 brk`, `man 2 mmap`
* The glibc manual, [The GNU Allocator](https://www.gnu.org/software/libc/manual/html_node/The-GNU-Allocator.html)

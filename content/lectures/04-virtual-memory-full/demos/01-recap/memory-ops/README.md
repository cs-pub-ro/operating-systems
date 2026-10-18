# Demo: Allocation Changes the List of Areas

Four megabytes, allocated and freed four ways, while `pmap` watches: `malloc()` in one call, `mmap()` in one call, and each of them in 1024 calls of one page.

## Goal

See allocation as what it is to the kernel: an area added to the process's list, or an existing area made larger; and deallocation as the reverse.
Notice along the way which of the four ways costs physical memory, which is the question the rest of the lecture answers.

## Background

`memory_ops_entire.c` allocates 4 MB with one `malloc()`, then 4 MB with one `mmap()`, then frees the first and unmaps the second, pausing between steps.
`memory_ops_pages.c` does the same in 1024 calls of 4 KB each.
`pmap -x` prints the list of areas with, per area, its size, how much of it is resident (`RSS`) and how much has been written (`Dirty`).

## Build and run

Two terminals.
In the first:

```console
make
./memory_ops_entire
```

In the second, at every prompt:

```console
pmap -x $(pidof memory_ops_entire)
```

Then the same with `memory_ops_pages`.

## Results and explanations

### One call of 4 MB

Only the lines that change are shown; the heap is the first `[ anon ]` area, just above the executable.

```text
                                            before
00005b23ec073000     132      12      12 rw---   [ anon ]      heap
total kB            2756    1692     120

                                            after malloc(4 MB)
00007a6c525ff000    4100       4       4 rw---   [ anon ]      new area
total kB            6856    1696     124

                                            after mmap(4 MB)
00007a6c52000000    4096       0       0 rw---   [ anon ]      new area
00007a6c525ff000    4100       4       4 rw---   [ anon ]
total kB           10952    1696     124

                                            after free()
00007a6c52000000    4096       0       0 rw---   [ anon ]      malloc's area is gone
total kB            6852    1692     120

                                            after munmap()
total kB            2756    1692     120
```

The `malloc()` did not grow the heap: 4 MB is above the allocator's threshold, so it became a `mmap()` of its own, 4100 KB (the request plus one page for the allocator's header), and the `free()` became a `munmap()`.
Each allocation is a new line in the list, each deallocation removes it.

Look at `RSS`: it moves by 4 KB in the whole run, for the allocator's header.
Eight megabytes were allocated and not one page of them was ever in physical memory.

### 1024 calls of 4 KB

```text
                                            before
000059a899337000     132      12      12 rw---   [ anon ]      heap
total kB            2756    1712     136

                                            after 1024 x malloc(4 KB)
000059a899337000    4224    4108    4108 rw---   [ anon ]      the heap grew
total kB            6848    5808    4232

                                            after 1024 x mmap(4 KB)
000078ebab262000    3704       0       0 rw---   [ anon ]
000078ebab812000      56      20      20 rw---   [ anon ]      1024 mappings,
000078ebab820000     300       8       8 rw---   [ anon ]      four areas
000078ebab86b000     108       4       4 rw---   [ anon ]
total kB           10944    5808    4232

                                            after 1024 x free()
000059a899337000     140     140     140 rw---   [ anon ]      the heap shrank
total kB            6860    1840     264

                                            after 1024 x munmap()
total kB            2764    1840     264
```

Three things changed shape.

* **The heap grew instead of a new area appearing.**
  Small requests come from the heap, and the allocator extended it, from 132 KB to 4224 KB, with `brk()`.
  The `free()`s shrank it back, because the freed chunks were at its top.
* **A thousand `mmap()` calls made four areas, not a thousand.**
  The kernel merges adjacent anonymous mappings with the same permissions into one; it also fills gaps between existing areas first, which is where the small ones went.
  The list of areas describes ranges, not calls.
* **The heap's `RSS` went up by 4 MB; the mappings' did not.**
  The allocator writes a small header in front of every chunk it hands out, so every one of the 1024 pages was written to, and every one of them had to be in physical memory.
  The `mmap()` pages were never touched, and `RSS` for all four areas is zero.

That last line is the lecture's turn: the difference between the two is not the size of the request but whether something touched the memory afterwards.

## Going further

* `cat /proc/$(pidof memory_ops_pages)/maps` is the file `pmap` formats; count its lines at each prompt.
* `strace -e trace=brk,mmap,munmap ./memory_ops_pages` shows the thirty-odd `brk()` calls behind the thousand `malloc()`s; the [malloc-size demo](../malloc-size) does the counting.
* Change the page variant to `mmap()` with alternating permissions (`PROT_READ` and `PROT_READ | PROT_WRITE`) and the merging stops: a thousand lines in `pmap`, and a slower `mmap()` loop.

## References

* `man 1 pmap`, `man 5 proc` (`/proc/[pid]/maps`, `/proc/[pid]/smaps`)
* `man 3 malloc`, `man 3 mallopt` (`M_MMAP_THRESHOLD`, `M_TRIM_THRESHOLD`), `man 2 mmap`

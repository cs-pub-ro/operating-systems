# Demo: Which View Each Step Edits

Reserve 4 MB, touch the first byte of every page, touch the last byte of every page, unmap.
`ps` and the fault counter say which of the four steps changed what.

## Goal

Attach each operation to the structure it edits: `mmap()` and `munmap()` change the list of zones, and only the first access to a page changes the page table.

## Background

`reserve_allocate.c` maps 1024 pages, waits, writes to byte 0 of every page, waits, writes to byte 4095 of every page, waits, unmaps, waits.
`VSZ` is the sum of the zones; `RSS` is the number of valid page table entries times four; `min_flt` counts the page faults the process has taken.

## Build and run

Two terminals.
In the first:

```console
make
./reserve_allocate
```

In the second, at every prompt:

```console
ps -o pid,comm,vsz,rss,min_flt,maj_flt -p $(pidof reserve_allocate)
```

## Results and explanations

```text
                                       VSZ   RSS  MINFL
before                                2752  1692     64
after mmap(4 MB)                      6848  1692     64
after writing byte 0 of every page    6848  5788   1088
after writing byte 4095 of every page 6848  5788   1088
after munmap()                        2752  1692   1088
```

Step by step:

* **`mmap()`**: `VSZ` up by 4,096 KB, `RSS` and the fault count unchanged.
  A zone was added to the list; the page table was not touched; the 1024 entries for the new zone are all still invalid.
* **First write to every page**: `VSZ` unchanged, `RSS` up by 4,096 KB, 1,024 page faults.
  The list of zones was not touched; 1024 page-table entries went from invalid to valid, one per fault, each with a freshly zeroed frame behind it.
* **Second write to every page**: nothing changed.
  Byte 4095 is in the same page as byte 0, the entry is valid, and the hardware translated the address on its own; the kernel never heard about it.
* **`munmap()`**: `VSZ` down by 4,096 KB, `RSS` down by 4,096 KB.
  The zone is removed from the list, and with it every page-table entry inside it is invalidated and its frame freed.
  The fault counter keeps its history.

The unit of the second structure is the page: 4,096 bytes, one entry, one fault, however many of those bytes the program uses.

## Going further

* Change the loop to touch every 8 KB and `RSS` grows by 2 MB, with 512 faults.
* Touch the pages in reverse order: the same 1,024 faults; the order of first touches does not matter to the table.
* Replace `mmap()` with `malloc()` of the same size: the same numbers, because the allocator calls `mmap()` for a request this large.
  Replace it with `calloc()` and still the same: `calloc()` knows fresh pages are zero and does not touch them.

## References

* `man 2 mmap`, `man 1 ps`, `man 5 proc` (`/proc/[pid]/stat`, field 10)

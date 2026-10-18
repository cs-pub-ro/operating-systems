# Demo: One Fault per Page, Once

A program that counts its own page faults around each step: a 4 MB `mmap()`, a first write to every page, a second write, and then the same with a read first.

## Goal

Put a number on "allocation happens at access": zero faults for the reservation, exactly one per page for the first access, and none after that.

## Background

`page_faults.c` reads `ru_minflt` from `getrusage()` before and after each step and prints the difference.
A *minor* fault is one the kernel resolves from memory alone, with no disk involved; it is what a first access to anonymous memory causes.
The program maps 1024 pages, writes one byte into each, writes again, unmaps, maps again, reads one byte from each, then writes.

## Build and run

```console
make
./page_faults
```

## Results and explanations

```text
$ ./page_faults
1024 pages of 4096 bytes, 4 MB

mmap():                          0 page faults
first write to every page:    1024 page faults
second write to every page:      0 page faults

again, reading before writing

first read of every page:     1024 page faults
then first write:             1024 page faults
```

Line by line:

* **`mmap()`: 0.**
  The reservation touches no page, so it faults on none.
* **First write: 1024.**
  Every page faulted once.
  The fault is the kernel finding a free physical page, zeroing it, and writing its number into this process's page table at the entry for the virtual page touched; then the write runs again and succeeds.
* **Second write: 0.**
  The pages are mapped now.
  The hardware translates the addresses without the kernel's help, at full speed, for as long as the pages stay in memory.

The second half shows that the kernel does the least it can get away with:

* **First read: 1024.**
  A read of a fresh page needs a page full of zeroes to read from, and the kernel has one: a single, shared, read-only *zero page*.
  All 1024 virtual pages are mapped to it.
  `RSS` goes up by 4 MB nonetheless, because `RSS` counts mapped pages, but physical memory went down by nothing.
* **Then first write: 1024 again.**
  The zero page is read-only, so the first write to each page faults again; this time the kernel allocates a private page, copies the zeroes, and remaps.
  That is copy-on-write, and lecture 05 will see it again, between processes.

Each fault costs a few hundred nanoseconds to a microsecond; a program that touches a gigabyte for the first time takes 262,144 of them.
That is the price of paying on demand, and it is paid once.

## Going further

* `perf stat -e page-faults,minor-faults,major-faults ./page_faults` counts the same thing from outside, and adds the major faults: zero here, because nothing came from disk.
* Make the pages `MAP_POPULATE` and the first write costs 0: the flag asks the kernel to do all the faults at `mmap()` time, which is slower to call and faster to use.
  `madvise(MADV_WILLNEED)` is the same request made later.
* Replace `mmap()` with `malloc()` of the same size: the counts are the same, because the allocator calls `mmap()` for a request this large.
  Replace it with `calloc()` and the first write still faults 1024 times: `calloc()` knows the pages come zeroed and does not touch them.

## References

* `man 2 getrusage` (`ru_minflt`, `ru_majflt`), `man 2 mmap` (`MAP_POPULATE`), `man 2 madvise`
* `man 1 perf-stat`

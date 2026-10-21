# Demo: What a TLB Miss Costs

Walk 512 MB one byte per 4 KB page, so that nearly every access needs a translation the TLB does not hold; then the same walk on 2 MB pages, where 256 translations cover everything.

## Goal

Show the translation lookaside buffer doing its job and failing to: the same memory accesses, with a TLB miss rate of 92% and of almost zero, counted by the hardware itself.

## Background

`tlb.c` maps 512 MB, aligned to 2 MB, and faults it all in with `memset()` so that the timed loops contain no page faults.
Then it reads one byte from every 4 KB page, eight times over, and prints the time per access.
With the argument `huge`, it first asks for transparent huge pages with `madvise(MADV_HUGEPAGE)`, and the same 512 MB are backed by 256 pages of 2 MB instead of 131,072 pages of 4 KB; `/proc/self/smaps_rollup` confirms how much was granted.

`perf stat` reads the CPU's own counters for data-TLB loads and misses.
It needs `sudo` on a default machine.

## Build and run

```console
make
./tlb
./tlb huge
sudo perf stat -e dTLB-load-misses,dTLB-loads ./tlb
sudo perf stat -e dTLB-load-misses,dTLB-loads ./tlb huge
```

## Results and explanations

```text
$ sudo perf stat -e dTLB-load-misses,dTLB-loads ./tlb
backed by 2 MB pages: 0 MB
one byte per 4 KB page, 512 MB, 4 KB pages: 6.5 ns per access
         1,488,442      dTLB-load-misses   #   91.92% of all dTLB cache accesses
         1,619,221      dTLB-loads

$ sudo perf stat -e dTLB-load-misses,dTLB-loads ./tlb huge
backed by 2 MB pages: 512 MB
one byte per 4 KB page, 512 MB, 2 MB pages: 4.9 ns per access
            13,569      dTLB-load-misses   #   53.85% of all dTLB cache accesses
            25,198      dTLB-loads
```

With 4 KB pages, 1.05 million accesses took 1.49 million TLB misses, counting the loads that reached the second-level TLB: the walk touches 131,072 distinct pages in turn, the TLB holds a couple of thousand translations, and by the time a page comes round again its entry is long gone.
Every miss is a page walk: the hardware reads the four levels of the table from memory (or, more often, from the cache, which is why it costs nanoseconds rather than hundreds of them) before it can issue the load the program asked for.

With 2 MB pages the walk covers the same bytes with 256 translations, the TLB holds them all, and the miss count drops a hundredfold; the 13,569 that remain are `memset()`'s and the kernel's.
The time per access drops too, from 6.5 to 4.9 ns on this machine; the rest of the 4.9 ns is the cache miss on the data itself, which the TLB can do nothing about.

Two things to take from it:

* **The TLB is why translation is free in the normal case.**
  A program that stays within a few megabytes hits almost always, and its page table is read once per page and then not for a long time.
* **Larger pages are the hardware's answer to a large working set.**
  Databases, virtual machines and the kernel itself use 2 MB and 1 GB pages for exactly this; the price is coarser allocation and copying.

## Going further

* `cat /sys/kernel/mm/transparent_hugepage/enabled` says whether huge pages are given on request (`madvise`), always, or never; `grep AnonHugePages /proc/meminfo` says how much of the machine is backed by them.
* Change the stride to 64 bytes and keep the 512 MB: the same number of distinct cache lines per page, 64 times more accesses, and the miss *rate* falls to about 1/64, because 63 of every 64 accesses hit the entry the first one brought in.
* `perf stat -e dTLB-load-misses ls` on any small program: a few thousand misses, from starting up.
* `lscpu` on some machines, and `cpuid -1 | grep -i tlb` where `cpuid` is installed, print the TLB sizes: typically 64 entries in the first level and 2,048 or more in the second.

## References

* `man 1 perf-stat`, `man 2 madvise` (`MADV_HUGEPAGE`)
* [Transparent Hugepage Support](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html), in the kernel documentation

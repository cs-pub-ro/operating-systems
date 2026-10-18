# Demos

The programs demonstrated during the lecture, one directory per part of it.

Each demo is small on purpose: it makes one point, and it is meant to be run rather than read.
The write-up in each directory says what to expect, what actually happens, and why.

| Demo | Part of the lecture | What it shows |
| --- | --- | --- |
| [`00-pitch/`](00-pitch) | [00. Pitch](../README.md#00-pitch-addresses-are-not-places) | A browser with 1.5 TB, a program that takes 10 TB, and two processes that disagree about the same address. |
| [`01-recap/`](01-recap) | [01. What we already know](../README.md#01-what-we-already-know) | Allocation as a change to the list of areas, under `pmap` and `strace`. |
| [`03-virtual-vs-physical/`](03-virtual-vs-physical) | [03. Virtual memory and physical memory](../README.md#03-virtual-memory-and-physical-memory) | `VSZ` against `RSS`, and a reservation that costs no physical memory at all. |
| [`04-reserve-allocate-map/`](04-reserve-allocate-map) | [04. Reserve, allocate, map](../README.md#04-reserve-allocate-map) | Physical memory arriving at the first touch, one page fault per page. |
| [`05-page-table/`](05-page-table) | [05. Pages and the page table](../README.md#05-pages-and-the-page-table) | The process's own page table, read from `/proc/self/pagemap`: present bits flipping, frame numbers, a frame shared by two processes. |

Part 02 has no demo of its own; the `pmap` listings of part 01 are the address space it describes.

## Running them

Every demo that needs building has a `Makefile`, so `make` inside its directory is enough.
The tools the demos need, beyond a C compiler and `make`, are:

* `pmap` and `ps` (`procps`), to look at a running process from outside
* `strace`, to see the system calls behind `malloc()`
* `sudo`, once, for the frame numbers in `05-page-table/pagemap`; everything else runs as a normal user

Most demos wait at prompts so that `pmap` or `ps` can be run on them from a second terminal; they are marked as such in their READMEs.
`utils/utils.h` holds the `DIE()` macro the sources share.

The numbers quoted in the write-ups were measured on one machine (Ubuntu 25.04, Linux 6.14, glibc 2.41, x86-64, 4 KB pages).
Addresses and exact kilobyte counts differ from run to run and from machine to machine; the shapes do not.

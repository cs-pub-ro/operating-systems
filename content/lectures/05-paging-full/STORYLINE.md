# Storyline: Paging

The planned narrative of the live delivery, one thread from start to finish.
The figure walks through it, station by station: [the storyline](media/00-pitch/storyline.svg).

![The storyline](media/00-pitch/storyline.svg)

1. **The hook:** since this machine booted, the kernel has handled ten billion page faults.
   Add up the `RSS` of its processes and you get 58 GB, on a machine with 62 GB of which only 41 GB are in use.
   And 800 MB of some programs' memory is not in RAM at all, but on disk.
   Lecture 04 said physical memory arrives in a page fault; this lecture is about what happens inside one, why the numbers overcount, and what it costs to keep the books.
1. **Two views of one address space.**
   The kernel keeps the list of zones; the hardware reads the page table; both describe the same addresses.
   The shell has 33 zones and some 2,600 pages, 1,100 of them present.
   The list says what the process may do with an address; the table says whether a frame is there right now.
1. **Two edits.**
   Reserving, with `mmap()` or `malloc()`, edits only the list.
   The first touch of a page edits only the table.
   Neither touches the other, and that is why one is free and the other costs a fault.
1. **The fault, step by step.**
   An instruction forms an address; the MMU finds no valid entry for its page; it stops the instruction and traps into the kernel.
   The kernel looks the address up in the list of zones, and only then decides.
1. **Four verdicts.**
   Inside a zone, and a frame can be found in memory: a minor fault, fixed in a microsecond.
   Inside a zone, but the content is on disk: a major fault, fixed in milliseconds.
   Outside every zone: `SIGSEGV`, `SEGV_MAPERR`.
   Inside a zone that forbids the access: `SIGSEGV`, `SEGV_ACCERR`.
   One hardware event, four verdicts; the segmentation fault and demand paging are the same trap.
1. **Where frames come from.**
   A fresh anonymous page gets a zeroed frame; a page of a file gets a frame of the page cache, read from disk if it is not there yet; a page that was taken away comes back from swap.
   Frames go back the same ways: when RAM is short, the kernel unmaps pages, drops the clean ones and writes the dirty ones to swap.
1. **Swap, in a box.**
   Put a program in a 64 MB cage and let it write 256 MB: 190 MB end up in swap, and reading them back costs 8,400 major faults.
   The program never knew; it only got slower.
1. **One frame, many tables.**
   Ten processes from one executable share its code, and every one of them counts it in its `RSS`.
   `PSS` splits a shared frame among its users and adds up to the truth; `USS` counts only what a process holds alone.
   That is why the sum of `RSS` exceeded the RAM.
1. **Copy on write.**
   `fork()` copies the page table, not the pages: both processes point at the same frames, marked read-only.
   Reading costs nothing; the first write to a page faults once and gets a private copy.
   64 MB forked: 0 faults to read it all, 16,384 to write it all.
1. **A table too big.**
   One entry per page of a 128 TiB space is 256 GB of table per process.
   So the table is a tree with four levels, and only the branches in use exist: the shell's tables take 60 KB, and a browser with 1.5 TB of address space needs 8 MB.
1. **A table too slow.**
   Four levels are four memory reads before the one the program asked for.
   The TLB, a small cache of recent translations inside the CPU, answers almost every access on its own; walk one byte per page through 512 MB and nine in ten accesses miss it, use 2 MB pages and almost none do.
1. **What should survive the week:** the page fault is where the kernel does its memory work.
   It decides, from the list of zones, between fixing and killing; it brings frames from zero, from files and from swap; it shares frames between processes and copies them only on a write.
   The page table makes all of it affordable: a tree, so that it fits, and a TLB, so that it is rarely read.
   Next time: the process as the owner of an address space, `fork()` and `exec()`, and threads sharing one.

## How the stations map onto the lecture

| Stations | Part |
| --- | --- |
| 1 | 00. Pitch |
| 2, 3 | 01. Two views of one address space |
| 4, 5 | 02. The page fault |
| 6, 7 | 03. Where frames come from |
| 8, 9 | 04. Memory sharing |
| 10, 11 | 05. Storing the page table |
| 12 | 06. Conclusion |

Station 8 answers the second number of the hook and station 7 the third; the first number, the ten billion faults, is answered by all of them together, and it is worth saying so at the end.

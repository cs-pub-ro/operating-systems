# Session 05: Paging

The plan of the fifth lecture, the demos run during it, and the points worth writing down.

This is the page used while the lecture is delivered.
The full version -- the same argument in prose, with the diagrams, the reference output and the reading -- is [`05-paging-full/`](../05-paging-full).

Lecture 04 ended with a mechanism: physical memory arrives at the first access to a page, through a page fault, and a page table keeps the mapping.
This lecture goes inside the page fault, follows the frame to where it comes from and where it goes, shows frames shared between processes, and ends with how the page table is stored and read.

## What the lecture answers

1. **How often does the kernel touch memory on a program's behalf, and why do the numbers not add up?**
   Ten billion page faults since boot; a sum of `RSS` larger than the memory in use; pages in swap.
1. **What does the kernel keep, what does the hardware read, and who edits what?**
   The list of zones says what is allowed and is edited by system calls; the page table says what is there and is edited by the page fault handler.
1. **What happens between the instruction and the frame, and when is it a crash?**
   A trap, a lookup in the list of zones, and one of four verdicts: minor, major, `SEGV_MAPERR`, `SEGV_ACCERR`.
1. **Where does the kernel find a frame, and what does it do when it cannot?**
   Zeroed, from the page cache, from a file on disk, from swap; and when RAM is short, it takes frames back.
1. **How can one frame belong to many processes?**
   Shared page-cache frames, `RSS` against `PSS` and `USS`, and copy-on-write in `fork()`.
1. **How does a table with billions of entries fit, and how is it read without slowing everything down?**
   A four-level tree, and a TLB.

## Plan

| Part | Question | Demo | Figure |
| --- | --- | --- | --- |
| 00. Pitch | Three numbers that do not add up | [`00-pitch/`](demos/00-pitch) | [the storyline](media/00-pitch/storyline.svg) |
| 01. Two views of one address space | What does the kernel keep, what does the hardware read? | [`01-two-views/`](demos/01-two-views) | [two views](media/01-two-views/two-views.svg), [two edits](media/01-two-views/two-edits.svg) |
| 02. The page fault | What happens between the instruction and the frame? | [`02-page-fault/`](demos/02-page-fault) | [inside a page fault](media/02-page-fault/page-fault-flow.svg) |
| 03. Where frames come from | Where does the frame come from, and where does it go? | [`03-frames/`](demos/03-frames) | [frame sources](media/03-frames/frame-sources.svg) |
| 04. Memory sharing | How can one frame belong to many processes? | [`04-memory-sharing/`](demos/04-memory-sharing) | [shared frames](media/04-memory-sharing/shared-frames.svg), [copy-on-write](media/04-memory-sharing/copy-on-write.svg) |
| 05. Storing the page table | How does the table fit, and how is it read fast? | [`05-page-table/`](demos/05-page-table) | [four levels](media/05-page-table/multi-level.svg), [the TLB](media/05-page-table/tlb.svg) |
| 06. Conclusion | What should survive the week? | -- | -- |

## Storyline / Narrative

The lecture follows one thread from start to finish, and the figure below walks through it, station by station: [the storyline](media/00-pitch/storyline.svg).

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

## Points to capture

Ten things to have in your notes when you leave.

1. **Two structures describe a process's memory.** The kernel's **list of zones** says what is allowed; the **page table** says what is there. System calls edit the list; the page fault handler edits the table; the MMU reads only the table.
1. **Reserving edits the list, touching edits the table.** `mmap()` adds a zone and no entry; the first access to each page adds one valid entry, through one fault; later accesses need no kernel.
1. **A page fault is a trap**, raised by the MMU when an entry is missing or forbids the access: the hardware's way into the kernel, as the system call is the program's.
1. **Four verdicts.** The kernel looks the address up in the list of zones: in no zone, **`SEGV_MAPERR`**; in a zone that forbids the access, **`SEGV_ACCERR`**; otherwise a frame, from memory (**minor**, microseconds) or from disk (**major**, milliseconds).
1. **Four sources of a frame.** A zeroed frame for a fresh anonymous page; the **page cache** for a file already in memory; a file on disk, read into the page cache; the **swap area**, for an anonymous page taken away earlier.
1. **Reclaim.** When RAM is short the kernel invalidates entries and frees frames: clean file pages are just dropped, dirty anonymous pages are written to swap first. The next access is a major fault; the program only sees the time.
1. **One frame, many page tables.** The page cache's frames are mapped into every process using the same file. **`RSS`** counts a shared frame once per process; **`PSS`** splits it and sums to the truth; **`USS`** counts only unshared frames.
1. **Copy-on-write.** `fork()` copies the page table and marks every entry read-only in both processes; reads are free; the first write to a page faults, and the kernel copies that one page.
1. **A four-level tree.** A flat table for 128 TiB would be 256 GB per process; split into levels of 512 entries, only the branches in use exist: 60 KB for the shell, 8 MB for a browser.
1. **The TLB** caches recent translations inside the processor; a hit costs nothing, a miss costs a walk of four reads. Most programs hit almost always; it is flushed or tagged on every switch of address space.

## Demos

Each directory below holds the sources, the commands to run and the question to ask about the result.

| Demo | Shows |
| --- | --- |
| [`00-pitch/page-faults`](demos/00-pitch/page-faults) | 9.7 billion page faults in 17 days; 1.65 billion for one browser process. |
| [`00-pitch/total-rss`](demos/00-pitch/total-rss) | 58 GB of `RSS` on a machine using 41 GB; `smem` says 34 GB of `PSS`. |
| [`01-two-views/zones-and-pages`](demos/01-two-views/zones-and-pages) | The shell: 33 zones, 2,647 pages, 1,098 present. |
| [`01-two-views/reserve-allocate`](demos/01-two-views/reserve-allocate) | `mmap()` moves `VSZ`; the first touch moves `RSS` and the fault count; the second touch moves nothing. |
| [`02-page-fault/segfault`](demos/02-page-fault/segfault) | Eight accesses to one page; the program prints `SEGV_ACCERR` or `SEGV_MAPERR` itself. |
| [`02-page-fault/major-fault`](demos/02-page-fault/major-fault) | 16,384 major faults in 0.3 s, then 1,024 minor in 2 ms, for the same file. |
| [`03-frames/page-cache`](demos/03-frames/page-cache) | 21 GB of files in memory; every page of `bash` and libc among them. |
| [`03-frames/swap`](demos/03-frames/swap) | 256 MB written in a 64 MB cgroup: 193 MB to swap, 8,424 major faults to read back. |
| [`04-memory-sharing/uss-pss-rss`](demos/04-memory-sharing/uss-pss-rss) | The shell's code: 1,240 KB of `Rss`, 63 KB of `Pss`; its heap: equal. |
| [`04-memory-sharing/uss-pss-rss-multiple`](demos/04-memory-sharing/uss-pss-rss-multiple) | Ten processes, four ways: 1.2 MB or 7.1 MB for the same ten programs. |
| [`04-memory-sharing/fork-cow`](demos/04-memory-sharing/fork-cow) | After `fork()`: 0 faults to read 64 MB, 16,384 to write it. |
| [`05-page-table/table-size`](demos/05-page-table/table-size) | `VmPTE`: 60 KB for the shell, 7.8 MB for a browser with 1.5 TB of address space. |
| [`05-page-table/tlb`](demos/05-page-table/tlb) | 1.49 million TLB misses walking 512 MB; 13,569 with 2 MB pages. |

## Slides

The deck delivered in the room is [`slides/paging-live.html`](slides/paging-live.html), rendered from [`slides/paging-live.qmd`](slides/paging-live.qmd).
It is deliberately thin: the diagrams, the demo results, and nothing that is better said than read.
The [full deck](../05-paging-full/slides) carries the same structure with the detail filled in.

# Storyline: Virtual Memory

The planned narrative of the live delivery, one thread from start to finish.
The figure walks through it, station by station: [the storyline](media/00-pitch/storyline.svg).

![The storyline](media/00-pitch/storyline.svg)

1. **The hook:** a browser process that says it holds 1.5 TB of memory on a machine with 64 GB, a twenty-line program that takes 10 TB in a blink, and two programs that both keep a variable at address `0x404040` and disagree about its value.
   None of the three is possible if an address is a place in RAM.
   So an address is not a place in RAM, and this lecture is about what it is instead.
1. **What we know already:** a process sees its memory as a list of areas, and `pmap` prints it.
   Allocating adds an area or extends one, freeing removes or shrinks one, and behind `malloc()` an allocator in libc does the asking, through `brk()` and `mmap()`.
   Nothing in that picture said where the bytes are.
1. **Every process gets a space of its own.**
   Two processes can use the same address and name two different bytes, because each has its own address space and the kernel keeps the spaces apart.
   Same address, two different bytes: that is isolation, and it is why one crashing program does not take the others down.
1. **The address space is a promise, not RAM.**
   The list of areas is just a list: a start, a size and permissions per entry.
   Allocating memory adds to the list, and nothing else happens; we call that *reserving*, and the "virtual" in "virtual address space" means exactly this.
1. **So there are two kinds of memory.**
   Virtual memory belongs to a process: as large as the process asks for, a promise.
   Physical memory belongs to the machine: fixed, shared by everyone, and the only kind that can hold a byte.
   `ps` shows both: `VSZ`, the promise, and `RSS`, what the process holds right now.
1. **Three steps, not one: reserve, allocate, map.**
   `malloc()` and `mmap()` reserve a zone of virtual memory.
   Physical memory is allocated later, and when it is, it has to be mapped: attached to the virtual page the program will use to reach it.
1. **You pay on the first touch.**
   The first access to a reserved page finds nothing behind it; the hardware stops the instruction, the kernel allocates a frame, zero-fills it, maps it, and the instruction runs again.
   That is a page fault, and it is where steps 2 and 3 happen: once per page, and never again while the page stays in memory.
   Touch half the pages, pay for half.
1. **This is why `VSZ` is larger than `RSS`.**
   Some pages were reserved and never touched; some are parts of files not read yet; some were in memory and have been moved out to swap.
   And the pages that are shared, such as libc's code, are counted in the `RSS` of every process that maps them, which is why adding up `RSS` over all processes gives more than the machine has.
   The browser's 1.5 TB is almost entirely the first kind.
1. **Memory is handled in pages.**
   Virtual memory is cut into pages and physical memory into frames of the same size, 4 KB here, and any page can be mapped to any frame.
   Fixed-size pieces make allocating, sharing and swapping simple, and leave no awkward gaps.
1. **The mapping lives in a page table.**
   One per process: an array indexed by the virtual page number, where each entry says whether the page is present, which frame holds it, and what may be done with it.
   The page number goes in, the frame number comes out.
1. **The hardware translates every address.**
   The CPU only ever issues virtual addresses.
   On every access the MMU looks up the page table, swaps the page number for the frame number and keeps the offset; an entry that is not present is the page fault of station 7, and an access the entry does not allow is the segmentation fault of lecture 03.
1. **What should survive the week:** all addresses are virtual.
   Allocation reserves; the first access allocates and maps, through a page fault; the page table, one per process, holds the mapping, and the hardware walks it on every access.
   Next time: what happens inside a page fault, and how a table with billions of entries is kept small.

## How the stations map onto the lecture

| Stations | Part |
| --- | --- |
| 1 | 00. Pitch |
| 2 | 01. What we already know |
| 3, 4 | 02. The process virtual address space |
| 5 | 03. Virtual memory and physical memory |
| 6, 7, 8 | 04. Reserve, allocate, map |
| 9, 10, 11 | 05. Pages and the page table |
| 12 | 06. Conclusion |

Station 8 closes the loop with the hook: once the three steps are on the board, the 1.5 TB browser explains itself, and the explanation is worth giving before pages and page tables, so that the mechanism arrives as the answer to a question the room already has.

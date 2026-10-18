# Session 04: Virtual Memory

The plan of the fourth lecture, the demos run during it, and the points worth writing down.

This is the page used while the lecture is delivered.
The full version -- the same argument in prose, with the diagrams, the reference output and the reading -- is [`04-virtual-memory-full/`](../04-virtual-memory-full).

Lecture 03 described the memory of a process as a list of areas and left one word in brackets: the process *(virtual)* address space.
This lecture takes the brackets off: what an address is, what an allocation does, and where the physical memory is.

## What the lecture answers

1. **What is an address, if a browser has 1.5 TB, a program can take 10 TB, and two processes share `0x404040`?**
   Not a place in RAM.
1. **What did lecture 03 leave out?**
   The list of areas says nothing about physical memory.
1. **What does each process have?**
   An address space of its own, a list of zones, isolated from the others; allocating only adds to the list, and that is why it is called virtual.
1. **What are the two kinds of memory?**
   Virtual, per process, a promise; physical, per machine, the bytes; `VSZ` and `RSS` measure them.
1. **When does physical memory arrive?**
   At the first access to each page, through a page fault, once: reserve, allocate, map.
1. **Where is the mapping kept?**
   In a page table, one per process, an array indexed by the virtual page number, read by the hardware on every access.

## Plan

| Part | Question | Demo | Figure |
| --- | --- | --- | --- |
| 00. Pitch | What is an address, if these three things are possible? | [`00-pitch/`](demos/00-pitch) | [the storyline](media/00-pitch/storyline.svg) |
| 01. What we already know | What did lecture 03 say, and what did it leave out? | [`01-recap/`](demos/01-recap) | [the address space](media/01-recap/process-address-space.svg), [allocate and free](media/01-recap/allocation-and-deallocation.svg), [`malloc()`, `brk()`, `mmap()`](media/01-recap/malloc-brk-mmap.svg) |
| 02. The virtual address space | What does each process have, and why "virtual"? | -- | [a list of zones](media/02-address-space/virtual-address-space.svg), [the list](media/02-address-space/address-space-as-list.svg) |
| 03. Virtual and physical memory | What are the two kinds of memory? | [`03-virtual-vs-physical/`](demos/03-virtual-vs-physical) | [three spaces, one RAM](media/03-virtual-vs-physical/virtual-vs-physical.svg), [what `VSZ` is made of](media/03-virtual-vs-physical/vsz-and-rss.svg) |
| 04. Reserve, allocate, map | When does physical memory arrive, and what does it cost? | [`04-reserve-allocate-map/`](demos/04-reserve-allocate-map) | [three steps](media/04-reserve-allocate-map/reserve-allocate-map.svg), [the first touch](media/04-reserve-allocate-map/first-touch.svg) |
| 05. Pages and the page table | Where is the mapping kept, and who uses it? | [`05-page-table/`](demos/05-page-table) | [pages and frames](media/05-page-table/pages-and-frames.svg), [the page table](media/05-page-table/page-table.svg), [translation](media/05-page-table/address-translation.svg) |
| 06. Conclusion | What should survive the week? | -- | -- |

## Storyline / Narrative

The lecture follows one thread from start to finish, and the figure below walks through it, station by station: [the storyline](media/00-pitch/storyline.svg).

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

## Points to capture

Ten things to have in your notes when you leave.

1. **An address is not a place in RAM.** It is a name inside one process's **virtual address space**, and every process has a space of its own.
1. The address space is a **list of zones**: start, size, permissions. The kernel keeps one list per process and keeps the lists apart; that is **isolation**.
1. **Allocating reserves.** `malloc()`, `mmap()` and `brk()` add to the list or extend an entry, and nothing else happens; a reservation costs an entry, not memory.
1. **Two kinds of memory.** Virtual: per process, as large as reserved (up to 128 TiB), a promise. Physical: per machine, fixed, the bytes. Programs only ever handle virtual addresses.
1. **`VSZ` and `RSS`.** The virtual size is the sum of the zones; the resident set size is the physical memory held right now. `VSZ` is never smaller, and can be a thousand times larger.
1. **Three steps.** Reserve (at the call) -- allocate a physical page (at the first access) -- map it to the virtual page (right after). Steps 2 and 3 never happen apart.
1. **Demand paging.** The first access to a page takes a **page fault**: the hardware stops the instruction, the kernel allocates, zero-fills and maps, the instruction runs again. Once per page, never again while the page stays in memory.
1. **Why `VSZ` > `RSS`**: pages reserved and never touched, pages of files not read yet, pages swapped out; and shared pages inside `RSS`, counted once per process.
1. **Pages and frames.** 4 KB each; an address is a page number (the address without its last three hex digits) and an offset. Any page maps to any frame.
1. **The page table.** One per process, an array indexed by the virtual page number; each entry: valid, frame number, permissions. The kernel writes it, one entry per page fault; the **MMU** reads it on every access; an entry that says no is a page fault, which the kernel resolves as demand paging or as `SIGSEGV`.

## Demos

Each directory below holds the sources, the commands to run and the question to ask about the result.

| Demo | Shows |
| --- | --- |
| [`00-pitch/browser-vas-size`](demos/00-pitch/browser-vas-size) | A browser process with 1.5 TB of address space on a 59 GB machine. |
| [`00-pitch/allocate-10TB`](demos/00-pitch/allocate-10TB) | 10,240 `mmap()`s of a gigabyte: 10 TiB of `VSZ`, the same `RSS`, one merged zone. |
| [`00-pitch/same-address`](demos/00-pitch/same-address) | Two processes, `&value` at `0x404040` in both, two different values. |
| [`01-recap/memory-ops`](demos/01-recap/memory-ops) | 4 MB four ways under `pmap`: a new area, a grown heap, a thousand `mmap()`s merged into four areas. |
| [`01-recap/malloc-size`](demos/01-recap/malloc-size) | One `malloc()` is one `mmap()`; a thousand are 35 `brk()`s. |
| [`03-virtual-vs-physical/show-mem`](demos/03-virtual-vs-physical/show-mem) | `VSZ` and `RSS` for the shell, a browser, and "Hello, World!". |
| [`03-virtual-vs-physical/reserve-mem`](demos/03-virtual-vs-physical/reserve-mem) | 12 MB reserved and released; `RSS` unchanged seven times. |
| [`04-reserve-allocate-map/reserve-allocate`](demos/04-reserve-allocate-map/reserve-allocate) | Reserve 4 MB, touch 512 pages: `RSS` +2 MB, 512 page faults. |
| [`04-reserve-allocate-map/page-faults`](demos/04-reserve-allocate-map/page-faults) | 0 faults for `mmap()`, 1024 for the first write, 0 for the second. |
| [`05-page-table/pagemap`](demos/05-page-table/pagemap) | The process's own page table: present bits flipping, scattered frames, one frame of libc shared by two processes. |

## Slides

The deck delivered in the room is [`slides/virtual-memory-live.html`](slides/virtual-memory-live.html), rendered from [`slides/virtual-memory-live.qmd`](slides/virtual-memory-live.qmd).
It is deliberately thin: the diagrams, the demo results, and nothing that is better said than read.
The [full deck](../04-virtual-memory-full/slides) carries the same structure with the detail filled in.

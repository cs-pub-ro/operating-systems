# Session 04: Virtual Memory - Full Contents

This is the complete version of the fourth lecture: the argument in full sentences, the diagrams, the demos with their reference output, and the reading behind each part.

Read it before the lecture if you want to follow the live delivery without taking notes, and after it for everything that was said once and quickly.
The one-page plan used during the lecture is [`04-virtual-memory-live/`](../04-virtual-memory-live).

Lecture 03 described the memory of a process as a list of areas, and left one word in brackets: the process *(virtual)* address space.
This lecture takes the brackets off.
It asks what an address is, if two processes can both have one at `0x404040`; what an allocation does, if a program can take ten terabytes on a machine with sixty-four gigabytes; and where, in all of this, the physical memory is.
The answer is one mechanism, virtual memory, and the lecture builds it up from what can be observed: the two sizes of every process, the page fault, and the page table.

## Learning objectives

By the end of this lecture you should be able to:

* Explain why a process address space is called virtual: each process has one of its own, isolated from the others, and an allocation only reserves a part of it.
* Tell virtual memory from physical memory, and read the two sizes of a process, `VSZ` and `RSS`, for what they are.
* Describe allocation as three steps -- reserve, allocate, map -- and say which call does which, and when.
* Explain demand paging: why physical memory arrives at the first access to a page, through a page fault, and why the virtual size of a process is larger than its resident size.
* Describe pages and frames, the page table as an array indexed by the virtual page number, and the translation the hardware performs on every memory access.

## What is here

| Part | What it answers | Demos |
| --- | --- | --- |
| [00. Pitch](#00-pitch-addresses-are-not-places) | What is an address, if these three things are possible? | [`00-pitch/`](demos/00-pitch) |
| [01. What we already know](#01-what-we-already-know) | What did lecture 03 say about memory, and what did it leave out? | [`01-recap/`](demos/01-recap) |
| [02. The process virtual address space](#02-the-process-virtual-address-space) | What does each process have, and why is it called virtual? | -- |
| [03. Virtual memory and physical memory](#03-virtual-memory-and-physical-memory) | What are the two kinds of memory, and how do they differ for one process? | [`03-virtual-vs-physical/`](demos/03-virtual-vs-physical) |
| [04. Reserve, allocate, map](#04-reserve-allocate-map) | When does physical memory arrive, and what does it cost? | [`04-reserve-allocate-map/`](demos/04-reserve-allocate-map) |
| [05. Pages and the page table](#05-pages-and-the-page-table) | Where is the mapping kept, and who uses it? | [`05-page-table/`](demos/05-page-table) |
| [06. Conclusion](#06-conclusion) | What should survive the week? | -- |

The slides are in [`slides/`](slides); the demos, with build instructions and reference output, are in [`demos/`](demos).
The planned narrative of the live delivery is in [`STORYLINE.md`](STORYLINE.md), with [the storyline figure](media/00-pitch/storyline.svg) that walks through it.

## 00. Pitch: Addresses Are Not Places

Three things to look at before any definition.

**A browser with 1.5 TB of memory.**
Sort the processes of a desktop by the size of their address space:

```text
$ ps -e -o pid,vsz,rss,comm --sort -vsz | head -4
    PID    VSZ   RSS COMMAND
  32573 1544448496 879760 chrome
  34405 1533182040 904016 Discord
 253577 1528348464 346232 signal-desktop
```

The first line is a browser process with a 1,544,448,496 KB address space, which is 1.44 TiB, on a machine with 59 GB of RAM and 80 GB of swap.
The next two are chat clients, which are browsers with a chat window drawn on top, and they say the same.
`RSS`, the other column, is 880 MB.
The [browser-vas-size demo](demos/00-pitch/browser-vas-size) reads the output.

**Ten terabytes in a blink.**
A twenty-line program calls `mmap()` ten thousand times, a gigabyte each, and waits:

```text
$ ps -o pid,vsz,rss,cmd -p $(pidof allocate_gb)
    PID    VSZ   RSS CMD
1195513   2752  1824 ./allocate_gb 10240       before
1195513 10737420992  1824 ./allocate_gb 10240  after
```

The loop returns in a fraction of a second.
The virtual size of the process is now 10 TiB, and its resident size is 1,824 KB before and after, to the kilobyte.
The [allocate-10TB demo](demos/00-pitch/allocate-10TB) is the program.

**The same address, twice.**
Two copies of one program, each storing its PID in a global variable and printing where the variable is:

```text
pid 1209178: &value = 0x404040, value = 1209178
pid 1209182: &value = 0x404040, value = 1209182
```

Same address, two different values, and neither process can see the other's; the [same-address demo](demos/00-pitch/same-address) lets them wait side by side.

None of the three is possible if an address is a place in RAM.
There are not 1.5 TB of places; a program cannot take ten of something the machine has one of; and one place holds one value.
So an address is something else, and the lecture is about what.

> **Takeaway.**
> An address is not a location in physical memory.
> The three observations are the three things virtual memory gives a process: a space larger than the machine, allocation that costs nothing until it is used, and a space of its own that no other process can reach.

## 01. What We Already Know

Lecture 03 built the picture this lecture starts from, and it is worth having it on the board before adding to it.

### A process is a list of areas

![The process address space](media/01-recap/process-address-space.svg)

The memory of a process is a list of areas, each with a start, a size, permissions and a role.
The static ones -- text, rodata, data, bss -- are built from the executable before `main()` runs; the dynamic ones -- heap, stack, mappings -- are made and resized while it runs.
`pmap` prints the list.

### Allocation changes the list

![Allocation and deallocation](media/01-recap/allocation-and-deallocation.svg)

Allocating memory means a new area, or an existing one made larger; deallocating means an area removed, or made smaller.
The [memory-ops demo](demos/01-recap/memory-ops) does 4 MB four ways and watches the list through `pmap`: one `malloc()`, one `mmap()`, a thousand `malloc()`s of a page, a thousand `mmap()`s of a page.

```text
after malloc(4 MB)          00007a6c525ff000    4100       4       4 rw---   [ anon ]   a new area
after mmap(4 MB)            00007a6c52000000    4096       0       0 rw---   [ anon ]   a new area
after 1024 x malloc(4 KB)   000059a899337000    4224    4108    4108 rw---   [ anon ]   the heap, grown
after 1024 x mmap(4 KB)     000078ebab262000    3704       0       0 rw---   [ anon ]   1024 calls, 4 areas
```

The thousand `mmap()` calls produced four lines, not a thousand: the kernel merges adjacent areas with the same permissions.
The list describes ranges of addresses, not calls.

### Behind `malloc()`

![`malloc()`, the allocator, `brk()` and `mmap()`](media/01-recap/malloc-brk-mmap.svg)

`malloc()` is a library function.
An allocator in libc owns the heap and hands out pieces of it; it asks the kernel for more with `brk()`, which extends the heap, and serves large requests with an `mmap()` of their own.
The [malloc-size demo](demos/01-recap/malloc-size) counts: one `malloc()` of 4 MB is one `mmap()`; 1024 `malloc()`s of 4 KB are 35 `brk()`s.

### What the picture left out

Look again at the `pmap` lines above, at the `RSS` column.
The heap grown by a thousand `malloc()`s has 4,108 KB resident; the 4 MB `mmap()` has 0.
Both added 4 MB to the list of areas, and the list does not say which one is in physical memory.
Nothing in lecture 03 did.
The list of areas is a description of addresses, and the question this lecture asks is what an address is a description *of*.

> **Takeaway.**
> A process is a list of areas; allocation adds to the list or extends an entry in it; `malloc()` does that through an allocator, over `brk()` and `mmap()`.
> The list says nothing about physical memory, and that is the gap this lecture fills.

## 02. The Process Virtual Address Space

### One space per process

The same-address demo is the first fact to take seriously.
Two processes write to `0x404040` and each reads back its own value, so `0x404040` must name a different byte in each.
An address, then, is a name inside a process, and every process has a complete set of names of its own: its **address space**.
The kernel keeps the spaces apart.
No instruction a process can execute reaches a byte of another process, because every address the instruction can form is a name in its own space.

That is what isolation means, concretely.
Lecture 02 said the kernel protects processes from each other; this is the mechanism on the memory side, and the hardware enforces it on every access, as part 05 shows.
It is also why every program can be linked for the same addresses: `main()` is at `0x401253` in both copies, the linker never had to ask what else would be running, and the loader never had to move anything.

### The space is a list of zones

![The process virtual address space](media/02-address-space/virtual-address-space.svg)

The address space is the list of areas from the recap, and the lecture now calls its entries **zones**, to make a point about what they are.
A zone is a few numbers:

```c
struct zone {
	unsigned long start;
	unsigned long size;
	unsigned int permissions;
	struct zone *next, *prev;
};

struct zone *pvas_head;
```

![The address space as a list](media/02-address-space/address-space-as-list.svg)

The kernel keeps one such list per process, and allocation is an operation on it.
To reserve more memory, either extend a zone:

```c
z->size += extra_space;
```

or add one:

```c
z_new = malloc(sizeof(struct zone));
z_new->start = start_address;
z_new->size = extra_space;
z_new->permissions = zone_perm;
add_zone_to_vas(pvas_head, z_new);
```

That is the whole of what `mmap()` did ten thousand times in the pitch, and why it took no time: ten thousand entries, merged into one because they were adjacent and alike, and not one byte of memory found, cleared or handed over.
Deallocation is the reverse, an entry shrunk or removed.

### Why "virtual"

A zone is bookkeeping.
It records that a range of addresses belongs to the process and what the process may do with it; it does not say that any physical memory stands behind those addresses, and at the moment it is created, none does.
The lecture's word for creating a zone is **reserving**, and the word in "virtual address space" means exactly this: the space is a set of promises about addresses, not a set of bytes.

The process has full control of its own list, through `brk()`, `mmap()` and `munmap()`, and through the calls built on them.
The kernel may still say no: a reservation past the size of the space fails (`./allocate_gb 140000` stops with `ENOMEM` near 128 TiB, the size of a user address space on x86-64), and so may one the kernel judges it could never back, depending on its overcommit policy.
Within those limits, reserving is free.

### Why virtual memory at all

Four things come out of giving every process a space of its own:

* **Simplicity.**
  Every program sees the same layout, starting from the same addresses, whatever else is running.
  Compilers and linkers can fix addresses at build time, and a program never has to ask where it was loaded.
* **Isolation.**
  A process can only name its own bytes.
  A bug, or an attack, stays inside the process it happens in, and a crash takes down one program.
* **More than there is.**
  A process can reserve more than the machine has, because reserving costs nothing, and can use more than the machine has, because what it is not using can be elsewhere.
* **Sharing.**
  Two spaces can name the same physical bytes.
  One copy of libc in memory serves every process, and part 05 shows the copy.

> **Takeaway.**
> Each process has an address space of its own, and the kernel keeps the spaces apart: the same address in two processes is two different bytes.
> The space is a list of zones, a reservation is an entry in that list, and "virtual" means that an entry promises addresses, not memory.

## 03. Virtual Memory and Physical Memory

### Two kinds of memory

If an address space is a promise, something has to keep it.
There are two kinds of memory, and the lecture keeps them apart from here on.

![Three address spaces, one physical memory](media/03-virtual-vs-physical/virtual-vs-physical.svg)

| | Virtual memory | Physical memory |
| --- | --- | --- |
| belongs to | a process: one address space each | the machine: RAM, one of it |
| how large | as large as the process reserves, up to 128 TiB | fixed, whatever is installed |
| what it is | a set of addresses, a promise | the bytes themselves |
| obtained by | reserving: `mmap()`, `brk()`, `malloc()` | allocating, by the kernel, page by page |
| given back by | `munmap()`, `brk()`, `free()` | the kernel, when it decides |
| used by | every program, through every address it forms | nobody directly |

The last row is the one to remember.
A program only ever handles virtual addresses.
Physical memory is where the bytes are, and the only way to reach a byte is through a virtual address that the kernel has attached to it.

### The two sizes of a process

`ps` reports both kinds for every process, in kilobytes: `VSZ`, the virtual size, is the sum of the zones; `RSS`, the resident set size, is how much physical memory the process holds right now.
The [show-mem demo](demos/03-virtual-vs-physical/show-mem) reads them for three programs:

| Process | `VSZ` | `RSS` | ratio |
| --- | ---: | ---: | ---: |
| `./hello` | 2,752 KB | 1,696 KB | 1.6 |
| `bash` | 10,452 KB | 4,268 KB | 2.4 |
| `chrome` | 1,544,448,496 KB | 879,760 KB | 1,755 |

`VSZ` is never smaller than `RSS`: a byte in memory has an address, but an address need not have a byte behind it.
How far apart the two are depends on the program, from a one-line program that touches most of what it maps to a browser that reserves a terabyte it will mostly never touch.

The [reserve-mem demo](demos/03-virtual-vs-physical/reserve-mem) makes the gap on purpose: three `mmap()` calls of 4 MB, then three `munmap()`s, with `ps` at each step.

```text
    PID    VSZ   RSS CMD
1195603   2752  1696 ./reserve_mem      before
1195603   6848  1696 ./reserve_mem      after mmap(4 MB, rw)
1195603  10944  1696 ./reserve_mem      after mmap(4 MB, r)
1195603  15040  1696 ./reserve_mem      after mmap(4 MB, rwx)
1195603  10944  1696 ./reserve_mem      after munmap()
1195603   6848  1696 ./reserve_mem      after munmap()
1195603   2752  1696 ./reserve_mem      after munmap()
```

`VSZ` moves by exactly 4,096 KB a step.
`RSS` is 1,696 KB seven times.
Twelve megabytes were reserved and released, and physical memory never heard about it.

### What a virtual size is made of

![What the virtual size of a process is made of](media/03-virtual-vs-physical/vsz-and-rss.svg)

So what is in `VSZ` and not in `RSS`?
Four kinds of pages, and the lecture will have explained all four by the end of part 04:

* pages that were **reserved and never touched**, like the 12 MB above and the browser's terabyte
* pages of a **file not read yet**: the program's own code and data, and the libraries', are mapped from their files at load time and read in only when used
* pages that were in memory and have been **swapped out**, to make room
* and, inside `RSS` rather than outside it, pages **shared** with other processes, such as libc's code, which every process that maps them counts as its own

The last kind is why adding up `RSS` over all processes gives a number larger than the RAM installed: the shared pages are counted once per process and exist once.

> **Takeaway.**
> Virtual memory belongs to a process and is a promise; physical memory belongs to the machine and is the bytes.
> `VSZ` is the size of the promise and `RSS` the part being kept right now; reserving moves the first and leaves the second alone.

## 04. Reserve, Allocate, Map

### Three steps, not one

"Allocating memory" is three operations, and the lecture has been using the words loosely until now.

![Reserve, allocate, map](media/04-reserve-allocate-map/reserve-allocate-map.svg)

1. **Reserve** virtual memory: add a zone to the process's list, or extend one.
1. **Allocate** physical memory: take a free page of RAM for this process.
1. **Map** the one to the other: record that this virtual page is backed by that physical page, so that an address in the zone reaches the bytes.

| Step | Done by | When | What it costs |
| --- | --- | --- | --- |
| reserve | `mmap()`, `brk()`, and so `malloc()`; the loader, for the static areas; the kernel, for the stack | at the call | an entry in a list |
| allocate | the kernel | at the first access to each page | a page of RAM, found and zero-filled |
| map | the kernel | right after allocating, for the same page | an entry in the page table |

Step 1 happens alone all the time: it is what the pitch, the reserve-mem demo and the browser do.
Steps 2 and 3 never happen apart.
A physical page is only ever given to a process by mapping it to one of the process's virtual pages, because a page with no virtual address is a page the process has no way to reach.

### Paying on the first touch

![From a reservation to a mapped page](media/04-reserve-allocate-map/first-touch.svg)

Nothing in the three-step table says that steps 2 and 3 happen at the call, and they do not.
They happen at the first access to each page, which works as follows.

The program writes to an address inside a zone it has reserved.
The hardware looks up the page the address is in, finds that nothing is mapped there, and stops the instruction; this is a **page fault**, and it hands control to the kernel.
The kernel checks its list of zones: the address is inside one, and the zone allows writing, so the fault is legitimate.
It allocates a physical page, fills it with zeroes, maps it to the virtual page, and returns to the program, which runs the same instruction again.
This time the address resolves, the write lands, and the program never knew.

That is **demand paging**: physical memory arrives when it is demanded, one page at a time, and not before.
The [reserve-allocate demo](demos/04-reserve-allocate-map/reserve-allocate) reserves 4 MB and writes one byte into each of the first 512 pages:

```text
                                    VSZ   RSS  faults   the zone, in pmap
before                             2752  1696      65   --
after mmap(4 MB)                   6848  1696      65   4096       0       0 rw---   [ anon ]
after writing to 512 pages         6848  3744     577   4096    2048    2048 rw---   [ anon ]
after munmap()                     2752  1696     577   --
```

The `mmap()` changed `VSZ` and nothing else.
The writes changed nothing in `VSZ`, added 2,048 KB to `RSS`, and took 512 page faults: one per page touched, and none for the 512 pages that were not.
The [page-faults demo](demos/04-reserve-allocate-map/page-faults) counts from inside the program:

```text
mmap():                          0 page faults
first write to every page:    1024 page faults
second write to every page:      0 page faults
```

Once a page is mapped, the hardware translates its addresses on its own, and the kernel is not involved again for as long as the page stays in memory.
The cost of demand paging is paid once per page, and a page that is never touched costs nothing at all.

The same demo shows the kernel doing even less when it can.
Read a fresh page instead of writing it, and the kernel maps it to a single shared, read-only **zero page** rather than allocating one; `RSS` goes up, physical memory does not.
Write to it afterwards and the page faults again, and this time gets a page of its own: copy-on-write, which lecture 05 meets again between processes.

### Why `VSZ` is larger than `RSS`, resolved

Part 03's four kinds of pages now have their mechanism.
Reserved and never touched: step 1 without steps 2 and 3.
File not read yet: the loader reserves the program's code and data as zones backed by the executable, and each page is read from the file at its first access, by the same page fault.
Swapped out: the kernel took the physical page back, saved its contents, and unmapped it; the next access faults and brings it back.
Shared: steps 2 and 3 happened once, and the mapping was made in several page tables.

And the browser is explained.
Its engine reserves a terabyte as a fenced-off region to hand out pieces of later; the reservation is one zone, no page of it is touched until used, and `RSS` reports what was.

### Where the mapping goes

The one thing this part has assumed is a place to write step 3 down: for every virtual page the process has touched, which physical page holds it.
The hardware reads that record on every access, so it has to be a structure the hardware understands, and it has to be per process, since two processes map the same virtual page to different places.
That structure is the page table, and it is part 05.

> **Takeaway.**
> Allocation is three steps: reserve a zone, allocate a physical page, map one to the other.
> `malloc()` and `mmap()` do the first; the first access to each page does the other two, through a page fault, once; and a page never touched never costs anything, which is why `VSZ` can be a thousand times `RSS`.

## 05. Pages and the Page Table

### Pages and frames

![Pages and frames](media/05-page-table/pages-and-frames.svg)

Memory is managed in fixed-size pieces.
Virtual memory is cut into **pages** and physical memory into **frames** of the same size, 4 KB on x86-64 Linux (`getconf PAGESIZE`), and the mapping of part 04 is from pages to frames: any page may be mapped to any frame, and consecutive pages need not land in consecutive frames.

A virtual address is therefore two numbers: the **page number**, which is the address divided by the page size, and the **offset** within the page, which is the remainder.
With 4 KB pages the split is at the last twelve bits, three hex digits: address `0x7cc0081e7abc` is byte `0xabc` of page `0x7cc0081e7`.
Mapping a page to a frame means replacing the page number by the frame number and keeping the offset, so one entry serves all 4,096 bytes of the page.

Fixed-size pieces are what make the rest simple:

* allocating a frame is taking any free one, and there is no "not enough room in one piece", because every piece is the same size
* sharing, swapping, protecting and copying all work on whole pages, with one entry each
* the price is paid at the edges: a zone of 100 bytes takes a 4,096-byte page, and a 4 MB zone with one byte written holds one frame

Why 4 KB and not 4 MB, and what the choice costs, is next lecture's question.

### The page table

![The page table](media/05-page-table/page-table.svg)

The mapping lives in the **page table**: one per process, an array with one entry per virtual page, indexed by the page number.

```c
struct page_table_entry {
	bool valid;
	unsigned int frame_index;
	unsigned int permissions;
	unsigned int flags;
};

struct page_table_entry page_table[N];
```

An entry says whether the page is present in memory (`valid`), which frame holds it, what may be done with it (read, write, execute, which is where the permissions of lecture 03 are actually enforced), and a few more bits the kernel and the hardware use: whether the page has been written to since it was mapped, whether it has been accessed recently.
The kernel fills the table in, one entry per page fault, and clears entries when it takes frames away.
The virtual page number is the index; the frame number is what comes out.

The [pagemap demo](demos/05-page-table/pagemap) reads a process's own table, which the kernel exports through `/proc/self/pagemap` as exactly such an array: one 64-bit entry per page, at offset `page_number * 8`.
Four fresh pages, before and after touching two of them:

```text
after mmap(), before any access:
  page 0: virtual 0x7cc0081e7000  index 0x7cc0081e7  present 0
  page 1: virtual 0x7cc0081e8000  index 0x7cc0081e8  present 0
  page 2: virtual 0x7cc0081e9000  index 0x7cc0081e9  present 0
  page 3: virtual 0x7cc0081ea000  index 0x7cc0081ea  present 0
after writing to pages 0 and 2:
  page 0: virtual 0x7cc0081e7000  index 0x7cc0081e7  present 1
  page 1: virtual 0x7cc0081e8000  index 0x7cc0081e8  present 0
  page 2: virtual 0x7cc0081e9000  index 0x7cc0081e9  present 1
  page 3: virtual 0x7cc0081ea000  index 0x7cc0081ea  present 0
```

The reservation created four invalid entries; the two writes made two of them valid, through two page faults, and the other two are still unpaid.
Run as root, the demo also shows the frame numbers:

```text
  page 0: virtual 0x7e62419b6000  index 0x7e62419b6  present 1  frame 0x3bef35
  page 1: virtual 0x7e62419b7000  index 0x7e62419b7  present 1  frame 0x6c7f90
  page 2: virtual 0x7e62419b8000  index 0x7e62419b8  present 1  frame 0x8b48ec
```

Three consecutive pages, three frames scattered across the machine's RAM: 16 GB, 29 GB and 37 GB from its start.
Any page, any frame; the table is what remembers which.

### Translation, on every access

![Address translation](media/05-page-table/address-translation.svg)

The CPU only ever issues virtual addresses.
Between it and memory sits the **memory management unit** (MMU), a piece of the processor that performs, for every single load, store and instruction fetch:

```c
frame_index = page_table[page_index].frame_index;
physical_address = frame_index * PAGE_SIZE + offset;
```

after checking that the entry is valid and that its permissions allow the access.
If the entry is valid, the access proceeds, at full speed, with the kernel nowhere in the picture.
If it is not, the MMU raises a page fault and the kernel decides what it means: an address inside a reserved zone, and the fault is demand paging doing its work; an address outside every zone, or an access the zone does not allow, and the fault becomes the `SIGSEGV` of lecture 03, `SEGV_MAPERR` or `SEGV_ACCERR`.
The segmentation fault and demand paging are the same hardware event, told apart by the kernel's list of zones.

The pitch's two facts are now one mechanism.
Two processes at `0x404040` have two page tables, and the same index in each holds a different frame; the [shared-frame half of the pagemap demo](demos/05-page-table/pagemap) shows the opposite case:

```text
pid 1209193: printf() is at 0x76398c263f90   -> frame 0xfac4bd
pid 1209195: printf() is at 0x722fcc463f90   -> frame 0xfac4bd
```

Two processes, two different virtual pages for `printf()`, one frame.
There is one copy of libc's code in physical memory, and `/proc/kpagecount` says 229 page tables point at that frame.
And a browser with 1.5 TB has a page table in which almost every entry is invalid, which costs nothing per entry until the entry is needed.

### What this costs, and next time

An array with one entry per page of a 128 TiB space has 2^35 entries, 256 GB of table per process if laid out flat, and the MMU reads it on every access, which would halve the speed of every program.
Neither happens, and how not is lecture 05: page tables built in levels so that unused parts take no space, a cache of translations in the processor so that most accesses never read the table, and what the kernel does inside a page fault when the page is on disk rather than merely not yet touched.

> **Takeaway.**
> Memory is handled in 4 KB pages, mapped to frames by a page table that is an array indexed by the virtual page number, one per process.
> The kernel writes the entries, one per page fault; the hardware reads them on every access; and an entry that is missing or forbids the access is the kernel's chance to allocate, or to kill.

## 06. Conclusion

The lecture covered:

* three observations that rule out "an address is a place in RAM": a browser with 1.5 TB, a 10 TB reservation that costs nothing, two processes at the same address with different values
* the recap: a process is a list of areas, allocation changes the list, `malloc()` sits on an allocator over `brk()` and `mmap()`, and none of it says where the bytes are
* the virtual address space: one per process, a list of zones, reservation as an entry in it, and the four reasons to do it this way
* virtual against physical memory, `VSZ` against `RSS`, and what the gap between them is made of
* allocation as reserve, allocate, map; demand paging; the page fault as the moment physical memory arrives, once per page
* pages and frames, the page table as an array indexed by page number, and the MMU walking it on every access

If one thing survives the week, make it this.

> **Takeaway.**
> All addresses are virtual.
> Every process has an address space of its own, a list of zones, and allocating memory only adds to the list; physical memory arrives at the first access to each page, through a page fault, and the mapping from pages to frames is kept in a page table, one per process, that the hardware consults on every access.
> That one mechanism gives isolation, more memory than there is, sharing, and the same layout for every program.

## Where this goes next

* **Lecture 05** stays inside the page fault: what the kernel does when the page is on disk, how a 2^35-entry table is kept small with levels, how the TLB keeps translation off the critical path, and what `fork()` does with page tables and copy-on-write.
* **Lab 03** is this lecture's calls in practice: `mmap()` as a buffer in exercise 04, and the page-fault count of a 63 MiB frame in the `malloc()` tuning bonus.
  Start at [`labs/03-memory-ops-full/`](../../labs/03-memory-ops-full).
* **Lab 04** debugs the faults: every segmentation fault in it is a page table entry that said no, and `valgrind` and `gdb` are how to find out which access asked.
* **Lecture 06** reuses the address space as the thing a process owns and threads share.

## References

### Manuals

* `man 2 mmap`, `man 2 munmap`, `man 2 brk`, `man 2 madvise`, `man 2 getrusage` (`ru_minflt`)
* `man 5 proc`: `/proc/[pid]/maps`, `/proc/[pid]/smaps`, `/proc/[pid]/status`, `/proc/[pid]/pagemap`, `/proc/sys/vm/overcommit_memory`
* `man 1 ps` (`vsz`, `rss`), `man 1 pmap`, `man 1 getconf` (`PAGESIZE`)

### Kernel documentation

* [`pagemap`, from the userspace perspective](https://www.kernel.org/doc/html/latest/admin-guide/mm/pagemap.html)
* [Overcommit accounting](https://www.kernel.org/doc/html/latest/mm/overcommit-accounting.html)
* [Concepts overview](https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html) of the memory management subsystem: virtual memory, pages, page tables, anonymous and file-backed memory

### Books

* Arpaci-Dusseau, [*Operating Systems: Three Easy Pieces*](https://pages.cs.wisc.edu/~remzi/OSTEP/), chapters 13 (the abstraction: address spaces), 15 (address translation), 18 (paging: introduction) and 21 (swapping: mechanisms)
* Bryant and O'Hallaron, *Computer Systems: A Programmer's Perspective*, chapter 9 (virtual memory), sections 9.1 to 9.6
* Kerrisk, *The Linux Programming Interface*, chapters 6 (the virtual memory of a process) and 49 (memory mappings)
* Gorman, [*Understanding the Linux Virtual Memory Manager*](https://www.kernel.org/doc/gorman/), chapters 3 (page table management) and 4 (process address space); old, and still the clearest account of the data structures

### Worth reading

* [The V8 Sandbox](https://v8.dev/blog/sandbox), on why a browser reserves a terabyte of address space on purpose
* Gustavo Duarte, [How the Kernel Manages Your Memory](https://manybutfinite.com/post/how-the-kernel-manages-your-memory/) and [Anatomy of a Program in Memory](https://manybutfinite.com/post/anatomy-of-a-program-in-memory/), the two best illustrated walks through zones and page tables

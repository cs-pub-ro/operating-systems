# Session 05: Paging - Full Contents

This is the complete version of the fifth lecture: the argument in full sentences, the diagrams, the demos with their reference output, and the reading behind each part.

Read it before the lecture if you want to follow the live delivery without taking notes, and after it for everything that was said once and quickly.
The one-page plan used during the lecture is [`05-paging-live/`](../05-paging-live).

Lecture 04 ended with a mechanism: every process has a virtual address space, an allocation only reserves a part of it, and physical memory arrives at the first access to each page, through a page fault, recorded in a page table that the hardware reads on every access.
This lecture goes inside that mechanism.
It opens the page fault and follows the kernel's decision; it asks where the frame comes from when there is one to give and what happens when there is not; it shows frames shared between processes and copied only when written; and it ends with the two problems a page table creates, size and speed, and how both are solved.

## Learning objectives

By the end of this lecture you should be able to:

* Describe the two structures that describe a process's memory, the kernel's list of zones and the hardware's page table, and say which operation edits which.
* Follow a page fault from the faulting instruction to the kernel's verdict, and tell its four outcomes apart: minor fault, major fault, `SEGV_MAPERR` and `SEGV_ACCERR`.
* Name where the frame for a page comes from -- zeroed, from the page cache, from disk, from swap -- and explain what the kernel does when RAM is short.
* Read `RSS`, `PSS` and `USS` for what they measure, explain why `RSS` overcounts, and describe copy-on-write.
* Explain why a page table is a multi-level tree and why a TLB is needed, and estimate what each saves.

## What is here

| Part | What it answers | Demos |
| --- | --- | --- |
| [00. Pitch](#00-pitch-billions-of-faults) | How often does the kernel touch memory on a program's behalf, and why do the numbers not add up? | [`00-pitch/`](demos/00-pitch) |
| [01. Two views of one address space](#01-two-views-of-one-address-space) | What does the kernel keep, what does the hardware read, and who edits what? | [`01-two-views/`](demos/01-two-views) |
| [02. The page fault](#02-the-page-fault) | What happens between the instruction and the frame, and when is it a crash? | [`02-page-fault/`](demos/02-page-fault) |
| [03. Where frames come from](#03-where-frames-come-from) | Where does the kernel find a frame, and what does it do when it cannot? | [`03-frames/`](demos/03-frames) |
| [04. Memory sharing](#04-memory-sharing) | How can one frame belong to many processes, and what happens when one of them writes? | [`04-memory-sharing/`](demos/04-memory-sharing) |
| [05. Storing the page table](#05-storing-the-page-table) | How does a table with billions of entries fit, and how is it read without slowing everything down? | [`05-page-table/`](demos/05-page-table) |
| [06. Conclusion](#06-conclusion) | What should survive the week? | -- |

The slides are in [`slides/`](slides); the demos, with build instructions and reference output, are in [`demos/`](demos).
The planned narrative of the live delivery is in [`STORYLINE.md`](STORYLINE.md), with [the storyline figure](media/00-pitch/storyline.svg) that walks through it.

## 00. Pitch: Billions of Faults

Three numbers from a desktop that has been up for seventeen days.

**Ten billion page faults.**

```text
$ grep -E '^pgfault|^pgmajfault' /proc/vmstat
pgfault 9687532485
pgmajfault 148220
$ ps -eo pid,min_flt,maj_flt,rss,comm --sort -min_flt | head -2
    PID  MINFL  MAJFL   RSS COMMAND
  38939 1651432334  3 626112 chrome
```

9.7 billion page faults in seventeen days is 6,600 a second, averaged over a machine that mostly sits idle; one browser process has taken 1.65 billion on its own.
Each one is an instruction the hardware stopped and the kernel finished.
Only 148,220 of them, one in 65,000, needed the disk.
The [page-faults demo](demos/00-pitch/page-faults) reads the counters.

**More resident memory than memory.**

```text
$ ps -eo rss= | awk '{ s += $1 } END { print s / 1024 " MB" }'
58339 MB
$ free -m
               total        used        free      shared  buff/cache   available
Mem:           60900       41409        2891        3839       21688       19490
```

The processes say they hold 58 GB.
The machine has 61 GB and says 41 GB are in use, kernel included.
`smem` totals the same processes at 34 GB of `PSS`; the [total-rss demo](demos/00-pitch/total-rss) has the three totals side by side.

**Memory that is not in memory.**

```text
$ swapon --show
NAME      TYPE      SIZE   USED PRIO
/dev/dm-1 partition  80G 834.2M   -2
```

834 MB of what some processes consider their memory is on a disk partition, and they have not noticed.

Lecture 04 said that physical memory arrives in a page fault and that `RSS` is what a process holds right now.
This lecture is what happens inside the fault, why the holdings add up to more than there is, and how a page can be held without being in RAM.

> **Takeaway.**
> The page fault is the most frequent thing the kernel does, and nearly all of them are served from memory.
> `RSS` adds up to more than the machine has because frames are shared, and a process's pages can live on disk without the process knowing.
> Each of those three facts is a part of this lecture.

## 01. Two Views of One Address Space

### The list and the table

Lectures 03 and 04 built two descriptions of the same thing, and it is time to put them side by side.

![Two views of one address space](media/01-two-views/two-views.svg)

The **list of zones** is the kernel's.
Each entry is a start, a size and permissions; `pmap` prints it; `mmap()`, `brk()`, `munmap()` and `mprotect()` edit it.
It says what the process *may* do with each address: nothing, if no zone covers it; read, write or execute, as the zone allows.

The **page table** is the hardware's.
It has one entry per page of the address space, indexed by the virtual page number, and each entry says whether the page is present, in which frame, and with what permissions.
The MMU reads it on every access; the kernel writes it.
It says what the process *has* at each address right now: a frame, or not.

```c
struct zone {                          struct page_table_entry {
	unsigned long start;                   bool valid;
	unsigned long size;                    unsigned int frame_index;
	unsigned int permissions;              unsigned int permissions;
	struct zone *next, *prev;              unsigned int flags;
};                                     };
```

The [zones-and-pages demo](demos/01-two-views/zones-and-pages) counts both for the shell:

```text
$ grep -c . /proc/$$/maps
33
$ awk '/^VmSize/ { v = $2 } /^VmRSS/ { r = $2 } END { print "pages:", v / 4, " present:", r / 4 }' /proc/$$/status
pages: 2647  present: 1098
```

Thirty-three zones; 2,647 pages inside them; 1,098 of those with a frame.
The 1,549 others are allowed and absent: parts of libc the shell has never run, parts of its heap it has not reached, pages of files it has not read.

### Who edits what

The kernel owns both structures, but it edits them from two different places.

The list changes when the process asks: a system call adds a zone, removes one, extends or shrinks or re-protects one.
The hardware never looks at the list.

The table changes when the hardware asks: an access to a page with no valid entry traps into the kernel, and the kernel's page fault handler fills the entry in.
The process never asks for that, and cannot.

The MMU is the only reader of the table and performs, on every load, store and instruction fetch, the translation lecture 04 described: the page number indexes the table, the frame number comes out, the offset is kept, and the entry's permissions are checked against the access.

![The page table](media/01-two-views/page-table.svg)

### Two edits

![Reserving edits the list; the first touch edits the table](media/01-two-views/two-edits.svg)

The [reserve-allocate demo](demos/01-two-views/reserve-allocate) is lecture 04's experiment read against the two structures: reserve 4 MB, write the first byte of every page, write the last byte of every page, unmap.

```text
                                       VSZ   RSS  MINFL
before                                2752  1692     64
after mmap(4 MB)                      6848  1692     64
after writing byte 0 of every page    6848  5788   1088
after writing byte 4095 of every page 6848  5788   1088
after munmap()                        2752  1692   1088
```

`mmap()` changed `VSZ`, the sum of the zones, and nothing else: an entry in the list, 1024 invalid entries in the table.
The first writes changed `RSS`, the count of valid entries, by 4 MB, and took 1,024 faults: the list untouched, 1024 entries filled in, one per fault.
The second writes changed nothing, because byte 4095 is in a page whose entry is already valid, and the hardware translated the address without the kernel.
`munmap()` removed the zone and, with it, every entry inside it.

Reserving edits the list; touching edits the table; and the only path from the first to the second is the page fault.

> **Takeaway.**
> A process's memory is described twice: by the kernel's list of zones, which says what is allowed, and by the page table, which says what is there.
> System calls edit the list and the page fault handler edits the table; the hardware reads only the table.

## 02. The Page Fault

### Step by step

![Inside a page fault](media/02-page-fault/page-fault-flow.svg)

1. An instruction forms a virtual address `A` and accesses it.
1. The MMU takes the page number of `A`, reads the page table entry, and checks two things: that the entry is valid, and that its permissions allow this access.
   If both hold, the access proceeds, and nothing else in this list happens; that is the common case, billions of times a second.
1. If either fails, the MMU stops the instruction before it completes and raises a **page fault**: a trap into the kernel, like the one a system call makes (lecture 02), except that the hardware initiated it, not the program.
   The kernel receives the address and the kind of access.
1. The kernel looks `A` up in the list of zones.
   If no zone covers it, the verdict is `SIGSEGV` with `SEGV_MAPERR`.
1. If a zone covers it but the zone does not allow this kind of access, the verdict is `SIGSEGV` with `SEGV_ACCERR`.
1. Otherwise the access is legitimate, and the kernel has to provide the frame.
   If the page's content is already somewhere in memory, it maps the frame: a **minor fault**.
   If the content is on disk, it reads it in first: a **major fault**.
1. The kernel fills in the page table entry and returns to the process, which runs the same instruction again.
   This time step 2 succeeds.

The program's view of a fault that was fixed is nothing at all; its view of a fault that was not is a signal.

### Four verdicts

| verdict | the address is | the frame | the process sees | time |
| --- | --- | --- | --- | --- |
| minor fault | in a zone, access allowed | found in memory | nothing | about a microsecond |
| major fault | in a zone, access allowed | read from disk | nothing, but a delay | milliseconds |
| `SEGV_MAPERR` | in no zone | -- | `SIGSEGV` | -- |
| `SEGV_ACCERR` | in a zone that forbids the access | -- | `SIGSEGV` | -- |

The [segfault demo](demos/02-page-fault/segfault) produces the two kills on purpose: one page, mapped read-write or read-only, accessed inside or one byte past its end.

```text
$ ./segfault 6
Reserve ro page with mmap.
Write to first byte in page.
SIGSEGV at 0x7dd401855000: SEGV_ACCERR: the zone forbids this access
$ ./segfault 3
Reserve rw page with mmap.
Read out of bounds.
SIGSEGV at 0x755bca209000: SEGV_MAPERR: no zone covers the address
```

The hardware did the same thing for all eight of the demo's accesses: no valid entry, trap.
The kernel's list of zones turned three of them into frames, one into `SEGV_ACCERR`, four into `SEGV_MAPERR`.
The segmentation fault of lecture 03 and the demand paging of lecture 04 are one event with two verdicts.

The [major-fault demo](demos/02-page-fault/major-fault) produces the two fixes: the same 64 MB file, read once after it was dropped from memory and once more.

```text
$ ./major_fault
first pass (from disk):           1 minor,  16384 major faults, 0.302 s
second pass (from the cache):  1024 minor,      0 major faults, 0.002 s
```

16,384 major faults, one per page, at 18 microseconds each on an SSD; then 1,024 minor faults for the same pages, in two milliseconds.
Same instructions, same addresses, a factor of 150, and the only difference is where the content was when the fault arrived.
The second pass took 1,024 faults rather than 16,384 because, when the frames are already there, the kernel maps the faulting page and its neighbours together.

### The fault as the kernel's entry point

A system call is the program asking the kernel for something.
A page fault is the hardware asking the kernel on the program's behalf, and it is the second way into kernel mode that lecture 02 did not cover.
Everything this lecture describes from here on -- demand paging, reading files in, swapping, sharing, copy-on-write -- is work the kernel does inside that handler, between the trap and the retry.

> **Takeaway.**
> A page fault is a trap the MMU raises when an entry is missing or forbids the access.
> The kernel looks the address up in the list of zones and gives one of four verdicts: a frame from memory, a frame from disk, or a `SIGSEGV` for an address in no zone or an access the zone forbids.

## 03. Where Frames Come From

### Four sources

![Where the frame for a page comes from, and where it goes](media/03-frames/frame-sources.svg)

When the verdict is "provide a frame", the kernel has four places to get the content from, and the page's zone says which.

* **Nothing yet.**
  An anonymous page -- heap, stack, an `mmap()` with no file -- touched for the first time has no content; the kernel takes a free frame and zero-fills it.
  A minor fault, and the one lecture 04 counted.
* **The page cache.**
  A page of a file -- the program's code, a library, an `mmap()` of a file -- whose content the kernel already holds in memory, because it was read recently or because another process has it mapped.
  The kernel maps the existing frame; a minor fault.
* **A file on disk.**
  The same, when the content is not in memory: the kernel reads it from the file into a page-cache frame, then maps it.
  A major fault.
* **The swap area.**
  An anonymous page the kernel took away earlier and saved to disk; it reads it back into a frame and maps it.
  A major fault.

The **page cache** is the one to name.
It is the kernel's memory for file contents: every file read, written or mapped goes through it, and a frame in it can serve as many processes as map the file.
The [page-cache demo](demos/03-frames/page-cache) looks at it:

```text
$ free -m
               total        used        free      shared  buff/cache   available
Mem:           60900       41409        2891        3839       21688       19490
$ fincore /usr/bin/bash /usr/lib/x86_64-linux-gnu/libc.so.6 2>/dev/null
  RES PAGES  SIZE FILE
 1.7M   426  1.7M /usr/bin/bash
 2.1M   532  2.1M /usr/lib/x86_64-linux-gnu/libc.so.6
```

Twenty-one gigabytes of this machine is `buff/cache`; every page of `bash` and of libc is in it, because processes are running them.
The text zone of a process is a mapping of its executable, and its frames *are* the page cache's frames.
Lecture 03's buffer cache, seen from the disk's side, and the page cache, seen from the process's side, are the same memory.

### When RAM is short

Frames go back the way they came.
When free memory runs low, the kernel **reclaims**: it picks pages that have not been used recently, invalidates their entries, and frees their frames.
A clean page of a file costs nothing to reclaim; the file still has the content, and the next access is a major fault that reads it back.
A dirty anonymous page has content that exists nowhere else, so the kernel first writes it to the **swap area**, a partition or file set aside for this, and only then frees the frame; the next access is a major fault that reads it from there.

The [swap demo](demos/03-frames/swap) forces this on one process by running it in a memory cgroup of 64 MB and having it write 256 MB:

```text
$ systemd-run --user --scope -p MemoryMax=64M ./swap
start:                   RSS      1 MB   swap      0 MB   major faults      0   0.00 s
after writing 256 MB:    RSS     63 MB   swap    193 MB   major faults      3   0.62 s
after reading it back:   RSS     64 MB   swap    192 MB   major faults   8424   2.19 s
```

The write succeeded, page by page, and as it went on the kernel took back the pages written earlier, wrote them to swap and invalidated their entries; 63 MB resident, 193 MB on disk.
Reading the 256 MB back is 8,424 major faults and two seconds, for a loop that without the box takes no measurable time: every page read in pushes another one out, because the box is still 64 MB.
The program's code never changed and it never knew; it only got slower.

That is what a machine that is "out of memory" does: not stop, but turn memory accesses into disk accesses, until the working set fits again or the slowness becomes unbearable.
The kernel's last resort, when there is no swap left either, is to kill a process, which is lecture 07's territory.

> **Takeaway.**
> A frame comes from a zeroed page, from the page cache, from a file on disk or from swap, and the first two are minor faults while the last two are major.
> When RAM is short the kernel takes frames back, dropping clean file pages and writing dirty anonymous ones to swap; the next access is a major fault, and the program only sees the time.

## 04. Memory Sharing

### One frame, many page tables

Nothing in the page table says a frame belongs to one process.
Two tables can hold the same frame number, and the kernel does this all the time without being asked: the frames of an executable in the page cache are mapped into every process running it, and the frames of libc into every process on the machine.

![One frame, three page tables](media/04-memory-sharing/shared-frames.svg)

That is why `RSS` overcounts.
`RSS` counts every valid entry in a process's table, and a shared frame has a valid entry in every process that maps it.
Two other metrics correct for it:

| metric | counts a frame shared by n processes as | summed over all processes |
| --- | --- | --- |
| `RSS`, resident set size | one full page, in each of the n | more than the memory in use |
| `PSS`, proportional set size | 1/n of a page, in each of the n | the memory the processes use |
| `USS`, unique set size | nothing, unless n is 1 | what exiting them all would free |

The [uss-pss-rss demo](demos/04-memory-sharing/uss-pss-rss) reads them for the shell, zone by zone:

```text
62c63257a000-62c6326b0000 r-xp 00030000 fc:03 29884740   /usr/bin/bash
Rss:                1240 kB
Pss:                  63 kB
62c66092d000-62c660f62000 rw-p 00000000 00:00 0          [heap]
Rss:                6228 kB
Pss:                6228 kB
```

The shell's code is 1,240 KB resident and 63 KB of `PSS`: about twenty processes are running `bash` on this machine, and the one copy in the page cache is split twenty ways.
Its heap is all its own.
The pattern holds in general: file-backed, read-only or executable zones are shared with everyone who maps the file; writable zones are private.

The [uss-pss-rss-multiple demo](demos/04-memory-sharing/uss-pss-rss-multiple) runs ten copies of a program four ways:

| ten processes from | `USS` each | `PSS` each | `RSS` each | real total |
| --- | ---: | ---: | ---: | ---: |
| one static executable | 52 KB | 115 KB | 708 KB | 1.2 MB |
| one dynamic executable | 100 KB | 104 KB | 1,688 KB | 1.1 MB |
| ten static executables | 708 KB | 708 KB | 712 KB | 7.1 MB |
| ten dynamic executables | 116 KB | 120 KB | 1,692 KB | 1.2 MB |

Ten processes from one static executable share its 650 KB of code and cost 1.2 MB between them; ten from ten different static executables share nothing and cost 7.1 MB.
The dynamic ones have the largest `RSS` and the smallest `PSS`, because nearly all of what they map is libc, and libc is shared with hundreds of processes, not ten.
The pitch's 58 GB of `RSS` against 34 GB of `PSS` is the same effect across a whole desktop.

### Copy-on-write

Sharing a frame is safe as long as nobody writes to it.
The kernel's answer to writes is to share anyway, and to copy at the last possible moment.

![`fork()` shares every frame; the first write copies one page](media/04-memory-sharing/copy-on-write.svg)

`fork()` is the clearest case.
The child needs a copy of the parent's memory, and copying gigabytes would make every `fork()` take seconds.
Instead the kernel copies the page table, so that both processes point at the same frames, and marks the entries read-only in both.
Reads proceed as before.
The first write by either process to a page hits a read-only entry and faults; the kernel sees in its list of zones that the zone is writable and private, concludes that the fault is a request to un-share, allocates a frame, copies the one page, points the writer's entry at the copy, read-write, and retries the write.
The [fork-cow demo](demos/04-memory-sharing/fork-cow) measures it on 64 MB:

```text
parent before fork():         Rss  67096 kB  Pss  65654 kB  Shared_Dirty      0 kB  Private_Dirty  65648 kB
child  after fork():          Rss  66348 kB  Pss  32839 kB  Shared_Dirty  65616 kB  Private_Dirty     28 kB
child  reads every page:     0 page faults
child  writes to every page: 16384 page faults
child  after writing:         Rss  66604 kB  Pss  65610 kB  Shared_Dirty     76 kB  Private_Dirty  65568 kB
parent p[0] is still 1
```

After the fork the child has 64 MB resident and owns none of it; `PSS` is half, `Shared_Dirty` is everything.
Reading costs nothing.
Writing costs one fault per page, 16,384 of them, and at the end the child owns 64 MB of copies and the parent's data is untouched.

The same trick serves private mappings of files: the data segment of a program is mapped from the executable, shared with every other process running it, and copied page by page as each process writes to its own globals.
`fork()` itself, and what a child does next, is lecture 06.

### Explicit sharing

Everything above is sharing the kernel did on its own.
Processes can also ask for it: a `MAP_SHARED` mapping of a file, or a shared memory object from `shm_open()`, is a zone whose frames two processes agree to share and to write to, with no copy on write.
It is the fastest way two processes can communicate, and it needs synchronisation, which is why it waits for the lectures on inter-process communication.

> **Takeaway.**
> One frame can be in any number of page tables, and the kernel shares the page cache's frames between every process that maps the same file; `RSS` counts them once per process, `PSS` splits them, `USS` leaves them out.
> `fork()` shares every frame read-only and the first write to a page copies that page: copy-on-write.

## 05. Storing the Page Table

### A table too big

A page table with one entry per page of the 128 TiB user address space has 2^35 entries of 8 bytes: 256 GB, per process, before the process has touched anything.
A table that only covered the shell's own 10 MB would be 21 KB, but it cannot "only cover" the zones, because the stack is at `0x7ffd...`, the libraries at `0x7f...`, the program at `0x5...`, and an array indexed by the page number has to span the distance between them.

![A page table in four levels](media/05-page-table/multi-level.svg)

So the table is a tree.
On x86-64 the 48-bit virtual address is split into four indices of 9 bits and an offset of 12:

```text
| 9 bits: level 4 | 9 bits: level 3 | 9 bits: level 2 | 9 bits: level 1 | 12 bits: offset |
```

Each level is a table of 512 entries that fits in one 4 KB page; an entry of the level-4 table points to a level-3 table, and so on down to the level-1 entry that holds the frame number.
The processor keeps the address of the root in a register (`CR3`), loaded by the kernel on every switch between processes.
A branch below which no page is mapped is simply absent, so an empty address space costs one page of table and a full one costs about 1/512 of what it maps.

The [table-size demo](demos/05-page-table/table-size) reads what the kernel reports as `VmPTE`:

```text
$ grep -E 'VmSize|VmRSS|VmPTE' /proc/$$/status
VmSize:    10588 kB
VmRSS:      4392 kB
VmPTE:        60 kB
$ grep -E 'VmSize|VmRSS|VmPTE' /proc/$(pgrep -f chrom | tail -1)/status
VmSize: 1522658872 kB
VmRSS:   1284720 kB
VmPTE:      7812 kB
```

Sixty kilobytes of tables for the shell: fifteen pages, for the root, the path to each cluster of zones, and the leaves of the pages actually mapped.
Eight megabytes for a browser with 1.5 TB of address space, where a flat table would be 3 GB.
The size of the tree follows what is mapped, not what is reserved, which is the only reason a process can reserve a terabyte for free.

Two refinements, both named here and no more.
A level-2 entry can point at a 2 MB frame directly instead of at a level-1 table, which is a **huge page**: one entry for 512 pages, and the TLB below likes it.
And processors since 2017 can add a fifth level for 57-bit addresses, which Linux uses only when a process asks for an address above 128 TiB.

### A table too slow

A tree in memory has a price the flat array did not: every translation that starts from scratch is four memory reads, one per level, before the one the program asked for.
At that rate every program would run at a fifth of its speed.

![The TLB](media/05-page-table/tlb.svg)

The **translation lookaside buffer** (TLB) is a small cache inside the processor that remembers recent translations, page number to frame number with permissions, a few dozen entries in its first level and a few thousand in its second.
On every access the MMU looks there first.
A hit costs nothing visible; a miss costs the page walk, four reads, usually served from the processor's ordinary caches, which is why it costs nanoseconds rather than hundreds of them.
Programs that use the same pages again and again, which is most programs most of the time, hit almost always, and the page table is read rarely.

The [tlb demo](demos/05-page-table/tlb) defeats the TLB on purpose, walking 512 MB one byte per page, and asks the hardware to count:

```text
$ sudo perf stat -e dTLB-load-misses,dTLB-loads ./tlb
one byte per 4 KB page, 512 MB, 4 KB pages: 6.5 ns per access
         1,488,442      dTLB-load-misses   #   91.92% of all dTLB cache accesses
         1,619,221      dTLB-loads
$ sudo perf stat -e dTLB-load-misses,dTLB-loads ./tlb huge
one byte per 4 KB page, 512 MB, 2 MB pages: 4.9 ns per access
            13,569      dTLB-load-misses   #   53.85% of all dTLB cache accesses
            25,198      dTLB-loads
```

With 4 KB pages, 131,072 distinct translations cycle through a TLB that holds a couple of thousand: 1.49 million misses, a page walk for almost every access.
With the same 512 MB on 2 MB pages, 256 translations cover the walk and the misses drop a hundredfold; the time per access drops too, and what remains is the cache miss on the data itself, which no TLB can help.

The TLB has one cost of its own: its entries belong to one address space, so the kernel has to flush them, or tag them with an address-space identifier, whenever it switches from one process to another.
That is part of what a context switch costs, and lecture 06 will count it.

> **Takeaway.**
> The page table is a four-level tree so that only the branches in use exist: a flat table would be 256 GB per process, the shell's tree is 60 KB.
> A tree costs four reads per translation, so the processor caches translations in the TLB and reads the table only on a miss; most programs miss rarely, and a walk through a large buffer shows what happens when they do not.

## 06. Conclusion

The lecture covered:

* ten billion page faults, a sum of `RSS` larger than the RAM, and pages living in swap: three numbers this lecture explains
* the two views of an address space: the kernel's list of zones, edited by system calls, and the hardware's page table, edited by the page fault handler
* the page fault step by step, and its four verdicts: minor, major, `SEGV_MAPERR`, `SEGV_ACCERR`
* where frames come from: zeroed, from the page cache, from a file on disk, from swap; and reclaim, with a program squeezed until it swapped
* sharing: one frame in many page tables, `RSS` against `PSS` and `USS`, and copy-on-write in `fork()`
* the page table as a four-level tree, 60 KB instead of 256 GB, and the TLB that keeps it from being read

If one thing survives the week, make it this.

> **Takeaway.**
> The page fault is where the kernel does its memory work.
> It decides, from the list of zones, between fixing and killing; it brings frames from zero, from files and from swap; it shares frames between processes and copies them only when one of them writes.
> The page table makes all of it affordable: a tree, so that it fits, and a TLB, so that it is rarely read.

## Where this goes next

* **Lecture 06** takes the address space as the thing a process owns: `fork()` and copy-on-write from the process's side, `exec()` replacing one list of zones with another, threads sharing one address space, and what a context switch costs, TLB included.
* **Lab 04** is where the two kinds of `SIGSEGV` get debugged: every crash in it is a verdict from part 02, and `gdb` shows the address and `valgrind` the access that asked for it.
  Start at [`labs/04-memory-debugging-full/`](../../labs/04-memory-debugging-full).
* **Lab 05** turns `SEGV_ACCERR` around: an attacker who can write a buffer and make the program jump to it needs a page that is both writable and executable, and this lecture's permissions bit is what stands in the way.
* **Lecture 07** picks up what happens when reclaim is not enough: the out-of-memory killer, and the scheduler's view of a process waiting on a major fault.

## References

### Manuals

* `man 2 mmap`, `man 2 mprotect`, `man 2 madvise`, `man 2 fork`, `man 2 getrusage`
* `man 2 sigaction` (`SEGV_MAPERR`, `SEGV_ACCERR`), `man 7 signal`
* `man 5 proc`: `/proc/vmstat`, `/proc/meminfo`, `/proc/[pid]/status` (`VmRSS`, `VmSwap`, `VmPTE`), `/proc/[pid]/smaps`, `/proc/[pid]/smaps_rollup`
* `man 8 smem`, `man 1 fincore`, `man 8 vmstat`, `man 1 perf-stat`
* `man 1 systemd-run`, `man 5 systemd.resource-control`

### Kernel documentation

* [Concepts overview](https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html): page cache, anonymous memory, reclaim, compaction, OOM
* [Transparent Hugepage Support](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html)
* [Control Group v2](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html), the memory controller section, for what `MemoryMax=` does
* [Page Table Isolation](https://www.kernel.org/doc/html/latest/arch/x86/pti.html), on why the kernel's own mappings in each page table became a security problem

### Books

* Arpaci-Dusseau, [*Operating Systems: Three Easy Pieces*](https://pages.cs.wisc.edu/~remzi/OSTEP/), chapters 18 (paging: introduction), 19 (translation lookaside buffers), 20 (smaller tables), 21 (swapping: mechanisms) and 22 (swapping: policies)
* Bryant and O'Hallaron, *Computer Systems: A Programmer's Perspective*, sections 9.3 to 9.8 (VM as a tool for caching, memory management and protection; address translation; the Core i7 case study; the Linux virtual memory system)
* Kerrisk, *The Linux Programming Interface*, chapters 49 (memory mappings) and 50 (virtual memory operations)
* Gorman, [*Understanding the Linux Virtual Memory Manager*](https://www.kernel.org/doc/gorman/), chapters 3 (page table management), 10 (page frame reclamation) and 11 (swap management)

### Worth reading

* Gustavo Duarte, [How the Kernel Manages Your Memory](https://manybutfinite.com/post/how-the-kernel-manages-your-memory/) and [Page Cache, the Affair Between Memory and Files](https://manybutfinite.com/post/page-cache-the-affair-between-memory-and-files/)
* Ulrich Drepper, [What Every Programmer Should Know About Memory](https://people.freebsd.org/~lstewart/articles/cpumemory.pdf), part 4 (virtual memory) and section 6.4 (TLB optimisation)
* Jonathan Corbet, [Multi-level page tables](https://lwn.net/Articles/717293/) and [Five-level page tables](https://lwn.net/Articles/717293/), on LWN, for how the fifth level arrived

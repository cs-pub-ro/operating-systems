# Session 03: Memory Operations

The plan of the third lecture, the demos run during it, and the points worth writing down.

This is the page used while the lecture is delivered.
The full version -- the same argument in prose, with the diagrams, the reference output and the reading -- is [`03-memory-ops-full/`](../03-memory-ops-full).

Lecture 02 listed memory management as one family of system calls.
This lecture is about what those calls manage: what memory is to a running program, what a program can do with it, and how the memory of a process is laid out, built and grown.

## What the lecture answers

1. **Why care about memory?**
   It runs out, it speeds things up, it slows things down, and it leaks -- with a measurement for each.
1. **What is memory to a program?**
   An array of bytes; an address is an index; a pointer holds one; and a hierarchy from cache to disk around it.
1. **What can a program do with memory?**
   Allocate and free it, by areas; read, write and execute it, by permission; and fault for anything else.
1. **What does the memory of a process look like?**
   A list of areas, each with a start, a size, permissions and a role -- `pmap` prints it.
1. **When does an area come to exist?**
   At load time, from the executable, for the static ones; at run time, empty, for the stack, the heap and mappings.
1. **How does the heap grow?**
   `malloc()` sits on an allocator in libc, which calls `brk()` or `mmap()` only when it must.

## Plan

| Part | Question | Demo | Figure |
| --- | --- | --- | --- |
| 00. Pitch | Why care about memory? | [`00-pitch/`](demos/00-pitch) | [the storyline](media/00-pitch/storyline.svg) |
| 01. Memory and the CPU | What is memory to a program, and where does it sit? | -- | [an array of bytes](media/01-memory-and-cpu/memory-as-array.svg), [CPU, cache, memory](media/01-memory-and-cpu/cpu-cache-memory.svg), [the buffer cache](media/01-memory-and-cpu/buffer-cache.svg) |
| 02. Memory operations | What can a program do with memory, and what stops it? | [`02-memory-operations/`](demos/02-memory-operations) | [allocate and free](media/02-memory-operations/allocation-and-deallocation.svg) |
| 03. The process address space | What does the memory of a process look like? | [`03-address-space/`](demos/03-address-space) | [the address space](media/03-address-space/process-address-space.svg) |
| 04. When memory is allocated | Which areas exist before `main()`, and where from? | [`04-allocation-time/`](demos/04-allocation-time) | [sections to areas](media/04-allocation-time/executable-to-process.svg) |
| 05. Run-time allocation | How do the stack, the heap and mappings grow and shrink? | [`05-runtime-allocation/`](demos/05-runtime-allocation) | [`malloc()`, `brk()`, `mmap()`](media/05-runtime-allocation/malloc-brk-mmap.svg) |
| 06. Conclusion | What should survive the week? | -- | -- |

## Storyline / Narrative

The lecture follows one thread from start to finish, and the figure below walks through it, station by station: [the storyline](media/00-pitch/storyline.svg).

1. **The hook:** a browser holding 1.6 GB, a scheduler leaking 40 bytes at a time, and two programs with the same instructions where one is nine times slower.
   Memory decides what a program does, and none of those three is visible in the code.
1. **Memory is an array of bytes, and an address is an index into it.**
   Instructions and data both live there; the CPU reads and writes bytes by address, and a pointer is just a variable holding an address.
1. **Fast is small and big is slow.**
   Registers, cache, memory, disk: each level holds more and answers later.
   The cache hides memory's slowness from the CPU; the buffer cache hides the disk's slowness from programs.
1. **Allocating memory does not create it; it fences it off.**
   An area is a start and a size.
   Allocation makes a new area or extends one; deallocation removes or shrinks one.
1. **Three ways to use a byte: read it, write it, execute it.**
   Every area says which of the three it allows, and the hardware stops anything else: the segmentation fault.
1. **A process is a list of areas.**
   `pmap` prints it: an address, a size, permissions and a role on every line.
1. **Some areas are fixed and some grow.**
   Code, constants, data and bss are fixed by the executable; heap, stack and mappings change size while the program runs.
1. **The loader builds the fixed areas from the file before `main()` runs.**
   Each section of the executable becomes one area, at the address the file says.
   The bss costs nothing on disk, because it is all zeroes.
1. **A dynamic executable borrows libc's areas; a static one carries its own.**
   Build the same program both ways and the list doubles, but the dynamic areas are managed exactly the same.
1. **At run time, the stack grows by itself and the heap grows on request.**
   Call a function and its frame appears; return and it is gone.
   `malloc()` and `mmap()` are the explicit requests, `free()` and `munmap()` the returns.
1. **Behind `malloc()` is an allocator, not the kernel.**
   It owns the heap and hands out pieces; it calls `brk()` to grow the heap for small requests, `mmap()` for large ones, and asks for more than it needs so that it can ask less often.
1. **What should survive the week:** know your areas.
   A process sees its memory as a list of them, static ones built from the file and dynamic ones grown while it runs.
   Everything a program does with memory is an address into one of those areas, and anything outside them is a fault.

## Points to capture

Ten things to have in your notes when you leave.

1. Memory is an **array of bytes**; an **address** is an index into it; a **pointer** is a variable holding an address.
1. **Cache, memory, disk**: each level is bigger and slower; the CPU cache hides memory's latency, the **buffer cache** hides the disk's.
1. **Allocation marks memory as yours, it does not create it.** An **area** is a start and a size; allocating creates or extends one, freeing removes or shrinks one.
1. Three accesses -- **read, write, execute** -- and every area has permissions saying which it allows; anything else is **`SIGSEGV`**, delivered by the hardware, not by a check in software.
1. A **process address space** is the list of a process's areas, with their roles; `pmap -x <pid>` prints it, from `/proc/<pid>/maps`.
1. **Static areas** -- text, rodata, data, bss -- are fixed in size and content by the executable and exist before `main()`; **dynamic areas** -- heap, stack, mappings -- are made and resized at run time and start as zeroes.
1. The **loader** turns each section of the executable into an area at the address the file names; **bss** has a size but no bytes in the file.
1. `static` says *when* a variable is allocated (load time), not *where* it is visible.
1. The **stack grows by itself**: a write past its end faults, and the kernel extends it. The **heap and mappings grow on request**: `malloc()`/`free()`, `mmap()`/`munmap()`.
1. **`malloc()` is not a system call.** An allocator in libc owns the heap, extends it with **`brk()`** for small requests, uses **`mmap()`** for large ones (above 128 KB), and asks for more than it needs so that most calls cost no system call at all.

## Demos

Each directory below holds the sources, the commands to run and the question to ask about the result.

| Demo | Shows |
| --- | --- |
| [`00-pitch/memory-use`](demos/00-pitch/memory-use) | A browser process holds 1.6 GB, and there are dozens of them. |
| [`00-pitch/buffer-cache`](demos/00-pitch/buffer-cache) | 31 GB of a 59 GB machine is cached files, and it is not wasted. |
| [`00-pitch/cache-memory`](demos/00-pitch/cache-memory) | The same loop, nine times slower when it misses the cache. |
| [`00-pitch/memory-leak`](demos/00-pitch/memory-leak) | 4,000 forty-byte blocks lost, found by `valgrind` in one line. |
| [`02-memory-operations/basic-memory-operations`](demos/02-memory-operations/basic-memory-operations) | Allocate, write, read work; execute faults: the heap is `rw-`. |
| [`02-memory-operations/memory-access`](demos/02-memory-operations/memory-access) | Each area has its own permissions; three ways to crash. |
| [`03-address-space/see-pmap`](demos/03-address-space/see-pmap) | The list of areas, static and dynamic, before and after allocating. |
| [`04-allocation-time/allocation-types`](demos/04-allocation-time/allocation-types) | Every kind of variable prints its address; `nm` knew the static ones already. |
| [`05-runtime-allocation/allocation`](demos/05-runtime-allocation/allocation) | The stack grows on a fault, the heap on `brk()`, a mapping on `mmap()`. |
| [`05-runtime-allocation/malloc-kb`](demos/05-runtime-allocation/malloc-kb) | Ten `malloc()`s: six `brk()`s for 100 KB blocks, ten `mmap()`s for 1000 KB ones. |

## Slides

The deck delivered in the room is [`slides/memory-ops-live.html`](slides/memory-ops-live.html), rendered from [`slides/memory-ops-live.qmd`](slides/memory-ops-live.qmd).
It is deliberately thin: the diagrams, the demo results, and nothing that is better said than read.
The [full deck](../03-memory-ops-full/slides) carries the same structure with the detail filled in.

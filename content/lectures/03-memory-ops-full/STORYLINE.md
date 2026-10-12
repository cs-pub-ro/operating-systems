# Storyline: Memory Operations

The planned narrative of the live delivery, one thread from start to finish.
The figure walks through it, station by station: [the storyline](media/00-pitch/storyline.svg).

![The storyline](media/00-pitch/storyline.svg)

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

## How the stations map onto the lecture

| Stations | Part |
| --- | --- |
| 1 | 00. Pitch |
| 2, 3 | 01. Memory and the CPU |
| 4, 5 | 02. Memory operations |
| 6, 7, 9 | 03. The process address space |
| 8 | 04. When memory is allocated |
| 10, 11 | 05. Run-time allocation |
| 12 | 06. Conclusion |

Station 9 is told inside part 03, when the dynamic `pmap` is shown next to the static one; station 8 comes after it, because the loader is easier to explain once the list it builds has been seen.

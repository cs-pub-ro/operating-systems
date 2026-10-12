# Demo: The Address Space, Line by Line

A program that pauses, so that `pmap` can print its address space from another terminal: once before it allocates anything, once after.
Built twice, statically and dynamically.

## Goal

Read a process address space as what it is, a list of areas with a start, a size, permissions and a role, and see how the list differs between a static and a dynamic executable.

## Background

`see-pmap.c` declares one variable of each static kind -- initialised, uninitialised, read-only -- waits, then allocates on the stack (a hundred recursive calls with a 4 KB array each), on the heap (four `malloc(64 KB)`) and with `mmap()` (64 KB), and waits again.
The `Makefile` builds it twice from the same object file: `see-pmap`, dynamically linked, and `see-pmap-static`, with `-static`.
Both are `-no-pie`, so the static areas land at `0x400000` and the addresses are the same from one run to the next.

`pmap -x` reads `/proc/<pid>/maps` and prints one line per area: the start address, the size in KB, how much is resident (`RSS`), how much has been written to (`Dirty`), the permissions, and what backs the area.

## Build and run

Two terminals.
In the first:

```console
make
./see-pmap-static
```

In the second, at each prompt:

```console
pmap -x $(pidof see-pmap-static)
```

Then the same with `./see-pmap`.

## Results and explanations

### The static executable, before allocating

```text
$ pmap -x $(pidof see-pmap-static)
Address           Kbytes     RSS   Dirty Mode  Mapping
0000000000400000       4       4       4 r---- see-pmap-static
0000000000401000     564     564     564 r-x-- see-pmap-static
000000000048e000     172     164     164 r---- see-pmap-static
00000000004b9000      20      20      20 r---- see-pmap-static
00000000004be000      24      24      24 rw--- see-pmap-static
00000000004c4000      40      16      16 rw---   [ anon ]
0000000034c5d000     136      16      16 rw---   [ anon ]
00007909e9cd4000       8       0       0 r----   [ anon ]
00007909e9cd6000       8       0       0 r----   [ anon ]
00007909e9cd8000       8       4       0 r-x--   [ anon ]
00007ffd49694000     136      12      12 rw---   [ stack ]
ffffffffff600000       4       0       0 --x--   [ anon ]
---------------- ------- ------- ------- 
total kB            1124     824     820
```

Top to bottom:

* `0x400000`, four areas backed by the file: the ELF header (`r--`), `.text` (`r-x`, 564 KB -- that is libc, linked in), `.rodata` (`r--`), and `.data` (`rw-`).
* `0x4c4000`, `[ anon ]`, `rw-`, 40 KB: `.bss`, which is anonymous because it comes from no file -- the loader zero-filled it.
* `0x34c5d000`, `[ anon ]`, `rw-`, 136 KB: the heap.
  It is not labelled, but it is the one writable anonymous area just above the executable, and `gdb`'s `info proc mappings` calls it `[heap]`.
* `0x7909...`, three small areas: the `vvar` and `vdso` pages the kernel maps into every process for fast `gettimeofday()`-style calls.
* `0x7ffd...`, `[ stack ]`, 136 KB.
* `0xffffffffff600000`, the legacy `vsyscall` page, execute-only.

Twelve areas, 1.1 MB, and 47 bits of address space in between them unused.

### After allocating

```text
0000000034c5d000     272      32      32 rw---   [ anon ]
00007909e9cc4000      64       0       0 rw---   [ anon ]
00007ffd4964d000     420     420     420 rw---   [ stack ]
total kB            1608    1248    1244
```

Only three lines changed.
The heap went from 136 KB to 272 KB (four 64 KB blocks, served by extending it); a new 64 KB anonymous area appeared next to the `vdso` (the `mmap()`); the stack went from 136 KB to 420 KB and its start address moved down (the hundred frames).
Everything from the file is exactly as it was.

### The dynamic executable

```text
$ pmap -x $(pidof see-pmap)
Address           Kbytes     RSS   Dirty Mode  Mapping
0000000000400000       4       4       4 r---- see-pmap
0000000000401000       4       4       4 r-x-- see-pmap
0000000000402000      20      20      20 r---- see-pmap
0000000000407000       4       4       4 r---- see-pmap
0000000000408000      20      20      20 rw--- see-pmap
000000000040d000      16       0       0 rw---   [ anon ]
0000000021172000     132      12      12 rw---   [ anon ]
00007b222c800000     160     156       0 r---- libc.so.6
00007b222c828000    1620    1112       0 r-x-- libc.so.6
00007b222c9bd000     316      64       0 r---- libc.so.6
00007b222ca0c000      16      16      16 r---- libc.so.6
00007b222ca10000       8       8       8 rw--- libc.so.6
00007b222ca12000      52      20      20 rw---   [ anon ]
00007b222cafb000       4       4       0 r---- ld-linux-x86-64.so.2
00007b222cafc000     184     184       0 r-x-- ld-linux-x86-64.so.2
00007b222cb2a000      44      40       0 r---- ld-linux-x86-64.so.2
00007b222cb35000       8       8       8 r---- ld-linux-x86-64.so.2
00007b222cb37000       4       4       4 rw--- ld-linux-x86-64.so.2
00007ffe0519b000     136      20      20 rw---   [ stack ]
---------------- ------- ------- ------- 
total kB            2804    1724     156
```

The executable's own `.text` is 4 KB now instead of 564: libc is no longer inside it.
Instead `libc.so.6` has five areas of its own -- header, code, read-only data, relocated data, writable data -- with the same permission pattern as the executable's, because a shared library is loaded the same way an executable is.
`ld-linux-x86-64.so.2`, the dynamic loader that mapped libc, has its own five.
The total address space is 2.8 MB against 1.1 MB, but look at `Dirty`: 156 KB against 820 KB.
The 1112 KB of libc code that is resident is clean and shared with every other process using libc, which is what makes dynamic linking cheap in memory and is lecture 04's subject.

## Going further

* `cat /proc/$(pidof see-pmap)/maps` is the raw file; `pmap` only formats it.
  The sixth column is the inode of the backing file; `[ anon ]` areas have none.
* `gdb -batch -ex 'break main' -ex run -ex 'info proc mappings' ./see-pmap-static` prints the same list with `[heap]` labelled.
  Under `gdb` address randomisation is off, so the heap sits right after `.bss` instead of some megabytes above it.
* Build with `-static-pie` and watch the low addresses move: position-independent executables are loaded at a random base, like libraries.

## References

* `man 1 pmap`, `man 5 proc` (`/proc/[pid]/maps`)
* `man 7 vdso`, `man 8 ld.so`

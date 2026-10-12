# Demo: Where Every Kind of Variable Lives

A program with one variable of each kind -- initialised global, uninitialised global, constant, local array, `alloca()`, `static` local, `malloc()`, `mmap()` -- that prints the address of each.

## Goal

Sort the variables of a program into the areas of its address space by their addresses alone, and show that the static ones were placed before the program ran, by the linker, while the dynamic ones got their addresses at run time.

## Background

The executable is built `-no-pie`, so its static areas sit at `0x400000` and the addresses the program prints match the ones `nm` reads from the file.
Each variable is declared the way its kind requires:

| Variable | Declaration | Lands in |
| --- | --- | --- |
| `init_data` | `static int init_data[] = {1, };` | `.data` |
| `non_init_data` | `static int non_init_data[4096];` | `.bss` |
| `ro_data` | `static const int ro_data[4096] = {2, };` | `.rodata` |
| `stack_buffer` | `char buffer[4096];` inside a function | stack |
| `alloca_buffer` | `buffer = alloca(4096);` | stack |
| `local_scope_data` | `static int local_scope_data[4096] = {3, };` inside a function | `.data` |
| `heap_data` | `malloc(65536)` | heap |
| `mapped_data` | `mmap(NULL, 65536, ...)` | a mapping |

## Build and run

```console
make
./allocation-types
```

Press Enter at each prompt.
Then:

```console
nm allocation-types | grep -E 'init_data|ro_data|local_scope_data|heap_data|mapped_data'
readelf -S allocation-types | grep -E '\.text|\.rodata|\.data|\.bss'
```

## Results and explanations

```text
$ ./allocation-types
init_data: 0x408080
non_init_data: 0x40c0e0
ro_data: 0x402020
stack_buffer: 0x7ffd4f5633f0
alloca_buffer: 0x7ffd4f5633e0
local_scope_data: 0x4080a0
heap_data: 0x316932c0
mapped_data: 0x7c51ef5c0000
```

Three ranges, three stories:

* **`0x40....`**: `ro_data`, `init_data`, `local_scope_data`, `non_init_data`, in that order, which is the order of `.rodata`, `.data`, `.bss` in the file.
  These addresses were decided by the linker.
  `nm` prints them from the executable before it has ever run:

  ```text
  $ nm allocation-types | grep -E 'init_data|ro_data|local_scope_data|heap_data|mapped_data'
  00000000004100e0 b heap_data
  0000000000408080 d init_data
  00000000004080a0 d local_scope_data.0
  00000000004100e8 b mapped_data
  000000000040c0e0 b non_init_data
  0000000000402020 r ro_data
  ```

  `d` is `.data`, `b` is `.bss`, `r` is `.rodata`.
  The static areas are allocated and filled at load time, by the loader, from these sections.

* **`0x7ffd...`**: the two stack buffers, 16 bytes apart, which is the distance between two frames of two functions called one after the other.
  They exist only while their function runs, and the address would be different in a different call chain.

* **`0x3169...` and `0x7c51...`**: the heap block, a few megabytes above the executable, and the mapping, up among the libraries.
  Both are addresses the program did not know until `malloc()` and `mmap()` returned them.

The one that surprises people is `local_scope_data`, at `0x4080a0`, 32 bytes after `init_data` in `.data`.
It is declared inside a function, so it is only *visible* there, but it is `static`, so it is *allocated* at load time with the globals.
`static` says when; the braces say where it can be named.
Notice also that `heap_data` and `mapped_data` themselves -- the pointer variables -- are in `.bss`: a pointer is a static variable holding a dynamic address.

`readelf -S` is where the sizes come from:

```text
  [14] .text             PROGBITS        00000000004011b0 0011b0 000479
  [16] .rodata           PROGBITS        0000000000402000 002000 0041b2
  [26] .data             PROGBITS        0000000000408060 007060 004040
  [27] .bss              NOBITS          000000000040c0a0 00b0a0 004050
```

`.bss` is `NOBITS`: 16 KB in memory, zero bytes in the file.
`non_init_data` is 4096 `int`s of zero, and the executable does not store a single one of them.

## Going further

* Run the program twice and compare: the `0x40....` addresses are identical, the others move.
  Build it without `-no-pie` and the static ones move too, by a random base, but stay the same distance apart.
* Change `non_init_data[4096]` to `non_init_data[4096 * 1024]` and compare `ls -l` and `size` before and after: a 16 MB program in a 20 KB file.
* `objdump -t` is `nm` with the section names spelled out.

## References

* `man 1 nm`, `man 1 readelf`, `man 1 size`
* `man 3 alloca`, `man 3 malloc`, `man 2 mmap`

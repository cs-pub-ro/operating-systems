# Demos

The programs demonstrated during the lecture, one directory per part of it.

Each demo is small on purpose: it makes one point, and it is meant to be run rather than read.
The write-up in each directory says what to expect, what actually happens, and why.

| Demo | Part of the lecture | What it shows |
| --- | --- | --- |
| [`00-pitch/`](00-pitch) | [00. Pitch](../README.md#00-pitch-why-care-about-memory) | Memory runs out, speeds things up, slows things down, and leaks. |
| [`02-memory-operations/`](02-memory-operations) | [02. Memory operations](../README.md#02-memory-operations) | Allocate, read, write, execute, free -- and which of those fault. |
| [`03-address-space/`](03-address-space) | [03. The process address space](../README.md#03-the-process-address-space) | The list of areas of a process, static and dynamic, under `pmap`. |
| [`04-allocation-time/`](04-allocation-time) | [04. When memory is allocated](../README.md#04-when-memory-is-allocated) | Where each kind of variable lands, and which were placed by the linker. |
| [`05-runtime-allocation/`](05-runtime-allocation) | [05. Run-time allocation](../README.md#05-run-time-allocation) | The stack, the heap and mappings growing and shrinking; `malloc()` turning into `brk()` or `mmap()`. |

Part 01 has no demo; its two measurements are in the pitch.

## Running them

Every demo that needs building has a `Makefile`, so `make` inside its directory is enough.
The tools the demos need, beyond a C compiler and `make`, are:

* `pmap` (`procps`), to print the address space of a running process
* `strace`, to see the system calls `malloc()` makes
* `valgrind`, for the leak in `00-pitch/memory-leak`
* `perf` (`linux-tools`), to count cache misses in `00-pitch/cache-memory` -- needs `sudo`
* `gdb`, `readelf`, `size`, `nm` (`binutils`), for looking inside executables and faults

Several demos wait at prompts so that `pmap` can be run on them from a second terminal; they are marked as such in their READMEs.
`utils/utils.h` holds the `DIE()` macro the sources share.

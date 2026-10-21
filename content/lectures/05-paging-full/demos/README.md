# Demos

The programs demonstrated during the lecture, one directory per part of it.

Each demo is small on purpose: it makes one point, and it is meant to be run rather than read.
The write-up in each directory says what to expect, what actually happens, and why.

| Demo | Part of the lecture | What it shows |
| --- | --- | --- |
| [`00-pitch/`](00-pitch) | [00. Pitch](../README.md#00-pitch-billions-of-faults) | Ten billion page faults since boot, and a sum of `RSS` larger than the memory in use. |
| [`01-two-views/`](01-two-views) | [01. Two views of one address space](../README.md#01-two-views-of-one-address-space) | The list of zones and the page table of one process, and which of the two each operation edits. |
| [`02-page-fault/`](02-page-fault) | [02. The page fault](../README.md#02-the-page-fault) | The four verdicts: minor, major, `SEGV_MAPERR`, `SEGV_ACCERR`. |
| [`03-frames/`](03-frames) | [03. Where frames come from](../README.md#03-where-frames-come-from) | The page cache, and a program squeezed into a 64 MB cgroup until it swaps. |
| [`04-memory-sharing/`](04-memory-sharing) | [04. Memory sharing](../README.md#04-memory-sharing) | `RSS`, `PSS` and `USS` for ten processes, and `fork()` sharing pages until they are written. |
| [`05-page-table/`](05-page-table) | [05. Storing the page table](../README.md#05-storing-the-page-table) | How much page table a process really has, and what a TLB miss costs. |

## Running them

Every demo that needs building has a `Makefile`, so `make` inside its directory is enough.
The tools the demos need, beyond a C compiler and `make`, are:

* `ps`, `pmap` and `vmstat` (`procps`), to read a process and the system from outside
* `smem`, for `USS` and `PSS` per process
* `fincore` (`util-linux`), to see which pages of a file are in the page cache
* `systemd-run`, to run one program inside a small memory cgroup
* `strace`, to see the signal a crashing program received
* `perf` (`linux-tools`) and `sudo`, once, for the TLB miss counters

Several demos wait at prompts so that `ps` can be run on them from a second terminal; they are marked as such in their READMEs.
`utils/utils.h` holds the `DIE()` macro the sources share.

The numbers quoted in the write-ups were measured on one machine (Ubuntu 25.04, Linux 6.14, glibc 2.41, x86-64, 4 KB pages, 60 GB of RAM, 80 GB of swap).
Addresses and exact counts differ from run to run and from machine to machine; the shapes do not.

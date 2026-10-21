# Demos

One directory per demo: the sources, a `Makefile`, the commands to run and the question to ask about the result.
Build a demo with `make` inside its directory.

| Demo | Shows | Run it live? |
| --- | --- | --- |
| [`00-pitch/page-faults`](00-pitch/page-faults) | Ten billion page faults since boot. | Yes --- the opener |
| [`00-pitch/total-rss`](00-pitch/total-rss) | The `RSS` sum is larger than the memory in use. | Yes |
| [`01-two-views/zones-and-pages`](01-two-views/zones-and-pages) | 33 zones, 2,600 pages, 1,100 present. | Yes |
| [`01-two-views/reserve-allocate`](01-two-views/reserve-allocate) | `mmap()` edits the list, the first touch edits the table. | Yes --- two terminals |
| [`02-page-fault/segfault`](02-page-fault/segfault) | `SEGV_ACCERR` and `SEGV_MAPERR`, by the program itself. | Yes |
| [`02-page-fault/major-fault`](02-page-fault/major-fault) | 16,384 major faults, then 1,024 minor ones. | Yes |
| [`03-frames/page-cache`](03-frames/page-cache) | Every running program's code is in the page cache. | If time |
| [`03-frames/swap`](03-frames/swap) | 256 MB in a 64 MB box: 190 MB to swap, 8,400 major faults back. | Yes |
| [`04-memory-sharing/uss-pss-rss`](04-memory-sharing/uss-pss-rss) | `Rss` and `Pss` per zone of the shell. | Yes |
| [`04-memory-sharing/uss-pss-rss-multiple`](04-memory-sharing/uss-pss-rss-multiple) | Ten processes, four ways. | Two of the four |
| [`04-memory-sharing/fork-cow`](04-memory-sharing/fork-cow) | 0 faults to read 64 MB after `fork()`, 16,384 to write it. | Yes |
| [`05-page-table/table-size`](05-page-table/table-size) | 60 KB of page tables, against 256 GB flat. | Yes |
| [`05-page-table/tlb`](05-page-table/tlb) | 92% TLB misses, then almost none on 2 MB pages. | Yes --- `sudo` |

## Before the lecture

```console
for d in 01-two-views/reserve-allocate 02-page-fault/segfault 02-page-fault/major-fault 03-frames/swap \
         04-memory-sharing/fork-cow 05-page-table/tlb; do ( cd $d && make ); done
( cd 04-memory-sharing/uss-pss-rss-multiple && ./generate.sh && ./build.sh )
systemd-run --user --scope -p MemoryMax=64M true && echo "cgroup ok"
swapon --show
```

Needs `gcc`, `make`, `ps`, `pmap`, `smem`, `fincore`, `strace`, `systemd-run`, swap enabled, and `sudo` with `perf` for the TLB counters.
`major_fault` needs a directory on a real disk, not `/tmp`.

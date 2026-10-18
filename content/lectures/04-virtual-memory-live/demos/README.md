# Demos

One directory per demo: the sources, a `Makefile`, the commands to run and the question to ask about the result.
Build a demo with `make` inside its directory.

| Demo | Shows | Run it live? |
| --- | --- | --- |
| [`00-pitch/browser-vas-size`](00-pitch/browser-vas-size) | A browser with 1.5 TB. | Yes --- the opener |
| [`00-pitch/allocate-10TB`](00-pitch/allocate-10TB) | 10 TB in a blink, same `RSS`. | Yes --- two terminals |
| [`00-pitch/same-address`](00-pitch/same-address) | Same address, two values. | Yes --- two terminals |
| [`01-recap/memory-ops`](01-recap/memory-ops) | Allocation changes the list of areas. | If the room needs the recap |
| [`01-recap/malloc-size`](01-recap/malloc-size) | `malloc()` becoming `brk()` or `mmap()`. | If time |
| [`03-virtual-vs-physical/show-mem`](03-virtual-vs-physical/show-mem) | Every process has two sizes. | Yes |
| [`03-virtual-vs-physical/reserve-mem`](03-virtual-vs-physical/reserve-mem) | `VSZ` moves, `RSS` does not. | Yes --- two terminals |
| [`04-reserve-allocate-map/reserve-allocate`](04-reserve-allocate-map/reserve-allocate) | Touch half, pay for half. | Yes --- two terminals |
| [`04-reserve-allocate-map/page-faults`](04-reserve-allocate-map/page-faults) | One fault per page, once. | Yes |
| [`05-page-table/pagemap`](05-page-table/pagemap) | Your own page table; one frame shared by two processes. | Yes --- `sudo` |

## Before the lecture

```console
for d in 00-pitch/allocate-10TB 00-pitch/same-address 01-recap/memory-ops 01-recap/malloc-size \
         03-virtual-vs-physical/show-mem 03-virtual-vs-physical/reserve-mem \
         04-reserve-allocate-map/reserve-allocate 04-reserve-allocate-map/page-faults \
         05-page-table/pagemap; do ( cd $d && make ); done
```

Needs `gcc`, `make`, `pmap`, `ps`, `strace`, and `sudo` for the frame numbers in `pagemap`.
Rehearse the two-terminal demos; `pidof` returns two PIDs if an old run is still waiting at a prompt.

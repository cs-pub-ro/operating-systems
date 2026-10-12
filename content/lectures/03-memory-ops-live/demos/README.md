# Demos

One directory per demo: the sources, a `Makefile`, the commands to run and the question to ask about the result.
Build a demo with `make` inside its directory.

| Demo | Shows | Run it live? |
| --- | --- | --- |
| [`00-pitch/memory-use`](00-pitch/memory-use) | A browser holds gigabytes. | Yes --- the opener |
| [`00-pitch/buffer-cache`](00-pitch/buffer-cache) | Memory you do not see is working. | `free -h` only |
| [`00-pitch/cache-memory`](00-pitch/cache-memory) | Same instructions, nine times slower. | Yes |
| [`00-pitch/memory-leak`](00-pitch/memory-leak) | Forty bytes at a time, found by `valgrind`. | Yes |
| [`02-memory-operations/basic-memory-operations`](02-memory-operations/basic-memory-operations) | Execute is a permission too. | Yes --- let it crash |
| [`02-memory-operations/memory-access`](02-memory-operations/memory-access) | Permissions are per area. | If time |
| [`03-address-space/see-pmap`](03-address-space/see-pmap) | The list of areas, static and dynamic. | Yes --- two terminals |
| [`04-allocation-time/allocation-types`](04-allocation-time/allocation-types) | Where each variable lands, and who decided. | Yes |
| [`05-runtime-allocation/allocation`](05-runtime-allocation/allocation) | Stack, heap and mapping changing size. | Yes --- two terminals |
| [`05-runtime-allocation/malloc-kb`](05-runtime-allocation/malloc-kb) | `malloc()` becoming `brk()` or `mmap()`. | Yes |

## Before the lecture

```console
for d in 00-pitch/cache-memory 00-pitch/memory-leak 02-memory-operations/basic-memory-operations \
         02-memory-operations/memory-access 03-address-space/see-pmap \
         04-allocation-time/allocation-types 05-runtime-allocation/allocation \
         05-runtime-allocation/malloc-kb; do ( cd $d && make ); done
```

Needs `gcc`, `make`, `pmap`, `strace`, `valgrind`, `gdb`, and `perf` (`sudo`, for the cache-miss counts).
Rehearse the two-terminal demos; `pidof` returns two PIDs if an old run is still waiting at a prompt.

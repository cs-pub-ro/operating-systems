# Demo: Reserving Costs Nothing

Three `mmap()` calls of 4 MB each, with three different sets of permissions, and then three `munmap()`s.
The virtual size goes up and down by 4 MB a step; the resident size never changes.

## Goal

Make the word *reserve* concrete: an allocation call adds a zone to the address space and that is all it does.
No physical memory is involved until the zone is used.

## Background

`reserve_mem.c` maps 1024 pages read-write, 1024 pages read-only and 1024 pages read-write-execute, pausing after each, then unmaps them in the same order.
It never reads or writes any of them.

## Build and run

Two terminals.
In the first:

```console
make
./reserve_mem
```

In the second, at every prompt:

```console
ps -o pid,vsz,rss,cmd -p $(pidof reserve_mem)
pmap -x $(pidof reserve_mem) | grep -E 'anon|total'
```

## Results and explanations

The `ps` line at each of the seven prompts:

```text
    PID    VSZ   RSS CMD
1195603   2752  1696 ./reserve_mem      before
1195603   6848  1696 ./reserve_mem      after mmap(rw)
1195603  10944  1696 ./reserve_mem      after mmap(r)
1195603  15040  1696 ./reserve_mem      after mmap(rwx)
1195603  10944  1696 ./reserve_mem      after munmap(rw)
1195603   6848  1696 ./reserve_mem      after munmap(r)
1195603   2752  1696 ./reserve_mem      after munmap(rwx)
```

`VSZ` moves by exactly 4096 KB at every step.
`RSS` is 1696 KB seven times.

`pmap` shows the three zones while all are mapped:

```text
00007c2ac6800000    4096       0       0 rwx--   [ anon ]
00007c2ac6c00000    4096       0       0 r----   [ anon ]
00007c2ac7000000    4096       0       0 rw---   [ anon ]
```

Three lines rather than one, because the permissions differ and the kernel does not merge areas that do; each has 0 KB resident and 0 KB dirty.
A zone is a start, a size and permissions, entered in a list.
The kernel wrote three entries and will remove three; it allocated no page, cleared none, and will free none.

This is what "virtual" means.
The process has 12 MB more memory than before in the only sense in which a process has memory: addresses it is allowed to use.
Whether any of those addresses ever gets a byte behind it is a separate decision, taken later, by a different mechanism, and the [reserve-allocate demo](../../04-reserve-allocate-map/reserve-allocate) is that decision being taken.

## Going further

* Add a write to the first byte of the read-write zone and run again: `RSS` goes up by 4 KB.
  Add a write to the read-only zone: `SIGSEGV`, before anything is allocated, because the zone's permissions are checked first.
* `/proc/$(pidof reserve_mem)/smaps` prints, per area, `Rss`, `Pss` and a dozen other counters; all of them are zero for the three zones.
* Count the page faults of the process at each prompt, from the tenth field of `/proc/<pid>/stat`: it does not change either.
  The [page-faults demo](../../04-reserve-allocate-map/page-faults) does the counting from inside.

## References

* `man 2 mmap`, `man 2 munmap`, `man 2 mprotect`
* `man 5 proc` (`/proc/[pid]/smaps`, `/proc/[pid]/stat`)

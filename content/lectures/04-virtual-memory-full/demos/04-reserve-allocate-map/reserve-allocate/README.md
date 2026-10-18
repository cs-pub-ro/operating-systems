# Demo: Touch Half, Pay for Half

Reserve 4 MB with `mmap()`, write one byte into each of the first 512 pages, then unmap.
`RSS` goes up by exactly 2 MB, at the writes, not at the `mmap()`.

## Goal

Separate the three steps the lecture names: reserving virtual memory, allocating physical memory, and mapping the one to the other.
`mmap()` does the first; the first access to a page does the other two.

## Background

`reserve_allocate.c` maps 1024 pages read-write, waits, writes `'a'` to the first byte of pages 0 to 511, waits, unmaps, waits.
Watch it with `ps` for the sizes and with `/proc/<pid>/stat` for the page-fault count: the tenth field is the number of minor faults the process has taken.

## Build and run

Two terminals.
In the first:

```console
make
./reserve_allocate
```

In the second, at every prompt:

```console
ps -o pid,vsz,rss,cmd -p $(pidof reserve_allocate)
awk '{print "minor faults:", $10}' /proc/$(pidof reserve_allocate)/stat
pmap -x $(pidof reserve_allocate) | grep 4096
```

## Results and explanations

```text
                                    VSZ   RSS  faults   the zone, in pmap
before                             2752  1696      65   --
after mmap(4 MB)                   6848  1696      65   4096       0       0 rw---   [ anon ]
after writing to 512 pages         6848  3744     577   4096    2048    2048 rw---   [ anon ]
after munmap()                     2752  1696     577   --
```

The `mmap()` added 4096 KB to `VSZ`, nothing to `RSS`, and caused no page fault: a reservation.

The writes added nothing to `VSZ`, 2048 KB to `RSS`, and 512 page faults, one per page written.
Each of those faults is the kernel allocating one physical page, zero-filling it, mapping it to the virtual page that was touched, and letting the write continue.
The other 512 pages were never touched, and the kernel never spent a page on them: the zone's own line in `pmap` says 2048 KB resident out of 4096.

The `munmap()` takes everything back.
`VmHWM` in `/proc/<pid>/status`, the high-water mark, remembers the 3744 KB.

The three steps, then:

| Step | Who | When | Cost |
| --- | --- | --- | --- |
| reserve virtual memory | `mmap()`, `malloc()` | at the call | an entry in a list |
| allocate physical memory | the kernel, in the page fault | at the first access to each page | one page, found and zeroed |
| map one to the other | the kernel, in the same page fault | right after allocating | one page table entry |

Steps 2 and 3 are never separated: a physical page is only ever handed to a process by mapping it to one of the process's virtual pages.
Step 1 can happen alone, which is the whole of the previous demo and the browser's 1.5 TB.

## Going further

* Write to all 1024 pages, or to every byte of the first page only: `RSS` moves by 4 MB in the first case and by 4 KB in the second.
  The unit of the kernel's bookkeeping is the page, not the byte and not the zone.
* Replace the write with a read of the same 512 pages: `RSS` still goes up by 2 MB, and the `Dirty` column stays at 0.
  The [page-faults demo](../page-faults) explains what the kernel mapped in that case, and why writing afterwards faults again.
* Run under `/usr/bin/time -v` and read `Minor (reclaiming a frame) page faults` at the end: the same 512, plus the ones the program start-up took.

## References

* `man 2 mmap`, `man 5 proc` (`/proc/[pid]/stat` field 10, `/proc/[pid]/status`), `man 2 getrusage` (`ru_minflt`)

# Demo: Allocate 10 TB

A loop of `mmap()` calls, one gigabyte each, ten thousand times, on a machine with 64 GB.
It returns instantly, and the process's resident memory does not move.

## Goal

Show that an allocation call hands out address space, not memory: the request can be a hundred times the RAM and nothing is used until something is touched.

## Background

`allocate_gb.c` takes a number of gigabytes and calls `mmap()` that many times, for 1 GiB each, as private anonymous memory.
It waits before and after, so that the process can be looked at from a second terminal.
Nothing is ever written to the memory.

## Build and run

Two terminals.
In the first:

```console
make
./allocate_gb 10240
```

In the second, at each prompt:

```console
ps -o pid,vsz,rss,cmd -p $(pidof allocate_gb)
pmap -x $(pidof allocate_gb) | tail -3
```

## Results and explanations

Before the loop:

```text
$ ps -o pid,vsz,rss,cmd -p $(pidof allocate_gb)
    PID    VSZ   RSS CMD
1195513   2752  1824 ./allocate_gb 10240
```

After it:

```text
$ ps -o pid,vsz,rss,cmd -p $(pidof allocate_gb)
    PID    VSZ   RSS CMD
1195513 10737420992  1824 ./allocate_gb 10240

$ pmap -x $(pidof allocate_gb) | tail -3
00007fff014bb000     136      16      16 rw---   [ stack ]
---------------- ------- ------- ------- 
total kB         10737420996    1824     120
```

The virtual size went from 2.7 MB to 10,737,420,992 KB, which is 10 TiB and the 2.7 MB; the resident size is 1,824 KB before and after, to the kilobyte.
The ten thousand calls took a fraction of a second.
No memory was found, cleared or handed over, because none was asked for: each `mmap()` added a zone to the process's list of areas and returned.

Look for the zone in the full `pmap` output:

```text
000069713f200000 10737418240       0       0 rw---   [ anon ]
```

One line, not ten thousand.
The kernel merged the adjacent mappings, since they have the same permissions and nothing distinguishes them; the list of areas stays short however many calls were made.
Its `RSS` and `Dirty` columns are zero: a zone with no page of it in memory.

## Going further

* Ask for more than the address space holds: `./allocate_gb 140000` fails partway, with `mmap: Cannot allocate memory`.
  A 64-bit process on x86-64 gets 128 TiB of user address space (47 bits), and that is the cap on virtual memory per process the lecture mentions.
  Virtual memory is huge; it is not infinite.
* `cat /proc/sys/vm/overcommit_memory` is `0` on a default system, the "heuristic" mode: the kernel refuses only single requests that are obviously too large, and lets the total grow past RAM and swap.
  Set it to `2` (strict accounting) and the same loop stops at `CommitLimit` from `/proc/meminfo`; see `man 5 proc` and `Documentation/mm/overcommit-accounting.rst` in the kernel tree.
* Add a write to one byte of every mapping, run again, and watch `RSS` climb by 4 KB per gigabyte: one page per touch, which is part 04 of the lecture.
  Add a write to every page and the machine will start swapping; do not do that on a machine you need.

## References

* `man 2 mmap`, `man 5 proc` (`/proc/sys/vm/overcommit_memory`, `/proc/meminfo`)
* [Overcommit accounting](https://www.kernel.org/doc/html/latest/mm/overcommit-accounting.html), in the kernel documentation

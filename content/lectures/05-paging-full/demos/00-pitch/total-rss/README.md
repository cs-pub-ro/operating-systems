# Demo: More Resident Memory Than Memory

Add up the resident set size of every process, and compare with what the machine says is in use.

## Goal

Show that `RSS` counts something more than once, and name what `smem` offers instead.

## Run

```console
ps -eo rss= | awk '{ s += $1 } END { print s / 1024 " MB" }'
free -m
smem -tk -c "uss pss rss" | tail -1
```

## Results and explanations

```text
$ ps -eo rss= | awk '{ s += $1 } END { print s / 1024 " MB" }'
58339 MB
$ free -m
               total        used        free      shared  buff/cache   available
Mem:           60900       41409        2891        3839       21688       19490
```

The processes claim 58 GB of resident memory between them.
The machine has 61 GB and says 41 GB are in use, including the kernel's own.
Either the processes are lying, or some pages are being counted more than once.

```text
$ smem -tk -c "uss pss rss" | tail -1
   32.3G    34.2G    55.5G
```

`smem` totals three metrics over all processes.
`RSS` is the number above, give or take a few hundred megabytes of timing.
`PSS`, the proportional set size, divides every shared page by the number of processes sharing it, and adds up to 34 GB: that is the processes' real footprint.
`USS`, the unique set size, counts only pages that nobody else maps, and is what would be freed if every process exited one by one.

The 21 GB between `RSS` and `PSS` are pages mapped by more than one process: libc, the X libraries, the browser's code in each of its forty processes, files several programs have mapped.
Part 04 of the lecture is about those pages; part 05 of lecture 04 showed one of them, a frame of libc with 229 page tables pointing at it.

## Going further

* `smem -s pss -r | head` lists the processes with the largest real footprint; the order differs from `ps --sort -rss`.
* `cat /proc/<pid>/smaps_rollup` gives one process's `Rss`, `Pss`, `Shared_Clean`, `Private_Dirty` and the rest, as the kernel computes them.
* `free`'s `buff/cache` column, 21 GB here, is the page cache: file pages the kernel keeps around, some of them mapped by processes and so also inside their `RSS`.

## References

* `man 8 smem`, `man 1 free`, `man 5 proc` (`/proc/[pid]/smaps_rollup`)

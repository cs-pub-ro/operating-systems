# Demo: Two Sizes for Every Process

`ps` reports two sizes for a process: how much address space it has, and how much of it is in memory.
Read both for the shell, for a browser, and for a program that prints one line.

## Goal

Attach names to the two kinds of memory: `VSZ`, the virtual size, is what the process may address; `RSS`, the resident set size, is what it actually holds in physical memory right now.

## Background

`hello.c` prints a line and waits, so that it can be measured.
`ps -o vsz,rss` reads the two numbers from `/proc/<pid>/status`, in kilobytes.

## Build and run

```console
ps -o pid,vsz,rss,cmd -p $$
ps -o pid,vsz,rss,comm -p $(pgrep -f chrom | tail -1)
make
./hello
```

In a second terminal, while `hello` waits:

```console
ps -o pid,vsz,rss,cmd -p $(pidof hello)
```

## Results and explanations

```text
$ ps -o pid,vsz,rss,cmd -p $$
    PID    VSZ   RSS CMD
1191993  10452  4268 bash

$ ps -o pid,vsz,rss,comm -p 32573
    PID    VSZ   RSS COMMAND
  32573 1544448496 879760 chrome

$ ps -o pid,vsz,rss,cmd -p $(pidof hello)
    PID    VSZ   RSS CMD
1195559   2752  1696 ./hello
```

| Process | `VSZ` | `RSS` | ratio |
| --- | ---: | ---: | ---: |
| `hello` | 2.7 MB | 1.7 MB | 1.6 |
| `bash` | 10.2 MB | 4.2 MB | 2.4 |
| `chrome` | 1.44 TiB | 860 MB | 1,755 |

`VSZ` is never smaller than `RSS`: a byte that is in memory has an address, but an address need not have a byte in memory.
How far apart the two are depends on the program.
`hello` touches most of what it maps, so the ratio is small; the browser reserves a terabyte it will mostly never touch, so the ratio is in the thousands.

Even `hello` has 2.7 MB of address space for a one-line program.
`pmap` shows what it is: libc, about 2 MB of it, the dynamic loader, a 132 KB heap the allocator created for `stdio`, a 136 KB stack, and the executable itself.
Of those 2.7 MB, 1.7 MB are resident: the pages of libc the program ran through, the parts of the stack and heap it wrote, and little else.

The rest of the lecture is about the gap: what is in `VSZ` and not in `RSS`, and when it moves from one to the other.

## Going further

* `grep -E 'VmSize|VmRSS|VmPeak|VmHWM' /proc/$(pidof hello)/status` adds the peak of each.
  `VmHWM`, the high-water mark, is the most the process has ever had resident.
* `pmap -x $(pidof hello)` splits `RSS` by area: libc's code area is 2 MB, and some 600 KB of it is resident.
* `top` shows the same two columns as `VIRT` and `RES`, for every process, live.

## References

* `man 1 ps`, `man 5 proc` (`/proc/[pid]/status`)

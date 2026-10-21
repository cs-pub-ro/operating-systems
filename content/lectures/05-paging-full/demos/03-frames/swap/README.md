# Demo: Swap, in a Box

A program that writes 256 MB and reads it back, run inside a memory cgroup of 64 MB.
Three quarters of its memory ends up in swap, and reading it back costs 8,400 major faults.

## Goal

See the kernel take frames away from a running process, keep the pages' contents on disk, and bring them back on access, with the process none the wiser except for the time.

## Background

`swap.c` maps 256 MB, writes one byte per page, reads one byte per page, and after each step prints `VmRSS` and `VmSwap` from `/proc/self/status`, its major fault count and the time the step took.
`systemd-run --user --scope -p MemoryMax=64M` runs one command inside a cgroup that may hold at most 64 MB of RAM; when the program exceeds it, the kernel reclaims the program's own pages, and since they are anonymous and dirty, it writes them to the swap area first.

The machine needs swap enabled (`swapon --show`) and the user's cgroup needs the memory controller, which systemd delegates by default.

## Build and run

```console
make
./swap
systemd-run --user --scope -p MemoryMax=64M ./swap
```

## Results and explanations

Without the box:

```text
$ ./swap
start:                   RSS      1 MB   swap      0 MB   major faults      0   0.00 s
after writing 256 MB:    RSS    257 MB   swap      0 MB   major faults      0   0.04 s
after reading it back:   RSS    257 MB   swap      0 MB   major faults      0   0.00 s
```

256 MB resident, 65,536 minor faults in 40 ms, and the read costs nothing.

Inside a 64 MB box:

```text
$ systemd-run --user --scope -p MemoryMax=64M ./swap
start:                   RSS      1 MB   swap      0 MB   major faults      0   0.00 s
after writing 256 MB:    RSS     63 MB   swap    193 MB   major faults      3   0.62 s
after reading it back:   RSS     64 MB   swap    192 MB   major faults   8424   2.19 s
```

The write still succeeded: every page got a frame when it was touched.
But the process may hold 64 MB, so as it went on the kernel took frames back from the pages it had written earlier, wrote their contents to swap, and invalidated their entries; at the end 63 MB are resident and 193 MB are on disk.
The write took fifteen times longer, because the kernel was writing to disk in the middle of it.

The read-back walks the same pages.
Each one whose frame was taken is a major fault: the kernel finds the page in swap, reads it into a frame, maps it, and, since the box is still 64 MB, takes some other page's frame away to make room.
8,424 major faults, two seconds, for a loop that took no time without the box.
The program's code did not change and it never knew; it only got slower.

| | without the box | inside 64 MB |
| --- | ---: | ---: |
| resident at the end | 257 MB | 64 MB |
| in swap at the end | 0 | 192 MB |
| major faults on the read | 0 | 8,424 |
| time of the read | 0.00 s | 2.19 s |

Three things to take from it:

* **Swapping is the page fault again.**
  A page taken away is an entry made invalid; the next access is a fault; the content is on disk, so it is a major one.
* **The kernel decides, not the program.**
  Nothing in `swap.c` asked for any of this; the box, or on a real machine the other processes, made RAM short.
* **It works, and it is slow.**
  A machine that is swapping heavily is not broken, it is paying milliseconds for accesses that used to cost nanoseconds.

## Going further

* `vmstat 1` in a second terminal while the boxed run goes: the `si` and `so` columns show the pages moving.
* `MemoryMax=16M` makes it worse; `MemoryMax=300M` makes it disappear.
  `MemoryHigh=` instead of `MemoryMax=` throttles instead of forcing reclaim.
* `cat /sys/fs/cgroup/user.slice/user-$(id -u).slice/user@$(id -u).service/memory.stat` while it runs lists what the kernel did: `pgmajfault`, `pswpin`, `pswpout`.
* `grep VmSwap /proc/*/status` on a long-running desktop finds the processes with pages in swap right now; they are the ones nobody has used in a while.

## References

* `man 1 systemd-run`, `man 5 systemd.resource-control` (`MemoryMax=`)
* `man 5 proc` (`/proc/[pid]/status`: `VmRSS`, `VmSwap`), `man 8 swapon`, `man 8 vmstat`

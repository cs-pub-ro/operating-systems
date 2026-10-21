# Instructor Notes: Lecture 05, Paging

Notes for whoever delivers this lecture.
Nothing here is addressed to students.

## Shape of the delivery

The slot is 100 minutes: 50, a 10-minute break, 50.
In practice it is 40 + 10 + 40.
Plan for 80 minutes of content and treat the rest as spare.

The lecture follows [`STORYLINE.md`](STORYLINE.md); the storyline figure is on the fourth slide, and it is worth putting it back up at the break and at the end.
Open from lecture 04's last slide: physical memory arrives in a page fault, and the page table holds the mapping.
The three pitch numbers are the lecture's three threads, and it helps to say which part answers which: the faults in parts 02 and 03, the `RSS` sum in part 04, the swap in part 03.

| Block | Part | Minutes | Notes |
| --- | --- | ---: | --- |
| 1 | 00. Pitch | 8 | `/proc/vmstat`, `ps --sort -min_flt`, the `RSS` sum against `free`, `swapon --show`. |
| 1 | 01. Two views | 12 | The two-views figure, the zone counts of `$$`, then `reserve_allocate` with `ps` at every prompt. |
| 1 | 02. The page fault | 16 | The flow figure, slowly; `segfault 6` and `segfault 3`; `major_fault`. |
| 1 | 03. Frames (start) | 4 | The four sources, `free -m`, `fincore` on `bash`. |
| -- | *break* | 10 | |
| 2 | 03. Frames (finish) | 10 | `swap` plain, then in the 64 MB box; let the two seconds pass in silence. |
| 2 | 04. Memory sharing | 14 | `smaps` of `$$`, the four-scenario table, `fork_cow`. |
| 2 | 05. Storing the table | 14 | The arithmetic on the board, `VmPTE` of `$$` and of a browser, `tlb` under `perf`. |
| 2 | 06. Conclusion | 2 | Leave the takeaway slide up during questions. |

## Which demos to run live

Everything runs in seconds except the boxed `swap` (three seconds) and `major_fault` (one), and both are worth the wait.
Have `sudo` working for `perf`, `smem` installed, and swap enabled (`swapon --show`); check `systemd-run --user --scope -p MemoryMax=64M true` works before the lecture.

* **`00-pitch/page-faults`**: `grep pgfault /proc/vmstat` and the uptime, do the division aloud.
  Then `ps -eo pid,min_flt,maj_flt,rss,comm --sort -min_flt | head -3`.
* **`00-pitch/total-rss`**: the `awk` sum and `free -m` on the same screen; let them notice.
  `smem -tk` if it is installed; otherwise quote the README.
* **`01-two-views/zones-and-pages`**: three commands on `$$`; write the three numbers on the board, they come back in part 05.
* **`01-two-views/reserve-allocate`**: the lecture 04 demo with one column added; the moment is the third prompt, where nothing changes.
* **`02-page-fault/segfault`**: run `6` and `3`, read the program's own line.
  Then `strace -e trace=none ./segfault 3` for the kernel's version of the same.
  Run `1` as well, so that the room sees the same access succeed.
* **`02-page-fault/major-fault`**: once.
  Say the second pass is the same code before running it.
  Needs a directory on a real disk, not `/tmp`.
* **`03-frames/page-cache`**: `free -m` and `fincore` on `bash`; thirty seconds.
* **`03-frames/swap`**: plain run first, box second.
  `vmstat 1` in a second terminal during the boxed run shows `si` and `so` moving, if the terminal juggling is rehearsed.
* **`04-memory-sharing/uss-pss-rss`**: the `smaps` grep on `$$`, point at the two `Pss` lines that differ from `Rss` and the one that does not.
* **`04-memory-sharing/uss-pss-rss-multiple`**: run the one-static and the ten-static scenarios live, the other two from the table.
  `./kill.sh` between them.
* **`04-memory-sharing/fork-cow`**: one command; read the `Pss` line after the fork aloud, then the two fault counts.
* **`05-page-table/table-size`**: `VmPTE` of `$$`, then of the browser; the flat-table arithmetic on the board first, so that 60 KB lands.
* **`05-page-table/tlb`**: both runs under `perf stat`; read the miss counts, not the nanoseconds, which vary.

## What students get wrong

* **"A page fault is a crash."**
  The pitch's ten billion is the cure, and the flow figure's first branch: the fixed fault is invisible, the unfixed one is `SIGSEGV`, and they are the same trap.
  Use "verdict" consistently.
* **"Virtual memory is swap", left over from lecture 04.**
  Swap is one of the four frame sources and the demos spend three seconds on it.
  Say it again when the four sources go up.
* **"`RSS` is what the process uses."**
  The ten-processes table: `RSS` 1,688 KB each for processes that cost 104 KB.
  `PSS` sums to the truth; say that sentence twice.
* **"`fork()` copies the memory."**
  `fork_cow`: 0 faults to read 64 MB.
  Students who believe `fork()` is slow write code around it; this is where to fix that.
* **"The TLB is a cache for data."**
  It caches translations, not bytes; the data still has to come from the cache or from memory after the TLB hit.
  The `tlb` demo's 4.9 ns with no misses is the data cost on its own.
* **Confusing the list of zones with the page table.**
  Everything in this lecture hangs on keeping them apart: the kernel's description against the hardware's, what is allowed against what is there.
  The two-views figure is on the board for a reason; go back to it whenever the confusion surfaces.

## Things that go wrong in the room

* `systemd-run --user` fails with "memory controller not delegated" on some setups; `sudo systemd-run --scope -p MemoryMax=64M ./swap` works everywhere.
  Without swap enabled, the boxed run is killed by the OOM killer instead, which is a different and shorter lesson.
* `major_fault` shows 1,024 minor faults on both passes if the directory is on `tmpfs`; `df .` tells.
* `fincore` prints a `cachestat` warning on recent kernels; `2>/dev/null` hides it, and the numbers are right.
* `perf stat` needs `sudo` or `kernel.perf_event_paranoid` at 2 or below; `dTLB-load-misses` is unsupported in most virtual machines.
  Fall back to the README's counts.
* `tlb huge` reports 0 MB of huge pages if `/sys/kernel/mm/transparent_hugepage/enabled` is `never`; the two runs then look alike.
* `smem` is a Python program and takes a second on a machine with hundreds of processes; run it once before the lecture.
* `kill.sh` uses `pkill -f '^\./work/hello-'`; an older version of the pattern killed any shell whose command line contained `hello-`, including the one running the demo.
* The numbers in the READMEs are from one machine; read the shapes, not the digits.

## Cuts, if you are behind

In order, the first things to drop:

1. The ten-processes scenarios run live; show the table.
1. `major_fault`; the flow figure's minor/major branch carries the point.
1. The `page-cache` commands; `free -m` from the pitch already showed the 21 GB.
1. The huge-page half of `tlb`; one `perf stat` run shows the misses.

Do not cut `reserve_allocate`, `segfault`, the boxed `swap`, `fork_cow`, or `VmPTE`.

## Links to the rest of the course

Say these explicitly.

* Lecture 02: the system call was the program's way into the kernel; the page fault is the hardware's.
* Lecture 03's segmentation fault and lecture 04's demand paging are one trap with two verdicts; the flow figure is the reconciliation.
* Lecture 04's `pagemap` demo showed a libc frame with 229 page tables pointing at it; part 04 is why, and what it does to `RSS`.
* Lab 04's crashes are all verdicts from part 02; lab 05's exploits need a page the permissions bit says they cannot have.
* Lecture 06 starts from `fork()` and copy-on-write, and from the TLB flush in a context switch.

## Further demos worth writing

* **The OOM killer**: the boxed `swap` with swap turned off, and `dmesg` afterwards.
* **Thrashing**: two boxed processes sharing 64 MB, each touching 100 MB in a loop, and the system-wide `pswpin`/`pswpout` rate.
* **`mprotect()` as a tool**: a program that write-protects its own heap, catches `SEGV_ACCERR`, logs the address and re-enables the page; the mechanism behind garbage collectors and checkpointing.
* **Huge pages on the hot path**: the `tlb` walk with a random access pattern, where the TLB miss dominates and 2 MB pages halve the time.

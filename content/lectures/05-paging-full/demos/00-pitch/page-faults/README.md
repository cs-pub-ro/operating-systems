# Demo: Ten Billion Page Faults

Read the kernel's count of page faults since boot, and a few processes' own counts.

## Goal

Put the page fault on the board as the most frequent thing the kernel does, before explaining what one is.

## Run

```console
grep -E '^pgfault|^pgmajfault' /proc/vmstat
awk '{printf "up %.1f days\n", $1 / 86400}' /proc/uptime
ps -eo pid,min_flt,maj_flt,rss,comm --sort -min_flt | head -4
ps -o pid,min_flt,maj_flt,rss,comm -p $$
```

`min_flt` and `maj_flt` are a process's minor and major page faults; `/proc/vmstat` has the system-wide totals.

## Results and explanations

```text
$ grep -E '^pgfault|^pgmajfault' /proc/vmstat
pgfault 9687532485
pgmajfault 148220
$ awk '{printf "up %.1f days\n", $1 / 86400}' /proc/uptime
up 16.9 days
```

9.7 billion page faults in 17 days is 6,600 per second, every second, day and night, and that is the average over a machine that spends most of its time idle.
Every one of them is an instruction the hardware stopped and the kernel resumed.
Only 148,220 of them, one in 65,000, needed the disk.

```text
$ ps -eo pid,min_flt,maj_flt,rss,comm --sort -min_flt | head -4
    PID  MINFL  MAJFL   RSS COMMAND
  38939 1651432334  3 626112 chrome
  31705 1186415340 2207 1271784 chrome
 709872 981656822  20 145672 slack
$ ps -o pid,min_flt,maj_flt,rss,comm -p $$
    PID  MINFL  MAJFL   RSS COMMAND
1425105   2335      0  4404 bash
```

One browser process has taken 1.65 billion page faults, for a resident size of 600 MB: the same pages, mapped and unmapped and mapped again, thousands of times over.
The shell took 2,335 to start and has taken none since: everything it touches is mapped already.

Two things to take from it:

* **The page fault is not an error.**
  Nothing crashed 9.7 billion times.
  It is the normal way a page gets its frame, and the lecture's part 02 is what happens inside one.
* **Minor and major are different animals.**
  A minor fault is served from memory in about a microsecond; a major one waits for the disk.
  The kernel works hard to make the second kind rare, and part 03 is how.

## Going further

* `vmstat 1` prints, among other columns, `si` and `so`: pages swapped in and out per second.
  On a machine with free memory both are zero.
* `perf stat -e page-faults,minor-faults,major-faults <command>` counts the faults of one run.
* `/proc/<pid>/stat` fields 10 and 12 are the same two counters `ps` prints; `getrusage()` gives a process its own.

## References

* `man 5 proc` (`/proc/vmstat`, `/proc/[pid]/stat`), `man 1 ps`, `man 2 getrusage`

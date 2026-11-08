# Demo: Context Switches and the Page Cache

The same `find` twice: once with every directory read from the disk, once with all of them in the page cache.

## Goal

See that a thread which waits for I/O switches at every wait, and that the same work done from memory switches once.

## Background

`find /usr/share` reads every directory under `/usr/share`.
Cold, each read goes to the disk, and the thread blocks until the data arrives: a voluntary context switch each time.
Warm, the directories are in the page cache, `read()` returns at once, and the thread never leaves the CPU.
`/usr/bin/time -v` prints both switch counts, from `getrusage()`.

These are the two runs of the [start-process-times demo](../../00-pitch/start-process-times), read for the switches this time.

## Build and run

Nothing to build.
Drop the page cache (as root) to make the first run cold.

```console
sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches'
\time -v find /usr/share > /dev/null
\time -v find /usr/share > /dev/null
```

## Results and explanations

```text
$ \time -v find /usr/share > /dev/null             cold
        User time (seconds): 0.07
        System time (seconds): 0.25
        Percent of CPU this job got: 13%
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:02.35
        Voluntary context switches: 26865
        Involuntary context switches: 51
        File system inputs: 220256

$ \time -v find /usr/share > /dev/null             warm
        User time (seconds): 0.03
        System time (seconds): 0.13
        Percent of CPU this job got: 99%
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:00.16
        Voluntary context switches: 1
        Involuntary context switches: 3
        File system inputs: 0
```

26,865 voluntary switches against 1.
Cold, `find` blocked on the disk 26,865 times, and each time it blocked the kernel switched the CPU to another thread, or to idle, and switched back when the data arrived; it was on the CPU 13% of its elapsed time.
Warm, with 220,256 blocks' worth of directory data already in memory, it never blocked, kept the CPU for 99% of a much shorter run, and switched once, at exit.

The involuntary counts are small in both runs: the machine was idle, so nobody took the CPU from `find`; the kernel's timer did, a few dozen times.

The page cache does not just make the run faster; it changes what kind of thread `find` is, from I/O-bound to CPU-bound.

## Going further

* `vmstat 1` in a second terminal during the cold run: the `b` column (threads blocked on I/O) and `cs` (switches per second) both jump.
* Run the cold `find` under `strace -c` to see that the waiting happens inside `getdents64()` and `openat()`.
* `cat /proc/meminfo | grep -E '^(Cached|Buffers)'` before and after the first run shows the page cache growing by the directories read.

## References

* `man 1 time`, `-v`
* `man 2 getrusage`
* `man 5 proc`, `/proc/sys/vm/drop_caches`
* Lecture 05, part 03, for the page cache as a source of frames

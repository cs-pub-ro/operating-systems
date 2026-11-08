# Demo: The Times of a Started Process

The same three times for a command started under `time`, once cold and once from the page cache.

## Goal

See the gap between elapsed time and CPU time appear and disappear on the same command, and meet the two context-switch counts that explain it.

## Background

`/usr/bin/time -v` runs a command and prints the resources it used, from `getrusage()`: user and system time, elapsed time, the percentage of a CPU it got, page faults, and the number of voluntary and involuntary context switches.
`find /usr/share` walks a large directory tree: cold, every directory is read from the disk; warm, every one is in the page cache.

## Build and run

Nothing to build.
To get a cold run, drop the page cache first (as root); the second run is warm by itself.

```console
sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches'
\time -v find /usr/share > /dev/null
\time -v find /usr/share > /dev/null
```

The backslash bypasses the shell's builtin `time`, which prints only the three times.

## Results and explanations

The two runs, side by side, keeping only the lines that matter:

```text
                                          cold            warm
User time (seconds):                      0.07            0.03
System time (seconds):                    0.25            0.13
Percent of CPU this job got:              13%             99%
Elapsed (wall clock) time:                0:02.35         0:00.16
Voluntary context switches:               26865           1
Involuntary context switches:             51              3
File system inputs:                       220256          0
```

Cold, `find` took 2.35 seconds of which 0.32 were on a CPU: 13%.
It spent the rest blocked, waiting for the disk, once per directory it read.
Warm, the same walk took 0.16 seconds, almost all of it on the CPU: 99%.
The instructions executed were the same; the waiting was not.

The two switch counts are the trace of that waiting.
Every time `find` blocked on the disk it gave up the CPU: a **voluntary** context switch, 26,865 of them.
Warm, it never blocked and switched once, at the end.
The handful of **involuntary** switches are the kernel taking the CPU away for something else; part 05 of the lecture is about both kinds.

## Going further

* `vmtouch` or `fincore` can tell how much of a directory tree is in the page cache before you run.
* Try `find / -xdev` for a larger tree, or `grep -r` for a command that reads file contents rather than directories.
* `strace -c find /usr/share` counts the system calls: the `getdents64()` calls are where the cold run blocked.

## References

* `man 1 time`, in particular `-v`
* `man 2 getrusage`, `ru_nvcsw` and `ru_nivcsw`
* `man 5 proc`, `/proc/sys/vm/drop_caches`

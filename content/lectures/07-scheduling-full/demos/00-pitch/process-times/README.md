# Demo: The Times of a Process

The three times of any process, user, system and elapsed, read from `/proc`.

## Goal

See that a process's elapsed time is far larger than the time it has spent on a CPU, and name the three times.

## Background

A running thread is either in user mode, executing the program's own code, or in kernel mode, executing a system call on its behalf.
The kernel keeps a count of both, in clock ticks, in `/proc/<pid>/stat`: these are the **user time** and the **system time**.
The **elapsed time**, or wall-clock time, is simply how long ago the process was started.

`get_times_for_pid.sh` reads the first two from `/proc/<pid>/stat` (fields 14 and 15, divided by the ticks per second) and the third from `ps -o etimes`.

## Build and run

Nothing to build.
Pick a process that has been around for a while, a browser or an editor, and pass its PID:

```console
./get_times_for_pid.sh <pid>
./get_times_for_pid.sh $$
ps -o pid,comm,etime,cputime,%cpu -p <pid>
```

## Results and explanations

```text
$ ./get_times_for_pid.sh 887053
user time:       6172.63s
system time:     1638.40s
elapsed time:  262379.00s
$ ps -o pid,comm,etime,cputime,%cpu -p 887053
    PID COMMAND             ELAPSED     TIME %CPU
 887053 chrome           3-00:52:59 02:10:11  2.9
```

This browser process has existed for 3 days and 52 minutes and has used 1 hour 43 minutes of user time and 27 minutes of system time, 2.9% of its life.
The remaining 97% it spent off the CPU, waiting: for a key, a packet, a timer, a frame to draw.

```text
$ ./get_times_for_pid.sh $$
user time:          0.07s
system time:        0.04s
elapsed time:  330225.00s
```

A shell that has been open for four days has used a tenth of a second of CPU.
Almost every process on a desktop looks like this; the exceptions are the ones that are actually computing right now.

The time off the CPU is time spent *blocked*, waiting for an event, or *ready*, waiting for a CPU; the lecture is about those two states.

## Going further

* `cat /proc/<pid>/stat` and count to field 14; `man 5 proc` documents every field.
  Fields 16 and 17 are the user and system times of the process's waited-for children.
* `/proc/<pid>/sched` has `se.sum_exec_runtime`, the same total in nanoseconds, and the context-switch counts used in part 05.
* `%CPU` in `ps` is CPU time divided by elapsed time, over the whole life of the process; `top`'s `%CPU` is over the last refresh interval, which is why the two disagree.

## References

* `man 5 proc`, `/proc/[pid]/stat`
* `man 1 ps`, `etime`, `etimes`, `cputime`, `%cpu`
* `man 2 times`, `man 2 getrusage`, `man 3 clock`

# Demo: The Nice Value

Three groups of CPU-bound processes, one per nice value, racing for the CPUs.

## Goal

See the one scheduling input a user controls, the nice value, change the share of the CPU a thread gets, without starving anyone.

## Background

The **nice value** of a thread runs from -20, the least nice, to +19, the nicest; the default is 0.
It is static, set by whoever starts or renices the thread, and the scheduler turns it into a weight: a thread at -20 gets many times the CPU share of one at 0, which gets many times the share of one at +19, when they compete.
Only root may give a thread a negative nice value.

`cpu.c` is a loop that takes about 1.6 seconds alone.
`start-all.sh` starts three groups of N copies of it, N being the number of CPUs: one group with `sudo nice -n -20`, one plain, one with `nice -n 19`; so 3N processes compete for N CPUs.
Each copy runs under `/usr/bin/time -v`, which writes its report to `pri<nice>-<i>.txt`.

## Build and run

```console
make
./start-all.sh
```

Watch the CPUs while it runs:

```console
htop
```

Then compare the groups:

```console
grep Elapsed pri-20-*.txt | sort -t: -k3
grep Elapsed pri0-*.txt | sort -t: -k3
grep Elapsed pri+19-*.txt | sort -t: -k3
```

## Results and explanations

On 24 CPUs, 72 processes, each needing 1.6 seconds of CPU:

```text
$ grep Elapsed pri-20-*.txt | sort -t: -k3 | sed -n '1p;$p'
pri-20-1.txt:   Elapsed (wall clock) time (h:mm:ss or m:ss): 0:03.10
pri-20-24.txt:  Elapsed (wall clock) time (h:mm:ss or m:ss): 0:03.71
$ grep Elapsed pri0-*.txt | sort -t: -k3 | sed -n '1p;$p'
pri0-1.txt:     Elapsed (wall clock) time (h:mm:ss or m:ss): 0:05.85
pri0-24.txt:    Elapsed (wall clock) time (h:mm:ss or m:ss): 0:07.63
$ grep Elapsed pri+19-*.txt | sort -t: -k3 | sed -n '1p;$p'
pri+19-1.txt:   Elapsed (wall clock) time (h:mm:ss or m:ss): 0:07.99
pri+19-24.txt:  Elapsed (wall clock) time (h:mm:ss or m:ss): 0:09.77
$ grep Percent pri-20-1.txt pri0-1.txt pri+19-1.txt
pri-20-1.txt:   Percent of CPU this job got: 85%
pri0-1.txt:     Percent of CPU this job got: 41%
pri+19-1.txt:   Percent of CPU this job got: 29%
```

The groups finish in nice order.
The -20 processes get most of a CPU each and finish in about 3 seconds; the default ones share what is left and take 6 to 7; the +19 ones mostly wait for the others and take 8 to 10.
Every process finished: nice shifts a thread's share, it does not switch the thread off.

In `htop` during the run, all 24 CPUs are at 100% throughout; the nice value decides who gets them, not whether they are used.

## Going further

* Start the three groups from three different terminals and the difference may disappear: with `sched_autogroup_enabled` set to 1, Linux groups a terminal session's processes together and nice applies within the group.
  `cat /proc/sys/kernel/sched_autogroup_enabled`.
* `renice -n 19 -p <pid>` on a running copy moves it from one group to another mid-race.
* `ps -o pid,ni,pri,comm` shows the nice value and the kernel's priority number side by side.
* `man 7 sched` explains the weights: each nice step is about 1.25 times the CPU share of the next.

## References

* `man 1 nice`, `man 1 renice`, `man 2 setpriority`
* `man 7 sched`, sections on the nice value and on autogroups
* `man 1 time`

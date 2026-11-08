# Demo: The Load Average

Twice as many CPU-bound threads as CPUs, and the load average climbing to meet them.

## Goal

Read the load average as what it is, a count of running and ready threads averaged over time, and watch it respond to load.

## Background

The **load average** is the number of threads that are running or ready to run, averaged over the last 1, 5 and 15 minutes.
Linux also counts threads in uninterruptible sleep, state `D`, so that a machine waiting on a slow disk shows as loaded.
`uptime`, `top`, `htop` and `/proc/loadavg` all print the three averages; `/proc/loadavg` adds the instantaneous count of runnable threads over the total.

`load_average.c` starts N threads that each run a CPU loop for a while and exit.

## Build and run

```console
make
./load_average $(( 2 * $(nproc) ))
```

In a second terminal, every few seconds:

```console
cat /proc/loadavg
```

or keep `htop` open, which shows the three averages in its header.

## Results and explanations

With 48 threads on 24 CPUs, from a quiet machine:

```text
$ cat /proc/loadavg
0.13 4.88 8.10 1/4726 1386866                   before
7.49 6.30 8.53 50/4753 1386942                  after 10 s
13.72 7.68 8.95 49/4761 1386985                 after 20 s
19.07 9.02 9.37 49/4770 1387036                 after 30 s
23.74 10.36 9.81 50/4761 1387492                after 40 s
30.82 12.84 10.64 49/4776 1387673               after 60 s, just before the threads end
28.96 18.12 12.78 3/4736 1388570                20 s after they ended
15.09 15.92 12.26 2/4703 1388759                60 s after
```

The fourth field is the plain count: 50 threads running or ready out of 4,700-odd, which is the 48 workers plus whatever else was awake; it drops to 3 the moment they end.
The one-minute average climbs towards 48 and would reach it if the program ran a few minutes; it decays just as slowly afterwards, which is the point of an average.
The five- and fifteen-minute averages barely notice a one-minute burst.

A load of 48 on 24 CPUs means that, at a typical moment, 24 threads are running and 24 are waiting in the ready queue: the machine is overcommitted two to one.
A load of 24 would mean every CPU busy and nobody waiting; 0.13 is an idle desktop.

## Going further

* Run with `nproc` threads and the average heads for the number of CPUs, not past it.
* Increase `NUM_ROUNDS` so that the program runs several minutes and the one-minute average actually reaches 48.
* `dd if=/dev/zero of=big bs=1M count=4000 oflag=direct` on a slow disk raises the load without using a CPU, through the `D` state; `vmstat 1` shows it in the `b` column.

## References

* `man 5 proc`, `/proc/loadavg`
* `man 1 uptime`, `man 1 top`
* Brendan Gregg, [Linux Load Averages: Solving the Mystery](https://www.brendangregg.com/blog/2017-08-08/linux-load-averages.html)

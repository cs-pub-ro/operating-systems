# Measure Load Average

The load average is a metric of the load of the CPUs.
A load average of 1 means that one CPU is used 100%.
A load average of 4 means that 4 CPUs are used 100% or, in case of a single CPU, that there are an average of 4 threads continuously competing for access to the CPU.

This demo shows the variation of the load average.

First, build it:

```console
make
```

Now run the `load_average` executable.
Pass it the number of cores as argument:

```console
./load_average $(nproc)
```

On another console check the CPU usage:

```console
htop
```

In the `htop` output check the load average.
Or use the `uptime` command:

```console
$ uptime
 00:21:05 up 3 days, 23:09,  2 users,  load average: 10.34, 4.68, 1.99
```

The load average is manifested as 3 numbers as averages of 1 minute, 5 minutes, 15 minutes.
If the program `load_average` runs long enough (you can increase the internal `NUM_ROUNDS` variable), you will get to a situation where the load average reaches the number of cores, as that many threads are currently using the CPU cores.

More details [here](https://superuser.com/a/1402102/937945).

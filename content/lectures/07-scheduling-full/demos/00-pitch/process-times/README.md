# Times for Process

When a process runs, it uses the CPU in user mode or in kernel mode.
We call these times "user time" and "system time".
The total duration of the process in the system, from the start to the current time is called "elapsed time", also called "wall time".

The elapsed time is generally much larger than the user time + system time.
Because a process is generally not doing much, but waiting for a trigger to do work.
After doing that work it waits again.

Check out the times of a process (elapsed time, user time and system time) by using the `./get_times_for_pid.sh` script:

```console
# Get times for Chrome process.
$ ./get_times_for_pid.sh 79222
user time:          1.84s
system time:        0.54s
elapsed time:   74753.00s

# Get times for current shell process.
$ ./get_times_for_pid.sh $$
user time:          0.07s
system time:        0.04s
elapsed time:  330225.00s
```

As expected, the elapsed time is much larger than the cumulative running time (user time + system time).

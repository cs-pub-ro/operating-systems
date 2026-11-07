# Times for Started Process

We want to check the running times (user time and sytem time) and the elapsed time for a started process.
We go through all files in the `/usr/share/` directory:

```console
$ \time -v find /usr/share > /dev/null
        Command being timed: "find /usr/share"
        User time (seconds): 0.03
        System time (seconds): 0.15
        Percent of CPU this job got: 15%
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:01.24
        Average shared text size (kbytes): 0
        Average unshared data size (kbytes): 0
        Average stack size (kbytes): 0
        Average total size (kbytes): 0
        Maximum resident set size (kbytes): 3876
        Average resident set size (kbytes): 0
        Major (requiring I/O) page faults: 0
        Minor (reclaiming a frame) page faults: 1102
        Voluntary context switches: 14861
        Involuntary context switches: 17
        Swaps: 0
        File system inputs: 168216
        File system outputs: 0
        Socket messages sent: 0
        Socket messages received: 0
        Signals delivered: 0
        Page size (bytes): 4096
        Exit status: 0

$ \time -v find /usr/share > /dev/null
        Command being timed: "find /usr/share"
        User time (seconds): 0.02
        System time (seconds): 0.07
        Percent of CPU this job got: 100%
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:00.09
        Average shared text size (kbytes): 0
        Average unshared data size (kbytes): 0
        Average stack size (kbytes): 0
        Average total size (kbytes): 0
        Maximum resident set size (kbytes): 3976
        Average resident set size (kbytes): 0
        Major (requiring I/O) page faults: 0
        Minor (reclaiming a frame) page faults: 1102
        Voluntary context switches: 1
        Involuntary context switches: 4
        Swaps: 0
        File system inputs: 0
        File system outputs: 0
        Socket messages sent: 0
        Socket messages received: 0
        Signals delivered: 0
        Page size (bytes): 4096
        Exit status: 0
```

In the first run, the elapsed time is larger than the user time + system time.
But in the second run, they are very close.

This is because in the first time, the process did a lot of disk interactions and had to wait.
This is why CPU usage is at 15%.
The second time, the files are already in the buffer cache, so the disk is not used.
This is why CPU usage is at 100%.

As a note for later in the session, also note the number of voluntary / involuntary context switches: 14861 + 17 in the first case, vs 1+4 in the second case.
We will discuss these later.

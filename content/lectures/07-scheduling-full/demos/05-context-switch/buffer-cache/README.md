# Context Switches and the Buffer Cache

This demo showcases how context switches are affected by the use of the buffer cache.
We use the same commands as in the demo in [../../00-pitch/start-process-times/](../../00-pitch/start-process-times/).

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

As we can see, there is a large difference in the number of context switches.
Because, in the first run, the disk is used heavily, the thread goes to sleep waiting for the disk to provide data.
This results in a large number of voluntary context switches (`14861`).
In the second run, when the buffer cache is used, the number of voluntary context switches is basically 0.
This is because, with all information available in memory, the thread doesn't have to wait (and go to the sleeping state).

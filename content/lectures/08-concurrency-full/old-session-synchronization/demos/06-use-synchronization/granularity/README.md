# Granularity of Critical Sections

Synchronization causes overhead.
This is why it's important to do a good level of granularity.
Fine-grained synchronization provides more option to parallelize, but will likely cause more overhead.
Coarse-grained synchronization is more serial, but will cause less overhead for synchronization calls.

This demo showcases that fine-grained synchronization may not be the best thing.

First, build it with:

```console
make
```

Then run it with:

```console
$ \time -v ./granularity-fine
        Command being timed: "./granularity-coarse"
        User time (seconds): 0.01
        System time (seconds): 0.00
        Percent of CPU this job got: 140%
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:00.01
        Average shared text size (kbytes): 0
        Average unshared data size (kbytes): 0
        Average stack size (kbytes): 0
        Average total size (kbytes): 0
        Maximum resident set size (kbytes): 2144
        Average resident set size (kbytes): 0
        Major (requiring I/O) page faults: 0
        Minor (reclaiming a frame) page faults: 283
        Voluntary context switches: 116
        Involuntary context switches: 2
        Swaps: 0
        File system inputs: 0
        File system outputs: 0
        Socket messages sent: 0
        Socket messages received: 0
        Signals delivered: 0
        Page size (bytes): 4096
        Exit status: 0

$ \time -v ./granularity-fine
        Command being timed: "./granularity-fine"
        User time (seconds): 1.46
        System time (seconds): 10.57
        Percent of CPU this job got: 1380%
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:00.87
        Average shared text size (kbytes): 0
        Average unshared data size (kbytes): 0
        Average stack size (kbytes): 0
        Average total size (kbytes): 0
        Maximum resident set size (kbytes): 2020
        Average resident set size (kbytes): 0
        Major (requiring I/O) page faults: 0
        Minor (reclaiming a frame) page faults: 282
        Voluntary context switches: 391539
        Involuntary context switches: 28032
        Swaps: 0
        File system inputs: 0
        File system outputs: 0
        Socket messages sent: 0
        Socket messages received: 0
        Signals delivered: 0
        Page size (bytes): 4096
        Exit status: 0
```

As you can see, fine-grained synchronization is bad all around:

1. More CPU time spent.
1. More elapsed time.
1. More context switches (both voluntary and involuntary).

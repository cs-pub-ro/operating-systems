# Spinlocks vs Mutexes

Mutual exclusion / Atomicity can be achieved by using spinlocks and mutexes.
Spinlocks do busy waiting and generally can end up consuming more CPUs.
Mutexes put the thread to sleep (if the lock is taken) so it will not consume CPU, but will cause more overhead because of its inherent implementation complexity.

This demo showcases the downside of using mutexes for small critical sections.
Mutexes should be used for larger critical sections and / or those where threads sleep.

First build it:

```console
make
```

Then run the two binary executables:

```console
$ ./mutex
Mutex version - shared = 80000000

$ ./spinlock
Spinlock version - shared = 80000000

$ \time -v ./mutex
Mutex version - shared = 80000000
        User time (seconds): 11.82
        System time (seconds): 40.76
        Percent of CPU this job got: 660%
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:07.95
        Average shared text size (kbytes): 0
        Average unshared data size (kbytes): 0
        Average stack size (kbytes): 0
        Average total size (kbytes): 0
        Maximum resident set size (kbytes): 1640
        Average resident set size (kbytes): 0
        Major (requiring I/O) page faults: 0
        Minor (reclaiming a frame) page faults: 91
        Voluntary context switches: 5726385
        Involuntary context switches: 913
        Swaps: 0
        File system inputs: 0
        File system outputs: 0
        Socket messages sent: 0
        Socket messages received: 0
        Signals delivered: 0
        Page size (bytes): 4096
        Exit status: 0

$ \time -v ./spinlock
Spinlock version - shared = 80000000
        Command being timed: "./spinlock"
        User time (seconds): 31.74
        System time (seconds): 0.00
        Percent of CPU this job got: 606%
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:05.23
        Average shared text size (kbytes): 0
        Average unshared data size (kbytes): 0
        Average stack size (kbytes): 0
        Average total size (kbytes): 0
        Maximum resident set size (kbytes): 1764
        Average resident set size (kbytes): 0
        Major (requiring I/O) page faults: 0
        Minor (reclaiming a frame) page faults: 91
        Voluntary context switches: 11
        Involuntary context switches: 399
        Swaps: 0
        File system inputs: 0
        File system outputs: 0
        Socket messages sent: 0
        Socket messages received: 0
        Signals delivered: 0
        Page size (bytes): 4096
        Exit status: 0
```

Results show that:

1. Spinlocks are generally faster, given the small critical section.
1. Mutexes block a lot: there are more than 5 million voluntary context switches.
1. Spinlocks don't spend any time in kernel-mode: they just spin in user mode.
1. Mutexes spend quite some time in kernel mode to block threads and invoke the scheduler.

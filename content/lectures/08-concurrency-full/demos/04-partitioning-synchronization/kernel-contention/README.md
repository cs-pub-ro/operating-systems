# Demo: Contention in the Kernel

Workers that each map a page of memory, touch it and unmap it, 50,000 times, first as threads of one process and then as separate processes.

## Goal

See that threads which share no data in user space can still wait for each other, on shared data the kernel keeps on their behalf.

## Background

`map_unmap.c` starts N workers.
A worker calls `mmap()` for one anonymous page, writes one byte to it, and calls `munmap()`, in a loop.
No worker reads or writes anything another worker uses: in user space the work is perfectly partitioned.

```console
./map_unmap threads N
./map_unmap processes N
```

With `threads` the workers are threads of one process, so they share one address space.
With `processes` each worker is a process created with `fork()`, with an address space of its own.

The kernel describes an address space with one structure per process, and changes to it, a new mapping, a mapping removed, are made under one lock that belongs to that structure.

## Build and run

```console
make
./map_unmap threads 1
./map_unmap threads 8
./map_unmap processes 8
```

## Results and explanations

On a 24-CPU machine:

| Workers | As threads | As processes |
| ---: | ---: | ---: |
| 1 | 108 ms | 92 ms |
| 2 | 222 ms | 87 ms |
| 4 | 561 ms | 87 ms |
| 8 | 1,635 ms | 109 ms |

Each worker does the same amount of work, and there are more cores than workers, so the time should stay flat as workers are added.
For processes it does.
For threads, eight workers take fifteen times longer than one.

```text
$ \time -v ./map_unmap threads 8
        User time (seconds): 0.04
        System time (seconds): 12.56
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:01.66
        Voluntary context switches: 33639
$ \time -v ./map_unmap processes 8
        User time (seconds): 0.03
        System time (seconds): 0.80
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:00.11
        Voluntary context switches: 17
```

Almost all the time is system time, and the threads went through 33,639 voluntary context switches: they were blocked, inside the kernel, waiting.
Eight threads calling `mmap()` and `munmap()` all change the same address space, and the kernel lets one of them at a time do it.
Eight processes change eight address spaces, and never meet.

The program has no lock in it and no shared variable.
The shared data is the kernel's, the lock is the kernel's, and the program cannot remove either; it can only call less often, or not share the address space.

## Going further

* Run `perf top` (as root) while `./map_unmap threads 8` runs, and look for the lock in the names at the top.
* Map once before the loop and only touch the page inside it.
  How do threads compare with processes now?
* `malloc()` and `free()` of a large block call `mmap()` and `munmap()`.
  What does that say about eight threads that each allocate and free a 1 MB buffer in a loop?
* Other things the threads of a process share in the kernel: the file descriptor table, the current directory, a file's offset.
  Which system calls would contend on each?

## References

* `man 2 mmap`, `man 2 fork`
* Jonathan Corbet, [The ongoing search for mmap_lock scalability](https://lwn.net/Articles/893906/), on LWN, about the lock this demo runs into
* `man 1 perf-top`

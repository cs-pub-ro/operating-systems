# Minor and Major Page Faults

A process can have minor page faults and major faults.
Minor page faults result in mapping existing physical memory to the virtual address space of the process.
Major page faults require access to disk (can be swap space) to copy content in physical memory and only then map physical memory in the virtual address space of the process.
Major page faults are expensive.

To show the minor and major page faults for the current process (Bash), use:

```console
$ ps -o pid,comm,vsz,rss,min_flt,maj_flt $$
    PID COMMAND            VSZ   RSS  MINFL  MAJFL
  26566 bash             16540 10964  94154      0
```

We can see there are no major faults, there was no interaction with the disk, the memory contents were already there when the process started to run.

To capture the total number of minor and major page faults across the system, use:

```console
$ ps -e -o min_flt --no-header | grep -v ' 0' | paste -s -d '+' | bc
68304490

$ ps -e -o maj_flt --no-header | grep -v ' 0' | paste -s -d '+' | bc
7337
```

We can see the number of major page faults is drastically smaller than the number of minor page faults.
The operating systems uses the buffer cache, disk prefetching and other mechanisms to ensure that as much data as possible is present in memory when a page fault occurs, to reduce the overhead.

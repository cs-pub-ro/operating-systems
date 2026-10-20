# Page Fault Updates

Using memory allocation calls (such as `malloc()` or `mmap()`) only results in reserving virtual memory.
This doesn't cause any page faults.
Page faults, and physical memory allocation and then mapping happen at access.

This demo showcases the separate steps of reserving virtual memory (via `mmap`) and then allocating physical memory (via memory access) at page faults.

First, build it:

```console
make
```

Now run the `reserve_allocate` executable binary:

```console
./reserve_allocate
```

In another console monitor the page faults.

```console
ps -o pid,cmd,vsz,rss $(pidof reserve_allocate)
```

Go step by step in the first console to reserve virtual memory, allocate physical memory and then deallocate virtual memory.
Notice that `mmap()` calls result in reserving virtual memory (but not allocating physical memory);
and that physical memory allocation (and a page fault) happen at each initial page access.

In the end, you would get an output similar to the one below:

```console
# initial
$ ps -o pid,comm,vsz,rss,min_flt,maj_flt $(pidof reserve_allocate)
    PID COMMAND            VSZ   RSS  MINFL  MAJFL
  81381 reserve_allocat   2748  1464     90      0

# after mmap
$ ps -o pid,comm,vsz,rss,min_flt,maj_flt $(pidof reserve_allocate)
    PID COMMAND            VSZ   RSS  MINFL  MAJFL
  81381 reserve_allocat   6844  1464     90      0

# after touching first byte in each page
$ ps -o pid,comm,vsz,rss,min_flt,maj_flt $(pidof reserve_allocate)
    PID COMMAND            VSZ   RSS  MINFL  MAJFL
  81381 reserve_allocat   6844  5496   1114      0

# after touching last byte in each page
$ ps -o pid,comm,vsz,rss,min_flt,maj_flt $(pidof reserve_allocate)
    PID COMMAND            VSZ   RSS  MINFL  MAJFL
  81381 reserve_allocat   6844  5496   1114      0

# after munmap
$ ps -o pid,comm,vsz,rss,min_flt,maj_flt $(pidof reserve_allocate)
    PID COMMAND            VSZ   RSS  MINFL  MAJFL
  81381 reserve_allocat   2748  1464   1114      0
```

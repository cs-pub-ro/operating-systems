# `jemalloc`

[`jemalloc`](http://jemalloc.net/) is a featureful allocator that is intended to replace the standard allocator in the standard C library (libc).
`jemalloc` provides replacements for the general `malloc()` and `free()` functions, and also provides a custom API targeted for performance tuning.

As [documented](https://github.com/jemalloc/jemalloc/wiki/Getting-Started), there are multiple ways to use `jemalloc`, the easiest of which is to use the `LD_PRELOAD` environment variable and preload the library and hook into `malloc()` and `free()` function calls.

Navigate to the `chapters/data/investigate-memory/guides/jemalloc` directory.

First install `jemalloc` on our system.
On your typical Ubuntu / Debian-based system, use `apt`:

```console
student@os:~/.../jemalloc$ sudo apt -y install libjemalloc-dev
```

Note that this installs the distribution package, not the latest one (that may provide more features).

With this in place, we can use `jemalloc` against our pre-built executables or system executables (such as `ls`, `ps`).
We can test it against the executable files from `support/memory-leak/`:

```console
student@os:~/.../jemalloc$ LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so ./memory_leak_malloc
Andrei Popescu is 22 years old and likes Linux
Ioana David is 23 years old and likes macOS
```

`jemalloc` can use the `MALLOC_CONF` environment variable for a [diverse set of configurations](https://www.freebsd.org/cgi/man.cgi?query=malloc.conf).
For example, by using `stats_print:true` we print out information regarding the use of the library functions:

```console
student@os:~/.../jemalloc$ LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so MALLOC_CONF="stats_print:true" ./memory_leak_malloc
Andrei Popescu is 22 years old and likes Linux
Ioana David is 23 years old and likes macOS
___ Begin jemalloc statistics ___
Version: 3.6.0-11
Assertions disabled
Run-time option settings:
  opt.abort: false
  opt.lg_chunk: 22
  opt.dss: "secondary"
  opt.narenas: 32
  opt.lg_dirty_mult: 3
  opt.stats_print: true
  opt.junk: false
  opt.quarantine: 0
  opt.redzone: false
[...]
dirty pages: 26:0 active:dirty, 0 sweeps, 0 madvises, 0 purged
            allocated      nmalloc      ndalloc    nrequests
small:          72672          114            0            3
large:          32768            1            0            1
total:         105440          115            0            4
active:        106496
mapped:       4194304
[...]
```

`jemalloc` doesn't work against system executables using preloading, likely because of security options disabling the use of the library:

```console
student@os:~/.../jemalloc$ LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so MALLOC_CONF="stats_print:true" /bin/ls
Makefile  memory_leak  memory_leak.cpp  memory_leak_malloc  memory_leak_malloc.c  memory_leak_malloc.o  memory_leak.o

student@os:~/.../jemalloc$ LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so MALLOC_CONF="stats_print:true" /bin/ps
  PID TTY          TIME CMD
 1581 pts/22   00:00:00 ps
26732 pts/22   00:00:01 bash
```

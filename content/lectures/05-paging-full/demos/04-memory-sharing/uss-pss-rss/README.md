# Shared Memory Information

The resident set size (RSS) metric includes shared memory information (such as executable and shared libraries).
All processes sharing the same executable and shared libraries will count them to their RSS.

A better metric is proportional set size (PSS) which splits the shared values equally among processes.
Adding PSS values gives the actual size of the used physical memory.

Another metric is called unique set size (USS) that counts only physical memory particular to the process.

To show the PSS and RSS of various memory areas in the current (Bash) process, use:

```console
$ cat /proc/$$/smaps | grep '\(^[0-9a-f]\|^Pss:\|^Rss:\)'
62c63254a000-62c63257a000 r--p 00000000 fc:03 29884740                   /usr/bin/bash
Rss:                 192 kB
Pss:                   9 kB
62c63257a000-62c6326b0000 r-xp 00030000 fc:03 29884740                   /usr/bin/bash
Rss:                1240 kB
Pss:                  63 kB
62c6326b0000-62c6326e6000 r--p 00166000 fc:03 29884740                   /usr/bin/bash
Rss:                 120 kB
Pss:                   6 kB
62c6326e6000-62c6326ea000 r--p 0019c000 fc:03 29884740                   /usr/bin/bash
Rss:                  16 kB
Pss:                  16 kB
62c6326ea000-62c6326f3000 rw-p 001a0000 fc:03 29884740                   /usr/bin/bash
Rss:                  36 kB
Pss:                  36 kB
62c6326f3000-62c6326fe000 rw-p 00000000 00:00 0
Rss:                  32 kB
Pss:                  32 kB
62c66092d000-62c660f62000 rw-p 00000000 00:00 0                          [heap]
Rss:                6228 kB
Pss:                6228 kB
[...]
```

As you can see, the read-write memory areas belong fully to the process, whereas non-writable memory areas are shared among multiple processes: areas belonging to the same executable are shared among processes started from the same executable; areas belonging to a shared library are shared among processes using the same shared library.

If you install the [`smem` tool](https://man7.org/linux/man-pages/man8/smem.8.html), you will be able to view the USS, PSS and RSS of the process:

```console
$ smem -P bash | head -1 ; smem -P bash | grep $$
  PID User     Command                         Swap      USS      PSS      RSS
26566 razvan   -bash                              0     6524     6654    11144
```

About only half of the resident set size is particular to the process (mostly it's the heap).
The other is shared with other processes.

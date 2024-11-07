# File Mappings

Mapping a file to the VAS of a process is similar to how shared libraries are loaded into the same VAS.
It's a fancier way of saying that the contents of a file are copied from a given offset within that file to a given address.
What's nice about this is that the OS handles all offsets, addresses and memory allocations on its own, with a single highly versatile syscall: `mmap()`.

Let's run a `sleep` process and inspect its memory zones:

```console
student@os:~$ sleep 1000 &  # start a `sleep` process in the background
[1] 17579

student@os:~$ cat /proc/$(pidof sleep)/maps
55b7b646f000-55b7b6471000 r--p 00000000 103:07 6423964                   /usr/bin/sleep
55b7b6471000-55b7b6475000 r-xp 00002000 103:07 6423964                   /usr/bin/sleep
55b7b6475000-55b7b6477000 r--p 00006000 103:07 6423964                   /usr/bin/sleep
55b7b6478000-55b7b6479000 r--p 00008000 103:07 6423964                   /usr/bin/sleep
55b7b6479000-55b7b647a000 rw-p 00009000 103:07 6423964                   /usr/bin/sleep
55b7b677c000-55b7b679d000 rw-p 00000000 00:00 0                          [heap]
7fe442f61000-7fe44379d000 r--p 00000000 103:07 6423902                   /usr/lib/locale/locale-archive
7fe44379d000-7fe4437bf000 r--p 00000000 103:07 6432810                   /usr/lib/x86_64-linux-gnu/libc-2.31.so
7fe4437bf000-7fe443937000 r-xp 00022000 103:07 6432810                   /usr/lib/x86_64-linux-gnu/libc-2.31.so
7fe443937000-7fe443985000 r--p 0019a000 103:07 6432810                   /usr/lib/x86_64-linux-gnu/libc-2.31.so
7fe443985000-7fe443989000 r--p 001e7000 103:07 6432810                   /usr/lib/x86_64-linux-gnu/libc-2.31.so
7fe443989000-7fe44398b000 rw-p 001eb000 103:07 6432810                   /usr/lib/x86_64-linux-gnu/libc-2.31.so
7fe44398b000-7fe443991000 rw-p 00000000 00:00 0
7fe4439ad000-7fe4439ae000 r--p 00000000 103:07 6429709                   /usr/lib/x86_64-linux-gnu/ld-2.31.so
7fe4439ae000-7fe4439d1000 r-xp 00001000 103:07 6429709                   /usr/lib/x86_64-linux-gnu/ld-2.31.so
7fe4439d1000-7fe4439d9000 r--p 00024000 103:07 6429709                   /usr/lib/x86_64-linux-gnu/ld-2.31.so
7fe4439da000-7fe4439db000 r--p 0002c000 103:07 6429709                   /usr/lib/x86_64-linux-gnu/ld-2.31.so
7fe4439db000-7fe4439dc000 rw-p 0002d000 103:07 6429709                   /usr/lib/x86_64-linux-gnu/ld-2.31.so
7fe4439dc000-7fe4439dd000 rw-p 00000000 00:00 0
7ffd07aeb000-7ffd07b0c000 rw-p 00000000 00:00 0                          [stack]
7ffd07b8b000-7ffd07b8e000 r--p 00000000 00:00 0                          [vvar]
7ffd07b8e000-7ffd07b8f000 r-xp 00000000 00:00 0                          [vdso]
ffffffffff600000-ffffffffff601000 --xp 00000000 00:00 0                  [vsyscall]
```

In the output above, you can see that the `.text`, `.rodata`, and `.data` sections for each dynamic library are mapped into the process’s VAS, along with the sections of the main executable.

To understand how these mappings are created, let’s explore a simpler example.
Below is an illustration of how `libc` is loaded (or mapped) into the VAS of an `ls` process.

```console
student@os:~$ strace ls
openat(AT_FDCWD, "/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
[...]
mmap(NULL, 2037344, PROT_READ, MAP_PRIVATE|MAP_DENYWRITE, 3, 0) = 0x7fb313c9c000
mmap(0x7fb313cbe000, 1540096, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x22000) = 0x7fb313cbe000
mmap(0x7fb313e36000, 319488, PROT_READ, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x19a000) = 0x7fb313e36000
mmap(0x7fb313e84000, 24576, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x1e7000) = 0x7fb313e84000
```

For a quick recap on `mmap(addr, length, prot, flags, fd, offset)`, the fifth argument specifies the **file descriptor** to copy data from, while the sixth is the offset within the file from where to start copying.

In summary, when an executable runs, the loader uses `mmap()` to reserve memory zones for its shared libraries.
Performance is not affected by this since pages are populated **on-demand**, when they’re accessed for the first time.

## File I/O vs `mmap()`

When it comes to dynamic libraries, `mmap` is unmatched.
With a single call, it handles **address mapping**, **permission setting**, and leverages demand paging to populate pages only when accessed.
Additionally, `mmap()` fully supports **copy-on-write (COW)**, allowing libraries to share the same physical frames across multiple processes, which conserves memory and reduces load time.

In contrast, using `read` and `write` would require loading the entire library into physical memory for each process individually, missing out on both the **copy-on-write** and **demand paging** benefits.

For regular files, however, the choice isn’t always straightforward.
The main sources of overhead for `mmap()` include managing virtual memory mappings - which can lead to **TLB flushes** - and the cost of page faults due to **demand paging**.

On the plus side, `mmap()` excels with random access patterns, efficiently reusing mapped pages.
It is also great for operating large amounts of data, as it enables the kernel to automatically unload and reload pages as needed when memory when under memory pressure.

A concrete scenario where these downsides outweigh the benefits of `mmap()` is one-time, sequential I/O.
If you’re simply planning to read or write a file in one go, `read()` and `write()` are the way to go.

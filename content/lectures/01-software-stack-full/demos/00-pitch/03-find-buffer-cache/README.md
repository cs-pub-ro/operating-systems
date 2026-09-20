# Demo: The Same Command, Three Times, Fifteen Times Faster

Run one command three times without changing anything about it, and watch it get an order of magnitude faster after the first run.

## Goal

Show that a program's running time is not a property of the program.
Between `find` and the disk there is a kernel that remembers, and what it remembers decides what the command costs.

## Background

`find /usr/share` walks a directory tree and prints every path in it.
To do that it has to read directory contents and inode metadata, and those live on disk.

Reading from disk is expensive: hundreds of microseconds for a spinning disk, tens for an SSD, against tens of *nanoseconds* for memory.
So the kernel does not throw away what it has read.
Everything that comes off the block device is kept in the **page cache**, in whatever memory is not otherwise in use, and the next read of the same block is answered from there.

Nothing in `find` knows about any of this.
It issues the same system calls every time; the difference is entirely in what the kernel has to do to answer them.

## Build and run

There is nothing to build.
Run the same command three times:

```console
\time -v find /usr/share > /dev/null
\time -v find /usr/share > /dev/null
\time -v find /usr/share > /dev/null
```

The leading backslash bypasses the shell's own `time` keyword so that `/usr/bin/time` runs instead, which is the one that understands `-v`.
On a distribution that does not ship it, install the `time` package, or drop the `-v` and use the shell's `time`.

## Results and explanations

```text
run 1    elapsed 2.66 s
run 2    elapsed 0.18 s
run 3    elapsed 0.15 s
```

The first run reads roughly 424 000 directory entries off the device.
The second and third read them out of memory.

`\time -v` shows the mechanism directly, in the line that counts voluntary context switches:

```text
run 1    Voluntary context switches: 29996
run 3    Voluntary context switches: 1
```

A *voluntary* context switch is the process handing the CPU back because it has nothing to do until something else finishes.
On the cold run that happens thirty thousand times, once per batch of directory entries that has to come off the device.
On a warm run it happens once, because the answer is already in memory and no call ever blocks.

The *Major (requiring I/O) page faults* line stays at zero throughout, which surprises people.
It is not the counter for this: `find` reads directories through `getdents64()` and `statx()`, not through a memory mapping, so the I/O it waits for is never charged to it as a page fault.
Major faults are what you would watch when the data arrives through `mmap()` instead -- when a large binary is started for the first time, say.

To see the cold number again you have to empty the cache, which needs root:

```console
sync
echo 3 | sudo tee /proc/sys/vm/drop_caches
```

That is worth doing once, to confirm that the speed-up really is the cache and not some property of the filesystem.

Two lessons follow, and the second matters more than the first.

* **A benchmark that runs the program once measures the cache, not the program.**
  This is why the first run of a test suite, a build, or a query is meaningless, and why benchmarking tools discard warm-up runs.
* **Free memory is wasted memory.**
  A Linux system reports almost all of its RAM as "in use" because the page cache has taken it, and gives it back the instant a process asks for it.
  Memory that sits idle buys nothing; memory holding a copy of the disk buys this.

## Going further

* Run `free -h` before and after the first `find` and watch the `buff/cache` column grow.
* Compare `find /usr/share | wc -l` on a warm cache against `du -sh /usr/share`, which reads the same metadata: both are fast for the same reason.
* Use `strace -c find /usr/share` to check the claim that the system calls are the same on the cold and the warm run.
  The counts should match almost exactly; only the time spent in them changes.
* The same effect explains why the second `grep` through a source tree is instant, and why a container image pull feels slow only once.

## References

* `man 1 time`, `man 2 open`, `man 7 inode`
* [Linux page cache](https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html#page-cache)
* [Linux ate my RAM](https://www.linuxatemyram.com/)
</content>

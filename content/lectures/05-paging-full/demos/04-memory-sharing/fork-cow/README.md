# Demo: `fork()` and Copy-on-Write

A parent fills 64 MB and forks.
The child reads all of it for free, and pays one page fault per page the moment it writes.

## Goal

See the kernel share frames between two processes without either asking, and un-share them one page at a time, exactly when a write makes sharing impossible.

## Background

`fork_cow.c` maps 64 MB, writes every byte, and forks.
The child reads one byte per page, then writes one byte per page, and after each step prints four lines from `/proc/self/smaps_rollup`: `Rss`, `Pss`, `Shared_Dirty` (resident pages written to and mapped by more than one process) and `Private_Dirty` (written to and mapped by this one only).
The parent prints the same before the fork and after the child exits, and checks that its own data is intact.

## Build and run

```console
make
./fork_cow
```

## Results and explanations

```text
$ ./fork_cow
parent before fork():         Rss  67096 kB  Pss  65654 kB  Shared_Dirty      0 kB  Private_Dirty  65648 kB
child  after fork():          Rss  66348 kB  Pss  32839 kB  Shared_Dirty  65616 kB  Private_Dirty     28 kB
child  reads every page:     0 page faults
child  after reading:         Rss  66604 kB  Pss  32842 kB  Shared_Dirty  65612 kB  Private_Dirty     32 kB
child  writes to every page: 16384 page faults
child  after writing:         Rss  66604 kB  Pss  65610 kB  Shared_Dirty     76 kB  Private_Dirty  65568 kB
parent after the child exits: Rss  67480 kB  Pss  65656 kB  Shared_Dirty      0 kB  Private_Dirty  65648 kB
parent p[0] is still 1
```

Line by line:

* **Before the fork** the parent owns 64 MB of private, dirty pages.
* **After the fork** the child has the same 64 MB resident, and not one page of it is private: `Shared_Dirty` is 64 MB and `Pss` is half, 32 MB.
  `fork()` did not copy the memory.
  It copied the page table, pointing the child's entries at the parent's frames, and marked both processes' entries read-only.
* **Reading** every page costs 0 page faults.
  The entries are valid and allow reading; the hardware serves the loads from the shared frames and the kernel is not involved.
* **Writing** every page costs 16,384 page faults, one per page.
  Each write hits a read-only entry, traps, and the kernel sees from its list of zones that the zone is writable and private: the fault is not an error, it is the moment to copy.
  It allocates a frame, copies the 4 KB, points the child's entry at the copy, read-write, and lets the write proceed.
  After the loop the child's `Private_Dirty` is 64 MB and `Shared_Dirty` is nothing.
* **The parent** has its 64 MB private again once the child is gone, and `p[0]` still holds what it wrote: the child's writes went to the child's copies.

This is **copy-on-write**: share until someone writes, then copy only the page written.
It is why `fork()` of a process holding gigabytes takes microseconds, why a child that only calls `exec()` costs almost nothing, and the mechanism behind the `Shared_Dirty` lines of part 04.

## Going further

* Make the child write to one page only: 1 fault, `Private_Dirty` 4 KB, `Pss` up by 2 KB.
  The unit of copying is the page.
* Make the *parent* write after the fork, while the child sleeps: the parent faults and copies, the child keeps the original frames.
  Copy-on-write is symmetric; whoever writes first pays.
* Fork twice and `Pss` for the shared pages drops to a third.
* `strace -f -e trace=clone,clone3 ./fork_cow` shows the one system call behind `fork()`; lecture 06 is about it.

## References

* `man 2 fork`, `man 5 proc` (`/proc/[pid]/smaps_rollup`)

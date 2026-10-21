# Demo: How Much Page Table a Process Has

The kernel reports the size of a process's page tables as `VmPTE`.
Compare it with what a flat table would take.

## Goal

Make the multi-level page table concrete with one number: a process's tables are tens of kilobytes, not hundreds of gigabytes, because only the branches in use exist.

## Run

```console
grep -E 'VmSize|VmRSS|VmPTE' /proc/$$/status
grep -E 'VmSize|VmRSS|VmPTE' /proc/$(pgrep -f chrom | tail -1)/status
```

## Results and explanations

```text
$ grep -E 'VmSize|VmRSS|VmPTE' /proc/$$/status
VmSize:    10588 kB
VmRSS:      4392 kB
VmPTE:        60 kB
$ grep -E 'VmSize|VmRSS|VmPTE' /proc/$(pgrep -f chrom | tail -1)/status
VmSize: 1522658872 kB
VmRSS:   1284720 kB
VmPTE:      7812 kB
```

The arithmetic first.
A page table with one entry per page of the whole 128 TiB user address space, laid out flat so that the page number can index it directly, has 2^35 entries of 8 bytes: 256 GB, per process, before the process has touched anything.
Even a table that only covered the shell's own 10.3 MB would be 21 KB, but a flat table cannot "only cover" the zones, because the stack is at `0x7ffd...`, the libraries at `0x7f...` and the program at `0x5...`, and the array has to span the distance between them.

What the kernel reports is 60 KB for the shell.
The table is a tree of four levels on x86-64, each level a 4 KB page of 512 entries; a level-4 table points to level-3 tables, those to level-2, those to level-1 tables whose entries point at frames.
A branch with no mapped page below it is simply absent, so the shell pays for one root, a few tables on the path to each of its clusters of zones, and the leaf tables for the pages it has actually mapped: fifteen 4 KB pages of tables in all.

The browser has 1.5 TB of address space and 1.2 GB resident, and its tables take 7.8 MB.
A flat table for its address space alone would be 3 GB.
The tree makes the size of the table follow the size of what is mapped, not the size of what is reserved, which is the only reason a process can reserve a terabyte for nothing.

## Going further

* Run the [allocate-10TB demo](../../../../04-virtual-memory-full/demos/00-pitch/allocate-10TB) from lecture 04 and read its `VmPTE` after the 10 TB reservation: unchanged, because nothing was touched and no leaf table was needed.
  Then touch one byte per gigabyte and watch it grow by a few pages per touch.
* `grep -E 'PageTables' /proc/meminfo` is the machine-wide total.
* On this CPU `grep -c la57 /proc/cpuinfo` says whether a fifth level is available, for 57-bit addresses; the kernel uses it only when asked for an address above 128 TiB.

## References

* `man 5 proc` (`/proc/[pid]/status`: `VmPTE`; `/proc/meminfo`: `PageTables`)
* Intel SDM volume 3, chapter 4, or the AMD APM volume 2, chapter 5, for the exact layout of the four levels

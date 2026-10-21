# Demo: Minor and Major, on the Same File

Map a 64 MB file after dropping it from the page cache and read one byte per page: 16,384 major faults, served from disk.
Map it again and read it again: 1,024 minor faults, served from memory.

## Goal

Make the difference between the two verdicts measurable: the same accesses, the same file, and a factor of a hundred in time depending on where the pages are.

## Background

`major_fault.c` creates `data.bin` (64 MB) if it is missing, asks the kernel to drop its pages from the page cache with `posix_fadvise(POSIX_FADV_DONTNEED)`, maps it read-only, and walks it one byte per page, counting faults with `getrusage()`.
`madvise(MADV_RANDOM)` turns off read-ahead, so that every page fault brings in exactly one page; without it the kernel reads the neighbours too and most pages arrive before they are asked for.
Then it unmaps, maps again, and walks again.

The directory has to be on a real disk: on a `tmpfs` (often `/tmp`) there is no disk to drop to, and both passes are minor.

## Build and run

```console
make
./major_fault
fincore data.bin
```

## Results and explanations

```text
$ ./major_fault
16384 pages of data.bin

first pass (from disk):           1 minor,  16384 major faults, 0.302 s
second pass (from the cache):  1024 minor,      0 major faults, 0.002 s
```

The first pass took one major fault per page: the entry was invalid, the page's content was in no frame, and the kernel had to read 4 KB from the disk before it could map anything; 16,384 of those took 0.3 s on an SSD, 18 microseconds each.
On a spinning disk the same pass takes minutes.

The second pass found every page already in the page cache, because the first pass put it there.
Mapping a frame that exists is a minor fault, and the kernel did 1,024 of them for 16,384 pages: when the frames are already there it maps the faulting page and the fifteen around it in one go (*fault-around*), so most pages were valid before they were reached.
Two milliseconds, a hundred and fifty times faster.

```text
$ fincore data.bin
  RES PAGES SIZE FILE
  64M 16384  64M data.bin
```

`fincore` confirms the file is now in the cache in full.
Run `./major_fault` again: the `posix_fadvise()` drops it, and the first pass is slow once more.

The verdict, then, depends on where the content is, not on the access: same instruction, same page, major the first time and minor the second.

## Going further

* Remove the `madvise(MADV_RANDOM)` call and the first pass drops to a few hundred major faults: read-ahead brings in 128 KB or more per fault, and the other pages are minor by the time they are reached.
* `perf trace -F maj ./major_fault` prints every major fault with the address and the file.
* `echo 3 | sudo tee /proc/sys/vm/drop_caches` drops the whole page cache, and every program start on the machine is major faults for a while; do it on your own machine, not one you are projecting from.

## References

* `man 2 posix_fadvise`, `man 2 madvise` (`MADV_RANDOM`), `man 1 fincore`, `man 2 getrusage`
* `man 5 proc` (`/proc/sys/vm/drop_caches`)

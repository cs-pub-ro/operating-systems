# Demo: The Page Cache

Which pages of a file are in memory right now, and how much of the machine's memory is files.

## Goal

Name the place file-backed pages come from: the page cache, the kernel's copy of recently used files, which is also where the code of every running program lives.

## Run

```console
free -m
fincore /usr/bin/bash /usr/lib/x86_64-linux-gnu/libc.so.6 2>/dev/null
fincore ~/some-large-file; cat ~/some-large-file > /dev/null; fincore ~/some-large-file
```

## Results and explanations

```text
$ free -m
               total        used        free      shared  buff/cache   available
Mem:           60900       41409        2891        3839       21688       19490
```

21 GB of this machine's memory is `buff/cache`: pages holding file contents, kept after the file was read in case it is read again.
It counts as available, because the kernel can drop a clean file page the moment somebody needs the frame, and read it back later if the file is used again.

```text
$ fincore /usr/bin/bash /usr/lib/x86_64-linux-gnu/libc.so.6 2>/dev/null
  RES PAGES  SIZE FILE
 1.7M   426  1.7M /usr/bin/bash
 2.1M   532  2.1M /usr/lib/x86_64-linux-gnu/libc.so.6
```

Every page of `bash` and of libc is resident, because processes are running them.
The text zone of a process is a mapping of the executable file, its frames *are* the page cache's frames, and the same frames serve every process that runs the same file.
The `2>/dev/null` hides a warning from a newer `fincore` whose preferred system call is not permitted to normal users; it falls back to `mincore()` and the numbers are right.
That is where the sharing of part 04 comes from, and why `RSS` counts the page cache's pages into every process that maps them.

For a file nobody has read in a while, `fincore` shows zero resident pages; `cat` it once, and it is fully resident; it stays there until the memory is wanted for something else.

## Going further

* `vmtouch` (not installed by default) shows the same per file and can lock files in or evict them.
* `grep -E 'Cached|Buffers|Dirty|Mapped' /proc/meminfo` splits the cache: `Mapped` is the part some process has mapped, `Dirty` the part written and not yet on disk.
* Write a file and watch `Dirty` in `/proc/meminfo` rise and fall: the write went to the cache first, the disk later, which is why unplugging a USB stick without unmounting loses data (lecture 03's buffer cache, from the other side).

## References

* `man 1 fincore`, `man 1 free`, `man 5 proc` (`/proc/meminfo`)

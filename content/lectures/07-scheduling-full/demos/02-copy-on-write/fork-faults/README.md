# Demo: The Page Faults of a Fork

A parent touches 1,024 pages and forks; the child reads half of them and writes the other half; `ps` counts the faults at every step.

## Goal

See copy-on-write as page faults: creating a child costs almost nothing, reading shared pages costs nothing, and writing a page costs one fault and one copy.

## Background

`fork()` does not copy the parent's memory.
It copies the page table, so that both processes point at the same frames, and marks every entry read-only in both.
The first write to a page, from either process, faults; the kernel allocates a frame, copies that page, and points the writer's entry at the copy.

`fork_faults.c` maps 1,024 anonymous pages with `mmap()` and writes one byte in each, then forks.
The child reads a byte from the first 512 pages, then writes a byte in the last 512, then exits; the parent waits for it, then writes a byte in all 1,024.
Each step waits for `ENTER`, so that a second terminal can look.

## Build and run

```console
make
./fork_faults
```

In a second terminal, at every prompt:

```console
ps -o pid,ppid,comm,min_flt,maj_flt,rss,vsz -p "$(pgrep -d, -x fork_faults)"
```

`min_flt` is the number of minor page faults the process has taken, `rss` its resident set in KB.

## Results and explanations

```text
beginning
    PID    PPID COMMAND          MINFL  MAJFL   RSS    VSZ
1379177    5790 fork_faults        130      0  1688   2752
init p before fork
1379177    5790 fork_faults       1154      0  5784   6848
child begin
1379177    5790 fork_faults       1161      0  5912   6848
1379187 1379177 fork_faults         22      0  4980   6848
child after read
1379187 1379177 fork_faults         23      0  4980   6848
child after write
1379187 1379177 fork_faults        535      0  4980   6848
parent after wait
1379177    5790 fork_faults       1165      0  5912   6848
end
1379177    5790 fork_faults       2190      0  5912   6848
```

* **Touching 1,024 fresh pages costs 1,024 faults** (130 to 1,154) and 4 MB of `RSS`: the first touch of lecture 05, one frame per page.
* **Creating the child costs 22 faults**, for a process that starts with 4 MB of touched memory.
  Nothing was copied; the child's page table points at the parent's frames, which is why its `RSS` already counts them.
* **Reading 512 shared pages costs 1 fault.**
  Reading a shared, read-only page is an ordinary access.
* **Writing 512 pages costs 512 faults** (23 to 535): each write hits a read-only entry, and each fault copies one page into a fresh frame for the child.
* **The parent's 1,024 writes at the end cost 1,025 faults**, although the child is gone and no copy is needed.
  The parent's entries were marked read-only at the fork and never changed back; each write faults, the kernel finds the frame is no longer shared, and makes the entry writable without copying.
  A fault without a copy is cheap, but it is still a fault.

`VSZ` does not change at the fork and `RSS` barely does: the address space is the same list of zones, and the frames are the same frames.

## Going further

* Halve or double `NUM_PAGES` and watch the counts scale; replace the child's reads with writes and the 23 becomes 535.
* `grep -E 'Rss|Pss|Shared_Dirty|Private_Dirty' /proc/<pid>/smaps_rollup` on parent and child between the prompts: after the fork the pages are `Shared_Dirty` in both and `Pss` is split in two; after the child's writes, 2 MB become `Private_Dirty` in each.
* Run with `MAP_SHARED` instead of `MAP_PRIVATE` and the child's writes cause no faults and no copies: the zone is shared on purpose, and the parent sees the writes.

## References

* `man 2 fork`, `man 2 mmap` (`MAP_PRIVATE`, `MAP_SHARED`)
* `man 1 ps`, `min_flt`, `maj_flt`, `rss`, `vsz`
* `man 5 proc`, `/proc/[pid]/smaps_rollup`
* Lecture 05, part 04, for copy-on-write from the memory side

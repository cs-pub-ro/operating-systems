# Demo: One Address Space, Counted Both Ways

The shell's address space as the kernel lists it, in zones, and as the hardware reads it, in pages.

## Goal

Put the two views side by side on one process: a few dozen zones in the kernel's list, a few thousand pages in the page table, and far fewer of them present.

## Run

```console
pmap $$ | tail -5
grep -c . /proc/$$/maps
grep -E 'VmSize|VmRSS' /proc/$$/status
awk '/^VmSize/ { v = $2 } /^VmRSS/ { r = $2 } END { print "pages:", v / 4, " present:", r / 4 }' /proc/$$/status
```

## Results and explanations

```text
$ grep -c . /proc/$$/maps
33
$ grep -E 'VmSize|VmRSS' /proc/$$/status
VmSize:    10588 kB
VmRSS:      4392 kB
$ awk ... /proc/$$/status
pages: 2647  present: 1098
```

The kernel's view is 33 lines: text, data, heap, stack, libc and the other libraries, each with a start, a size and permissions.
That list is what `pmap` prints and what `mmap()`, `brk()` and `munmap()` edit.

The hardware's view is 2,647 page-table entries, one per 4 KB of the 10.3 MB the zones add up to, and 1,098 of them are valid: those are the pages that have a frame right now, and `VmRSS` is their count times four.
The other 1,549 are inside a zone and not present: parts of libc the shell never ran, parts of its heap it has not reached, pages of files not read yet.

There is no command that prints the page table itself, because it is the hardware's structure, not a file; `/proc/<pid>/pagemap` is the closest the kernel offers, and lecture 04's `pagemap` demo reads it.
What this demo shows is that the two views count different things: the list says what the shell *may* touch, the table says what it *has* touched and still holds.

## Going further

* `pmap -x $$` adds the `RSS` column per zone, which is the page table's view folded back onto the list: libc's code zone is 2 MB and some 600 KB of it is present.
* Compare `VmSize / 4` with `VmPTE` in the same file: 2,647 entries would be 21 KB flat, and the kernel reports 60 KB of page tables, because the tables are a tree and the shell's zones are spread across the address space.
  The [table-size demo](../../05-page-table/table-size) is about that number.
* Do the same for a browser process: tens of thousands of zones, hundreds of millions of pages, a few hundred thousand present.

## References

* `man 1 pmap`, `man 5 proc` (`/proc/[pid]/maps`, `/proc/[pid]/status`)

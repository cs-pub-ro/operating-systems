# Demo: Reading Your Own Page Table

The kernel exports a process's page table, one 64-bit entry per virtual page, as `/proc/self/pagemap`.
Two programs read it: one watches the entries of four fresh pages change as the pages are touched, the other finds the frame that holds `printf()` and shows two processes sharing it.

## Goal

Make the page table a thing that can be looked at: an array indexed by the virtual page number, whose entries say whether a page is present and in which frame.

## Background

A virtual address splits into a page number and an offset within the page; with 4 KB pages, the page number is the address divided by 4096.
`/proc/<pid>/pagemap` holds one 8-byte entry per virtual page, at offset `page_number * 8`, so reading the entry for an address is one `pread()` at that offset: the file *is* the array.

Of the 64 bits, bit 63 says whether the page is present in memory, bit 62 whether it is swapped out, and bits 0 to 54 hold the page frame number, the index of the physical page.
Since Linux 4.0 the frame number is shown as zero unless the reader has `CAP_SYS_ADMIN`, because knowing physical addresses helps certain attacks; run with `sudo` to see it.

`pagemap.c` maps four anonymous pages, prints their entries, writes to pages 0 and 2, prints again, reads page 1, prints again.
`shared_frame.c` calls `printf()` once, then prints the entry for the page `printf()`'s code is in.

## Build and run

```console
make
./pagemap
sudo ./pagemap
sudo ./shared_frame
sudo ./shared_frame
```

## Results and explanations

### Present bits, as a normal user

```text
$ ./pagemap
after mmap(), before any access:
  page 0: virtual 0x7cc0081e7000  index 0x7cc0081e7  present 0  frame 0x0
  page 1: virtual 0x7cc0081e8000  index 0x7cc0081e8  present 0  frame 0x0
  page 2: virtual 0x7cc0081e9000  index 0x7cc0081e9  present 0  frame 0x0
  page 3: virtual 0x7cc0081ea000  index 0x7cc0081ea  present 0  frame 0x0
after writing to pages 0 and 2:
  page 0: virtual 0x7cc0081e7000  index 0x7cc0081e7  present 1  frame 0x0
  page 1: virtual 0x7cc0081e8000  index 0x7cc0081e8  present 0  frame 0x0
  page 2: virtual 0x7cc0081e9000  index 0x7cc0081e9  present 1  frame 0x0
  page 3: virtual 0x7cc0081ea000  index 0x7cc0081ea  present 0  frame 0x0
after reading page 1:
  page 0: virtual 0x7cc0081e7000  index 0x7cc0081e7  present 1  frame 0x0
  page 1: virtual 0x7cc0081e8000  index 0x7cc0081e8  present 1  frame 0x0
  page 2: virtual 0x7cc0081e9000  index 0x7cc0081e9  present 1  frame 0x0
  page 3: virtual 0x7cc0081ea000  index 0x7cc0081ea  present 0  frame 0x0
```

The `index` column is the virtual address with the last three hex digits dropped: the page number, and the position of the entry in the file.
Right after `mmap()` all four entries say *not present*: the zone exists, the page table has nothing for it.
A write to a page flips its bit, and only its bit; a read flips it too (to the shared zero page, as the [page-faults demo](../../04-reserve-allocate-map/page-faults) explains).
Page 3 was never touched and is still not present at the end.

### Frame numbers, as root

```text
$ sudo ./pagemap
...
after reading page 1:
  page 0: virtual 0x7e62419b6000  index 0x7e62419b6  present 1  frame 0x3bef35
  page 1: virtual 0x7e62419b7000  index 0x7e62419b7  present 1  frame 0x6c7f90
  page 2: virtual 0x7e62419b8000  index 0x7e62419b8  present 1  frame 0x8b48ec
  page 3: virtual 0x7e62419b9000  index 0x7e62419b9  present 0  frame 0x0
```

Three consecutive virtual pages, three frames with nothing in common: `0x3bef35`, `0x6c7f90`, `0x8b48ec`, which are physical addresses `0x3bef35000`, `0x6c7f90000` and `0x8b48ec000`, 16 GB, 29 GB and 37 GB into the machine's RAM.
Any page can go to any frame; the page table is what remembers which, and the frame number in the entry plus the offset within the page is the physical address the hardware uses.
Frame `0x6c7f90` for page 1 is the kernel's zero page, the one every freshly read page maps to.

### One frame, two processes

```text
$ sudo ./shared_frame
pid 1209193: printf() is at 0x76398c263f90
pid 1209193: virtual page 0x76398c263 -> present 1, frame 0xfac4bd
$ sudo ./shared_frame
pid 1209195: printf() is at 0x722fcc463f90
pid 1209195: virtual page 0x722fcc463 -> present 1, frame 0xfac4bd
```

Two processes, two different virtual addresses for `printf()`, because libc is loaded at a random base in each, and one frame: `0xfac4bd`.
There is one copy of libc's code in physical memory, and every process on the machine that uses libc has a page table entry pointing into it.
This is what the lecture 03 `pmap` listing meant by "1112 KB resident, 0 KB dirty" for libc: resident in every process, owned by none.

The same frame appears under every process, and the same virtual address in two processes (the pitch's `0x404040`) points to two different frames: both are just what the two page tables say.

## Going further

* Print the entry for `&value` in two copies of the [same-address demo](../../00-pitch/same-address), as root: same virtual page number, two different frames.
  Then print it for `main()`: two different frames too?  No -- the executable's code is file-backed and shared like libc's; only data written to is private.
* Read `/proc/self/pagemap` for every page in `/proc/self/maps` and count the present ones: that is `RSS`, computed by hand.
  `/proc/<pid>/smaps` does it per area.
* `/proc/kpagecount` and `/proc/kpageflags`, indexed by frame number this time, say how many page tables map a frame and what kind of page it is.
  `0xfac4bd` has a count in the hundreds.
* `getconf PAGESIZE` is 4096 here; on an Apple M-series machine it is 16384, and everything above scales.

## References

* [`pagemap`, from the userspace perspective](https://www.kernel.org/doc/html/latest/admin-guide/mm/pagemap.html), in the kernel documentation
* `man 5 proc` (`/proc/[pid]/pagemap`, `/proc/[pid]/maps`, `/proc/[pid]/smaps`), `man 7 capabilities` (`CAP_SYS_ADMIN`)
* `man 2 pread`, `man 3 sysconf` (`_SC_PAGESIZE`)

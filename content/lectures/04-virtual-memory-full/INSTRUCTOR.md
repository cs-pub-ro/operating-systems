# Instructor Notes: Lecture 04, Virtual Memory

Notes for whoever delivers this lecture.
Nothing here is addressed to students.

## Shape of the delivery

The slot is 100 minutes: 50, a 10-minute break, 50.
In practice it is 40 + 10 + 40.
Plan for 80 minutes of content and treat the rest as spare.

The lecture follows [`STORYLINE.md`](STORYLINE.md); the storyline figure is on the fifth slide, and it is worth putting it back up at the break and at the end.
Open by pointing back at lecture 03's address space slide and the word in brackets: *(virtual)*.
The three pitch facts are the whole lecture in miniature, and it pays to state them as a puzzle ("none of these is possible if an address is a place in RAM") and to come back to each as it gets explained: the 10 TB in part 03, the browser in part 04, the same address in part 05.

| Block | Part | Minutes | Notes |
| --- | --- | ---: | --- |
| 1 | 00. Pitch | 10 | `ps --sort -vsz`, `allocate_gb 10240` with `ps` in a second terminal, two copies of `same_address`. |
| 1 | 01. What we already know | 10 | Recap from the three lecture 03 figures; `memory_ops_pages` under `pmap` if the room needs reminding. |
| 1 | 02. The virtual address space | 12 | `struct zone`, the two reservation snippets, the four reasons. No demo; keep moving. |
| 1 | 03. Virtual and physical (start) | 8 | The table of two kinds; `ps -o vsz,rss` on `$$`, on the browser, on `hello`. |
| -- | *break* | 10 | |
| 2 | 03. Virtual and physical (finish) | 4 | `reserve_mem` with `ps` at every prompt: `VSZ` moves, `RSS` does not. |
| 2 | 04. Reserve, allocate, map | 16 | The three steps, the first-touch figure, `reserve_allocate` under `ps` and the fault count, `page_faults`. |
| 2 | 05. Pages and the page table | 18 | Address arithmetic on the board, the struct, `pagemap` as user and as root, `shared_frame` twice. |
| 2 | 06. Conclusion | 2 | Leave the takeaway slide up during questions. |

## Which demos to run live

Everything here runs in seconds; the only cost is terminal juggling, so rehearse the two-terminal demos.
Have `sudo` working before the lecture, for the frame numbers.

* **`00-pitch/browser-vas-size`**: `ps -e -o pid,vsz,rss,comm --sort -vsz | head -6` on the lecture machine, whatever it shows.
  Any Chromium-based program is in the terabytes; if the machine has none, show the README output and say the machine it came from had 59 GB.
* **`00-pitch/allocate-10TB`**: `./allocate_gb 10240` in one terminal, `ps -o vsz,rss -p $(pidof allocate_gb)` in the other, before and after.
  Say the loop is running while they watch; it is too fast to see.
* **`00-pitch/same-address`**: two terminals, `./same_address` in each, read the two `&value` lines aloud.
  Press Enter in one and show its value is unchanged.
* **`01-recap/memory-ops`**: `./memory_ops_pages` with `pmap -x` in the other terminal, if the room is hazy on lecture 03; otherwise point at the `pmap` lines on the slide.
  Either way, end on the `RSS` column: 4,108 for the heap, 0 for the mapping.
  That column is the hook for the second half.
* **`03-virtual-vs-physical/show-mem`**: `ps -o pid,vsz,rss,cmd -p $$` first, so that they see the shell they are looking at has two sizes too.
* **`03-virtual-vs-physical/reserve-mem`**: seven prompts, `ps` at each.
  Read `RSS` aloud every time; the repetition is the point.
* **`04-reserve-allocate-map/reserve-allocate`**: `ps` and the `awk` on `/proc/<pid>/stat` at each prompt.
  Before the touch step, ask the room what `RSS` will be after it: half the room says 4 MB.
* **`04-reserve-allocate-map/page-faults`**: one command, five numbers.
  Stop after the first three; the zero-page half is for a room that is ahead.
* **`05-page-table/pagemap`**: as a user first (present bits), then `sudo` (frames).
  Point at the `index` column and the address next to it: the page number is the address without its last three digits, and the file offset is the index times eight.
  That is the array.
* **`05-page-table/pagemap/shared_frame`**: `sudo ./shared_frame` twice, read the two frame numbers.
  Then put the same-address output back up: two tables, same index, different frames; two tables, different indices, same frame.

## What students get wrong

* **"Virtual memory is swap."**
  The most common prior, from desktop settings dialogs.
  Swap is one of the four reasons `VSZ` exceeds `RSS`, and the least important on a modern machine; the demos never swap anything.
  Say this early, when the two kinds of memory are defined.
* **"`malloc()` allocates memory."**
  It reserves.
  The `reserve_mem` run is the correction: 12 MB reserved, `RSS` unchanged.
  Use the word *reserve* consistently from part 02 on and students pick it up.
* **"The page fault is an error."**
  Only when the kernel decides it is.
  Demand paging and `SIGSEGV` are the same hardware event, and the kernel's list of zones tells them apart; say it in part 04 and again in part 05 at the MMU slide.
* **"`RSS` is how much memory the process uses."**
  It is how much is mapped into it right now, which overcounts shared pages and undercounts what is swapped or not yet read.
  `shared_frame` makes the overcounting concrete: 229 processes count the same frame.
* **"The page table is in the CPU."**
  It is in memory, built by the kernel, read by the MMU.
  `/proc/self/pagemap` is a view of it, not the thing itself, and the question "then how fast can translation be" is the right exit to lecture 05.
* **Confusing page number and frame number.**
  Keep the words apart on the board: page is virtual, frame is physical, the table maps the first to the second, and `pagemap` prints both.

## Things that go wrong in the room

* `pidof` returns several PIDs if a previous run is still waiting at a prompt; `Ctrl-C` the old one first.
* `sudo ./pagemap` prints frames as `0x0` if run without root, silently; the present bits are still right.
  On a kernel older than 4.0 the frames show for everyone.
* `allocate_gb 10240` fails with `ENOMEM` on a system with `vm.overcommit_memory = 2`, and succeeds on the default `0`.
  Check before the lecture; if it fails, that is a worthwhile aside, not a disaster.
* `./allocate_gb 140000` hitting the 128 TiB cap takes a few seconds of `mmap()` calls before the error; do it only if asked.
* ASLR moves every stack and library address between runs; the `0x404040` of `same_address` is stable because of `-no-pie`.
  If a student's own program prints different addresses in two runs, that is the reason.
* The numbers in the READMEs are from one machine (Ubuntu 25.04, 6.14, 4 KB pages); read the shapes, not the digits.
  On an Apple Silicon machine the page is 16 KB and every count divides by four.

## Cuts, if you are behind

In order, the first things to drop:

1. The `memory-ops` demo in part 01: the slide has the `pmap` lines.
1. The second half of `page_faults` (the zero page); keep the first three numbers.
1. The four reasons for virtual memory in part 02, read out in full; point at the slide and move on.
1. The "what this costs" slide at the end of part 05; lecture 05 opens with it anyway.

Do not cut the pitch, `reserve_mem` under `ps`, `reserve_allocate` with the fault count, or `pagemap` as root.

## Links to the rest of the course

Say these explicitly.

* Lecture 03's `pmap` listing of a dynamic executable had libc at "1112 KB resident, 0 KB dirty"; `shared_frame` is why.
* Lecture 03's segmentation fault was a permission check "done by the hardware"; the page table entry is where the hardware keeps the permission.
* Lab 03, exercise 04, maps a file-sized buffer with `mmap()`; its bonus measures the 32,400 page faults per 63 MiB frame that part 04 explains.
* Lab 04's debugging sessions start from `SIGSEGV`; every one of them is an entry that said no.
* Lecture 05 picks up at the page fault and at the size of the table.

## Further demos worth writing

* **Overcommit modes**: `allocate_gb` under `vm.overcommit_memory` 0, 1 and 2, to show the kernel's three policies on promises it may not keep, and the OOM killer when a promise is called in.
* **A file-backed mapping under `pagemap`**: map the executable itself and watch pages become present as code runs through them, which is the "file not read yet" kind of page made visible.
* **Swap, on purpose**: a cgroup with a small memory limit, a program touching more than that, and `pagemap`'s bit 62 going up on the pages that left.

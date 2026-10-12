# Instructor Notes: Lecture 03, Memory Operations

Notes for whoever delivers this lecture.
Nothing here is addressed to students.

## Shape of the delivery

The slot is 100 minutes: 50, a 10-minute break, 50.
In practice it is 40 + 10 + 40.
Plan for 80 minutes of content and treat the rest as spare.

The lecture follows [`STORYLINE.md`](STORYLINE.md); the storyline figure is on the second slide, and it is worth putting it back up at the break and at the end so students see where they are.
Open by pointing back at lecture 02's system-call families table: memory management was one row, and this lecture is what that row manages.
The word "virtual" is deliberately left in brackets throughout; when someone asks how two processes can both start at `0x400000`, the answer is "lecture 04", and saying so early saves the question coming back three times.

| Block | Part | Minutes | Notes |
| --- | --- | ---: | --- |
| 1 | 00. Pitch | 12 | `ps` and the memes, the leak under `valgrind`, the row/column timing. Skip `drop_caches` live. |
| 1 | 01. Memory and the CPU | 10 | Two diagrams and the hierarchy table. No demo; keep moving. |
| 1 | 02. Memory operations | 14 | `./basic` crashing at "Execute" is the centrepiece of the first half. |
| 1 | 03. Address space (start) | 6 | The static `pmap`, line by line. |
| -- | *break* | 10 | |
| 2 | 03. Address space (finish) | 8 | The dynamic `pmap` next to the static one; the roles table. |
| 2 | 04. When memory is allocated | 12 | `readelf -S`, `size`, then `allocation-types` printing addresses. |
| 2 | 05. Run-time allocation | 16 | `allocation` with `pmap` in a second terminal, then `strace ./malloc_kb 100` and `1000`. |
| 2 | 06. Conclusion | 4 | Leave the takeaway slide up during questions. |

## Which demos to run live

Everything here runs in seconds; the only cost is terminal juggling, so rehearse the two-terminal demos.

* **`00-pitch/memory-use`**: `ps -e -o pid,comm,rss --sort -rss | head` on the lecture machine, whatever it shows.
  A browser at the top is the usual outcome and gets the laugh the memes are there for.
* **`00-pitch/memory-leak`**: `valgrind --leak-check=full ./task > /dev/null`.
  Point at `strdup` in the trace and ask what was not freed before showing the code.
* **`00-pitch/cache-memory`**: `time ./row` and `time ./column` need no privileges and show the nine-times gap; `perf stat -e instructions,cache-misses` needs `sudo` and a permissive `kernel.perf_event_paranoid`, and is what explains the gap.
  Check `perf` before the lecture; if it is locked down, show the counts from the demo's README.
* **`00-pitch/buffer-cache`**: do not run `drop_caches` on a machine you are projecting from.
  Show `free -h` and explain the `buff/cache` column instead.
* **`02-memory-operations/basic-memory-operations`**: run `./basic` and let it crash.
  Ask the room which of the five steps failed before scrolling up.
  Then `gdb -batch -ex run -ex bt ./basic` to show the faulting address is in the heap.
* **`03-address-space/see-pmap`**: two terminals; `./see-pmap-static` waiting in one, `pmap -x $(pidof see-pmap-static)` in the other.
  Walk down the list once, slowly.
  Then the same for `./see-pmap`, and ask what the extra lines are before saying "libc".
* **`04-allocation-time/allocation-types`**: run it, read the addresses, then `nm allocation-types | grep -E 'data|main'` to show the static ones were already in the file.
* **`05-runtime-allocation/allocation`**: two terminals again, `pmap -x` re-run at every prompt.
  Watch the `[ stack ]` line through the recursion and the first `[ anon ]` line through the `malloc`/`free` pair.
* **`05-runtime-allocation/malloc-kb`**: `strace -e trace=brk,mmap,munmap ./malloc_kb 100`, then `1000`.
  Ten calls, six `brk`s; then ten `mmap`s.
  This is the lecture-02 "libc decides when to cross" point, made again with memory.

## What students get wrong

* **"`malloc()` is a system call."**
  The `malloc_kb` trace kills this: ten `malloc`s, six `brk`s, and the first `malloc` of a run often makes none at all.
  Say explicitly that the allocator lives in libc and the kernel only sees `brk` and `mmap`.
* **"Allocation creates memory."**
  The fence metaphor is there for this.
  The bytes exist; allocation decides whose they are.
* **"`static` means global."**
  `allocation-types` has `local_scope_data` for exactly this: declared in a function, lands in `.data`.
  `static` is about *when* (load time), not *where it is visible*.
* **"The stack is allocated when the program starts."**
  The area is, at 136 KB; the growth to 420 KB under recursion is the kernel extending it on a fault, with no system call.
  This is the first page fault students meet, and lecture 04 will name it.
* **"A segmentation fault means I read outside my memory."**
  Sometimes.
  `./basic` faults *inside* an area it owns, because the access kind is wrong: `SEGV_ACCERR`, not `SEGV_MAPERR`.
  Permissions are per area, and execute is a permission.
* **"`free()` returns memory to the system."**
  It returns it to the allocator.
  The heap shrank in the `allocation` demo only because the freed chunks were at the top; free a chunk in the middle and `pmap` shows nothing.
  The pitch's leak is "memory the allocator still thinks is yours".

## Things that go wrong in the room

* `perf` needs `sudo` and `kernel.perf_event_paranoid` at 2 or below; `-e cache-misses` may be unsupported in a VM.
  Fall back to `time` and the README numbers.
* `drop_caches` is destructive to the machine's responsiveness for minutes.
  Own machine, before the lecture, or not at all.
* `pidof` returns several PIDs if a previous run is still waiting at a prompt; `Ctrl-C` the old one first.
* ASLR makes every address in the dynamic demos differ run to run; the static-executable demos are built `-no-pie` so the low addresses are stable.
  Under `gdb` ASLR is off, which is why `info proc mappings` shows the heap right after bss and `pmap` shows it some megabytes away.
* `./basic` dumps core; on a machine with `core_pattern` set to a handler it may pause for a few seconds.
* `valgrind` on a freshly updated glibc occasionally lacks debug symbols and prints `???` for the frames; the leak summary is unaffected.
* The numbers in the READMEs are from one machine; read the shapes, not the digits.

## Cuts, if you are behind

In order, the first things to drop:

1. The `gdb info proc mappings` view in part 03 -- `pmap` is enough.
1. `readelf -S` in part 04 -- keep `size`, which makes the bss point in one line.
1. The `mmap` step of the `allocation` demo -- `malloc_kb 1000` shows mappings anyway.
1. The hierarchy table in part 01 read out in full -- point at it and move on.

Do not cut the pitch, `./basic` crashing, the two `pmap`s side by side, or the `malloc_kb` trace.

## Links to the rest of the course

Say these explicitly.

* Lab 01 built static and dynamic executables; the two `pmap`s are what that choice does to a process.
* Lecture 02's "libc calls are not system calls" is the `malloc_kb` trace; the allocator is libc deciding when to cross.
* Lab 03 is this lecture as practice: the three file-copy variants are a global buffer (static area), `malloc` (heap) and `mmap` (a mapping), and `valgrind` is the leak demo turned into a requirement.
* Lecture 04 owns every question that starts with "but how can two processes both...".
* Lab 05's exploits start from the `./basic` crash: an attacker who can write into a buffer and then make the program jump there.

## Further demos worth writing

* **Stack overflow**: unbounded recursion until the kernel refuses to grow the stack, with `ulimit -s` to move the limit.
  It would show that the stack's growth has an end and what the end looks like.
* **Fragmentation**: allocate many blocks, free every other one, then fail to allocate one large block although the total free is enough.
  It would motivate the allocator's choices in part 05.
* **`/proc/[pid]/maps` directly**, with `cat`, to show that `pmap` is only a pretty-printer for a file the kernel exposes.

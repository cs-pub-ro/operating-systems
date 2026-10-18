# Going Further: Tune `malloc()` for a Frame Pipeline

With answers.

## Things to try

1. **One knob at a time.**
   Run with `glibc.malloc.mmap_max=0` alone and count the `brk()` calls and the page faults.

   About 200 `brk()` calls for 100 frames and the page faults do not move: every `malloc()` grows the heap by a frame, every `free()` leaves 63 MiB free at the top, which is above the trim threshold (128 KB), so the heap is cut back at once and the next frame faults all its pages in again.
   `mmap_max` only moves the traffic from `mmap()` to `brk()`; something has to stop the trim.
   `glibc.malloc.top_pad` with a value above a frame does that too: trimming always keeps `top_pad` bytes at the top of the heap, so a 64 MiB pad keeps the frame.
   Same six `brk()` calls, same 0.33 s, by a different route.
1. **The threshold instead of the maximum.**
   Try `M_MMAP_THRESHOLD` rather than `M_MMAP_MAX`, with a value above the frame size.

   On glibc 2.41 `mallopt(M_MMAP_THRESHOLD, 64 << 20)` returns 1 and works: with the trim threshold raised as well, the run is the same 0.33 s as with `M_MMAP_MAX`.
   The manual page says the upper limit is `DEFAULT_MMAP_THRESHOLD_MAX`, 32 MiB on 64-bit; that is the ceiling of the *dynamic* adjustment (item 5), and older releases enforced it for `mallopt()` too.
   Whichever knob you turn, check the return value: a rejected value fails quietly, and so does a misspelt tunable.
1. **Give it back on purpose.**
   Print `VmRSS` from `/proc/self/status` after every tenth `free()`, with and without `malloc_trim(0)` at the same point.

   Without it, RSS stays at about 64 MiB between frames: the block is free in the allocator's eyes and resident in the kernel's.
   With `malloc_trim(0)` it drops to about 1 MiB and the next frame pays its 16 k page faults again.
   That is the trade-off in one number.
1. **Ask the allocator.**
   `malloc_stats()` before `main()` returns.

   Untuned: `system bytes` 8 KB, `max mmap regions` 1 and `max mmap bytes` 66,359,296: one frame at a time went through `mmap()`, and nothing was kept.
   Tuned: `system bytes` 66,363,392 and `in use bytes` about 6 KB, `max mmap regions` 0: the frame is held, free, in the main arena.
1. **Smaller frames.**
   Set the frame to 100 KB and repeat the baseline measurement.

   Under the default settings the first frame is an `mmap()` and every later one is a heap allocation with no system call at all: when a block that came from `mmap()` is freed, glibc raises the mmap threshold to that block's size (the *dynamic mmap threshold*, `man 3 mallopt`), so the next request of that size is served from the heap.
   The adjustment stops at 32 MiB, for the reason in item 2, which is why 63 MiB frames never benefited and had to be tuned by hand.

## Questions to answer

* **The default run shows two page faults per page of each frame, not one. What are the two?**
  `render_frame()` reads a byte before writing it (`frame[i] += ...`).
  The read of an untouched anonymous page maps the kernel's shared zero page, read-only; the write then faults again and gets a private, writable copy.
  A plain store would fault once; the fixed version with `calloc()`, in the default run, still faults twice for the same reason.
  The tuned run touches each page once, on the first frame, and never faults again.
* **`calloc()` costs almost nothing in the default run and a measurable amount in the tuned one. How does it know?**
  glibc's `calloc()` knows which blocks it just obtained from the kernel: a fresh `mmap()`'d chunk, and the never-used part of the heap top, are zero by construction and are not cleared.
  A block reused from the free list is cleared with `memset()`.
  In the tuned run every frame after the first is reused, so every frame is cleared, and clearing 63 MiB a hundred times is the 0.2 s the fix costs.
* **What does `glibc.malloc.perturb` do, and why is it not for production?**
  With a non-zero value `N`, every freed block is filled with `N` and every block `malloc()` returns is filled with the complement of `N` (`calloc()` still returns zeros).
  Reads of uninitialised memory then see a recognisable pattern instead of zeros or stale data, and use-after-free sees it too.
  It costs a full write of every block on both calls, which is why the perturbed untuned run is slower than the untuned one, and it is a debugging aid: it makes bugs visible, it does not make them go away.
* **Reused memory holds what the previous owner left. What does that mean, and which call clears a block before it is given back?**
  A block freed by code handling one request can come back to code handling the next, contents intact: a password, a key, another user's record.
  A bug that reads past what was written (Heartbleed was one) leaks it.
  `explicit_bzero()` clears a block in a way the compiler is not allowed to optimise away; `memset()` before `free()` may be removed as a dead store.
* **After the tuned run's last `free()`, how much memory does the process still hold, and who gets it back, when?**
  About 64 MiB resident, in the heap, free from the allocator's point of view.
  Nobody gets it back until the process exits, when the kernel reclaims the whole address space, or until the program calls `malloc_trim()`.

## Discussion points

* **The same program, five times faster, no line of it changed.**
  The allocator is a policy, and the policy has defaults chosen for programs in general.
  Tunables are how a deployment adapts it to one program; `mallopt()` is how a program adapts it to itself.
  The limits of tuning show, too: the 32 MiB ceiling, and the fact that a setting from outside can be forgotten in the next shell.
* **`malloc()` makes no promise about contents.**
  Fresh pages from the kernel are zero and a reused block is not, so a program that works by default and breaks when tuned was broken all along -- the default merely hid it.
  `calloc()` is the promise, made explicit, and it is cheap exactly when the memory was already zero.
* **Keeping versus returning is a trade-off, not a fix.**
  The tuned program holds a frame's worth of memory for its whole life and makes no system calls for it; the default program holds nothing between frames and pays the kernel every time.
  For a pipeline on a dedicated machine the first is right; for a short-lived tool on a loaded machine the second is; `M_TRIM_THRESHOLD` and `malloc_trim()` are the dial between them.

## References

* `man 3 mallopt` -- `M_MMAP_MAX`, `M_MMAP_THRESHOLD`, `M_TRIM_THRESHOLD`, `M_TOP_PAD`, `M_PERTURB`, and the dynamic mmap threshold
* `man 3 malloc_trim`, `man 3 malloc_stats`, `man 3 malloc_info`
* `man 3 calloc`, `man 3 explicit_bzero`
* [glibc manual: Memory Allocation Tunables](https://www.gnu.org/software/libc/manual/html_node/Memory-Allocation-Tunables.html)
* `man 2 getrusage` -- `ru_minflt`, `ru_maxrss`

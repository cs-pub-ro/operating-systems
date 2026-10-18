# Going Further: Tune `malloc()` for a Frame Pipeline

Optional.

## Things to try

1. **One knob at a time.**
   Run with `glibc.malloc.mmap_max=0` alone and count the `brk()` calls and the page faults.
   The heap now grows for every frame and is cut back after every frame.
   Then find the setting that pads the top of the heap, and see whether it helps on its own.
1. **The threshold instead of the maximum.**
   Try `M_MMAP_THRESHOLD` rather than `M_MMAP_MAX`, with a value above the frame size.
   Check what `mallopt()` returns, and compare with the upper limit the manual page documents for it.
1. **Give it back on purpose.**
   In the tuned program, print `VmRSS` from `/proc/self/status` after every tenth `free()`, then add `malloc_trim(0)` at the same point and print again.
1. **Ask the allocator.**
   Call `malloc_stats()` before `main()` returns, tuned and untuned.
1. **Smaller frames.**
   Set the frame to 100 KB and repeat the baseline measurement.
   The default allocator behaves differently now, after the first `free()`; find the name of that behaviour in `man 3 mallopt`, and why it did not help the 63 MiB frames.

## Questions to answer

* The default run shows two page faults per page of each frame, not one.
  What are the two?
* `calloc()` costs almost nothing in the default run and a measurable amount in the tuned one.
  How does it know when it has to clear the memory?
* What exactly does `glibc.malloc.perturb` do on `malloc()` and on `free()`?
  Why is it a debugging setting and not something to ship with?
* Reused memory holds what the previous owner left.
  In a program that handles data for more than one user, what does that mean, and which call clears a block before it is given back?
* After the tuned run's last `free()`, how much memory does the process still hold, and who gets it back, when?

## Discussion points

* **The same program, five times faster, no line of it changed.**
  The allocator is a policy, and the policy has defaults chosen for programs in general, not for this one.
* **`malloc()` makes no promise about contents.**
  Fresh pages from the kernel are zero and a reused block is not, so a program that works by default and breaks when tuned was broken all along.
  `calloc()` is the promise, made explicit.
* **Keeping versus returning is a trade-off, not a fix.**
  The tuned program holds a frame's worth of memory for its whole life.
  For a pipeline that is the right call; for a short-lived tool on a loaded machine it may not be.

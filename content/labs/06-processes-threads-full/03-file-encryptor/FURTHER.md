# Going Further: Encrypting Files in Batches

With answers.

## Things to try

1. **Put two threads on the same file.**

   Both map the file and XOR it; the two mappings are the same pages, because `MAP_SHARED` mappings of one file share the page cache.
   If the threads run one after the other, the file is XORed twice and comes back unchanged after this pass, so the second pass breaks it.
   If they overlap, some bytes are XORed twice and some once, depending on which thread's load and store won at each position, and the file is garbage.
   Both outcomes appear across runs, which is what a race looks like from the outside.
1. **An empty file.**

   `mmap: Invalid argument`, from `map_file()`: a mapping of length 0 is `EINVAL`, as in session 03.
   The thread reports and continues; a careful `map_file()` would return 0 bytes for a 0-byte file and let the caller skip it, since an empty file XORed is an empty file.
1. **`MAP_PRIVATE` instead of `MAP_SHARED`.**

   The writes go to private copies of the pages, made on the first write to each (copy-on-write), and are thrown away at `munmap()`.
   The program runs, reports success, and the files are untouched.
   `MAP_SHARED` is the flag that makes a mapping a way to write a file.
1. **Timing.**

   On the shipped 23 MiB the whole run is 40 ms single-threaded and the batch size makes no visible difference; XOR is as fast as memory, and the work is dominated by the page cache.
   With files ten times larger, 210 MiB in all, one batch takes 0.29 s on this machine, 8 batches 0.05 s and 64 batches 0.02 s; the machine has 24 cores, and on one with 4 the improvement stops at 4 threads.
1. **Processes instead of threads.**

   `fork()` per batch, each child runs `encrypt_batch(&batches[i])` and `exit(0)`, the parent `waitpid()`s eight times.
   The batches and `argv` are inherited by the copy, so nothing changes in how the work reaches the workers; the files are written through shared mappings, so the result is the same.
   What would change is reporting: a child cannot return a pointer to its parent, because the parent's memory is a different copy, and the result would have to come back through the exit status, a file, or a pipe (session 10).

## Questions to answer

* **Why is it safe for every thread to read `argv` at once?**
  Nobody writes it.
  Concurrent reads of memory that nobody writes are always safe; it is a write that needs ordering.
* **Why map one file at a time?**
  Each mapping is a region of the address space and a set of pages; mapping all of a batch up front would hold them all at once for no benefit, and a batch of large files could run out of address space on a 32-bit machine.
  One at a time bounds what a thread holds to one file.
* **The descriptor is closed before the XOR. Why is the mapping still usable?**
  A mapping references the file, not the descriptor; `close()` drops the descriptor and the mapping keeps the file open until `munmap()`.
  Session 03 did the same with its file-backed mapping.
* **Is the thread's line printed before or after its files are encrypted?**
  Before: it is the first thing the routine does.
  It does not matter for correctness, and it is misleading as a progress report; moving it after the loop is a one-line change.

## Discussion points

* **Work items, not bytes.**
  The search split a memory region, this splits an array of tasks, and the shape is the same: a contiguous slice per thread, a struct describing it, disjoint by construction.
* **The partition is the correctness argument.**
  Overlap by one file and the program is wrong in a way no test reliably shows.
  That is why the Check Your Work insists on the one-pass check: two passes that restore the files can hide a file that was never touched at all.
* **A batch size is a knob.**
  Too small and the threads outnumber the cores and the creation cost shows; too large and some cores idle.
  It depends on the machine, so it is a parameter.

## References

* `man 2 mmap`, `man 2 msync`
* `man 2 fork`, `man 2 waitpid`
* `man 3 pthread_create`, `man 3 pthread_join`

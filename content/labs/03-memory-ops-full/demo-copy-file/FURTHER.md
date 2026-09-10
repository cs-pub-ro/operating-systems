# Going Further: Copy a File, Three Ways

## Things to try

1. **Time all three on a large file.**
   `dd if=/dev/urandom of=big.bin bs=1M count=1024`, then time each variant.
   Run each twice: the second run reads from the page cache and the numbers change completely.
   Which variant benefits most, and why?
1. **Look at the memory maps.**
   Add a `getchar()` before the copy in the mmap variant, run it, and inspect `/proc/<pid>/maps` in another terminal.
   The source and destination mappings are both visible, with their sizes and permissions.
1. **Compare with `size`.**
   `size copy_file` for the global-buffer variant shows the 1 MB buffer in `bss`.
   Do the same for the malloc variant: the buffer is gone from the binary entirely.
1. **Remove `msync` and pull the power.**
   Not literally — but `munmap` without `msync`, then read the file back immediately.
   It looks fine, because the page cache serves the read.
   The data is not necessarily on disk yet, which is the same question session 01 raised about `write`.
1. **Try `copy_file_range(2)`.**
   A fourth variant where the kernel copies the file without the data ever entering the process at all.
   On a filesystem that supports reflinks it may not copy anything.

## Questions to answer

* Where does `static char buffer[1024*1024]` actually occupy space — in the executable file, in RAM, both, or neither?
  Check with `size` and `ls -l`.
* Why does `mmap` return `MAP_FAILED` rather than `NULL` on error?
* Why must the destination be `ftruncate`d before mapping?
  What is the symptom if you forget?
* The mmap variant never allocates a buffer of its own.
  Where do the bytes actually live while being copied?
* Which of the three variants cannot copy a 100 GB file on a 32-bit system, and why?

## Discussion points

* **The three variants trade the same thing three ways:** who decides the size, and who is responsible for cleanup.
  Compile time and nobody; run time and you; run time and the kernel.
* **The malloc variant is mostly cleanup.**
  Count the `free()` calls against the lines that do actual work.
  This is the everyday cost of manual memory management, and it is why every later language has something to automate it.
* **`mmap` makes I/O invisible.**
  A `memcpy` between two mapped files is a full file copy, and nothing in the syntax says so.
  This is elegant and is also why `mmap`-based code is hard to reason about when it comes to error handling — an I/O error surfaces as `SIGBUS`, not as a return value.
* **None of the three guarantees the data is on disk** when the program exits.
  `msync` and `fsync` are the tools; the question returns in the I/O session.

## References

* `man 2 mmap`, `man 2 msync`, `man 2 ftruncate`
* `man 3 malloc`, `man 1 valgrind`
* `man 1 size` — segment sizes of a built binary
* `man 2 copy_file_range`

# Going Further: Copy a File, Four Ways

## Things to try

1. **Time all four on a large file.**
   `dd if=/dev/urandom of=big.bin bs=1M count=1024`, then time each variant.
   Run each twice: the second run reads from the page cache and the numbers change completely.
   Do the four differ at all, and if not, why not?
1. **Look at the memory maps.**
   Add a `getchar()` after the buffer exists in each variant, run it, and read `/proc/<pid>/maps` (or `pmap -x <pid>`) from another terminal.
   Find the megabyte in each: in `[heap]` or a mapping, on `[stack]`, in the executable's own areas.
1. **Compare with `size`.**
   `size copy_file` for the global-buffer variant shows the 1 MiB in `bss`; for the other three it is nowhere in the binary.
   Then `ls -l` the four executables.
1. **Overflow the stack on purpose.**
   Set `BUFFER_SIZE` to 16 MiB and rebuild all four.
   Only one crashes; `ulimit -s` says why, and `ulimit -s unlimited` is a diagnosis, not a fix.
1. **Shrink the block.**
   Set `BUFFER_SIZE` to 64 KB and run the `malloc` and `mmap` variants under `strace -e trace=brk,mmap,munmap` again.
   The traces were the same at 1 MiB; they are not any more.
1. **Map the files themselves.**
   `mmap()` can map the source file read-only and the destination file read-write (`MAP_SHARED`, after `ftruncate()` to the right size), and then the whole copy is one `memcpy()` between the two mappings, with no loop and no buffer.
   Write that fifth variant, and find out what `MAP_PRIVATE` on the destination does, and what happens if the `ftruncate()` is left out.
1. **Try `copy_file_range(2)`.**
   A sixth variant where the kernel copies the file without the data ever entering the process at all.
   On a filesystem that supports reflinks it may not copy anything.

## Questions to answer

* Where does `static char buffer[1024*1024]` actually occupy space -- in the executable file, in RAM, both, or neither?
  Check with `size` and `ls -l`.
* The local buffer is "allocated" by a single subtraction from the stack pointer.
  Why is it still the one variant that can crash before copying a byte?
* Why does `mmap()` return `MAP_FAILED` rather than `NULL` on error?
* Why does `munmap()` take a length when `free()` does not?
* At 1 MiB the `malloc` and `mmap` variants make the same system calls.
  What does calling `mmap()` yourself still buy, then?
* Which variants could copy through a buffer whose size is decided at run time, from the file's size?

## Discussion points

* **The four variants trade the same two things:** who decides the size, and who gives the memory back.
  Compile time and nobody (global, local); run time and you (`malloc`, `mmap`).
* **The two managed variants are mostly cleanup.**
  Count the lines at the end of `main()` that exist only to give things back, against the lines that do actual work.
  This is the everyday cost of manual memory management, and it is why every later language has something to automate it.
* **`malloc()` is a policy on top of `brk()` and `mmap()`.**
  For small blocks it carves the heap, for large ones it maps; calling `mmap()` directly means making that decision yourself -- which is sometimes the point, as in `04-reverse-lines` and `bonus-malloc-tuning`.
* **None of the four guarantees the data is on disk** when the program exits.
  `fsync` is the tool; the question returns in the I/O session.

## References

* `man 2 mmap`, `man 2 munmap`
* `man 3 malloc`, `man 3 mallopt`, `man 1 valgrind`
* `man 1 size` -- segment sizes of a built binary
* `man 2 copy_file_range`

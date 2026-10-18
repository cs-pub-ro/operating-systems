# Going Further: Reverse the Lines of a File

Optional.

## Things to try

1. **Watch the area appear and disappear.**
   Add a `getchar()` right after the mapping succeeds and another right after `munmap()`, run on `big.txt`, and read `/proc/<pid>/maps` (or `pmap -x <pid>`) from a second terminal at each pause.
1. **Do it with `malloc()`.**
   Swap the mapping for `malloc(size)` / `free()`, and run both versions under `strace -e trace=brk,mmap,munmap`, once on `big.txt` and once on a 1 KB file.
   When do the two programs make the same system calls, and when not?
1. **Make the buffer read-only once it is full.**
   After `read_all()`, call `mprotect(buf, size, PROT_READ)`; then add a stray write to the buffer somewhere in `print_reversed()`.
   The program now tells you about the bug, loudly.
1. **Map the file itself.**
   `mmap()` can take the file descriptor instead of `-1` (`PROT_READ`, `MAP_PRIVATE`, no `MAP_ANONYMOUS`), and then the read loop is not needed at all.
   Time both versions on `big.txt`, twice each.

## Questions to answer

* Why does `mmap()` refuse a length of zero, and what should the program do with an empty file?
* `munmap()` takes a length and `free()` does not.
  Who remembers the size in each case?
* The kernel rounds a mapping up to whole pages.
  How much is wasted for `input.txt`, how much for `big.txt`, and does it matter?
* The pages of an anonymous mapping cost nothing until they are touched.
  Does this program touch all of them, and when?
* After `munmap()`, where did the memory go?
  After `free()` of a `malloc()`'d 80 MB block?
  After `free()` of a 1 KB one?

## Discussion points

* **`mmap()` is the allocator's back end, exposed.**
  Above a threshold `malloc()` calls it for you; calling it yourself means deciding yourself.
* **One big buffer used once is the easy case for `mmap()`; many small objects are the easy case for `malloc()`.**
  Page granularity is the line between them.
* **The allocator keeps; the kernel takes back.**
  Memory returned with `munmap()` is gone from the process at once, and nothing in the process can get at it by accident afterwards.

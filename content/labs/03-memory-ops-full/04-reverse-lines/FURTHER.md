# Going Further: Reverse the Lines of a File

With answers.

## Things to try

1. **Watch the area appear and disappear.**
   Add a `getchar()` right after the mapping succeeds and another right after `munmap()`, run on `big.txt`, and read `/proc/<pid>/maps` (or `pmap -x <pid>`) from a second terminal at each pause.

   At the first pause there is a new anonymous `rw-p` area of 77,040 KB among the libraries; `pmap -x` shows its RSS equal to its size, because `read_all()` has written every page.
   At the second pause the line is gone.
   Nothing else in the map changed: no `[heap]` growth, because the allocator was never involved.
1. **Do it with `malloc()`.**
   Swap the mapping for `malloc(size)` / `free()`, and run both versions under `strace -e trace=brk,mmap,munmap`, once on `big.txt` and once on a 1 KB file.

   On `big.txt` the two traces are the same call for call: `malloc()` of 78,888,897 bytes is an `mmap()` of 78,888,960 -- the request plus a header, rounded up to pages -- and `free()` is the `munmap()`.
   On the 1 KB file the `malloc()` version shows a `brk()` growing the heap by 132 KB and no `munmap()` at all: the block came from the heap and stayed there after `free()`, for the next request.
   The `mmap()` version makes the same two calls it always makes.
1. **Make the buffer read-only once it is full.**
   After `read_all()`, call `mprotect(buf, size, PROT_READ)`; then add a stray write to the buffer somewhere in `print_reversed()`.

   `Segmentation fault`, at the stray write, with `SEGV_ACCERR` in `gdb`.
   Permissions are per area and enforced by the hardware (lecture 03), which makes a mapping a buffer that can be sealed; a `malloc()`'d block shares its area with everything else on the heap and cannot be.
1. **Map the file itself.**
   `mmap()` can take the file descriptor instead of `-1` (`PROT_READ`, `MAP_PRIVATE`, no `MAP_ANONYMOUS`), and then the read loop is not needed at all.

   The file-backed version has no `read()` calls and no copy: the buffer *is* the page cache.
   On a warm cache both finish in about a tenth of a second for 80 MB; the file-backed one saves the copy and pays for it in page faults as the walk touches each page, so the difference is small here.
   The real gain of mapping a file is random access to a part of it without reading the rest, which a `tac` does not need.

## Questions to answer

* **Why does `mmap()` refuse a length of zero, and what should the program do with an empty file?**
  An area has to be at least one page; a zero-length request is `EINVAL`.
  An empty file has no lines, so the right thing is to print nothing and exit successfully, before asking for a buffer.
  The reference checks `size == 0` after `fstat()`.
* **`munmap()` takes a length and `free()` does not. Who remembers the size in each case?**
  The allocator stores the size in a header just before every block it hands out, which is how `free(ptr)` knows what to release.
  The kernel keeps areas, not allocations; an area can be unmapped in part, so the caller says how much.
* **The kernel rounds a mapping up to whole pages. How much is wasted?**
  `input.txt` is 282 bytes in a 4,096-byte page: 93% unused.
  `big.txt` is 78,888,897 bytes in 19,260 pages: 63 bytes unused, a millionth of the file.
  It matters for small buffers, which is why `mmap()` is the wrong tool for 40-byte strings and the allocator exists.
* **The pages of an anonymous mapping cost nothing until they are touched. Does this program touch all of them, and when?**
  Yes, all of them, in `read_all()`: the kernel copies the file's bytes into the buffer and faults each page in as it goes.
  A program that mapped more than it filled would pay only for the part it used.
* **After `munmap()`, where did the memory go?**
  Back to the kernel, immediately; the process's RSS drops by the size of the area.
  After `free()` of an 80 MB `malloc()`'d block: the same, because that block was its own mapping.
  After `free()` of a 1 KB block: nowhere; it is still in the heap, owned by the allocator, waiting for the next `malloc()`.

## Discussion points

* **`mmap()` is the allocator's back end, exposed.**
  Above `M_MMAP_THRESHOLD` (128 KB by default) `malloc()` calls it for you; calling it yourself means deciding yourself, and means the memory does not pass through the heap's bookkeeping on the way in or out.
* **One big buffer used once is the easy case for `mmap()`; many small objects are the easy case for `malloc()`.**
  Page granularity is the line between them, and the allocator exists to serve the second case out of a few big areas of the first kind.
* **The allocator keeps; the kernel takes back.**
  Memory returned with `munmap()` is gone from the process at once, cannot be read by accident afterwards (any access is a fault), and shows up as a lower RSS.
  Memory returned with `free()` may stay mapped, still holding its old contents, until the allocator decides otherwise.
  `bonus-malloc-tuning` is about that decision.

## References

* `man 2 mmap`, `man 2 munmap`, `man 2 mprotect`
* `man 3 mallopt` -- `M_MMAP_THRESHOLD`
* `man 5 proc` -- `/proc/<pid>/maps`

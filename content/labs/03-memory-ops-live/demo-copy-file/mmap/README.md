# Demo: Copy a File Using `mmap`

The third and last variant of the file-copy program.
Instead of reading into a buffer and writing back out, this one asks the kernel to map both files directly into the process address space, so that copying the file becomes a single `memcpy()` between two pointers — and the read/write loop disappears entirely.

Together with the teaching assistant you will fill in the TODOs in `copy_file.c`, then build and verify the copy.
Along the way you will meet `ftruncate()`, `msync()` and `munmap()`, and see that the actual I/O happens through page faults rather than through any call you wrote.

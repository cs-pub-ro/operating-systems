# Demo: Copy a File Using an `mmap` Buffer

The fourth and last variant of the file-copy program.
This one skips the allocator and asks the **kernel** for the buffer directly, with `mmap()`: an anonymous mapping, with no file behind it, that becomes a new area of the process address space and is handed back with `munmap()`.

Together with the teaching assistant you will fill in the TODOs in `copy_file.c`, build it and copy a file, then run the `malloc` variant and this one under `strace` and compare what reaches the kernel.
The question to leave with: if `malloc()` ends up calling `mmap()` for a buffer this size anyway, what does calling it yourself buy, and what does it cost?

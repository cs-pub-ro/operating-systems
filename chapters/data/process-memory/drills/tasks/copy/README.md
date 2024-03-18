# Memory Mapping

Navigate to the `chapters/data/process-memory/drills/tasks/copy/support` directory.

1. Use a different value for `BUFSIZE` and see if that affects the comparison between the two executables.

1. Add a `sleep()` call to the `mmap_copy.c` file **after** the files were mapped.
   Rebuild the program and run it.
   On a different console, use `pmap` to view the two new memory regions that were added to the process, by mapping the `in.dat` and `out.dat` files.

If you're having difficulties solving this exercise, go through [this](../../../reading/process-memory.md) reading material.

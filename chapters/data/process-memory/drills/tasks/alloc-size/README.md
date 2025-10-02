# Allocating and Deallocating Memory

Navigate to the `alloc-size/support/` directory from the lab archive (or `chapters/data/process-memory/drills/tasks/alloc-size/support` if you are working directly in the repository).

1. Use `pmap` to analyze the process address space for `ALLOC_SIZE_KB` initialized to `256`.
   Notice the new memory areas and the difference between the use of `mmap` syscall and `brk` syscall.

1. Use `valgrind` on the resulting executable, and notice there are memory leaks.
   They are quite obvious due to the lack of proper freeing.
   Solve the leaks.

1. Use `valgrind` on different executables in the system (in `/bin/`, `/usr/bin/`) and see if they have memory leaks.

If you're having difficulties solving this exercise, go through [this](../../../reading/process-memory.md) reading material.

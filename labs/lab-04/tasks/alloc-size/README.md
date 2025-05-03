---
parent: Lab 4 - Investigate Memory
nav_order: 1
---

# Task: Allocating and Deallocating Memory

Navigate to the `labs/lab-04/tasks/alloc-size/support` directory.

1. Use `pmap` to analyze the process address space for `ALLOC_SIZE_KB` initialized to `256`.
   Notice the new memory areas and the difference between the use of `mmap` syscall and `brk` syscall.

1. Use `valgrind` on the resulting executable, and notice there are memory leaks.
   They are quite obvious due to the lack of proper freeing.
   Solve the leaks.

1. Use `valgrind` on different executables in the system (in `/bin/`, `/usr/bin/`) and see if they have memory leaks.

If you're having difficulties solving this exercise, go through [this](../../../lab-03/reading/process-memory.md) reading material.

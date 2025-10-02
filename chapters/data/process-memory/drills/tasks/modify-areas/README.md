# Modifying Memory Region Size

Navigate to the `modify-areas/support/` directory in the lab archive (or `chapters/data/process-memory/drills/tasks/modify-areas/support` if you are working directly in the repository).

1. Comment out different parts of the `hello.c` program to notice differences in only specific areas (text, data, bss, heap, stack).

1. Use a different argument (`order`) for the call to the `alloc_stack()` function.
   See how it affects the stack size during runtime (investigate with `pmap`).

1. Do a static build of `hello.c` and check the size of the memory areas, both statically and dynamically.

1. The `extend_mem_area.py` Python script allocates a new string at each step by merging the two previous versions.
   Start the program and investigate the resulting process at each allocation step.
   Notice which memory area is updated and explain why.

If you're having difficulties solving this exercise, go through [this](../../../reading/process-memory.md) reading material.

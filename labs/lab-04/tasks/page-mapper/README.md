---
parent: Lab 4 - Investigate Memory
nav_order: 6
---

# Task: Page Mapper

Navigate to the `labs/lab-04/tasks/page-mapper/support` directory.

Your goal is to update the `src/page_mapper.c` source code file to reserve virtual pages in the address space of the current process.
Use `mmap()` to reserve virtual pages.
Use anonymous mapping (i.e. the `MAP_ANONYMOUS`) flag.
Use any permissions required.

Inside the `src/` directory, use `make` to do a quick check of the implementation.
To test it, enter the `tests/` directory and run:

```console
make check
```

In case of a correct solution, you will get an output such as:

```text
./run_all_tests.sh
test_res_1                       ........................ passed ...  25
test_res_2                       ........................ passed ...  25
test_res_10                      ........................ passed ...  25
test_res_10_res_20               ........................ passed ...  25

Total:                                                           100/100
```

If you're having difficulties solving this exercise, go through [this](../../../lab-03/reading/process-memory.md) reading material.

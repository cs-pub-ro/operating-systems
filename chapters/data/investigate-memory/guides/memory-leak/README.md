# Memory Leaks

A memory leak happens when a memory region is allocated but no longer accessible.
This typically occurs when a pointer that referenced a memory area is redirected to a new memory location, leaving the original memory area unreachable and unable to be freed.

Enter the `chapters/data/investigate-memory/guides/memory-leak` folder, run `make skels`.
Enter the `chapters/data/investigate-memory/guides/memory-leak/support/src` directory.
It stores two files showing memory leaks:

- one in C++: `memory_leak.cpp`
- one in C: `memory_leak_malloc.c`

Let's build and run the two executables:

```console
student@os:~/.../memory-leak/support/src$ make
g++    -c -o memory_leak.o memory_leak.cpp
cc   memory_leak.o  -lstdc++ -o memory_leak
cc    -c -o memory_leak_malloc.o memory_leak_malloc.c
cc   memory_leak_malloc.o  -lstdc++ -o memory_leak_malloc
```

Running them yields similar output:

```console
student@os:~/.../memory-leak/support/src$ ./memory_leak
Linus Torvalds is 22 years old and likes Linux
Steve Jobs is 23 years old and likes macOS
student@os:~/.../memory-leak/support/src$ ./memory_leak_malloc
Linus Torvalds is 22 years old and likes Linux
Steve Jobs is 23 years old and likes macOS
```

We investigate the memory leaks of the two programs by using [Valgrind](https://valgrind.org/):

```console
student@os:~/.../memory-leak/support/src$ valgrind ./memory_leak
==22362== Memcheck, a memory error detector
==22362== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==22362== Using Valgrind-3.13.0 and LibVEX; rerun with -h for copyright info
==22362== Command: ./memory_leak
==22362==
Linus Torvalds is 22 years old and likes Linux
Steve Jobs is 23 years old and likes macOS
==22362==
==22362== HEAP SUMMARY:
==22362==     in use at exit: 72 bytes in 1 blocks
==22362==   total heap usage: 4 allocs, 3 frees, 73,872 bytes allocated
==22362==
==22362== LEAK SUMMARY:
==22362==    definitely lost: 72 bytes in 1 blocks
==22362==    indirectly lost: 0 bytes in 0 blocks
==22362==      possibly lost: 0 bytes in 0 blocks
==22362==    still reachable: 0 bytes in 0 blocks
==22362==         suppressed: 0 bytes in 0 blocks
==22362== Rerun with --leak-check=full to see details of leaked memory
==22362==
==22362== For counts of detected and suppressed errors, rerun with: -v
==22362== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

student@os:~/.../memory-leak/support/src$ valgrind ./memory_leak_malloc
==22369== Memcheck, a memory error detector
==22369== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==22369== Using Valgrind-3.13.0 and LibVEX; rerun with -h for copyright info
==22369== Command: ./memory_leak_malloc
==22369==
Linus Torvalds is 22 years old and likes Linux
Steve Jobs is 23 years old and likes macOS
==22369==
==22369== HEAP SUMMARY:
==22369==     in use at exit: 148 bytes in 1 blocks
==22369==   total heap usage: 3 allocs, 2 frees, 1,320 bytes allocated
==22369==
==22369== LEAK SUMMARY:
==22369==    definitely lost: 148 bytes in 1 blocks
==22369==    indirectly lost: 0 bytes in 0 blocks
==22369==      possibly lost: 0 bytes in 0 blocks
==22369==    still reachable: 0 bytes in 0 blocks
==22369==         suppressed: 0 bytes in 0 blocks
==22369== Rerun with --leak-check=full to see details of leaked memory
==22369==
==22369== For counts of detected and suppressed errors, rerun with: -v
==22369== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

As we are doing allocations that are not freed, this results in memory leaks.

For `malloc()`-based programs, we can use [`mtrace()` feature](https://man7.org/linux/man-pages/man3/mtrace.3.html) and [`mtrace` command](https://man7.org/linux/man-pages/man1/mtrace.1.html) to verify proper allocations with `malloc()` and deallocations with `free()`.
We call `mtrace()` in the program (in `memory_leak_malloc.c`) to enable `malloc()` and `free()` checking.

To use `mtrace()` we define the `MALLOC_TRACE` environment variable.
We probably also require to preload the libc `malloc` debugging library, so we use `LD_PRELOAD` for that.
Note that the file path used for `LD_PRELOAD` may need to be updated, depending on your distribution:

```console
student@os:~/.../memory-leak/support/src$ LD_PRELOAD=/lib/x86_64-linux-gnu/libc_malloc_debug.so.0 MALLOC_TRACE=mem.trace ./memory_leak_malloc
Linus Torvalds is 22 years old and likes Linux
Steve Jobs is 23 years old and likes macOS
```

Subsequently, we use the `mtrace` tool to show information about the leaked data:

```console
student@os:~/.../memory-leak/support/src$ mtrace ./memory_leak_malloc mem.trace

Memory not freed:
-----------------
           Address     Size     Caller
0x000056506d8be6a0     0x94  at 0x56506c3777ec
```

The size (`0x94`) is the same value shown by Valgrind (`148`).

`mtrace` provides an outcome similar to Valgrind.
Valgrind is however more powerful: it works on different types of memory (not only those allocated with `malloc()`) and it doesn't require access to the source code (and the compiler phase).

## Practice

1. Print the size of the `Student` class and the `struct student` structure to see if it equates to the leak shown by Valgrind.

1. Solve the memory leaks in both programs.
   Run the checker (`./checker.sh` in the `memory-leak/support/tests/` folder) to check your results.

   Sample run:

```console
student@so:~/.../support/tests/$ ./checker.sh
make: Entering directory '/home/student/operating-systems/chapters/data/investigate-memory/guides/memory-leak/support/src'
g++    -c -o memory_leak.o memory_leak.cpp
cc   memory_leak.o  -lstdc++ -o memory_leak
cc    -c -o memory_leak_malloc.o memory_leak_malloc.c
cc   memory_leak_malloc.o  -lstdc++ -o memory_leak_malloc
make: Leaving directory '/home/student/operating-systems/chapters/data/investigate-memory/guides/memory-leak/support/src'
-------------------------------------------------
Checking memory leaks for C executable: ../src/memory_leak
C executable is leak-free!

Points for ../src/memory_leak: 50/50
-------------------------------------------------
Checking memory leaks for C++ executable: ../src/memory_leak_malloc
C++ executable is leak-free!

Points for ../src/memory_leak_malloc: 50/50
-------------------------------------------------
Total Points: 100/100
```

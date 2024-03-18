# Memory Actions (and Leaks) in Existing Programs

We can use Valgrind to investigate existing programs in the system.
This tells us whether they possess memory leaks:

```console
student@os:~/.../memory-actions$ valgrind ls
==24669== Memcheck, a memory error detector
==24669== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==24669== Using Valgrind-3.13.0 and LibVEX; rerun with -h for copyright info
==24669== Command: ls
==24669==
Makefile  memory_leak  memory_leak.cpp  memory_leak_malloc  memory_leak_malloc.c  memory_leak_malloc.o  memory_leak.o
==24669==
==24669== HEAP SUMMARY:
==24669==     in use at exit: 21,696 bytes in 14 blocks
==24669==   total heap usage: 51 allocs, 37 frees, 61,331 bytes allocated
==24669==
==24669== LEAK SUMMARY:
==24669==    definitely lost: 0 bytes in 0 blocks
==24669==    indirectly lost: 0 bytes in 0 blocks
==24669==      possibly lost: 0 bytes in 0 blocks
==24669==    still reachable: 21,696 bytes in 14 blocks
==24669==         suppressed: 0 bytes in 0 blocks
==24669== Rerun with --leak-check=full to see details of leaked memory
==24669==
==24669== For counts of detected and suppressed errors, rerun with: -v
==24669== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

student@os:~/.../memory-actions$ valgrind ps
==24671== Memcheck, a memory error detector
==24671== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==24671== Using Valgrind-3.13.0 and LibVEX; rerun with -h for copyright info
==24671== Command: ps
==24671==
  PID TTY          TIME CMD
24671 pts/22   00:00:00 memcheck-amd64-
26732 pts/22   00:00:01 bash
==24671==
==24671== HEAP SUMMARY:
==24671==     in use at exit: 264,929 bytes in 25 blocks
==24671==   total heap usage: 692 allocs, 667 frees, 334,268 bytes allocated
==24671==
==24671== LEAK SUMMARY:
==24671==    definitely lost: 0 bytes in 0 blocks
==24671==    indirectly lost: 0 bytes in 0 blocks
==24671==      possibly lost: 0 bytes in 0 blocks
==24671==    still reachable: 264,929 bytes in 25 blocks
==24671==         suppressed: 0 bytes in 0 blocks
==24671== Rerun with --leak-check=full to see details of leaked memory
==24671==
==24671== For counts of detected and suppressed errors, rerun with: -v
==24671== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

student@os:~/.../memory-actions$ valgrind bash -c 'echo "ha"'
==24675== Memcheck, a memory error detector
==24675== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==24675== Using Valgrind-3.13.0 and LibVEX; rerun with -h for copyright info
==24675== Command: bash -c echo\ "ha"
==24675==
ha
==24675==
==24675== HEAP SUMMARY:
==24675==     in use at exit: 43,056 bytes in 672 blocks
==24675==   total heap usage: 774 allocs, 102 frees, 51,405 bytes allocated
==24675==
==24675== LEAK SUMMARY:
==24675==    definitely lost: 12 bytes in 1 blocks
==24675==    indirectly lost: 0 bytes in 0 blocks
==24675==      possibly lost: 0 bytes in 0 blocks
==24675==    still reachable: 43,044 bytes in 671 blocks
==24675==         suppressed: 0 bytes in 0 blocks
==24675== Rerun with --leak-check=full to see details of leaked memory
==24675==
==24675== For counts of detected and suppressed errors, rerun with: -v
==24675== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

We can see that `ls` and `ps` don't have memory leaks.
However, the shell (Bash) shows a memory leak of 12 bytes (on the test system).
This may be a false positive or the subject of an actual investigation.

Note that the `still reachable` section of the output refers to memory that wasn't freed, but still has pointers referring to it.
A true memory leak occurs when no pointers refer any memory area.

## Practice

1. Investigate 2-3 other executables in the system using Valgrind.

1. Use `ltrace` to list `malloc()` and `free()` calls made by the investigated system executables.

Note that, as explained in the [Software Stack lab](https://open-education-hub.github.io/operating-systems/Lab/Software%20Stack/libcall-syscall), on some systems, `ltrace` does not accurately show the output, due to _now binding_.
Fear not, you can always check the library calls with a more verbose and harder to parse `ltrace` command:

```console
student@os:~$ ltrace -x "*"
```

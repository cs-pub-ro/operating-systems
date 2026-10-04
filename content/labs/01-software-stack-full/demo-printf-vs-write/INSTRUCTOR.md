# Instructor Notes: `printf` vs `write`

The aim of the demo is to demonstrate the benefits of using either a libc-implemented function (`printf()`) or the low-level system function (`write()`).

## Overview

Do an overview of the demo and its resources to students.

Open the two source code files `printf_demo.c` and `write_demo.c`.
Show them they are almost identical, with instructions to use either `printf()` or `write()` to print content.

Ask students what `printf()` and what `write()` functions do.
Show them the diagram or, better, build the diagram with Excalidraw.
Point to make is that `write()` is a low-level system function, directly built on top of the operating system interface;
and that `printf()` is a standard C library function that processes parameters (string formatting) before calling the low-level `write_function()`.
That has effect on time taken to run the functions, with `printf()` doing additional work.

Give students a tour of the source code files as they are now:

- Show the use of `clock_gettime()` to get current time.
- Show the `diff_us()` macro to measure difference between two times, in milliseconds.
- Show the call of `diff_us()` and the printing of the time duration.
- Show the macro `NUM_ROUNDS` that will be used to repeat the copy operation multiple times.
  A single copy would not last enough to give meaningful times in milliseconds.
  Currently `NUM_ROUNDS` is set to `1,000,000`.
  In case some systems are slower (or faster), the value of `NUM_ROUNDS` can be decreased or increased (generally by removing or adding an extra `0`).
- Explain the use of `setvbuf()` in the `printf_demo.c` file that forces `printf()` to always call `write()`, without buffering in libc.
- Show the `line` string array containing the line to be printed.

## Running the demo

Run these steps together with students.
Make sure, at each step, that all students have done it.

1. First, build and run the `printf_demo.c` and the `write_demo.c` files:

   ```console
   $ make
   gcc -O0 -Wall -Wextra -o printf_demo printf_demo.c
   printf_demo.c:18:19: warning: ‘line’ defined but not used [-Wunused-const-variable=]
      18 | static const char line[] = "Hello, World!\n";
         |                   ^~~~
   gcc -O0 -Wall -Wextra -o write_demo write_demo.c
   write_demo.c: In function ‘main’:
   write_demo.c:25:16: warning: unused variable ‘len’ [-Wunused-variable]
      25 |         size_t len;
         |                ^~~
   write_demo.c: At top level:
   write_demo.c:20:19: warning: ‘line’ defined but not used [-Wunused-const-variable=]
      20 | static const char line[] = "Hello, World!\n";
         |                   ^~~~

   $ ./printf_demo
   time passed 0 microseconds

   $ ./write_demo
   time passed 0 microseconds
   ```

   Time shown is `0`, because there are no actual instructions executed between the two `clock_gettime()` calls.

1. Then, add a `for` loop that does nothing.
   The code between the two `clock_gettime()` calls will be:

   ```C
           for (unsigned int i = 0; i < NUM_ROUNDS; i++)
                   ;
   ```

   Build and run the programs again, to show the impact of running a `for` loop, even one that does nothing:

   ```console
   $ ./printf_demo
   time passed 265 microseconds
   $ ./write_demo
   time passed 303 microseconds
   ```

   Optionally, show the contents of the disassembled file and the instructions executed part of the loop:

   ```console
   $ objdump -d -M intel printf_demo
   [...]
       11ee:       e8 8d fe ff ff          call   1080 <clock_gettime@plt>
       11f3:       c7 45 cc 00 00 00 00    mov    DWORD PTR [rbp-0x34],0x0
       11fa:       eb 04                   jmp    1200 <main+0x57>
       11fc:       83 45 cc 01             add    DWORD PTR [rbp-0x34],0x1
       1200:       81 7d cc 3f 42 0f 00    cmp    DWORD PTR [rbp-0x34],0xf423f
       1207:       76 f3                   jbe    11fc <main+0x53>
       1209:       48 8d 45 e0             lea    rax,[rbp-0x20]
       120d:       48 89 c6                mov    rsi,rax
       1210:       bf 00 00 00 00          mov    edi,0x0
       1215:       e8 66 fe ff ff          call   1080 <clock_gettime@plt>
   [...]

   $ objdump -d -M intel write_demo
   [...]
       11b0:       e8 bb fe ff ff          call   1070 <clock_gettime@plt>
       11b5:       c7 45 cc 00 00 00 00    mov    DWORD PTR [rbp-0x34],0x0
       11bc:       eb 04                   jmp    11c2 <main+0x39>
       11be:       83 45 cc 01             add    DWORD PTR [rbp-0x34],0x1
       11c2:       81 7d cc 3f 42 0f 00    cmp    DWORD PTR [rbp-0x34],0xf423f
       11c9:       76 f3                   jbe    11be <main+0x35>
       11cb:       48 8d 45 e0             lea    rax,[rbp-0x20]
       11cf:       48 89 c6                mov    rsi,rax
       11d2:       bf 00 00 00 00          mov    edi,0x0
       11d7:       e8 94 fe ff ff          call   1070 <clock_gettime@plt>
   [...]
   ```

   The `jbe` instructions above (lines `1207` and line `11c9`) loop the incrementing of a local variable and comparing it with `0xf423f` (`1,000,000`).

1. Fill in contents of the `for` loop in the `printf_demo.c` (using `printf()`) and in the `write_demo.c` file (using `write()`).
   You would end with the same contents of the `printf_demo.c` and `write_demo.c` files in the current directory.

1. Build and run the two files.
   See the resulting times, and the difference between times.
   The gap is large enough to be obvious.

1. Ask students why the difference, clarify what `printf()` does.
   Explain the impact of doing string formatting.
   As note for the future, insist that, for performance or efficiency reasons, you must be aware what a function does behind the scenes.

1. Comment out the `setvbuf()` line in `printf_demo.c`.
   Rebuild and re-run the files.
   See the result times, notice the change in the duration of `printf()`.

1. The aim is to see how many syscalls are happening.
   As tracing the process will incur overhead, reduce the value of `NUM_ROUNDS` to `10,000`.
   Rebuild the files.

   Run the files with `strace` as in the `README.md`, with standard output redirected to `/dev/null`.

1. Explain the output of `strace`.
   Clarify that using buffer will reduce running times, at the cost of memory usage and delayed action (it takes time for the syscall to happen).

1. The aim is to show the difference between write to the terminal vs writing to a file.
   To make it easy to read, reduce `NUM_ROUNDS` to `100`.
   Rebuild the files.

   Run the file with `strace` as in the `README`, with standard output shown at the terminal.

## Practical notes

- Present the three types of buffering: no buffering, full buffering, line buffering.
- Numbers here are Ubuntu 24.04 / GCC 13.3 / x86-64 and wobble 10–20% between runs.
  Insist on ratios, not digits.
  Run anything surprising three times before believing it.
- `strace` with `NUM_ROUNDS` at `1,000,000` takes several seconds.
- `-O0` is deliberate - at higher optimisation levels GCC may turn `printf("%s", line)` into `fputs`, which muddies the comparison.

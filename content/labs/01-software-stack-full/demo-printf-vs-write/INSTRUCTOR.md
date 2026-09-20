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

First, build and run the `copy-string.c` and the `copy-string-improved.c` files:

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

Then, add a `for` loop that does nothing.
The code between the two `clock_gettime()` calls will be:

```C
        for (unsigned int i = 0; i < NUM_ROUNDS; i++)
                ;
```

## Sequencing

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

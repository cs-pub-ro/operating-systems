# Instructor Notes: Copy String

The aim of the demo is to get students to see the benefits of understanding what a function does behind the scenes.
There are multiple way to achieve the same goal, and some may be better than others, e.g. the use of `strcpy()` instead of `strcat()`.

## Overview

Do an overview of the demo and its resources to students.

Open the two source code files `copy-string.c` and `copy-string-improved.c`.
Show them they are almost identical, with the exception of the instructions comment, advising the use of `strcpy()` or `strcat()`.
If you want, use `diff` for that:

```console
$ diff -u copy-string.c copy-string-improved.c
--- copy-string.c       2026-09-20 06:02:53.368280702 +0300
+++ copy-string-improved.c      2026-08-10 22:12:55.874283294 +0300
@@ -19,7 +19,7 @@

        clock_gettime(CLOCK_REALTIME, &time_before);
        /*
-        * TODO: Use strcat() to copy the strings John, George, Paul, Joel.
+        * TODO: Use strcpy() to copy the strings John, George, Paul, Joel.
         * Use a loop going from 0 to NUM_ROUNDS.
         */
        clock_gettime(CLOCK_REALTIME, &time_after);
```

Ask students what `strcpy()` and what `strcat()` functions do.
Show them the diagram or, better, build the diagram with Excalidraw.
Point to make is that `strcat()` "walks" the destination string to locate the string terminator (`NUL` byte - `\0`), and then does a copy, whereas `strcpy()` only does a copy.
That has effect on time taken to run the functions.

Give students a tour of the source code files as they are now:

- Show the use of `clock_gettime()` to get current time.
- Show the `diff_us()` macro to measure difference bewteen two times, in milliseconds.
- Show the call of `diff_us()` and the printing of the time duration.
- Show the macro `NUM_ROUNDS` that will be used to repeat the copy operation multiple times.
  A single copy would not last enough to give meaningful times in milliseconds.
  Currently `NUM_ROUNDS` is set to `100,000,000`.
  In case some systems are slower (or faster), the value of `NUM_ROUNDS` can be decreased or increased (generally by removing or adding an extra `0`).
- Show the `big_string` global array variable used to store the resulting concatenated string in each round.

## Running the demo

Run these steps together with students.
Make sure, at each step, that all students have done it.

First, build and run the `copy-string.c` and the `copy-string-improved.c` files:

```console
$ make
cc -Wall   -c -o copy-string.o copy-string.c
copy-string.c:14:13: warning: ‘bigString’ defined but not used [-Wunused-variable]
   14 | static char bigString[1000];
      |             ^~~~~~~~~
cc   copy-string.o   -o copy-string
cc -Wall   -c -o copy-string-improved.o copy-string-improved.c
copy-string-improved.c:14:13: warning: ‘bigString’ defined but not used [-Wunused-variable]
   14 | static char bigString[1000];
      |             ^~~~~~~~~
cc   copy-string-improved.o   -o copy-string-improved

$ ./copy-string
time passed 0 microseconds

$ ./copy-string-improved
time passed 0 microseconds
```

Time shown is `0`, because there are no actual instructions executed between the two `clock_gettime()` calls.

Then, add a `for` loop that does nothing.
The code between the two `clock_gettime()` calls will be:

```C
        for (unsigned int i = 0; i < NUM_ROUNDS; i++)
                ;
```

Build and run the program again, to show the impact of running a `for` loop, even one that does nothing:

```console
$ ./copy-string
time passed 23830 microseconds
```

Optionally, show the contents of the disassembled file and the instructions executed part of the loop:

```console
$ objdump -d -M intel copy-string
[...]
    11b0:       e8 bb fe ff ff          call   1070 <clock_gettime@plt>
    11b5:       c7 45 cc 00 00 00 00    mov    DWORD PTR [rbp-0x34],0x0
    11bc:       eb 04                   jmp    11c2 <main+0x39>
    11be:       83 45 cc 01             add    DWORD PTR [rbp-0x34],0x1
    11c2:       81 7d cc ff e0 f5 05    cmp    DWORD PTR [rbp-0x34],0x5f5e0ff
    11c9:       76 f3                   jbe    11be <main+0x35>
    11cb:       48 8d 45 e0             lea    rax,[rbp-0x20]
    11cf:       48 89 c6                mov    rsi,rax
    11d2:       bf 00 00 00 00          mov    edi,0x0
[...]
```

The `jbe` instruction above (line `11c9`) loops the incremending of a local variable and comparing it with `0x5f5e0ff` (`100,000,000`).

Fill in contents of the `for` loop in the `copy-string.c` (using `strcat()`) and in the `copy-string-improved.c` file (using `strcpy()`).
You would end with the same contents of the `copy-string.c` and `copy-string-improved.c` files in the current directory.

Build and run the two files.
See the resulting times, and the difference between times.
The gap is large enough to be obvious.

Ask students why the difference, clarify what `strcat()` does.
Explain the impact of seaching for the `NUL`-byte before copying.
As note for the future, insist that, for performance or efficiency reasons, you must be aware what a function does behind the scenes.

## Points to hammer

- A C string does not carry its length.
  Every consequence in this demo follows from that one sentence.
- Count the scanning out loud: 0, then 6, then 12, then 20 characters scanned, to write 25.
- The fast version calls the *same library* as the slow one.
  Nothing was optimized.

## Practical notes

- The offsets in `copy-string-improved.c` are 6, 6 and 8 - the lengths of `"John, "`, `"Paul, "` and `"George, "`.
- At `-O0` the comparison is honest.
  At `-O2` GCC may recognise the constant-length copies and fold them, at which point the compiler is being measured, not the code.
- `100,000,000` iterations takes a few seconds;
  if the room is on slow hardware, reduce `NUM_ROUNDS` rather than waiting.
- Time shown is not actually the time taken solely by instructions.
  While running, the program will be scheduled, interrupts may be coming in, etc.
  But it is sufficiently close to reality to be relevant.
  To be rigorous, one would use the [`perf_event_open` system call](https://man7.org/linux/man-pages/man2/perf_event_open.2.html) (see the [example](https://man7.org/linux/man-pages/man2/perf_event_open.2.html#EXAMPLES)).

## Where this leads

This demo is the appetiser for the `01-string-functions` exercise, which turns the same observation into a measured O(N²)-versus-O(N) table.

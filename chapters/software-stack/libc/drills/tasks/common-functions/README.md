# Common Functions

Enter the `common-functions/` directory in the lab archive (or `chapters/software-stack/libc/drills/tasks/common-functions/` if you are working directly in the repository), run `make skels`, then enter `support/`.
Go through the practice items below.

1. Update `os_string.c` and `os_string.h` to make available the `os_strcat()` function that performs the same string concatenation as `strcat()` from `libc`.
   Check your implementation by running `make check` in `support/tests/`.
   If some of the tests fail, start debugging from the file that calls `os_strcat()`: `test.c`.

1. Update the `main_printf.c` file to use the implementation of `sprintf()` to collect information to be printed inside a buffer.
   Call the `write()` function to print the information.
   The `printf()` function will no longer be called.
   This results in a single `write()` system call.

   Using previously implemented functions allows us to more efficiently write new programs.
   These functions provide us with extensive features that we use in our programs.

   [Quiz 1](../../questions/printf-syscall.md)

   [Quiz 2](../../questions/strcpy-syscall.md)

   [Quiz 3](../../questions/printf-vs-write.md)

1. Update the `putchar()` function in `main_printf.c` to implement a buffered functionality of `printf()`.
   Characters passed via the `putchar()` call will be stored in a predefined static global buffer.
   The `write()` call will be invoked when a newline is encountered or when the buffer is full.
   This results in a reduced number of `write` system calls.
   Use `strace` to confirm the reduction of the number of `write` system calls.

1. Update the `main_printf.c` file to also feature a `flush()` function that forces the flushing of the static global buffer and a `write` system call.
   Make calls to `printf()` and `flush()` to validate the implementation.
   Use `strace` to inspect the `write()` system calls invoked by `printf()` and `flush()`.

If you're having difficulties solving this exercise, go through [this](../../../reading/common-functions.md) reading material.

# System Calls

Enter the `basic-syscall/` directory of the extracted archive (or `chapters/software-stack/system-calls/drills/tasks/basic-syscall/` if you are working directly in the repository).
Run `make` and then enter `support/` folder and go through the practice items below.

For debugging, use `strace` to trace the system calls from your program and make sure the arguments are set right.

1. Update the `hello.asm` and / or `hello.s` files to print both `Hello, world!` and `Bye, world!`.
   This means adding another `write()` system call.

   [Quiz 1](../../questions/syscall-id.md)

   [Quiz 2](../../questions/syscall-tool.md)

   [Quiz 3](../../questions/syscall-numbers.md)

1. Update the `hello.asm` and / or `hello.s` files to sleep before the `exit` system call.

   You need to make the `sys_nanosleep()` system call, with the `timespec` structure.
   Find its ID [here](https://blog.rchapman.org/posts/Linux_System_Call_Table_for_x86_64/).

1. Update the `hello.asm` and / or `hello.s` files to read a message from standard input and print it to standard output.

   You'll need to define a buffer in the `data` or `bss` section.
   Use the `read` system call to read data in the buffer.
   The return value of `read` (placed in the `rax` register) is the number of bytes read.
   Use that value as the 3rd argument or `write`, i.e. the number of bytes printed.

   Find the ID of the `read` system call [here](https://x64.syscall.sh/).
   To find out more about its arguments, see [its man page](https://man7.org/linux/man-pages/man2/read.2.html).
   Standard input descriptor is `0`.

1. **Difficult**: Port the initial program to ARM on 64 bits (also called **aarch64**).

   Use the skeleton files in the `arm/` folder.
   Find information about the `aarch64` system calls [here](https://arm64.syscall.sh/).

1. Create your own program, written in assembly, doing some system calls you want to learn more about.
   Some system calls you could try: `open()`, `rename()`, `mkdir()`.
   Create a Makefile for that program.
   Run the resulting program with `strace` to see the actual system calls being made (and their arguments).

If you're having difficulties solving this exercise, go through [this](../../../reading/basic-syscall.md) reading material.

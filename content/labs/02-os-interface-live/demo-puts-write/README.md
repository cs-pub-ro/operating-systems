# Demo: The `write` System Call

A program running in user mode cannot touch hardware, files or other processes on its own.
Whenever it needs the operating system to do something privileged it asks the kernel by performing a **system call**.
Normally libc issues that system call on your behalf, hidden inside `printf()` or `write()`; in this demo there is no libc below us at all.

Together with the teaching assistant you will fill in the TODOs in `main.c`, building three layers on top of each other — `my_puts()` over `my_write()` over the raw `my_syscall()` — then run the result under `strace` to confirm the bytes really did reach the kernel through the `syscall` instruction and nothing else.

The `my_syscall()` function is given to you, and you will reuse it unchanged in every exercise of this session.

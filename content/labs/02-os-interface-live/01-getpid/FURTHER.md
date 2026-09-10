# Going Further: The `getpid` System Call

Optional.

## Things to try

1. Look up the number for `getpid` on other architectures — 32-bit x86 and AArch64 — and compare with x86-64.
   Then ask yourself why `write` is 1 on x86-64 but 4 on 32-bit x86.
   The answer is historical, and it explains why the header lives under `asm/`.
1. Call `my_getpid()` a million times in a loop and time it.
   Compare with a million calls to an ordinary function of your own.
   The ratio is the number that the session 01 `printf` vs `write` demo asked you to take on trust.
1. Add a call to libc's `getpid()` alongside yours and run under `strace`.
   How many `getpid()` lines appear?
1. Try `getppid` (the *parent's* PID) with the same wrapper.
   Run the program from a shell, then under `strace`, and explain why the parent PID differs between the two.
1. Deliberately use a wrong syscall number, e.g. one that does not exist.
   What does the kernel return, and how would you detect that from C?

## Questions to answer

* Which register carries the syscall number, and which one carries the result?
* `my_syscall()` lists `"rcx"`, `"r11"` and `"memory"` as clobbered.
  Read `man 2 syscall` and find out what the `syscall` instruction does to `rcx` and `r11`.
* A system call cannot return both a result and an error code in separate places — there is only `RAX`.
  How does Linux fit both into one register, and what does libc do about it that your wrapper does not?

## Discussion points

* **There is nothing between this code and the kernel.**
  No libc, no buffering, no caching.
  That is the whole point of the exercise, and it is worth appreciating how short the path actually is.
* **Syscall numbers are an ABI, not an API.**
  They can never be reordered or reused, because compiled binaries hold them as constants.
  This is why Linux only ever appends to the table.
* **glibc's `getpid()` used to cache the PID** in user space to avoid the syscall entirely.
  It caused long-standing bugs around `fork()` and `clone()`, and the cache was removed in glibc 2.25.
  A modern `getpid()` really does enter the kernel every time — just like yours.

## References

* `man 2 getpid`, `man 2 syscall`
* `/usr/include/x86_64-linux-gnu/asm/unistd_64.h` — the syscall number table
* [Linux Syscall Table](https://filippo.io/linux-syscall-table/) — numbers and signatures across architectures

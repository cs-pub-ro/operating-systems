# Going Further: The `write` System Call

## Things to try

1. **Write to a different file descriptor.**
   Change `STDOUT_FILENO` to 2 and redirect only stdout to a file.
   The text still appears on the terminal, because fd 2 is stderr.
1. **Use a closed file descriptor.**
   Pass 99 to `my_write()` and print the return value.
   You get `-9`: negated `EBADF`.
   This is the raw error convention that libc normally hides.
1. **Make `my_puts()` correct.**
   Loop until all bytes are written, and handle a negative return.
   Test it by writing a large buffer to a pipe with a small reader.
1. **Write the string and the newline in one call.**
   Copy them into a small stack buffer first.
   Two calls become one; this is buffering in miniature, and the session 01 demo explains why it matters.
1. **Disassemble it.**
   `objdump -d demo | grep -A20 '<my_syscall>'` shows how little the wrapper compiles to — typically a handful of `mov` instructions and the `syscall` itself.

## Questions to answer

* Why does the kernel ABI use `R10` for the fourth argument when the C calling convention uses `RCX`?
* Why are `rcx` and `r11` in the clobber list?
* Why is `"memory"` in the clobber list?
  What would go wrong without it, given that the kernel may write into the caller's buffers?
* `write` returned 38. Are the bytes on the disk?
  (Session 01 asked the same question. The answer is still no, and the reason is a topic for the I/O session.)
* How would you tell an error return from a very large successful one, given that both are just bits in `RAX`?

## Discussion points

* **The user/kernel boundary is a real, hardware-enforced thing.**
  `syscall` is a single instruction that switches privilege level.
  Everything a program cannot do for itself goes through this one door, and there are only a few hundred things behind it.
* **`strace` intercepts system calls, not function calls.**
  Anything visible in `strace` crossed the boundary; anything invisible did not.
  This makes it the definitive tool for answering "did this actually reach the kernel?", and it is used in every task of this session.
* **The error convention is worth dwelling on.**
  One register carries both the result and the error, so Linux reserves `-4095..-1` for errors.
  This is why `errno` exists at all: it is libc's way of splitting one register into two values.
* **Four `write` calls for two lines** is a nice hook for the session 01 buffering material, and for the `bonus-printf` exercise, which takes the same idea to its extreme with one call per character.

## References

* `man 2 syscall`, `man 2 write`, `man 3 errno`
* `man 1 strace`
* [GCC inline assembly — extended asm](https://gcc.gnu.org/onlinedocs/gcc/Extended-Asm.html)

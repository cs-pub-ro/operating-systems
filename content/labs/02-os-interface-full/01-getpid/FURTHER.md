# Going Further: The `getpid` System Call

## Things to try

1. **Compare syscall numbers across architectures.**
   `getpid` is 39 on x86-64, 20 on 32-bit x86, 172 on AArch64.
   `write` is 1 on x86-64 but 4 on 32-bit x86.
   The x86-64 table was renumbered from scratch when the architecture was introduced, grouping the most common calls at low numbers; the 32-bit numbers are inherited from early Linux and ultimately from Unix.
   Neither table can ever be changed again.

1. **Time a million calls** against a million calls to an ordinary local function.
   The syscall version is typically one to two orders of magnitude slower.
   This is the number that session 01's `printf` vs `write` demo asked students to take on trust — the privilege transition, not the work, is the cost.

1. **Add libc's `getpid()` alongside yours** and run under `strace`.
   Two `getpid()` lines appear.
   Before glibc 2.25 only one would have: glibc cached the PID in user space.

1. **Try `getppid`** (number 110 on x86-64) with the same wrapper.
   Run from a shell and the parent is the shell; run under `strace` and the parent is `strace`, because `strace` forks and traces the child.

1. **Use a nonexistent syscall number**, e.g. 999.
   The kernel returns `-38`, negated `ENOSYS`.
   Detect it in C by testing whether the return value lies in `-4095..-1`.

## Questions to answer

* **Which register carries the number, and which the result?**
  `RAX` for both — the number on the way in, the result on the way out.

* **What does `syscall` do to `RCX` and `R11`?**
  The instruction stores the return address in `RCX` and the saved `RFLAGS` in `R11`.
  Both are therefore destroyed, which is why they are in the clobber list, and why the kernel ABI uses `R10` for the fourth argument instead of `RCX`.

* **How does one register carry both a result and an error?**
  By convention, return values in `-4095..-1` are negated `errno` values.
  libc's wrappers test for that range, store the positive value in `errno`, and return `-1`.
  A raw wrapper like `my_getpid()` does none of this.

## Discussion points

* **There is nothing between this code and the kernel.**
  No libc, no buffering, no caching.
  Worth appreciating how short the path is: a few `mov` instructions and one `syscall`.
* **Syscall numbers are an ABI, not an API.**
  They can never be reordered or reused, because compiled binaries hold them as constants.
  Linux only ever appends.
* **glibc's `getpid()` used to cache the result** to avoid the syscall.
  It caused long-standing bugs around `fork()` and `clone()` — a cached PID is wrong in the child — and the cache was removed in glibc 2.25.
  A modern `getpid()` really does enter the kernel every time.
* **`%lu` in `main()` is a latent trap.**
  `getpid` cannot fail, so it is harmless here, but for a call that can fail an unsigned conversion turns a small negative error code into a number near `2^64`.

## References

* `man 2 getpid`, `man 2 syscall`
* `/usr/include/x86_64-linux-gnu/asm/unistd_64.h`
* [Linux Syscall Table](https://filippo.io/linux-syscall-table/)

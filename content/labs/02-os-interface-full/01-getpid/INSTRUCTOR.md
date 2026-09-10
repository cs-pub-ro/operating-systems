# Instructor Notes: The `getpid` System Call

## Purpose

The simplest possible system call: no arguments, no output parameters, cannot fail.
All the attention goes to the mechanism.
Most students finish quickly; the value is in the `strace` verification and in the discussion of what a syscall number *is*.

## Expected answer

`SYS_getpid` is **39** on x86-64, and the wrapper is one line.

Insist students look the number up rather than being told it:

```console
grep '__NR_getpid ' /usr/include/x86_64-linux-gnu/asm/unistd_64.h
```

The exercise README mentions both the multiarch path and `/usr/include/asm/unistd_64.h`; check which exists on the lab image beforehand.

## Common mistakes

* **Leaving `#define SYS_getpid /* ??? */`** — this produces a confusing syntax error at the call site rather than at the definition.
  Worth warning about, since the error message points at the wrong line.
* **Returning `-1` from the placeholder** and not noticing, because `printf("%lu")` renders it as a huge number rather than as `-1`.
  A good moment to discuss why an unsigned conversion of a negative error code is a trap.
* **Passing fewer than six arguments** to `my_syscall()` — a compile error, easily fixed, but students sometimes try to "simplify" the wrapper.

## Points to hammer

* **Syscall numbers are architecture-specific**: 39 on x86-64, 20 on 32-bit x86, 172 on AArch64.
  That is why the table lives under `asm/`.
* **They are an ABI, not an API.**
  A number can never be reordered or reused, because compiled binaries hold it as a constant.
  Linux only ever appends to the table.
* **`strace` is the proof.**
  The printed PID must equal the traced return value.

## Discussion worth having

glibc's `getpid()` used to **cache** the PID in user space to avoid the syscall.
It caused long-standing bugs around `fork()` and `clone()` — the cached value is wrong in the child — and the cache was removed in glibc 2.25.
A modern `getpid()` really does enter the kernel every time, exactly like the student's version.

This is a good bridge to `bonus-clock_gettime`, where avoiding the kernel *is* the correct answer and Linux provides a supported mechanism for it.

## Practical notes

* `strace` output ordering: the `getpid()` line appears before the program's `printf` output, because the program's stdout is a pipe and libc buffers it.
  Students notice this here and are puzzled by it more strongly in `02-nanosleep`.
  It is the session 01 buffering lesson resurfacing.
* Nothing here is timing-sensitive.

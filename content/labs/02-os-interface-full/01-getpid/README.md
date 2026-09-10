# Exercise: The `getpid` System Call

**Tools:** GCC, strace

## Goal

Reference solution for the `getpid` wrapper.
The exercise is deliberately the simplest possible system call, so that all the attention goes to the mechanism rather than to the arguments.

## Background

`getpid(2)` returns the Process ID of the calling process.
It takes no arguments, has no output parameters, and cannot fail — POSIX specifies it as always successful.

The three-layer pattern from the demo collapses to two here, because there is no higher-level helper worth building:

```text
  my_getpid()   -->   my_syscall()   -->   kernel
```

## Build & Run

```console
make
./getpid
```

```text
PID: 238376
```

## Results and Explanations

### `SYS_getpid`

The x86-64 syscall number for `getpid` is **39**:

```console
grep '__NR_getpid ' /usr/include/x86_64-linux-gnu/asm/unistd_64.h
```

On Debian and Ubuntu the header sits at that multiarch path; elsewhere it may be `/usr/include/asm/unistd_64.h`.

The number is **architecture-specific**: the same call is 20 on 32-bit x86 and 172 on AArch64.
This is why the table lives under `asm/` rather than in a portable header, and it is the reason a statically linked binary built for one architecture can never run on another even if the CPU could decode the instructions.

Syscall numbers are an **ABI, not an API**.
Once assigned, a number can never be reordered or reused, because compiled binaries carry it as a constant.
Linux only ever appends to the table.

### `my_getpid()`

Every argument slot is 0, and the kernel's return value in `%rax` is the PID:

```C
long my_getpid(void)
{
	return my_syscall(SYS_getpid, 0, 0, 0, 0, 0, 0);
}
```

There is nothing between this and the kernel — no libc, no buffering, no caching.

### Checking it

```console
$ strace -e trace=getpid ./getpid
getpid()                                = 238376
PID: 238376
+++ exited with 0 +++
```

The kernel reports the same number the program prints, which is the proof that the PID came from the syscall rather than from somewhere else.

Note that `strace` prints its line *before* the program's output, even though the program prints after calling `my_getpid()`.
That is stdout buffering, not a reordering: the program's output goes to a pipe and is held until exit, while `strace` writes to the terminal immediately.
The same effect appears in `02-nanosleep`, more strikingly.

### A note on `printf("%lu", ...)`

`main()` prints the PID with `%lu`, an unsigned conversion.
Since `getpid` cannot fail this is harmless, but it is worth noticing: had the wrapper returned a negative error code, `%lu` would display it as a number close to `2^64` rather than as a small negative value.
For system calls that *can* fail, this is a common source of baffling output.

## References

* `man 2 getpid`, `man 2 syscall`
* `/usr/include/x86_64-linux-gnu/asm/unistd_64.h` — the syscall number table
* [Linux Syscall Table](https://filippo.io/linux-syscall-table/) — numbers and signatures across architectures

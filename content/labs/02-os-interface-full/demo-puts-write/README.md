# Demo: The `write` System Call

**Tools:** GCC, strace

## Goal

Show how a program reaches the kernel *directly*, without going through the C standard library, and establish the three-layer pattern that every other task in this session reuses.

## Background

A program runs in **user mode** and cannot touch hardware, files or other processes on its own.
Whenever it needs the operating system to do something privileged — write to a file, allocate memory, create a process — it asks the kernel by performing a **system call**.

Normally you call a libc function such as `printf()` or `write()`, and libc issues the system call for you.
Here we build those wrappers ourselves, and there is nothing at all between the program and the kernel.

The demo is organised as three layers, each built on the previous one:

```text
  my_puts()      <-- layer 3: a tiny "libc" helper (like puts)
     |
  my_write()     <-- layer 2: a typed wrapper for the write syscall
     |
  my_syscall()   <-- layer 1: the generic wrapper (issues `syscall`)
     |
  [ kernel ]
```

### Layer 1 — `my_syscall()`

On **x86-64 Linux** a system call uses this register convention:

| Register | Meaning |
| --- | --- |
| `RAX` | syscall number |
| `RDI` | argument 1 |
| `RSI` | argument 2 |
| `RDX` | argument 3 |
| `R10` | argument 4 |
| `R8` | argument 5 |
| `R9` | argument 6 |

The registers are loaded using inline assembly and the `syscall` instruction is executed.
The kernel returns its result in `RAX`.

Note the clobber list: `"rcx"`, `"r11"` and `"memory"`.
The `syscall` instruction itself destroys `RCX` and `R11` — the hardware uses them to save the return address and flags — so the compiler must be told not to keep anything valuable there.

Note also that argument 4 uses `R10` rather than `RCX`.
The ordinary C function calling convention uses `RCX` for the fourth argument, but `syscall` clobbers it, so the kernel ABI deviates at exactly that one slot.

### Layer 2 — `my_write()`

`write(2)` has the prototype:

```C
ssize_t write(int fd, const void *buf, size_t count);
```

Its syscall number on x86-64 is **1**.
`my_write()` forwards `fd`, `buf` and `count` to `my_syscall()`; the remaining slots are 0.

### Layer 3 — `my_puts()`

A convenience function like `puts()`: it measures the string length by hand — there is no `strlen()` available below this point — and calls `my_write()` to print the text plus a newline to `STDOUT_FILENO` (fd 1).

## Build & Run

```console
make
./demo
```

```text
Hello from a raw write(2) system call!
No printf, no libc puts -- just my_syscall().
```

## Results and Explanations

### Confirming the system call

```console
strace ./demo
```

Among the start-up noise you will find:

```text
write(1, "Hello from a raw write(2) system"..., 38) = 38
write(1, "\n", 1)                       = 1
write(1, "No printf, no libc puts -- just "..., 45) = 45
write(1, "\n", 1)                       = 1
```

Four calls for two lines, because `my_puts()` writes the string and the newline separately.
That is proof the wrapper reached the kernel: `strace` intercepts system calls, not function calls, so anything appearing here genuinely crossed the user/kernel boundary.

### What the return value means

`write` returns the number of bytes actually written, which is why the lines end in `= 38` and `= 1`.
It is allowed to write **fewer** bytes than requested — on a pipe or a socket this happens routinely — which is why production code loops until everything is written.
`my_write()` ignores this, as does `my_puts()`; that is a real (if here harmless) bug, and worth knowing about.

On failure the kernel returns a small **negative** value, the negated `errno`.
There is only one register for the result, so error and success share it: values in the range `-4095..-1` are errors by convention.
libc's wrappers check for that range, store the positive value in `errno` and return `-1`.
`my_syscall()` does none of this and hands the raw kernel value straight back.

### Why no libc

The program calls no libc function on its output path at all.
`my_puts()` computes the length itself precisely so that `strlen()` is not needed.
The result is that this code would work unchanged in an environment with no C library present — which is exactly the situation the kernel itself, and every libc implementation, starts from.

## References

* `man 2 syscall` — the calling convention, and the return-value/error convention
* `man 2 write`
* `man 1 strace`
* `/usr/include/x86_64-linux-gnu/asm/unistd_64.h` — the syscall number table
* [Linux Syscall Table](https://filippo.io/linux-syscall-table/)

# Demo: Talking to the Kernel Directly

A program that reads a line and echoes it, written in assembly, using nothing but the `syscall` instruction.
No libc, no wrappers: just the raw kernel interface.

## Goal

Make the system call interface concrete.
By the end you should be able to point at the exact instruction that crosses from user space into the kernel, and name what goes in each register on the way.

## Background

On x86-64 Linux a system call is made by putting the call number in `rax`, the arguments in `rdi`, `rsi`, `rdx`, `r10`, `r8`, `r9`, and executing `syscall`.
The kernel does the work and returns the result in `rax`.
That convention is the whole interface; libc's `read()` and `write()` are thin wrappers that load those registers and execute that one instruction.

`read_write_syscall.asm` does it by hand three times:

* `write(1, "Gimme message: ", 15)` -- prompt, call number `1`
* `read(0, buf, 64)` -- read a line, call number `0`, result (bytes read) comes back in `rax`
* `write(1, buf, rax)` -- echo exactly what was read
* `exit_group(0)` -- call number `231`

## Build and run

```console
make
./read_write_syscall
```

Type a line and press Enter; the program prints it back.

## Results and explanations

```console
$ ./read_write_syscall
Gimme message: hello there
hello there
```

There is no library between this program and the kernel.
Confirm it with `strace`, which shows the system calls and nothing else, because there is nothing else:

```console
$ strace ./read_write_syscall
execve("./read_write_syscall", ...) = 0
write(1, "Gimme message: ", 15)       = 15
read(0, "hello there\n", 64)          = 12
write(1, "hello there\n", 12)         = 12
exit_group(0)                         = ?
```

Three things to notice.

* **The result comes back in `rax`.**
  `read` returns the number of bytes it actually read, which the program feeds straight into the length argument of the echoing `write`.
  The kernel's return convention is a single register carrying either a count or a negative error code.
* **There is no buffering and no formatting.**
  Every `write` is a system call, and the bytes go out exactly as given.
  libc's `printf` and `fwrite` would batch these; here you see the unbuffered truth, which is what part 04 optimises.
* **`syscall` is the only door.**
  The program cannot reach the kernel any other way, and neither can any program.
  That single controlled entry point is the subject of part 03.

## Going further

* Change the read count and watch `strace` report the shorter buffer.
* Add a second `read`/`write` pair and see the extra system calls appear in the trace.
* Compare with the C library version from lab 02, which builds exactly these wrappers over a generic `my_syscall()`; see [`labs/02-os-interface-full/`](../../../../../labs/02-os-interface-full).

## References

* `man 2 syscall`, `man 2 read`, `man 2 write`
* [Linux x86-64 system call table](https://x64.syscall.sh/)
* [The same table, arm64](https://arm64.syscall.sh/)

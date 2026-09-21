# Demo: Talking to the Kernel Directly

A program that reads a line and echoes it, written in assembly, using nothing but the `syscall` instruction.
No libc, no wrappers.

## Run

```console
cd ../../../../02-os-types-interface-full/demos/02-os-interface/syscalls
make
./read_write_syscall
```

Type a line and press Enter; it prints back.
Then watch the system calls, which are the whole program:

```console
strace ./read_write_syscall
```

## Ask

* The `strace` output *is* the source. What sits between this program and the kernel?
* `read` returns 12 and the next `write` sends 12 bytes. Where did the length come from?
* Every `write` is its own system call here. What would libc's `printf` have done instead?

# Demo: The Five Operations

Allocate a kilobyte, write a byte into it, read it back, jump to it, free it.
Four of the five work.

## Goal

Show every operation a program can do with memory in one short program, and show that **execute** is an access with a permission of its own: memory that can be read and written cannot necessarily be run.

## Background

`basic.c` allocates 1024 bytes with `malloc()`, writes `0xc3` into the first one, reads it back, casts the pointer to a function pointer and calls it, then frees the block.
`0xc3` is the x86 `ret` instruction, so if the call went through, the "function" would return at once and the program would carry on to `free()`.

It does not go through.
`malloc()` returns heap memory, and the heap is mapped `rw-`: readable, writable, not executable.
Fetching an instruction from it is an access the area does not allow, and the hardware refuses it.

## Build and run

```console
make
./basic
```

Then under `gdb`, to see where it died:

```console
gdb -batch -ex run -ex bt -ex 'info proc mappings' ./basic
```

## Results and explanations

```text
$ ./basic
----- Allocate memory -----
----- Write to memory -----
----- Read from memory -----
----- Execute memory -----
Segmentation fault (core dumped)
```

`strace` shows the signal the kernel delivered, with the detail that matters:

```text
--- SIGSEGV {si_signo=SIGSEGV, si_code=SEGV_ACCERR, si_addr=0x5de1b060b2b0} ---
+++ killed by SIGSEGV (core dumped) +++
```

`SEGV_ACCERR`, not `SEGV_MAPERR`: the address is mapped -- it is the heap block the program just wrote to -- but the access is of a kind the mapping does not permit.
`gdb` confirms the faulting address lies in the `[heap]` area, which is marked `rw-p`:

```text
Program received signal SIGSEGV, Segmentation fault.
#0  0x000055555555a2b0 in ?? ()
#1  0x00005555555551fe in main () at basic.c:25
0x0000555555559000 0x000055555557a000 0x21000  rw-p  [heap]
```

Frame `#0` is the one instruction the CPU tried to fetch from the heap, and `??` is `gdb` saying there is no function there.

Why the heap is not executable is a security decision, made for every program by the kernel and the toolchain (the `NX` bit, "no-execute").
A program that reads input into a buffer must not be convertible into a program that runs that input, and the cheapest way to guarantee it is to make data areas unexecutable at the hardware level.
Lab 05 is about what attackers do about that.

## Going further

* Allocate the block with `mmap()` and `PROT_READ | PROT_WRITE | PROT_EXEC` instead of `malloc()`, and the call succeeds: permissions are per area, and `mmap()` lets you choose them.
  This is how just-in-time compilers get executable memory.
* `mprotect()` changes the permissions of an existing area; add `mprotect(ptr_page_aligned, 4096, PROT_READ | PROT_EXEC)` before the call.
* Comment out the execute step and run under `valgrind` to see that the remaining four operations are clean.

## References

* `man 2 mmap`, `man 2 mprotect`, `man 2 sigaction` (the `SEGV_*` codes)
* Wikipedia, [NX bit](https://en.wikipedia.org/wiki/NX_bit)

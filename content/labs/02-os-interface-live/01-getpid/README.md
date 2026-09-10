# Exercise: The `getpid` System Call

**Tools:** GCC, strace

## Goal

Build your own `getpid()` on top of the raw `syscall` instruction, with no libc in between.
Afterwards you will be able to look up a system call number for x86-64 and write the wrapper that invokes it.

## Background

In the [write demo](../demo-puts-write) you saw the three-layer pattern:

```text
  high-level helper   -->   syscall wrapper   -->   my_syscall()   -->   kernel
```

`getpid(2)` returns the Process ID of the calling process.
It is the simplest system call there is: no arguments, no output parameters, and no way for it to fail.

Every system call has a number, and that number is **architecture-specific** — the same call has a different number on 32-bit x86 and on AArch64.
This is why the table lives in an `asm/` header rather than a portable one.

## Your Task

Open `main.c` and complete the two TODOs.
`my_syscall()` is already there and needs no changes.

1. **`SYS_getpid`** — define the correct x86-64 syscall number for `getpid`.
   Find it yourself:

   ```console
   grep '__NR_getpid ' /usr/include/x86_64-linux-gnu/asm/unistd_64.h
   ```

   On some distributions the header is at `/usr/include/asm/unistd_64.h` instead.

1. **`my_getpid()`** — the syscall wrapper.
   `getpid` takes no arguments, so pass `0` for every argument slot, and return what `my_syscall()` gives back.

## Build & Run

```console
make
./getpid
```

## Check Your Work

* The program should print a plausible PID: a positive number, typically in the thousands or higher.
  A `-1` means the wrapper is still returning its placeholder value; a very large number close to `2^64` means a negative kernel error code is being printed as unsigned.
* Run it twice.
  The number must change between runs, and you should be able to say why.
* Confirm the number really came from the kernel rather than from somewhere else:

  ```console
  strace -e trace=getpid ./getpid
  ```

  There should be exactly one `getpid()` line, and its return value must equal the number your program printed.
  If `strace` shows no `getpid()` at all, your wrapper is not reaching the kernel.
* Show the `strace` output to the teaching assistant and explain which register carried the syscall number and which one carried the result.

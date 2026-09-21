# Demo: The Kernel Does the Heavy Lifting

Four programs print `Hello, World!`.
They range from a freestanding assembly stub to an ordinary C program, and they differ by an order of magnitude in the number of instructions the machine actually retires -- almost all of them in code the program never wrote.

## Goal

Show that even the smallest user-space program leans on a large amount of machinery underneath it, and that most of the instructions run on its behalf are the operating system's, not its own.
This is the motivation for the whole lecture: the operating system is always there, doing work you did not ask for by name.

## Background

The four versions, from the bottom up:

| File | Built as | What is below it |
| --- | --- | --- |
| `hello_nostd` | `nasm` + `ld`, freestanding | nothing but the kernel |
| `hello_syscall` | `nasm` + `gcc`, via `main` | the C runtime start-up, then one raw `write` |
| `hello` | `gcc`, dynamic | libc: `puts()`, buffered streams, the dynamic loader |
| `hello_static` | `gcc -static` | libc, linked into the binary |

`hello_nostd.asm` and `hello_syscall.asm` both end in the same `syscall` with `1` in `rax`, which is `write()` on x86-64 Linux.
`hello_nostd` uses `exit_group` directly and never touches libc; `hello_syscall` returns through libc's start-up so the C runtime can tear the process down.
`hello.c` does none of that by hand: it calls `puts()` and lets libc decide how and when to reach the kernel.

The point of the demo is not the source, which is trivial in every case.
It is the count of instructions the CPU retires to run each one, measured with `perf`.

## Build and run

```console
make
./hello
./hello_static
./hello_syscall
./hello_nostd
```

All four print the same line.

## Results and explanations

Count the instructions the machine actually executes, application plus kernel, with `perf`:

```console
$ sudo perf stat -e instructions ./hello_nostd
Hello, World!

 Performance counter stats for './hello_nostd':

           108,573      instructions
[...]

$ sudo perf stat -e instructions ./hello
Hello World!

 Performance counter stats for './hello':

         1,015,131      instructions
[...]

$ sudo perf stat -e instructions ./hello_static
Hello World!

 Performance counter stats for './hello_static':

           616,859      instructions
[...]

$ sudo perf stat -e instructions ./hello_syscall
Hello, World!

 Performance counter stats for './hello_syscall':

           954,933      instructions
[...]
```

Numbers from one machine; yours will differ, the shape will not.

Two things are worth saying out loud.

* **The freestanding version already costs a hundred thousand instructions.**
  `hello_nostd` writes fourteen bytes and exits.
  Its own code is a dozen instructions; the other hundred thousand are the kernel setting the process up (`execve`), servicing the `write`, and tearing it down.
  Even the barest program is mostly the operating system running on its behalf.
* **libc adds most of the rest.**
  The dynamic `hello` retires ten times as many instructions as `hello_nostd`, because before `main()` runs the dynamic loader has to find and map `libc.so.6` and libc has to initialise itself.
  Static linking removes the loader's search but keeps libc's start-up, which is why `hello_static` sits in between.

Nothing about printing a string got harder between the versions.
What grew is the amount of machinery that has to exist, and run, before and around the one line of work -- and almost all of that machinery is the kernel and the library that wraps it.
That machinery is the subject of the lecture.

## Going further

* Remove the `write` from `hello_nostd.asm`, leaving only the `exit_group`, rebuild, and count again.
  The instruction count barely moves: the cost is the process life cycle, not the one system call.
* Run `strace -c ./hello` and `strace -c ./hello_nostd` and compare the system-call tallies with the instruction counts.
  The library version makes tens of calls to the two the freestanding one makes.
* This is the same measurement lecture 01 made by counting *system calls* rather than *instructions*; see [`01-software-stack-full/demos/02-software-stack/`](../../../01-software-stack-full/demos/02-software-stack).

## References

* `man 1 perf-stat`, `man 2 write`, `man 2 exit_group`
* `man 1 strace`

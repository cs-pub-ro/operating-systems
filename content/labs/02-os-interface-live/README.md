# Session 02: The Operating System Interface

This session is about system calls: how a user-space program crosses into the kernel, and how the C library's convenience functions are built on top of it.

* What a system call is, and the x86-64 Linux calling convention.
* Writing raw syscall wrappers over a single generic `my_syscall()`.
* Building libc-style helpers (`my_puts`, `my_sleep`, `my_time`) on your own wrappers.
* Confirming which calls a program really makes, with `strace`.

## Learning objectives

By the end of this session you should be able to:

* Explain what a system call is and how a user-space program reaches the kernel through it.
* Describe the x86-64 Linux system call convention: which registers carry the number, the arguments and the result.
* Implement raw syscall wrappers (`my_write`, `my_getpid`, `my_nanosleep`) on top of a generic `my_syscall()`.
* Build higher-level helpers (`my_puts`, `my_sleep`, `my_time`) on top of your own wrappers.
* Read the kernel's return-value convention, including how a single register carries both a result and an error.
* Use `strace` to confirm which system calls a program actually performs.

## Prerequisites and required tools

* Session 01 concepts: the software stack, and buffered versus unbuffered output.
* Basic familiarity with C pointers.
* A Linux environment on **x86-64**, with `gcc`, `make` and `strace` installed.
  The inline assembly in this session is specific to x86-64 Linux and will not work elsewhere.
* No prior assembly experience is required.
  The inline assembly is given to you and explained; you never have to write any.

Check that your system has all it needs for the lab, by downloading and running the [`check-prerequisites.sh` script](https://github.com/cs-pub-ro/operating-systems-sessions/blob/master/scripts/check-prerequisites.sh):

```console
wget http://raw.githubusercontent.com/cs-pub-ro/operating-systems-sessions/refs/heads/master/scripts/check-prerequisites.sh
chmod a+x check-prerequisites.sh
./check-prerequisites.sh
```

The script installs nothing.
It reports what is missing and prints the command that installs it on your distribution.

If something is missing, be sure to install and configure it.

## Getting the lab archive

Download [`02-os-interface.zip`](https://github.com/cs-pub-ro/operating-systems-sessions/raw/lab-archives/02-os-interface.zip), then unzip it and change into the directory it creates:

```console
wget https://github.com/cs-pub-ro/operating-systems-sessions/raw/lab-archives/02-os-interface.zip
unzip 02-os-interface.zip
cd 02-os-interface/
```

Work inside that directory for the rest of the session.

## Task order

The demo comes first, solved together with the teaching assistant.
Core exercises are then solved individually or in teams, in the numeric order shown.
Bonus exercises are optional: start them if you finish the core exercises, or take them home.

| Order | Task | Type | Objective |
| --- | --- | --- | --- |
| 1 | [`demo-puts-write`](demo-puts-write) | Demo | Build the three-layer pattern: `my_puts` over `my_write` over `my_syscall`. |
| 2 | [`01-getpid`](01-getpid) | Core | Implement the simplest possible syscall wrapper. |
| 3 | [`02-nanosleep`](02-nanosleep) | Core | Implement a syscall that takes pointers, and a libc-style `sleep()` on top of it. |
| 4 | [`bonus-clock_gettime`](bonus-clock_gettime) | Bonus | Implement `clock_gettime` and a libc-style `time()`, across a header and an implementation file. |
| 5 | [`bonus-printf`](bonus-printf) | Bonus | Implement `_putchar` so a portable `printf` implementation writes through the `write` syscall. |

The demo produces the `my_syscall()` function that every later task reuses unchanged, so do not skip it.

Each exercise directory has a `README.md` with the task itself.
Where there is also a `FURTHER.md`, it holds optional extensions and questions to dig into once the task is done.

The [`bonus-printf/utils/printf/`](bonus-printf/utils/printf) directory contains a third-party portable `printf` implementation ([mpaland/printf](https://github.com/mpaland/printf), MIT licensed).
It is support code for that exercise, not an exercise in itself.

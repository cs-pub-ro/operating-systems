# Session 02: The Operating System Interface — Full Contents

This directory holds the complete version of session 02: reference solutions, full explanations, and the reference output of every command the exercises ask for.

Use it after the live session for a full view of the solutions and the reasoning behind them.
The corresponding directory used during the session, with skeletons and task descriptions, is [`02-os-interface-work/`](../02-os-interface-work).

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
  The inline assembly in this session is specific to x86-64 Linux.
* No prior assembly experience is required; the inline assembly is given and explained, never written.

## Contents

| Task | Type | Objective |
| --- | --- | --- |
| [`demo-puts-write`](demo-puts-write) | Demo | The three-layer pattern, the register convention, and the error convention. |
| [`01-getpid`](01-getpid) | Core | The simplest possible syscall; what a syscall number is. |
| [`02-nanosleep`](02-nanosleep) | Core | Pointer arguments, and the kernel writing back into caller memory. |
| [`bonus-clock_gettime`](bonus-clock_gettime) | Bonus | `clock_gettime`, `time()`, and the vDSO. |
| [`bonus-printf`](bonus-printf) | Bonus | One function as an entire porting layer. |

Each task directory contains:

* `README.md` — the tutorial: goal, background, how to build and run, and what the results mean.
* `FURTHER.md` — optional extensions and discussion points, with answers.
* `INSTRUCTOR.md` — notes for whoever runs the session.

## The through-line of the session

The session builds one mechanism and then complicates it three times:

1. **`demo-puts-write`** — a system call is a single instruction that crosses a hardware-enforced privilege boundary, with a register convention and a return-value convention.
1. **`01-getpid`** — the number identifying a call is an **ABI**: architecture-specific, and fixed forever.
1. **`02-nanosleep`** — arguments can be addresses, and the kernel reads and writes the caller's memory through them, after validating them.
1. **`bonus-clock_gettime`** — and then the rule breaks: the most frequently called syscalls are served from the **vDSO** without entering the kernel at all, so libc is *faster* than the raw syscall.

That last inversion is the payoff, and it is the same shape of argument as session 01: the fast path wins by **avoiding** the expensive operation, not by performing it faster.

## A note on the vendored library

`bonus-printf` uses [mpaland/printf](https://github.com/mpaland/printf), MIT licensed.
A single copy lives in [`../02-os-interface-work/bonus-printf/utils/printf/`](../02-os-interface-work/bonus-printf/utils/printf) and this directory's `Makefile` points at it, rather than duplicating 600 kB of third-party code.
The upstream `test/` directory has been removed, as nothing here builds it.

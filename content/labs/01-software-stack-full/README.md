# Session 01: The Software Stack — Full Contents

This directory holds the complete version of session 01: reference solutions, full explanations, and the reference output of every command the exercises ask for.

Use it after the live session for a full view of the solutions and the reasoning behind them.
The corresponding directory used during the session, with skeletons and task descriptions, is [`01-software-stack-work/`](../01-software-stack-work).

## Learning objectives

By the end of this session you should be able to:

* Explain the layers between a C program and the kernel: application code, C library, and system calls.
* Implement basic string-handling functions (`strlen`, `strcpy`, `strcat`, `memcpy`) and reason about their algorithmic cost.
* Compare buffered (`printf`) and unbuffered (`write`) output, and explain the buffering trade-off from measured data.
* Build a C program as a dynamically-linked executable, a statically-linked executable, and against a shared or a static library.
* Explain the difference between static linking (`.a`, `ar`) and dynamic linking (`.so`), including symbol resolution via the PLT and the GOT.

## Prerequisites and required tools

* Prior knowledge of C syntax: pointers, arrays, functions, basic `<string.h>` usage.
* A Linux environment with `gcc`, `make`, `ar`, `ldd`, `nm`, `objdump`, `size`, `strace` and `/usr/bin/time` installed.
* Comfort with the command line: running commands, redirecting output, reading `man` pages.

## Contents

| Task | Type | Objective |
| --- | --- | --- |
| [`demo-printf-vs-write`](demo-printf-vs-write) | Demo | Buffering decides whether the library beats the system call. |
| [`demo-copy-string`](demo-copy-string) | Demo | Repeated `strcat` rescans; `strcpy` at known offsets does not. |
| [`01-string-functions`](01-string-functions) | Core | Reference implementation of the four functions, plus the O(N²) explanation. |
| [`02-stream-ciphers`](02-stream-ciphers) | Core | All four link formats, with the commands and the `ldd`/`nm` output they produce. |
| [`bonus-static-vs-dynamic`](bonus-static-vs-dynamic) | Bonus | Measured call cost and start-up cost, and why dynamic linking still wins. |
| [`bonus-per-stream-cipher-exec`](bonus-per-stream-cipher-exec) | Bonus | One executable per cipher; `.a` versus `.so` extraction semantics. |

Each task directory contains:

* `README.md` — the tutorial: goal, background, how to build and run, and what the results mean.
* `FURTHER.md` — optional extensions and discussion points, with answers.
* `INSTRUCTOR.md` — notes for whoever runs the session.

## The through-line of the session

Three of the six tasks make the same argument with different material:

1. **`demo-printf-vs-write`** — the buffered library beats the raw system call, because it avoids the expensive operation rather than doing it faster.
1. **`demo-copy-string`** and **`01-string-functions`** — no amount of hand-tuned SIMD in glibc's `strcat` can beat keeping track of a length, because the missing length is a property of the *interface*, not the implementation.
1. **`bonus-static-vs-dynamic`** — static linking wins both benchmarks and is still the wrong default, because the cost that matters is not the one being timed.

In each case the naive question ("which is faster?") has no answer, and the useful question is "which cost am I choosing to pay?".

## A note on the numbers

Every set of measurements in these files was taken on Ubuntu 24.04 / gcc 13.3 / x86-64.
Your numbers will differ, sometimes by a lot.
What should reproduce is the *ratio* between columns and the *shape* of a column as the input size doubles.

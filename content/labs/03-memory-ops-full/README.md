# Session 03: Memory Operations — Full Contents

This directory holds the complete version of session 03: reference solutions, full explanations, and the reference output of every command the exercises ask for.

Use it after the live session for a full view of the solutions and the reasoning behind them.
The corresponding directory used during the session, with skeletons and task descriptions, is [`03-memory-ops-live/`](../03-memory-ops-live).

## Learning objectives

By the end of this session you should be able to:

* Copy data through a static global buffer, a local buffer on the stack, a heap buffer (`malloc`/`free`) and an anonymous mapping (`mmap`/`munmap`), and explain what each one costs and when it is the right choice.
* Free every heap allocation on every code path, including early returns and error paths.
* Build a growable in-memory data structure using `malloc` and `realloc` with a chunked growth strategy.
* Use `realloc` correctly, including what happens to your data when it fails.
* Shrink a dynamic array safely when its usage drops, without invalidating live data.
* Obtain a buffer sized at run time from the kernel with `mmap`, and say what that buys over `malloc`.
* Measure what `malloc` asks of the kernel, and change it with `mallopt` and `GLIBC_TUNABLES`.
* Use Valgrind to prove that a program leaks nothing.

## Prerequisites and required tools

* Session 01 and 02 concepts: the software stack, and system calls.
* Comfort with C pointers, `struct`s, and file I/O.
* A Linux environment with `gcc`, `make`, `valgrind` and `strace` installed.

## Contents

| Task | Type | Objective |
| --- | --- | --- |
| [`demo-copy-file`](demo-copy-file) | Demo | One file-copy program, four ways of obtaining the buffer: global, local, heap, mapped. |
| [`01-xor-encrypt`](01-xor-encrypt) | Core | A fixed-size problem: static buffers only, and why no `malloc` is needed. |
| [`02-products`](02-products) | Core | A static array of structs, with each name `malloc`'d to a length known only at run time. |
| [`03-in-memory-db`](03-in-memory-db) | Core | A growable heap array, and the `realloc` idiom. |
| [`04-reverse-lines`](04-reverse-lines) | Core | One buffer as large as the input, once: `mmap` instead of `malloc`. |
| [`bonus-in-mem-database`](bonus-in-mem-database) | Bonus | Deletion, shrinking, and the hysteresis rule. |
| [`bonus-malloc-tuning`](bonus-malloc-tuning) | Bonus | `malloc` as a policy: five times faster with two settings, and the bug that shows up when it is. |

The demo's four variants share one `FURTHER.md` and one `INSTRUCTOR.md`, at [`demo-copy-file/`](demo-copy-file), since the point of the demo is the comparison between them.

Each task directory contains:

* `README.md` — the tutorial: goal, background, how to build and run, and what the results mean.
* `FURTHER.md` — optional extensions and discussion points, with answers.
* `INSTRUCTOR.md` — notes for whoever runs the session.
* `prompt.txt` — where there is one, the note the exercise was written from.

## The through-line of the session

The session is about **where a piece of memory comes from, who owns it, and when it is released**.

1. **`demo-copy-file`** asks the same question four ways, changing one line each time.
   Global: the compiler decides the size, the loader provides the memory, nobody cleans up.
   Local: the same, per call, on the stack — and the stack is small.
   Heap: you decide the size at run time and you clean up, on every path.
   Mapped: the kernel provides the memory directly, which is what `malloc` does for large blocks anyway, and you clean up, on every path.
1. **`01-xor-encrypt`** is the baseline case where the question does not arise.
   Every size is fixed at compile time, so the key and buffers are static, nothing is owned, and nothing can leak — which is exactly what makes the contrast with the next exercise sharp.
1. **`02-products`** introduces the first real owner.
   The array of products is still static, but each name's length is decided by the input, so each name is `malloc`'d (or `strdup`'d) to fit and must be freed — one allocation, one owner, one free, on every path.
1. **`03-in-memory-db`** makes ownership dynamic.
   The `realloc` idiom exists because a failed reallocation leaves the old block alive — and the obvious one-line version of the call throws it away.
1. **`04-reverse-lines`** goes past the allocator.
   One block as large as the input, needed once: the case for asking the kernel with `mmap` and giving it straight back with `munmap`.
1. **`bonus-in-mem-database`** makes ownership symmetric, and introduces hysteresis: grow at one threshold, shrink at another, or thrash.
1. **`bonus-malloc-tuning`** opens `malloc` up.
   It is a policy on top of `brk` and `mmap`, with settings; two of them make a program five times faster, and the speed-up exposes a program that only worked because fresh memory happens to be zero.

The recurring practical point is that **the happy path proves nothing**.
Every bug in this session lives on a path that a casual test never executes, or in a property of the memory that the default configuration happens to provide, which is why Valgrind is a required tool rather than an optional one, and why `strace` sits next to it.

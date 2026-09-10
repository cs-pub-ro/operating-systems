# Session 03: Memory Operations — Full Contents

This directory holds the complete version of session 03: reference solutions, full explanations, and the reference output of every command the exercises ask for.

Use it after the live session for a full view of the solutions and the reasoning behind them.
The corresponding directory used during the session, with skeletons and task descriptions, is [`03-memory-ops-work/`](../03-memory-ops-work).

## Learning objectives

By the end of this session you should be able to:

* Copy data using a static global buffer, a heap buffer (`malloc`/`free`), and a memory-mapped file (`mmap`), and explain the trade-offs of each.
* Free every heap allocation on every code path, including early returns and error paths.
* Build a growable in-memory data structure using `malloc` and `realloc` with a chunked growth strategy.
* Use `realloc` correctly, including what happens to your data when it fails.
* Shrink a dynamic array safely when its usage drops, without invalidating live data.
* Use Valgrind to prove that a program leaks nothing.

## Prerequisites and required tools

* Session 01 and 02 concepts: the software stack, and system calls.
* Comfort with C pointers, `struct`s, and file I/O.
* A Linux environment with `gcc`, `make` and `valgrind` installed.

## Contents

| Task | Type | Objective |
| --- | --- | --- |
| [`demo-copy-file`](demo-copy-file) | Demo | One file-copy program, three ways of obtaining the memory: global, heap, mapped. |
| [`01-xor-encrypt`](01-xor-encrypt) | Core | A fixed-size problem: static buffers only, and why no `malloc` is needed. |
| [`02-products`](02-products) | Core | A static array of structs, with each name `malloc`'d to a length known only at run time. |
| [`03-in-memory-db`](03-in-memory-db) | Core | A growable heap array, and the `realloc` idiom. |
| [`bonus-products`](bonus-products) | Bonus | `02-products` as an unbounded linked list, sorted on insert. |
| [`bonus-in-mem-database`](bonus-in-mem-database) | Bonus | Deletion, shrinking, and the hysteresis rule. |

The demo's three variants share one `FURTHER.md` and one `INSTRUCTOR.md`, at [`demo-copy-file/`](demo-copy-file), since the point of the demo is the comparison between them.

Each task directory contains:

* `README.md` — the tutorial: goal, background, how to build and run, and what the results mean.
* `FURTHER.md` — optional extensions and discussion points, with answers.
* `INSTRUCTOR.md` — notes for whoever runs the session.

## The through-line of the session

The session is about **who owns a piece of memory and when it is released**.

1. **`demo-copy-file`** asks the same question three ways.
   Global: the compiler decides the size and nobody cleans up.
   Heap: you decide the size at run time and you clean up, on every path.
   Mapped: the kernel provides the memory, the read/write loop disappears, and the I/O happens as page faults.
1. **`01-xor-encrypt`** is the baseline case where the question does not arise.
   Every size is fixed at compile time, so the key and buffers are static, nothing is owned, and nothing can leak — which is exactly what makes the contrast with the next exercise sharp.
1. **`02-products`** introduces the first real owner.
   The array of products is still static, but each name's length is decided by the input, so each name is `malloc`'d to fit and must be freed — one allocation, one owner, one free, on every path.
1. **`03-in-memory-db`** makes ownership dynamic.
   The `realloc` idiom exists because a failed reallocation leaves the old block alive — and the obvious one-line version of the call throws it away.
1. **`bonus-in-mem-database`** makes it symmetric, and introduces hysteresis: grow at one threshold, shrink at another, or thrash.

The recurring practical point is that **the happy path proves nothing**.
Every bug in this session lives on a path that a casual test never executes, which is why Valgrind is a required tool rather than an optional one.

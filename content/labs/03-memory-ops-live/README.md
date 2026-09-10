# Session 03: Memory Operations

This session is about moving and storing data in memory -- static buffers, the heap, and memory-mapped files -- and doing it without leaking.

* Copying data with a global buffer, a heap buffer, and `mmap`.
* Freeing every allocation on every path, including the error paths.
* Growing and shrinking a dynamic structure with `malloc` and `realloc`.
* Proving a program leaks nothing, with Valgrind.

## Learning objectives

By the end of this session you should be able to:

* Copy data using a static global buffer, a heap buffer (`malloc`/`free`), and a memory-mapped file (`mmap`), and explain the trade-offs of each.
* Free every heap allocation on every code path, including early returns and error paths.
* Build a growable in-memory data structure using `malloc` and `realloc` with a chunked growth strategy.
* Use `realloc` correctly, including what happens to your data when it fails.
* Use Valgrind to prove that a program leaks nothing.

## Prerequisites and required tools

* Session 01 and 02 concepts: the software stack, and system calls.
* Comfort with C pointers, `struct`s, and file I/O (`open`/`read`/`write` or the `<stdio.h>` equivalents).
* A Linux environment with `gcc`, `make` and `valgrind` installed.

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

Download [`03-memory-ops.zip`](https://github.com/cs-pub-ro/operating-systems-sessions/raw/lab-archives/03-memory-ops.zip), then unzip it and change into the directory it creates:

```console
wget https://github.com/cs-pub-ro/operating-systems-sessions/raw/lab-archives/03-memory-ops.zip
unzip 03-memory-ops.zip
cd 03-memory-ops/
```

Work inside that directory for the rest of the session.

## Task order

The demo comes first, solved together with the teaching assistant.
It has three variants of the same program, of increasing sophistication, worked through in order.
The core exercises are solved individually or in teams, in the numeric order shown; the bonuses are optional.

| Order | Task | Type | Objective |
| --- | --- | --- | --- |
| 1 | [`demo-copy-file/global-buffer`](demo-copy-file/global-buffer) | Demo | Copy a file through a static global buffer. |
| 2 | [`demo-copy-file/malloc`](demo-copy-file/malloc) | Demo | The same program with a heap buffer, freed on every path. |
| 3 | [`demo-copy-file/mmap`](demo-copy-file/mmap) | Demo | The same program again, with both files mapped into memory. |
| 4 | [`01-xor-encrypt`](01-xor-encrypt) | Core | XOR-encrypt a file with fixed-size static buffers — when the size is known, no `malloc` is needed. |
| 5 | [`02-products`](02-products) | Core | Sort products from a file: a fixed array of structs, but each name `malloc`'d to its own length. |
| 6 | [`03-in-memory-db`](03-in-memory-db) | Core | Build a growable in-memory database using chunked `realloc`. |
| 7 | [`bonus-products`](bonus-products) | Bonus | Redo `02-products` with a linked list that grows past any fixed limit. |
| 8 | [`bonus-in-mem-database`](bonus-in-mem-database) | Bonus | Extend `03-in-memory-db` with record deletion and capacity shrinking. |

The three core exercises are a ramp in how much is known ahead of time.
`01-xor-encrypt` uses only static allocation; `02-products` keeps a static array but allocates each name whose length it cannot know until it reads it; `03-in-memory-db` does not even know how many records there are, and must grow.
Each bonus extends the core exercise above it: `bonus-products` takes `02-products` to an unbounded linked list, and `bonus-in-mem-database` starts from **your finished `main.c`** of `03-in-memory-db`, so do those core exercises first.

Each exercise directory has a `README.md` with the task itself.
Where there is also a `FURTHER.md`, it holds optional extensions and questions to dig into once the task is done.

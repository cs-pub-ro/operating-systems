# Session 03: Memory Operations

This session is about where a program's memory comes from -- a global, the stack, the heap, the kernel -- and about giving it back without leaking.

* Copying data through a global buffer, a local buffer, a `malloc`'d buffer and an `mmap`'d one.
* Freeing every allocation on every path, including the error paths.
* Growing and shrinking a dynamic structure with `malloc` and `realloc`.
* Asking the kernel for a large, one-shot buffer directly, with `mmap`.
* Proving a program leaks nothing, with Valgrind.

## Learning objectives

By the end of this session you should be able to:

* Copy data through a static global buffer, a local buffer on the stack, a heap buffer (`malloc`/`free`) and an anonymous mapping (`mmap`/`munmap`), and explain what each one costs and when it is the right choice.
* Free every heap allocation on every code path, including early returns and error paths.
* Build a growable in-memory data structure using `malloc` and `realloc` with a chunked growth strategy.
* Use `realloc` correctly, including what happens to your data when it fails.
* Obtain a buffer sized at run time from the kernel with `mmap`, and say what that buys over `malloc`.
* Use Valgrind to prove that a program leaks nothing, and `strace` to see what the allocator asks of the kernel.

## Prerequisites and required tools

* Session 01 and 02 concepts: the software stack, and system calls.
* Comfort with C pointers, `struct`s, and file I/O (`open`/`read`/`write` or the `<stdio.h>` equivalents).
* A Linux environment with `gcc`, `make`, `valgrind` and `strace` installed.

Check that your system has all it needs for the lab, by downloading and running the [`check-prerequisites.sh` script](https://github.com/cs-pub-ro/operating-systems/blob/main/scripts/check-prerequisites.sh):

```console
wget http://raw.githubusercontent.com/cs-pub-ro/operating-systems/refs/heads/main/scripts/check-prerequisites.sh
chmod a+x check-prerequisites.sh
./check-prerequisites.sh
```

The script installs nothing.
It reports what is missing and prints the command that installs it on your distribution.

If something is missing, be sure to install and configure it.

## Getting the lab archive

Download [`03-memory-ops.zip`](https://github.com/cs-pub-ro/operating-systems/raw/lab-archives/03-memory-ops.zip), then unzip it and change into the directory it creates:

```console
wget https://github.com/cs-pub-ro/operating-systems/raw/lab-archives/03-memory-ops.zip
unzip 03-memory-ops.zip
cd 03-memory-ops/
```

Work inside that directory for the rest of the session.

## Task order

The demo comes first, solved together with the teaching assistant.
It has four variants of the same program, differing in one line each, worked through in order.
The core exercises are solved individually or in teams, in the numeric order shown; the bonuses are optional.

| Order | Task | Type | Objective |
| --- | --- | --- | --- |
| 1 | [`demo-copy-file/global-buffer`](demo-copy-file/global-buffer) | Demo | Copy a file through a static global buffer. |
| 2 | [`demo-copy-file/local-buffer`](demo-copy-file/local-buffer) | Demo | The same program with the buffer on the stack, and the limit that comes with it. |
| 3 | [`demo-copy-file/malloc`](demo-copy-file/malloc) | Demo | The same program with a heap buffer, freed on every path. |
| 4 | [`demo-copy-file/mmap`](demo-copy-file/mmap) | Demo | The same program with a buffer mapped from the kernel, unmapped on every path. |
| 5 | [`01-xor-encrypt`](01-xor-encrypt) | Core | XOR-encrypt a file with fixed-size static buffers -- when the size is known, no `malloc` is needed. |
| 6 | [`02-products`](02-products) | Core | Sort products from a file: a fixed array of structs, but each name `malloc`'d to its own length. |
| 7 | [`03-in-memory-db`](03-in-memory-db) | Core | Build a growable in-memory database using chunked `realloc`. |
| 8 | [`04-reverse-lines`](04-reverse-lines) | Core | Reverse a file's lines through one buffer as large as the file, `mmap`'d from the kernel. |
| 9 | [`bonus-in-mem-database`](bonus-in-mem-database) | Bonus | Extend `03-in-memory-db` with record deletion and capacity shrinking. |
| 10 | [`bonus-malloc-tuning`](bonus-malloc-tuning) | Bonus | Make a program five times faster by tuning `malloc`, and find the bug the speed-up uncovers. |

The four core exercises are a ramp in how much is known ahead of time, and in where the memory comes from.
`01-xor-encrypt` uses only static allocation; `02-products` keeps a static array but allocates each name whose length it cannot know until it reads it; `03-in-memory-db` does not even know how many records there are, and must grow; `04-reverse-lines` needs one block as large as its input, once, and asks the kernel for it directly.
`bonus-in-mem-database` starts from **your finished `main.c`** of `03-in-memory-db`, so do that core exercise first; `bonus-malloc-tuning` stands on its own.

Each exercise directory has a `README.md` with the task itself.
Where there is also a `FURTHER.md`, it holds optional extensions and questions to dig into once the task is done.

# Bonus: The JSON Parser With a Heap Buffer Overflow

**Tools:** GCC, Make, Valgrind, GDB

## Goal

Find a heap buffer overflow that never once affects the program's output, using Valgrind.

## Background

This directory contains a small in-memory JSON library: a recursive-descent parser, a single-line serializer, and constructor functions for building a tree by hand.
It is the kind of code you would find inside a config-file loader or a tiny RPC library.

A `json_value_t` is a tagged union: `null`, a bool, a number, a string, an array of `json_value_t*`, or an object (an ordered list of key/value members).
Collections own the values stored in them; you do not need to worry about that to find this bug, but it is worth knowing before you read the rest of the code.

Files:

* `json_value.h` — the interface: types and function prototypes.
* `json_value.c` — the implementation. **This file has one memory bug in it.**
* `main.c` — parses a well-formed document, prints it and round-trips it through the serializer, feeds the parser two different kinds of malformed input to check that they are rejected cleanly, and builds a small tree by hand with the constructor API.

The code compiles cleanly with `-Wall -Wextra`.
That will not save you here.

## Build & Run

```console
make
./jsontool
```

Look closely at the output.
It prints exactly what you would expect, start to finish, with no crash. **That is the trap.** A program that produces correct-looking output on every run you try is not automatically a correct program — some bugs corrupt memory without ever landing on a byte that changes what gets printed.

## Your Task

1. Find the bug with Valgrind.
1. Fix it.
1. Confirm the fix with both a plain run and Valgrind.

### Hints, roughly in the order you will want them

Every JSON string literal in the input (including object keys) is decoded character by character into a small growable buffer, and then handed to the caller as a fresh, NUL-terminated heap string.
Start there:

```console
valgrind ./jsontool
```

Read the very first error block Valgrind prints.
It names one function, called from several different places, that is responsible for finishing off a string buffer and handing back the final heap-allocated string.
Valgrind tells you three things about the mistake: how big the block it is writing into actually is, exactly which byte it wrote that does not fit, and the line number of the write.

Once you are looking at the right function:

* How many bytes does it ask `malloc()` for?
* How many *characters* does the string actually contain at that point (there is a field on the buffer that already tracks this)?
* Besides those characters, is there anything else this function needs to write into the block before handing it to the caller?
  A C string is not just its characters — what else does every caller of this function assume is present at the end, given that the return type is `char *` and every other part of this codebase treats it with functions like `strcmp()`, `strdup()`, `printf("%s", ...)`?

If you want to see the corruption without Valgrind's help, try `gdb` and compare the requested allocation size against how many bytes actually get written — `x/Nxb ptr` after the writes are done will show you memory beyond the block you asked for, which a plain run's "correct-looking" output will never reveal on its own.

## Check Your Work

```console
make clean && make
./jsontool
valgrind ./jsontool
```

You should see:

* the well-formed document parsed, printed and round-tripped identically through `json_serialize()`;
* both malformed documents rejected with an error message and no crash;
* the hand-built tree printed correctly;
* from Valgrind: `ERROR SUMMARY: 0 errors from 0 contexts` — no invalid reads or writes at all.

# Bonus: The Symbol Table With Two Bugs

**Tools:** GCC, Make, GDB, Valgrind

## Goal

Find and fix two memory bugs in a hash table: one that crashes the program after a removal, and one that quietly loses half of the symbols without crashing at all.

## Background

This directory holds a small hash table that maps program symbols (function and variable names) to the address they live at and the memory region that owns that address: `.text`, `.data`, `.rodata` or `.bss`.
It is the kind of structure a linker or a debugger keeps internally.

Files:

* `symbol_hash_table.h`: the interface, with the types and the function prototypes.
* `symbol_hash_table.c`: the implementation.
  **This file has two memory bugs in it.**
* `main.c`: a driver that inserts twelve symbols into a table with only 8 buckets, so that several symbols share a bucket, then looks some up, updates one, removes one, and prints the table before and after.

The code compiles cleanly with `-Wall -Wextra`.
That will not save you here.

## Your Task

Run the program on a terminal and read the whole output before touching anything.
Two things are wrong at once, and they are two different bugs.
Fix them one at a time, rebuilding and rerunning after each fix.

Before editing anything, answer these for each bug:

1. What is the symptom: a crash, wrong output, or nothing visible?
1. Which tool tells you where it happens: GDB, Valgrind, or a print?
1. Is the line the tool names where the bug is, or only where its effect shows up?

### Bug 1: the crash

The program dies in the dump after `removing g_retry_limit`.
Start with GDB: `run`, then `backtrace`.
The top frames are inside the C library, in `printf()` and `strlen()`; that is normal.
Walk down to the first frame in `symbol_hash_table.c`, move to it with `frame N`, and `print *entry`.
The entry being printed does not look like anything your code stored.

Then let Valgrind say what happened to that memory:

```console
valgrind ./symtab
```

Find the first `Invalid read` block.
It names the line that touched the memory, and the line that freed it.
Think about the two shapes a linked-list removal can take: a node in the *middle* of a chain has a previous node to relink; the *first* node of a chain has none, so something else has to change.
Does `symtab_remove()` handle both shapes?

### Bug 2: the missing symbols

Look at the first dump again.
The header says how many entries the table holds; count the symbols listed under it.
Then look at the lookups: a symbol that was inserted is reported as not found.

Every insert links the new entry in at the head of its bucket.
Open `symtab_insert()`, count the fields a new entry has, and count the ones the function sets.
`malloc()` does not zero memory, only `calloc()` does, and a field nobody set holds whatever happened to be there, which on a fresh heap is often zero and on another machine is not.
A print in `symtab_insert()` of the new entry's `next` and of the bucket head it is about to replace shows what gets lost.
Valgrind sees it earlier than anyone: its very first complaint is about an uninitialised value during the first insert, and `--track-origins=yes` says which allocation it came from.

## Build & Run

```console
make
./symtab
```

## Check Your Work

Once you believe both bugs are fixed:

```console
make clean && make
./symtab
valgrind --leak-check=full ./symtab
```

You should see all 12 inserted symbols in the first dump, grouped by bucket, with the header and the list agreeing; `compute_sum` found; 11 symbols in the second dump, with `g_retry_limit` gone and every other entry intact; and from Valgrind, `All heap blocks were freed -- no leaks are possible` and `ERROR SUMMARY: 0 errors from 0 contexts`.

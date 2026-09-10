# Exercise: The Symbol Table With Three Bugs

**Tools:** GCC, Make, GDB, Valgrind

## Goal

Find and fix three independent memory bugs in a hash table, choosing the right tool for each symptom.

## Background

This directory contains a small hash table used to look up program symbols (function and variable names) by name, returning the address they live at and which memory region owns that address: `.text` (code), `.data` (initialised globals), `.rodata` (read-only constants) or `.bss` (zero-initialised globals).
It is the kind of data structure a linker or a debugger keeps internally.

Files:

* `symbol_hash_table.h` — the interface: types and function prototypes.
* `symbol_hash_table.c` — the implementation. **This file has three memory bugs in it.**
* `main.c` — a driver that inserts a batch of symbols into a deliberately small (8-bucket) table — small enough that several symbols land in the same bucket — then looks some up, updates one, removes one, and prints the table before and after.

The code compiles cleanly with `-Wall -Wextra`.
That will not save you here.

## Build & Run

```console
make
./symtab
```

Run it.
Whatever happens, that is your starting symptom — do not skip past it.
Note whether it crashes, and if so, roughly where in the output it stopped (how much did it manage to print before dying?).

## Your Task

There are three separate bugs, and they do not all show up in the same run.
Fix them **one at a time**, in whatever order the program reveals them to you: rebuild and rerun after each fix, and let the *next* symptom guide you to the *next* bug.
Do not go hunting for all three in the source before you have reproduced the first failure — the point of this exercise is the debugging workflow, not code review.

For each bug, answer before you start editing:

1. What is the observable symptom (crash / wrong output / nothing visible at all)?
1. Which tool is going to tell you where it happens — gdb, or Valgrind?
1. What line does the tool point you to, and is that where the bug *actually* is, or just where its effects finally surface?

### Hints, roughly in the order you will want them

**Bug 1.** The very first thing the program does after inserting is print the whole table.
If it does not get there cleanly, start with gdb, not Valgrind:

```console
gdb ./symtab
(gdb) run
```

When it stops, `backtrace` to find the frame that is actually inside this program's code (some frames will be deep in `libc`, e.g. inside `printf` — keep going up with `frame N` until you recognise a function from `symbol_hash_table.c`).
Once there, look at the entry being printed: `print *entry`.
Does everything in that struct look like something *your* code could have put there?
Pay particular attention to a field nobody in `symtab_insert()` ever assigns a value to.
`malloc()` does not zero memory — only `calloc()` does.
Which of the two is used to obtain a new `symbol_entry_t`, and which fields does the insert code initialise explicitly afterwards?

The table is deliberately undersized (8 buckets, 12 symbols) so that this bug has more than one chance to occur.
If you fix it and still see something odd, check whether every symbol you inserted is actually still reachable.

**Bug 2.** Once the first bug is fixed, the program gets further before failing (or stops failing on this input entirely — that alone is informative: a bug that depends on *which* entry gets touched first is a bug about **structure**, not about a single value).
Look specifically at what happens right after the line that says `removing g_retry_limit`.
Compare the two dumps: the one before the removal and the one after.
Is the entry really gone, or does something about the table's internal bookkeeping still refer to it?

Think about the two shapes a linked-list removal can take: removing a node from the *middle* of a chain (relinking one neighbour) versus removing the *first* node of a chain (there is no earlier neighbour to relink — something else has to be updated instead).
Does `symtab_remove()` handle both shapes, or does it quietly assume there is always a "previous" node?

`valgrind` is very good at this class of bug — try:

```console
valgrind ./symtab
```

and read the *first* invalid-access report closely: it names the exact line that freed the block, and the exact line that touched it afterwards.

**Bug 3.** Once the first two are fixed, the program should run to completion and print what looks like a perfectly correct table, before and after the removal.
Do not stop there:

```console
valgrind --leak-check=full ./symtab
```

Read the leak report as a sentence: *something* was allocated at a specific line and was never freed by the time the program exited.
Ask what happens, memory-wise, to a symbol's name when that symbol is removed from the table — list every heap block that belongs to a `symbol_entry_t` and check that each one has exactly one matching `free()` somewhere in `symtab_remove()` and in `symtab_destroy()`.

## Check Your Work

Once you believe all three are fixed:

```console
make clean && make
./symtab
valgrind --leak-check=full ./symtab
```

You should see:

* every one of the 12 inserted symbols in the first dump, correctly grouped by bucket, with no crash;
* 11 symbols in the second dump, with `g_retry_limit` gone and every other entry — including its former bucket-mates — intact;
* from Valgrind: `All heap blocks were freed -- no leaks are possible` and `ERROR SUMMARY: 0 errors from 0 contexts`.

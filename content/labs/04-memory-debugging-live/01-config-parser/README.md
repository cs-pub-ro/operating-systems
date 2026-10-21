# Exercise: The Config Parser That Forgets

**Tools:** GCC, Make, Valgrind

## Goal

Find and fix two memory leaks in a program whose output is correct, by reading a Valgrind report and working out who owns each heap block.

## Background

`main.c` reads a configuration file of `key = value` lines, such as `config.txt`, then looks up a few keys and prints their values.
It keeps a copy of every key and every value on the heap.
`config_get()` returns a fresh copy of a value too, so that the caller can keep it for as long as it likes.

That is three places where heap memory is allocated, and every block has an owner: the one responsible for freeing it.
The comments in `main.c` say who that is in each case.
Two of the owners are not doing their job.

This is the demo's leak again, in a program with more than one allocation to keep track of.

## Your Task

1. Build the program and run it under Valgrind with `--leak-check=full`.
   There are two loss records, with two different stack traces.
   For each one, write down which function allocated the lost blocks and how many blocks were lost.
1. For each record, find the owner of those blocks and the place where that owner should have freed them.
   Count the settings in `config.txt` and the lookups in `main()`: the block counts tell you which record is which.
1. Fix both leaks, rebuild, and run Valgrind again.
   The output of the program must not change.

## Build & Run

```console
make
./config config.txt
valgrind --leak-check=full ./config config.txt
```

## Check Your Work

Valgrind must end with `All heap blocks were freed -- no leaks are possible` and `ERROR SUMMARY: 0 errors from 0 contexts`, and the program must print the same lines as before.

Try other inputs as well:

```console
printf 'a = 1\nb = 2\n' > small.txt && valgrind --leak-check=full ./config small.txt
printf '# nothing here\n' > empty.txt && valgrind --leak-check=full ./config empty.txt
```

One of the keys that `main()` looks up is not in `config.txt`, and `config_get()` returns `NULL` for it.
Make sure your fix handles that case, and find out whether it needs any special treatment at all; `man 3 free` has the answer.

# Bonus: Cross Two Structs (heap-havoc)

**Tools:** nc, GDB, objdump

A program takes two names as command-line arguments and copies each onto the heap.
Overflowing the first name reaches into the *second* name's struct, where a function pointer sits that nobody checks before calling.

## Goal

Overflow out of one heap object, across into the next struct, and set a callback so the program calls a hidden `winner()` function that prints the flag.

## Background

The program allocates two `struct internet` objects back-to-back on the heap.
Each has an 8-byte `name` buffer, and the program copies `argv[1]` and `argv[2]` into them with `strcpy()`, which has no length check.
Each struct ends with a `callback` function pointer that `main()` calls if it is not NULL; both start NULL.
A `winner()` function prints the flag, and nothing in the normal flow ever points a callback at it.

This binary is **32-bit**, so every field and pointer is 4 bytes.

## Your Task

1. Work out the layout of `struct internet`, and the distance from the first `name` buffer to the second struct's `callback` field.
1. Find `winner()`'s address with `objdump -d` or `nm` (the binary is not a PIE, so it is fixed).
1. Build `argv[1]` so the overflow lands `winner()`'s address on the second struct's `callback`.
   One field in between is the second struct's `name` pointer, which `main()` passes to `strcpy()` *after* your overflow, so it must stay a valid writable address.
1. Capture the flag locally, then against the remote service.

## Build & Run

Locally, pass the two names as arguments:

```console
./chall <name1> <name2>
```

A placeholder `flag.txt` is included so this works out of the box; it is not the real flag.

The deployed service cannot take `argv` over a socket, so it reads two lines from you and re-execs the binary with them as `argv[1]` and `argv[2]`.
Connect with netcat and send your two arguments as two lines:

```console
nc 141.85.224.106 31020
```

Because `argv[1]` contains raw address bytes, build it with `solve/solve.sh` or `solve/exploit.py` rather than typing it.

## Check Your Work

You have solved it when `winner()` runs and prints the flag, instead of "No winners this time".
Be ready to explain why the second struct's `name` field had to hold a valid writable address rather than filler.

Submit the flag: <https://ctf.security.cs.pub.ro/so>

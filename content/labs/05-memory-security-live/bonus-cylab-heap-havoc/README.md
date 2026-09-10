# Bonus: Cross Two Structs (heap-havoc)

**Tools:** GDB, objdump, pwntools

A seemingly harmless program takes two names as arguments, but there's a catch.
Overflowing one name on the heap can reach into the *other* name's struct — and one of its fields is a function pointer nobody ever checks before calling.

## Goal

Overflow out of one heap object, across into the next struct, and set a callback field so the program calls a hidden `winner()` function.

The service is deployed at `141.85.224.106:31020`.
## Background

The program allocates two `struct internet` objects back-to-back on the heap, each with an undersized 8-byte name buffer, and copies `argv[1]`/`argv[2]` into them with `strcpy()` — no bounds check.
Each struct has a `callback` function pointer that `main()` calls if it is non-NULL, and both start out NULL.
There is a `winner()` function that prints the flag; nothing in the visible control flow ever sets a callback to it.

This binary is **32-bit**, so struct fields and pointers are 4 bytes.

## Your Task

1. Work out the layout of `struct internet` and the distance from the first name buffer to the second struct's `callback` field.
1. Find `winner()`'s address with `objdump -d`.
1. Craft `argv[1]` so its overflow lands `winner()`'s address in the second struct's `callback`.
   Mind the fields in between — one of them is a pointer the program dereferences with `strcpy()` *after* your overflow, so it must stay valid.
1. Capture the flag locally, then against the remote service.

## Build & Run

```console
./chall <name1> <name2>
```

It reads `flag.txt` from the current directory; create a placeholder to test locally.
The deployment cannot take `argv` over a socket, so it reads two lines from you and re-execs the binary with them — send your two arguments as two lines.

## Check Your Work

You have solved it when `winner()` runs and prints the flag, instead of "No winners this time".
Have an explanation ready for why the field between the overflow start and the callback had to hold a valid writable address rather than filler.

Submit the flag:

- Link SO CTF: https://ctf.security.cs.pub.ro/so/challenges#bonus-cylab-heap-havoc-7
- Link CyLab Academy: <https://learn.cylabacademy.org/library/763>

# Exercise: Use-After-Free (heap-3)

**Tools:** GDB, pwntools

This program frees memory and then keeps using it. Can you turn that into a flag?

## Goal

Make the allocator hand you back a chunk the program still points to, and write through it to set a field you are not supposed to control.

## Background

The program keeps one heap object `x` with a `flag` field that must read `"pico"` to win.
It starts as `"bico"`, and there is no overflow anywhere.

The trick is in two menu options:

* *Free x* frees `x` but never clears the pointer, so `x` still points at the freed chunk.
* *Allocate object* asks you for a size, allocates a chunk of that size, and reads a string into it.

If you free `x` and then allocate a chunk of the **same size**, glibc's tcache hands the same memory straight back.
Your string now lands inside the object `x` still points at, so you can write its `flag` field.

## Your Task

1. Read `struct object` in `chall.c` and work out its size, so your allocation reclaims the freed chunk.
1. Free `x`, then allocate a same-sized chunk and write bytes that place `"pico"` exactly where the `flag` field sits.
1. Run the win check and read the flag, locally first, then on the server.

## Build & Run

Run it locally:

```console
./chall
```

It reads `flag.txt` from the current directory.
A placeholder `flag.txt` is included so this works right away; it is not the real flag.

Connect to the deployed service with netcat and type the same menu choices:

```console
nc 141.85.224.106 31013
```

## Check Your Work

You have solved it when the win check reads `"pico"` out of the reclaimed chunk.
Be ready to explain *why* the allocator returned the same address: the order of free-then-allocate and the matching size are the whole trick.

Submit the flag: <https://ctf.security.cs.pub.ro/so>

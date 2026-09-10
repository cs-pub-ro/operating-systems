# Exercise: Use-After-Free (heap-3)

**Tools:** GDB, pwntools

This program mishandles memory — can you exploit it to get the flag?

## Goal

Exploit a use-after-free: make the allocator hand you back a chunk the program is still using, and write through it to reach a field you are not supposed to control.

The service is deployed at `141.85.224.106:31013`.

## Background

The program keeps a heap object `x` with a `flag` field that must read `"pico"` to win — and it starts as `"bico"`.
There is no overflow here.
Instead, the *Free x* menu option frees `x` but never clears the pointer, and every other option keeps using it.

The *Allocate object* option lets you request a chunk of your own chosen size and write a string into it.
If that request matches the size class of the object you just freed, glibc's tcache hands the same memory straight back — and now your write lands inside the object `x` still points at.

## Your Task

1. Work out the size of the object (read the struct in `chall.c`), so your allocation reclaims the freed chunk.
1. Free `x`, allocate a same-sized chunk, and write bytes that place `"pico"` exactly where the `flag` field sits.
1. Trigger the win check and capture the flag, locally then remotely.

## Build & Run

```console
./chall
```

It reads `flag.txt` from the current directory; create a placeholder to test locally.

## Check Your Work

You have solved it when the win check reads `"pico"` out of the reclaimed chunk.
Be ready to explain *why* the allocator returned the same address — the order of free-then-allocate and the size class are the whole trick.

Submit the flag:

- Link SO CTF: https://ctf.security.cs.pub.ro/so/challenges#04-cylab-heap-3-6
- Link CyLab Academy: <https://learn.cylabacademy.org/library/440>

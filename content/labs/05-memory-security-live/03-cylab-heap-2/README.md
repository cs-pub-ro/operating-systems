# Exercise: Hijack a Function Pointer (heap-2)

**Tools:** GDB, objdump, pwntools

Can you handle function pointers?

## Goal

Overflow into a value the program later *calls*, and redirect execution to a function that hands you the flag.

The service is deployed at `141.85.224.106:31012`.

## Background

The same writable buffer sits next to a second heap buffer `x`.
There is a `win()` function in the binary that reads the flag, but nothing ever calls it.
`check_win()` does something more interesting than a comparison: it reads four bytes out of `x` and calls them as a function pointer.

So the bytes you spill into `x` are not data that gets checked — they are an address that gets executed.

## Your Task

1. Find `win()`'s address (`objdump -d`, `nm`, or pwntools' `ELF.symbols`).
1. Overflow `input_data` into `x`, ending with `win()`'s address in the right byte order.
1. Trigger the indirect call and capture the flag, locally then remotely.

## Build & Run

```console
./chall
```

It reads `flag.txt` from the current directory; create a placeholder to test locally.

## Check Your Work

You have solved it when calling *Print Flag* jumps into `win()` and the flag appears.
If it crashes instead, inspect the bytes that ended up in `x` — the byte order of the address is the usual culprit, and worth confirming with the teaching assistant.

Submit the flag:

- Link SO CTF: https://ctf.security.cs.pub.ro/so/challenges#03-cylab-heap-2-5
- Link CyLab Academy: <https://learn.cylabacademy.org/library/435>

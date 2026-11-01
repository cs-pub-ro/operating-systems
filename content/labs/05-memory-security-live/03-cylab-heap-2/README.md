# Exercise: Hijack a Function Pointer (heap-2)

**Tools:** GDB, objdump, pwntools

## Goal

Overflow into a value the program later *calls*, and send it to a function that prints the flag.

## Background

This is the same overflow as before, with a sharper target.
A writable buffer sits right next to a second heap buffer, `x`.
The program has a `win()` function that reads the flag, but nothing ever calls it.

The twist is in `check_win()`: it does not compare `x` to anything.
It reads four bytes out of `x` and calls them as a function pointer.
So the bytes you spill into `x` are not data that gets checked — they are an address that gets run.

Win by making those four bytes equal the address of `win()`.
Because an address is raw bytes in a specific order, not a word you can type, drive this one with the shell script or the pwntools script rather than by hand.

## Your Task

1. Find `win()`'s address with `nm chall` or `objdump -d chall`.
   The binary is not a PIE, so this address is fixed.
1. Overflow the input buffer into `x`, ending with `win()`'s address in little-endian order.
1. Trigger the call (the *Print Flag* option) and capture the flag, locally first, then remotely.

## Build & Run

Run it locally against the included placeholder `flag.txt`:

```console
./chall
```

Connect to the deployed service with netcat:

```console
nc 141.85.224.106 31012
```

## Check Your Work

You have solved it when *Print Flag* jumps into `win()` and the flag appears.
If it crashes instead, look at the four bytes that landed in `x`: the byte order of the address is the usual culprit, and worth confirming with the teaching assistant.

Submit the flag: <https://ctf.security.cs.pub.ro/so>

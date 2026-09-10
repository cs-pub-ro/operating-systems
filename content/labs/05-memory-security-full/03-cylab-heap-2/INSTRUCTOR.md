# Instructor Notes: Hijack a Function Pointer (heap-2)

## Purpose

The pivot of the session: from overwriting *data* to overwriting *code addresses*.
Everything up to here changed a value; here the value is called.

## Expected solution

```python
b"A" * 32 + p64(exe.symbols["win"])
```

## What to check for

* They found `win()` from the binary, not by guessing.
* They used `p64()`/`p32()` and can explain endianness — this is the exercise where it bites.
* They understand `check_win()` is an indirect call, not a comparison.

## Common stumbles

* Hand-typing the address in the wrong byte order — the number-one failure. Point them at `p64()`.
* Expecting to have to match a string (habit from heap-0/1). There is nothing to match; supply an address.
* A wrong address crashes rather than prints; have them run under `gdb` and read `$rip`.

## Verified values

* Distance 32 bytes; payload `b"A" * 32 + p64(win)`. Deploy port 31012.
* The exploit needs the binary present even for remote solves, to read `win` from the symbol table.
* Last run: green locally and against a local deployment.

## Practical notes

* Built `-no-pie` specifically so `win()`'s address is a stable constant — say why, because heap-mayhem later removes that crutch.
* Compiling the source emits an int-to-pointer-cast warning on the `check_win()` line; that is inherent to the challenge, not a build problem.

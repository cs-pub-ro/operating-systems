# Instructor Notes: Cross Two Structs (heap-havoc)

## Purpose

A bonus, and the first challenge where the overflow leaves one object and lands inside another struct several fields deep.
Also the only 32-bit binary in the session, and the only one driven by `argv`.

## Expected solution

```python
payload = b"A"*16 + b"B"*4 + p32(bss_addr) + p32(winner_addr)   # argv[1]
argv2   = b"x"
```

`bss_addr` and `winner_addr` come from the ELF.

## What to check for

* They measured the 16-byte `i1->name`-to-`i2` distance (gdb), not guessed it.
* They realised `i2->name` must be a valid writable address, and can say why (the later `strcpy`).
* They found `winner()` in the symbol table.

## Common stumbles

* Filling `i2->name` with `"A"`s, so the post-overflow `strcpy(i2->name, argv[2])` segfaults before the callback fires.
* 32-bit vs 64-bit confusion — using `p64` or 8-byte field spacing.
* Trying to pass argv over a raw socket; the deployment needs the two-line wrapper protocol.

## Verified values

* Offsets: filler 16, `priority` +16, `name` +20, `callback` +24 (from `i1->name`). Deploy port 31020.
* Remote input protocol: two newline-terminated lines (name1, name2), consumed by `wrapper.sh`.
* Last run: green locally (argv) and would use the two-line protocol against a deployment.

## Practical notes

* 32-bit build: the build image installs `gcc-multilib` and ships the 32-bit `libc.so.6` + `ld-linux.so.2`. No host 32-bit toolchain needed.
* Non-PIE, no canary — so `winner()` and `.bss` are fixed addresses.
* Most groups take this home; it is a genuine exploit-dev exercise, not a five-minute win.

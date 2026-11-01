# Bonus: Cross Two Structs (heap-havoc) — Solution

**Tools:** nc, GDB, objdump, pwntools

This is the solving write-up, for a challenge that is already deployed.
How the challenge is built and deployed is in [`README.chall.md`](README.chall.md).
This binary is **32-bit**.

## Goal

Overflow out of one heap object, across into the *next struct* several fields deep, and set a function pointer nobody guards to `winner()`, which prints the flag.

## The bug

```c
struct internet {
        int priority;           /* offset 0 */
        char *name;             /* offset 4 */
        void (*callback)(void); /* offset 8 */
};
```

`main()` allocates two of these, each with an 8-byte `name` buffer, and copies `argv[1]`/`argv[2]` into the names with `strcpy()` — no bounds check.
It then calls each `callback` if it is non-NULL; both start NULL.
`winner()` prints the flag and is never called from the visible control flow.

`i1`, `i1->name`, `i2`, and `i2->name` are allocated back-to-back in that order, so `i1->name`'s chunk is immediately followed by `i2`'s struct.
Overflowing `argv[1]` past `i1->name` therefore runs into `i2->priority`, `i2->name`, and `i2->callback` in turn — 4 bytes each on this 32-bit build.

## Building argv[1]

Measured in `gdb` (breakpoint after the four `malloc()`s, comparing `i2` against `i1->name`): `i2`'s struct starts exactly **16 bytes** after the start of `i1->name`'s buffer.
So `argv[1]` is:

```text
16 bytes filler           -- reaches the start of i2
 4 bytes filler           -- i2->priority, contents irrelevant
 4 bytes writable address -- i2->name (must stay valid: main() runs
                             strcpy(i2->name, argv[2]) after the overflow)
 4 bytes winner()'s addr  -- i2->callback
```

For `i2->name` any always-mapped writable address works; the reference solution reuses the binary's own `.bss` start.
`argv[2]` just needs to be short — it is written harmlessly to that `.bss` address.
Both `winner()` and `.bss` are fixed, because the binary is not a PIE; read them from the binary with `nm chall` and `readelf -S chall`.

## Delivering argv over the network

A bare TCP socket carries no `argv`, so the deployed `wrapper.sh` reads two lines from the connection and re-execs the binary with them as `argv[1]`/`argv[2]`.
Locally you pass them as real arguments; remotely you send them as two lines.

## Solving it

Because `argv[1]` is mostly raw address bytes, it is not practical to type by hand — build it with a script.

### By hand, the idea

1. `nm chall` gives `winner()`; `readelf -S chall` gives the `.bss` address.
1. Assemble `argv[1]` = 16 filler + 4 filler + `.bss` (little-endian) + `winner` (little-endian), and `argv[2]` = `x`.
1. Locally: `./chall "$argv1" x`. Remotely: connect with `nc 141.85.224.106 31020` and send `argv[1]` then `argv[2]` as two lines.

### Shell script

`solve/solve.sh` reads the two addresses out of the binary and builds the bytes with `printf`:

```console
./solve.sh                       # local, via the shipped 32-bit loader
./solve.sh 141.85.224.106 31020  # the deployed service (sends two lines)
```

### pwntools

`solve/exploit.py` does the same in Python, using `ELF` to read `winner` and `.bss`:

```console
python3 exploit.py                                   # local ./chall
python3 exploit.py REMOTE HOST=141.85.224.106 PORT=31020
```

## References

* `man 1 objdump`, `man 1 nm`, `man 3 strcpy`
* [pwntools packing helpers](https://docs.pwntools.com/en/stable/util/packing.html)

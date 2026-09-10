# Exercise: Overflow a Heap Buffer (heap-0)

**Tools:** GDB, pwntools, Docker

## Goal

Reference solution for heap-0.
The challenge is the simplest possible heap overflow: two heap buffers sit next to each other, one is writable without a length check, and writing past it corrupts the other.

## Background

`init()` allocates two adjacent 5-byte buffers:

```c
input_data = malloc(INPUT_DATA_SIZE);   /* "pico" */
safe_var   = malloc(SAFE_VAR_SIZE);     /* "bico" */
```

`safe_var` is the target.
The win condition is inverted on purpose — `check_win()` prints the flag as soon as `safe_var` is anything other than its starting value `"bico"`, and nothing in the program ever assigns to it:

```c
if (strcmp(safe_var, "bico") != 0) {
        /* print the flag */
}
```

## The bug

`write_buffer()` copies player input into `input_data` with `scanf("%s", input_data)`, which stops at whitespace, never at `INPUT_DATA_SIZE`.
glibc rounds the 5-byte request up to a minimum usable chunk (0x20 bytes of usable space on a 64-bit build), so anything written past that spills straight into the chunk the allocator placed next: `safe_var`.

## The exploit

The program's *Print Heap* option prints both addresses; their difference is the number of bytes to reach `safe_var`:

```text
input_data @ 0x...2b0
safe_var   @ 0x...2d0     (delta = 0x20 = 32 bytes)
```

So 32 filler bytes reach `safe_var`, and anything non-empty after that overwrites `"bico"`:

```python
OVERFLOW_PAYLOAD = b"A" * 32 + b"XXXX"
```

Write it (menu option 2), then check the win condition (option 4).
`solve/exploit.py` does exactly this, against a local `./chall` or a remote target.

## Build, run and solve

The only requirement for the whole pipeline is **Docker**; no host compiler or pwntools install is needed.
Each stage has its own README — follow them in order:

* **`build/`** — compiles `chall` in a reproducible Debian image and copies out the exact `libc.so.6` and loader it linked against. Heap layout is an allocator detail, so the matching libc ships with the binary.
* **`publish/`** — zips the binary and its libc/loader into the archive players receive.
* **`deploy/`** — serves the binary under `xinetd`, exposed on port `31010`.
* **`solve/`** — runs `exploit.py` locally, against a local deployment, or against a remote target.

The `flag` in this directory is copied into the container as `flag.txt` at deploy time; the program reads it with `fopen("flag.txt", ...)` relative to its working directory.

## References

* `man 3 scanf` — `%s` and why it needs a field width
* `man 3 malloc` — chunk sizes and rounding
* [pwntools documentation](https://docs.pwntools.com/)
* Original challenge: <https://learn.cylabacademy.org/library/438>

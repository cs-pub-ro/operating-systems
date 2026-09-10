# Exercise: Hijack a Function Pointer (heap-2)

**Tools:** GDB, objdump, pwntools, Docker

## Goal

Reference solution for heap-2.
This is where a heap overflow stops corrupting *data* and starts choosing *code*: the byte you overwrite is dereferenced and called.

## Background

There is a `win()` function that prints the flag, and nothing calls it.
`check_win()` does not compare anything — it reads four bytes out of the heap buffer `x` and calls them as a function pointer:

```c
static void check_win(void)
{
        ((void (*)(void))*(int *)x)();
}
```

`x` starts out holding `"bico"`, which as an address is garbage, so calling `check_win()` unmodified just crashes.

## The bug

`x` sits right after `input_data`, which `write_buffer()` fills with an unbounded `scanf("%s", input_data)`.
Overflowing `input_data` writes into `x` — and whatever bytes land there are what `check_win()` calls.

## The exploit

Same 32-byte distance as heap-0/heap-1 to reach `x`, followed by the address of `win()`, packed little-endian to match x86-64 byte order:

```python
OVERFLOW_PAYLOAD = b"A" * 32 + p64(WIN_ADDR)
```

`WIN_ADDR` comes straight from the binary's symbol table (`ELF("chall").symbols["win"]`); the binary is built `-no-pie`, so that address is a fixed constant across runs.
The exploit therefore needs the binary present even for a remote solve, to read the symbol.
Endianness is the whole subtlety: a hand-typed address is wrong, `p64()` is right.
See `solve/exploit.py`.

## Build, run and solve

Docker is the only requirement.
Four-stage pipeline — `build/` (`-no-pie`, so `win()`'s address is stable) → `publish/` → `deploy/` (port `31012`) → `solve/`.
The `flag` here is copied into the container as `flag.txt` at deploy time.

## References

* `man 1 objdump`, `man 1 nm`
* [pwntools ELF](https://docs.pwntools.com/en/stable/elf/elf.html)
* Original challenge: <https://learn.cylabacademy.org/library/435>

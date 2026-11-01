# Exercise: Hijack a Function Pointer (heap-2) — Solution

**Tools:** nc, GDB, objdump, pwntools

This is the solving write-up, for a challenge that is already deployed.
How the challenge is built and deployed is in [`README.chall.md`](README.chall.md).
This is where a heap overflow stops corrupting *data* and starts choosing *code*: the bytes you overwrite are dereferenced and called.

## Goal

Overflow `input_data` into the buffer `x`, set `x`'s first four bytes to the address of `win()`, and have the program call it for you.

## The bug

There is a `win()` function that prints the flag, and nothing calls it.
`check_win()` does not compare anything — it reads four bytes out of the heap buffer `x` and calls them as a function pointer:

```c
static void check_win(void)
{
        ((void (*)(void))*(int *)x)();
}
```

`x` sits right after `input_data`, which `write_buffer()` fills with an unbounded `scanf("%s", input_data)`.
Overflowing `input_data` writes into `x`, and whatever bytes land there are what `check_win()` calls.
`x` starts out holding `"bico"`, which as an address is garbage, so calling the option unmodified just crashes.

## Finding the pieces

Two numbers, both fixed:

* **The distance to `x` is 32 bytes**, the same as heap-0/heap-1 (both buffers are `malloc(5)`). *Print Heap* prints the two addresses; subtract to confirm.
* **`win()`'s address is a constant**, because the binary is built `-no-pie`:

  ```console
  nm chall | grep ' win$'
  objdump -d chall | grep '<win>:'
  ```

`check_win()` reads a 4-byte `int`, and `scanf` writes a terminating NUL after your bytes, so the address's high zero byte is supplied for free: you only need the low three bytes, little-endian.

## Solving it

Write 32 filler bytes followed by `win()`'s address (menu option 2), then trigger the call (option 4).

### By hand, over nc

```console
nc 141.85.224.106 31012
```

The idea is: option `2`, then 32 `A`s followed by `win()`'s address in little-endian byte order, then option `4`.
An address contains non-printable bytes you cannot type reliably, so emit them with a tool rather than by keyboard — that is exactly what the two scripts below do.

### Shell script

`solve/solve.sh` reads `win()` out of the binary with `nm`, packs it little-endian with `printf`, and sends the payload:

```console
./solve.sh                       # against a local ./chall (uses the placeholder flag.txt)
./solve.sh 141.85.224.106 31012  # against the deployed service
```

### pwntools

`solve/exploit.py` does the same with `ELF.symbols["win"]` and `p64()`:

```console
python3 exploit.py                                   # local ./chall
python3 exploit.py REMOTE HOST=141.85.224.106 PORT=31012
```

Both need the binary present even for a remote solve, to read `win()`'s address from its symbol table.
Endianness is the whole subtlety: a hand-typed address is wrong, `p64()` (or the script's `printf`) is right.

## References

* `man 1 objdump`, `man 1 nm`
* [pwntools ELF](https://docs.pwntools.com/en/stable/elf/elf.html)

# Bonus: Plugging `_putchar()` Into a Custom `printf`

**Tools:** GCC, Make, strace

## Goal

Reference solution for the `_putchar()` hook.
The exercise is three lines of code; the content is what those three lines reveal about how a formatting library is separated from the operating system.

## Background

The vendored [mpaland/printf](https://github.com/mpaland/printf) library is a complete, self-contained `printf` designed for embedded systems with no libc.
It implements all the formatting itself — integer conversion, padding, its own float-to-string routine — and depends on nothing.

It cannot, however, get a character out of the process, and it does not try.
It delegates that to one hook the user supplies:

```text
printf() / sprintf() / ...
        |
        v
   _putchar(c)          <-- the porting layer
        |
        v
  write(1, &c, 1)
        |
        v
      kernel
```

The library lives in `../../02-os-interface-work/bonus-printf/utils/printf/`; a single copy is kept in the work directory rather than duplicated here, and this directory's `Makefile` points at it.

## Build & Run

```console
make
./printfdemo
```

```text
Hello, World!
Decimal:     42
Negative:    -7
Hex:         0xdeadbeef
Octal:       0755
Padded:              42
Left-align:  42        |
Zero-pad:    00000042
String:      operating systems
Char:        A
Float:       3.1416
```

## Results and Explanations

### `_putchar()`

The entire implementation is a single `write(2)` call:

```C
void _putchar(char character)
{
	write(1, &character, 1);
}
```

* **`1`** — the file descriptor for stdout.
* **`&character`** — `write` needs a *pointer* to the bytes to send.
  `character` is a local parameter; taking its address is legitimate and the pointer stays valid for the duration of the call.
  Passing `character` itself compiles (with a warning at best) and produces garbage, because the character value gets interpreted as an address.
* **`1`** — exactly one byte.

This is the minimal glue connecting a fully self-contained library to the operating system.
The library handles all formatting internally; the OS sees only a stream of individual byte writes.

### One system call per character

```console
$ strace -e trace=write ./printfdemo 2>&1 >/dev/null | grep -c '^write'
225
$ ./printfdemo | wc -c
225
```

Exactly one `write` per character produced — 225 system calls to print eleven lines.

This is the worst case measured in the session 01 `printf` vs `write` demo, reproduced deliberately.
A `write` costs roughly the same whether it carries 1 byte or 4096; the expense is in making the call.
libc's `printf` would have done this in a single call.

That is not a criticism of the library.
Its target is a microcontroller writing to a UART, where there is no kernel to cross, output is genuinely a byte at a time, and code size matters more than throughput.
Buffering can be added in `_putchar()` by whoever needs it — see `FURTHER.md`.

### Inversion of control

The interesting design point is that the library does not call the operating system; it calls **you**, and you decide what "output" means.

The same `printf.c`, unmodified, runs:

* on a microcontroller, with `_putchar()` writing to a serial port register;
* in a test harness, with `_putchar()` appending to an in-memory buffer;
* here, with `_putchar()` issuing a system call.

One function is the entire porting layer.
libc fuses formatting and output behind `FILE *`, which is convenient but is precisely why libc's `printf` is hard to port.

Note also that `sprintf()` and `snprintf()` from the same library do **not** call `_putchar()` at all — they write into a caller-supplied buffer, so they need no porting layer whatsoever.

## References

* [mpaland/printf](https://github.com/mpaland/printf) — the vendored library, MIT licensed
* `man 2 write`
* `man 3 setvbuf` — the buffering this implementation deliberately does not have

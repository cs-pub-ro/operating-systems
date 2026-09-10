# Instructor Notes: Plugging `_putchar()` Into a Custom `printf`

## Purpose

The code is one line.
The exercise exists for what that line reveals: a formatting library and an output mechanism are separable, and the separation is a single function.

Because it is so short, it is a good task to hand to someone who has finished everything else, or to assign as take-home reading.

## Expected answer

```C
void _putchar(char character)
{
	write(1, &character, 1);
}
```

## Where the vendored library lives

`printf/` (mpaland/printf, MIT licensed) is kept in **one** place — the work directory — rather than duplicated.
The `Makefile` here points at `../../02-os-interface-work/bonus-printf/utils/printf`.
The upstream `test/` directory was removed: it is a 517 kB C++ Catch harness that nothing in this session builds.

If you re-vendor the library from upstream, keep `LICENSE`.

## Common mistakes

* **Passing `character` instead of `&character`.**
  Compiles with a warning; `strace` shows `write(1, 0x48, 1) = -1 EFAULT`, because the character's *value* is being used as an address.
  A very clean demonstration of what a pointer argument actually is.
* **Writing 2 bytes instead of 1** — reads one byte past the parameter and emits garbage.
* **Trying to `#include <stdio.h>`** and getting a conflict with the library's own `printf` declaration.
  The whole point is that libc's stdio is not involved.

## Points to hammer

* **Inversion of control.**
  The library does not call the operating system; it calls *you*.
  The same `printf.c` runs on a microcontroller writing to a UART, in a test harness capturing to memory, and here issuing a system call.
  One function is the entire porting layer.
* **One system call per character.**
  Measured: 225 `write` calls for 225 characters of output.
  libc's `printf` does the same job in one.
  This is the worst case from session 01's demo, reproduced deliberately — and it is the right trade for the library's actual target, where there is no kernel to cross and code size dominates.
* **`sprintf()` and `snprintf()` never call `_putchar()`.**
  They write into a caller-supplied buffer, so they need no porting layer at all.
  This is the cleanest way to make the separation concrete.

## Worth demonstrating if there is time

Adding a 4096-byte buffer to `_putchar()`, flushed when full and via `atexit()`, collapses **225 calls to 1** (measured).
That is stdio rebuilt by hand in about eight lines — and it recreates stdio's problem too: output still in the buffer when the process dies is lost.
`atexit()` covers a normal exit but not a crash, which is exactly why `stderr` is unbuffered.

## Practical notes

* Students may use libc's `write()` or their own `my_write()` from the demo.
  The latter removes libc from the output path entirely and is a nice callback; `nm printfdemo | grep write` confirms it.
* Nothing here is timing-sensitive.
* The library's own `README.md` is upstream documentation and is worth a look for the `PRINTF_DISABLE_SUPPORT_*` compile-time switches.

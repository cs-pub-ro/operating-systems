# Going Further: Plugging `_putchar()` Into a Custom `printf`

## Things to try

1. **Count the writes.**
   225 `write` calls for 225 characters of output — exactly one per character.
   libc's `printf` would have used one call for the whole run.

1. **Add a buffer.**
   A static 4096-byte buffer in `_putchar()`, flushed when full and again before `main` returns, collapses 225 calls to 1.
   This is stdio rebuilt by hand, and it recreates stdio's problem too: output still in the buffer when the process dies is lost.
   Registering the flush with `atexit()` handles a normal exit but not a crash — which is precisely why `stderr` is unbuffered.

1. **Route it through your own syscall wrapper.**
   Replacing libc's `write()` with `my_write()` from the demo removes libc from the output path entirely.
   `nm printfdemo | grep write` confirms it, and `strace` shows the same calls.

1. **Try the other entry points.**
   `sprintf()` and `snprintf()` write into a caller-supplied buffer and never call `_putchar()` at all — no porting layer is needed for them.
   Only the `printf`/`vprintf` family does.

1. **Break it deliberately.**
   Passing `character` instead of `&character` compiles with a warning and makes `write` treat the character's *value* as an address: `strace` shows `write(1, 0x48, 1) = -1 EFAULT`.
   Writing 2 bytes instead of 1 reads one byte past the parameter and emits garbage.

## Questions to answer

* **Why the address of a `char` rather than the `char`?**
  `write` takes a pointer to a buffer plus a length; it has no single-byte form.
  Taking the address of the local parameter is legitimate and the pointer stays valid for the duration of the call.

* **What must a dependency-free `printf` implement itself?**
  Integer-to-string conversion in several bases, field width and padding, and its own float formatting (`ftoa`) — normally the single largest and trickiest part.
  It cannot use `malloc`, so everything goes through fixed-size stack buffers.

* **Why would an embedded system prefer it?**
  Predictable, small code size; no libc dependency; no heap allocation; and features can be compiled out entirely with `PRINTF_DISABLE_SUPPORT_FLOAT` and friends.
  libc's `printf` can pull in 20 kB or more and assumes a heap and a `FILE` layer.

* **`_putchar()` ignores `write`'s return value. When does that matter?**
  When the write is short or fails — a full pipe, a closed descriptor, a disk error.
  A robust version would retry on `EINTR` and report or record failure.
  The `_putchar` signature returns `void`, so there is nowhere to report it: a real limitation of this interface.

## Discussion points

* **Inversion of control is the lesson.**
  The library does not call the operating system; it calls *you*.
  The same `printf.c` runs on a microcontroller writing to a UART, in a test harness capturing to memory, and here issuing a system call.
  One function is the entire porting layer.
* **The performance shape is session 01 inverted.**
  Unbuffered output means one system call per character, and the cost is in making the call.
  This design chooses portability and small size over throughput — the right trade for its target, and the wrong one here.
* **Formatting and output are genuinely separable concerns.**
  libc fuses them behind `FILE *`, which is convenient and is also why libc's `printf` is hard to port.
* **`sprintf` needing no hook** is a good way to make the separation concrete.

## References

* [mpaland/printf](https://github.com/mpaland/printf) — the vendored library, MIT licensed
* `man 2 write`, `man 3 errno`
* `man 3 setvbuf` — the buffering this implementation deliberately lacks

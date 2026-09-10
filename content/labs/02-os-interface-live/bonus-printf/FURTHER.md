# Going Further: Plugging `_putchar()` Into a Custom `printf`

Optional.

## Things to try

1. **Count the writes.**
   `strace -e trace=write ./printfdemo 2>&1 >/dev/null | wc -l` against the number of characters the program prints.
   One system call per character is the worst case measured in the session 01 `printf` vs `write` demo, reproduced here deliberately.
1. **Add a buffer.**
   Give `_putchar()` a static 4096-byte buffer, flush it when full, and flush what remains before `main` returns.
   Count the `write` calls again, and time both versions.
   You have now rebuilt, by hand, what stdio does for you.
   Note the new problem you just created: what happens if the program crashes before the flush?
1. **Route it through your own syscall wrapper.**
   Replace libc's `write()` with the `my_write()` you wrote in the demo.
   The program then uses no libc output path at all — confirm with `strace` and with `nm`.
1. **Try the other entry points.**
   The library also provides `sprintf()`, `snprintf()` and `vsnprintf()`.
   Format into a buffer and print it with a single `write`.
   Which of these need `_putchar()` at all?
1. **Break it deliberately.**
   Make `_putchar()` write two bytes instead of one, or pass `character` rather than `&character`.
   Both compile. Look at what `strace` shows for each.

## Questions to answer

* Why does the library take the address of a `char` rather than the `char` itself?
  What does `write` actually need?
* This `printf` has no dependencies at all — not even on libc.
  What does it therefore have to implement itself that you would normally take for granted?
* Why would an embedded system prefer this implementation over the one in libc?
* Your `_putchar()` ignores the return value of `write()`.
  When would that matter, and what should a robust version do?

## Discussion points

* **Inversion of control.**
  The library does not call the operating system; it calls *you*, and you decide what "output" means.
  This is why the same code runs on a microcontroller writing to a UART, in a test harness capturing to a buffer, and here writing to fd 1.
  One function is the entire porting layer.
* **The performance shape is the session 01 lesson, inverted.**
  Unbuffered output means one system call per character, and the cost is in making the call rather than in the bytes moved.
  This design chooses portability and a tiny footprint over throughput, which is the right trade for its target.
* **Formatting and output are genuinely separable concerns**, and this library is a clean demonstration.
  libc fuses them behind `FILE *`, which is convenient but is also why `printf` is far harder to port.

## References

* [mpaland/printf](https://github.com/mpaland/printf) — the vendored library, MIT licensed
* `man 2 write`
* `man 3 setvbuf` — the buffering that this implementation deliberately does not have

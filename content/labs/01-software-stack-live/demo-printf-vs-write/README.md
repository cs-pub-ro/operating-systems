# Demo: `printf` vs `write`

`printf()` sits at the top of the C library's output stack: it parses a format string, manages a `FILE` object, keeps a buffer, and only at the very bottom calls `write()`.
`write()` is the other end of that stack: no formatting, no buffering, every call hands the bytes straight to the operating system.
So `printf()` does strictly more work than `write()` — and yet the answer to "which one is faster?" is *it depends on one line of code*.

Write down your guess now, before you measure anything.

Together with the teaching assistant you will fill in the TODOs in `printf_demo.c` and `write_demo.c`, time both programs, comment out a single line, and use `strace` to see what actually reaches the operating system.

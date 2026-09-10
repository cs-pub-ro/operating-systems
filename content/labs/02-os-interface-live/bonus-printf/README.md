# Bonus: Plugging `_putchar()` Into a Custom `printf`

**Tools:** GCC, Make, strace

## Goal

Connect a complete, self-contained `printf` implementation to the operating system by supplying the single function it needs from you.

## Background

The [`utils/printf/`](utils/printf) directory holds a portable `printf` implementation, [mpaland/printf](https://github.com/mpaland/printf), designed for embedded systems that have no libc at all.
It knows how to format everything — integers, padding, floats — but it has no idea how to get a character out of the process.

For that it delegates to one hook that you must provide:

```C
void _putchar(char character);
```

The layering is the same idea as the rest of the session, with the formatting done by somebody else's library:

```text
printf() / sprintf() / ...
        |
        v
   _putchar(c)          <-- you implement this
        |
        v
  write(1, &c, 1)       <-- the write syscall, fd 1 = stdout
        |
        v
      kernel
```

## Your Task

Open `_putchar.c` and fill in the TODO so that the character is written to standard output using `write(2)`:

```C
ssize_t write(int fd, const void *buf, size_t count);
```

* `fd` — use **1** for stdout.
* `buf` — a pointer to the bytes to write.
  You have a `char`, not a pointer; take its address.
* `count` — exactly one byte here.

You may use libc's `write()` directly for this exercise, or your own `my_write()` from the demo if you would rather keep libc out of it entirely.

## Build & Run

```console
make
./printfdemo
```

## Check Your Work

* Every line should be formatted exactly as the format strings in `main.c` ask: right-aligned and left-aligned columns should line up, the zero-padded field should carry leading zeros, and the float should show four decimals.
  Garbled or missing output usually means the address of the wrong thing was passed to `write`.
* Look at what actually reaches the kernel:

  ```console
  strace -e trace=write ./printfdemo
  ```

  Count the `write` calls against the number of characters printed.
  The ratio should tell you something specific about this design; be ready to say what, and how it compares with what libc's `printf` did in the session 01 demo.
* Nothing in the output path should be libc's stdio.
  Check that `strace` shows no other output-related system call.

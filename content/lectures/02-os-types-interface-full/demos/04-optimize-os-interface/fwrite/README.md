# Demo: Buffering in User Space

The same ten million one-byte writes, once through the C library's buffer and once with the buffer turned off.
The buffered version is more than twenty times faster, and it makes thousands of times fewer system calls.

## Goal

Show the first way to beat the cost of system calls from part 02: do the crossing less often.
The C library batches small writes into a buffer and crosses into the kernel only when the buffer fills, so the per-call cost is paid once per few kilobytes instead of once per byte.

## Background

Both programs write `NUM_BYTES` bytes one `fwrite("a", 1, 1, f)` at a time, `NUM_ROUNDS` times over.
The only difference is one line:

```c
setvbuf(f, NULL, _IONBF, 0);   /* fwrite_unbuffered.c only: turn the buffer off */
```

With buffering on (the default), each `fwrite` copies its one byte into libc's in-memory buffer and returns; a real `write` system call happens only when the buffer fills, typically every 4096 bytes.
With buffering off, every `fwrite` becomes its own `write` system call, and the cost measured in part 02 is paid on every single byte.

This is the same trade-off as lecture 01's `printf`-versus-`write` demo, and the same one lab 01 explores from the application side.

## Build and run

```console
make
./fwrite_buffered
./fwrite_unbuffered
```

## Results and explanations

```console
$ ./fwrite_buffered
time passed 65846 microseconds

$ ./fwrite_unbuffered
time passed 1508197 microseconds
```

More than twenty times slower with the buffer off.
`perf` shows why:

```console
$ sudo perf stat -e instructions ./fwrite_buffered
     1,583,093,302      instructions
       0.005018000 seconds sys

$ sudo perf stat -e instructions ./fwrite_unbuffered
    28,440,276,675      instructions
       1.269273000 seconds sys
```

Two observations.

* **The buffer trades a little memory for a lot of crossings.**
  A few kilobytes of buffer turn one system call per byte into one per few thousand bytes.
  The `sys` time collapses from over a second to a few milliseconds, because almost all the kernel crossings are gone.
* **The visible behaviour is identical.**
  Both programs write the same file with the same contents.
  The buffer is invisible in the output and enormous in the cost, which is exactly why it is the default and why turning it off is a deliberate, occasional choice (for a log you must not lose, say).

The connection to part 02 is direct: the unbuffered version is the `make_syscalls` loop, and the buffered version is `make_libcalls` with real work behind it.
Buffering is how libc keeps ordinary code fast without the programmer thinking about the boundary at all.

## Going further

* Vary the buffer with `setvbuf(f, buf, _IOFBF, size)` for sizes from 1 byte to 1 MB and plot the time; it drops fast, then flattens, which is the resource-efficiency-versus-performance trade-off from lecture 01.
* Run `strace -c ./fwrite_buffered` and `strace -c ./fwrite_unbuffered` and compare the `write` counts directly.
* Compare with lab 01's [`demo-printf-vs-write`](../../../../../labs/01-software-stack-full/demo-printf-vs-write), which is the same measurement one layer up.

## References

* `man 3 setvbuf`, `man 3 fwrite`, `man 3 setbuf`
* `man 2 write`

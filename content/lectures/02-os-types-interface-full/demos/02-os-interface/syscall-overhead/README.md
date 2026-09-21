# Demo: What a System Call Costs

The same trivial operation -- "write one byte, get told it succeeded" -- done ten million times as a real system call and as a plain function call.
The system call is roughly seventy times slower, and the difference is the mode switch.

## Goal

Put a number on the cost of crossing into the kernel.
This is the measurement the rest of the lecture builds on: system calls are expensive *because* of the protection boundary, and every optimisation in part 04 is a way to make fewer of them.

## Background

`make_syscalls.c` calls `write(fd, "a", 1)` on `/dev/null` in a tight loop.
`write` on `/dev/null` is about the cheapest system call there is: the kernel's implementation just returns the byte count without doing anything with the data ([see it in the kernel source](https://elixir.bootlin.com/linux/v6.17.1/source/drivers/char/mem.c#L418)).
So what the loop measures is almost entirely the cost of *making* the call -- the user/kernel mode switch and back -- not the work inside it.

`make_libcalls.c` is identical except that `write` is replaced by a local `my_write()` that returns the length and does nothing else.
That is an ordinary function call, staying in user mode the whole time.
The two programs do the same arithmetic around the same loop; the only difference is whether each iteration crosses the kernel boundary.

## Build and run

```console
make
./make_syscalls
./make_libcalls
```

## Results and explanations

```console
$ ./make_syscalls
time passed 703224 microseconds

$ ./make_libcalls
time passed 9360 microseconds
```

About seventy times slower for the same visible effect.
`perf` shows where it goes:

```console
$ sudo perf stat -e instructions ./make_syscalls
time passed 691018 microseconds
     7,960,739,971      instructions
       0.221906000 seconds user
       0.468803000 seconds sys

$ sudo perf stat -e instructions ./make_libcalls
time passed 9502 microseconds
       181,201,476      instructions
       0.010167000 seconds user
       0.000000000 seconds sys
```

Two things stand out.

* **The system-call version spends most of its time in the kernel.**
  Look at the `sys` line: nearly half a second of kernel time against zero for the function-call version.
  That time is not spent writing to `/dev/null` -- there is nothing to write -- it is spent switching modes, checking the arguments, and switching back, ten million times.
* **The instruction counts differ by more than forty times.**
  Each `write` drags in thousands of kernel instructions for the crossing; each `my_write` is a handful.
  The boundary is not free, and the demo isolates its price from everything else.

The lesson is directional, not absolute.
A system call is the right tool when it does real work -- reading a file, sending a packet -- because then the crossing is a small tax on a large operation.
It is the wrong tool one byte at a time, which is exactly why libc buffers, and why part 04 is about doing more per crossing.

## Going further

* Raise or lower `NUM_ROUNDS` and confirm the ratio holds: it is a per-call cost, not a fixed one.
* Replace `my_write` with a real buffered write that flushes once every 4096 bytes, and watch the gap shrink toward the function-call time.
  That is [`04-optimize-os-interface/fwrite/`](../../04-optimize-os-interface/fwrite) in miniature.
* Lab 01 makes the same point from the application side, comparing `printf` against raw `write`; see [`labs/01-software-stack-full/demo-printf-vs-write`](../../../../../labs/01-software-stack-full/demo-printf-vs-write).

## References

* `man 2 write`, `man 1 perf-stat`
* [The `/dev/null` write implementation in the kernel](https://elixir.bootlin.com/linux/v6.17.1/source/drivers/char/mem.c#L418)

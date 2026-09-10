# Demo: `printf` vs `write`

**Tools:** GCC, `time`, `strace`

## Goal

Show that the answer to "is the C library faster or slower than the raw system call?" is decided by one line of code, and that the deciding factor is **buffering**, not cleverness.
By the end of the tutorial you can explain, and demonstrate with `strace`, why a buffered `printf()` beats a direct `write()` loop by a factor of three while doing strictly more work.

## Background

`printf()` sits at the **top** of the C library's output stack.
Underneath it there is a whole machine: it parses the format string, it manages a `FILE` object, it keeps a buffer — and at the very **bottom**, it calls `write()`.

`write()` is the other end of the stack: a thin, low-level output function.
No formatting, no buffering.
Every call hands the bytes straight out of the program to the operating system.

So `printf()` does strictly *more* work than `write()`.
Write down a guess before reading on.

Two facts the tutorial establishes by measurement:

* A `write()` call costs roughly the same whether it carries 37 bytes or 4096.
  The expense is in *making the call at all*, not in the amount of data.
* The `sys` time reported by `time` is, for these programs, a direct proxy for the number of `write()` calls performed.

> All numbers below are from Ubuntu 24.04 / gcc 13.3 / x86-64.
> Yours will differ, and they wobble by 10–20% between runs on the same machine.
> **The ratios are the point, not the digits.**

## Build & Run

`printf_demo.c` prints the same line a million times through `printf()`, with stdout's buffering switched off:

```C
#include <stdio.h>

#define N 1000000

const char *line = "hello from the operating systems lab\n";

int main(void)
{
	/* Switches stdout's buffer OFF. Comment it out to switch it back on. */
	setvbuf(stdout, NULL, _IONBF, 0);

	for (long i = 0; i < N; i++)
		printf("%s", line);

	return 0;
}
```

`write_demo.c` does the same thing with no C library on top:

```C
#include <string.h>
#include <unistd.h>

#define N 1000000

const char *line = "hello from the operating systems lab\n";

int main(void)
{
	size_t len = strlen(line);

	for (long i = 0; i < N; i++)
		write(1, line, len); /* 1 is stdout */

	return 0;
}
```

Build both and time them:

```console
make
time ./printf_demo > /dev/null
time ./write_demo > /dev/null
```

**Always redirect to `/dev/null`.**
Otherwise you are timing the terminal drawing a million lines, not the program.

Then comment out the `setvbuf()` line in `printf_demo.c`, change nothing else, rebuild and time it again:

```console
make clean && make
time ./printf_demo > /dev/null
```

## Results and Explanations

### Steps 1 and 2 — the expected answer

```text
$ time ./printf_demo > /dev/null      # setvbuf line active
real	0m0.288s
user	0m0.157s
sys	0m0.131s

$ time ./write_demo > /dev/null
real	0m0.193s
user	0m0.063s
sys	0m0.129s
```

`write` wins, 0.19 s against 0.29 s.
The low-level function beat the library by 50%, exactly as predicted: `printf` does more work, so `printf` is slower.
Case closed — or so it appears.

### Step 3 — the same program, minus one line

```text
$ time ./printf_demo > /dev/null      # setvbuf line commented out
real	0m0.062s
user	0m0.060s
sys	0m0.002s
```

The same program is now **~5× faster than it was**, and **3× faster than `write`**, which does far less work.
The loop is identical, the output is identical, the compiler flags are identical.

| | real | user | sys |
| --- | ---: | ---: | ---: |
| `printf`, `setvbuf` line **active** | 0.29 s | 0.16 s | 0.13 s |
| `write` | 0.19 s | 0.06 s | 0.13 s |
| `printf`, `setvbuf` line **commented out** | **0.06 s** | 0.06 s | **0.00 s** |

So: is `printf` faster than `write`, or slower?
**Both.**
The question was wrong.
One line decides it, and that line is about *buffering*.

### Why — watch it happen with `strace`

`strace` shows every `write()` the program performs.
A million of them is too many to look at, so set `N` to **20** in both programs and rebuild.

With the `setvbuf` line **active** (buffer off):

```console
strace -e trace=write ./printf_demo > /dev/null
```

```text
write(1, "hello from the operating systems"..., 37) = 37
write(1, "hello from the operating systems"..., 37) = 37
write(1, "hello from the operating systems"..., 37) = 37
...20 of them...
```

Twenty lines, twenty calls of 37 bytes.
`write_demo` does exactly the same thing.

With the `setvbuf` line **commented out** (buffer on):

```text
write(1, "hello from the operating systems"..., 740) = 740
```

**One call. 740 bytes.**
That is 20 × 37 — the whole run delivered in a single trip, at the very end.

That is the entire demo.
`printf` did not send the first line when it was asked to.
It copied the bytes into a 4096-byte buffer inside the process and waited until it had a worthwhile amount to hand over.

Put `N` back to 1 000 000 and count the calls (this takes a few seconds — `strace` slows everything down, so trust the *count*, not the clock):

```console
strace -e trace=write ./printf_demo 2>&1 >/dev/null | grep -c '^write(1,'
```

**9034.**
A million lines of 37 bytes is 37 MB; at 4096 bytes per call, that is 9034 calls.
Against a million for the unbuffered version — **110× fewer**.

### The measurement that explains everything

A `write()` call costs roughly the same whether it carries 37 bytes or 4096.
The expense is in making the call at all.
So:

* `write_demo` and unbuffered `printf_demo` both make **1 000 000 calls** — and their `sys` times are **identical** (0.13 s).
  Of course they are: they do the same thing at the bottom.
* Buffered `printf_demo` makes **9034** — and its `sys` time collapses to **0.00 s**.

`sys` is time spent inside the operating system on the program's behalf.
That column *is* the call count, and it is why the answer flipped.

*Why* a single `write()` costs so much more than an ordinary function call is the subject of session 02.
For now, take it as measured.

### And where does the library's cost show up?

In the `user` column — time spent running the program's code and the library's code:

* `write_demo`: **0.06 s** — just the loop.
* unbuffered `printf_demo`: **0.16 s** — the same loop, plus 0.10 s of `printf` parsing `"%s"` a million times, running `vfprintf`'s general-purpose engine (it must be ready for `%d`, `%f`, width, precision, locale…), and locking the `FILE` object on every call.

That 0.10 s is what the abstraction costs.
It is real, and it is visible.

### The two lessons

> **1. Buffering beats being close to the metal.**
> `printf` wins not by being clever, but by *avoiding* the expensive thing.
> It pays a real price (0.10 s of library overhead) to make 9034 calls instead of a million — and that trade wins by 3×.
> Buffering is not an implementation detail of `printf`; it is the reason `printf` is shaped the way it is.

> **2. Take the buffer away and the abstraction is pure overhead.**
> Unbuffered `printf` pays for the library *and* for every expensive call underneath.
> It is the worst of both worlds — the only version here that is slower than doing it by hand.

`printf` is not "fast" or "slow".
Its buffer is.

### One more thing: why the terminal feels slow

Nobody calls `setvbuf()` in real code — so who chose the buffering?

**The C library did, by looking at where stdout goes.**
Into a file or a pipe: a big 4096-byte buffer, the fast case just measured.
Onto a terminal: it switches to flushing on every `\n`, which is one call per line — the slow case, by default, whenever a human is watching.

Try it: comment out `setvbuf`, set `N` to 5000, and run *without* redirecting:

```console
./printf_demo
```

Same binary, same buffer, much slower, because of where the bytes were going.

It also explains this classic:

```C
printf("about to crash");   /* no \n */
abort();                    /* the message never appears */
```

The bytes were still sitting in `printf`'s buffer, inside the process, when it died.
They never left.
`write()` would not have lost them — and that is exactly why `stderr` is unbuffered by default: a message you never see is worse than a slow one.

## References

* `man 3 printf`, `man 3 setvbuf`, `man 3 fflush`
* `man 2 write`
* `man 1 strace`, `man 1 time`
* [The GNU C Library manual — Stream Buffering](https://www.gnu.org/software/libc/manual/html_node/Stream-Buffering.html)

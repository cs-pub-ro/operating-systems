# Bonus: `clock_gettime` and `time`

**Tools:** GCC, Make, strace

## Goal

Implement `clock_gettime(2)` and build a libc-style `time()` on top of it, this time spread across a proper header and implementation file rather than a single `main.c`.

## Background

Same three-layer pattern as the previous exercises:

```text
  my_time()   -->   my_clock_gettime()   -->   my_syscall()   -->   kernel
```

`clock_gettime` reads a high-resolution clock into a `timespec` (see `man 2 clock_gettime`):

```C
int clock_gettime(clockid_t clkid, struct timespec *tp);
```

* `clkid` — which clock to read.
  `CLOCK_REALTIME` is wall-clock time since the Unix Epoch; `CLOCK_MONOTONIC` only ever increases and is the right choice for measuring durations.
* `tp` — an **output** parameter: the kernel fills it in.

`time(2)` is the coarser call, returning only whole seconds of `CLOCK_REALTIME`:

```C
time_t time(time_t *tloc);
```

It also has the unusual habit of returning its result *and* optionally storing it through a pointer.

## Your Task

1. **`my_time.h`** — add declarations for `my_clock_gettime()` and `my_time()` where the TODO comments are.
   Note that this file is included by both `main.c` and `my_time.c`, so the declarations must match the definitions exactly.

1. **`my_time.c`** — complete the three TODOs:
   1. **`SYS_clock_gettime`** — define the correct x86-64 syscall number.
   1. **`my_clock_gettime()`** — the syscall wrapper: `clkid` first, `tp` second, `0` for the rest.
   1. **`my_time()`** — read `CLOCK_REALTIME`, store the seconds through `tloc` if it is not `NULL`, and return them.

## Build & Run

```console
make
./clock_gettime_demo
```

## Check Your Work

* The two values printed should agree, or differ by at most 1 if the second ticked over between the calls.
* Sanity-check the absolute value against the system clock:

  ```console
  date +%s
  ```

  Your seconds should match to within a second or two.
  A value near zero means the kernel never filled the structure; a small negative value is an error code being returned rather than a time.
* Confirm the calls reach the kernel:

  ```console
  strace -e trace=clock_gettime ./clock_gettime_demo
  ```

  You may see **fewer** `clock_gettime` lines than you expect, or none at all — that is not necessarily a bug in your code.
  Compare with a program that calls libc's `clock_gettime()` and discuss the difference with the teaching assistant.
* Passing `NULL` for `tloc` must work and must not crash.
  Try a non-`NULL` pointer too, and check both paths give the same value.

# Bonus: `clock_gettime` and `time`

**Tools:** GCC, Make, strace

## Goal

Reference solution for the `clock_gettime` wrapper and the `time()` built on it.
This task also happens to be the one where the "system calls always enter the kernel" story stops being true.

## Background

```text
  my_time()   -->   my_clock_gettime()   -->   my_syscall()   -->   kernel
```

```C
int clock_gettime(clockid_t clkid, struct timespec *tp);
time_t time(time_t *tloc);
```

`clkid` selects the clock.
`CLOCK_REALTIME` is wall-clock time since the Unix Epoch; `CLOCK_MONOTONIC` only ever increases.
`tp` is an **output** parameter.

Unlike the previous exercises this one is split across `my_time.h`, `my_time.c` and `main.c`, so the declarations and definitions have to agree.

## Build & Run

```console
make
./clock_gettime_demo
```

```text
my_clock_gettime: tv_sec=1787504562, tv_nsec=427692719
my_time:          1787504562
```

Cross-check against the system clock with `date +%s`.

## Results and Explanations

### `SYS_clock_gettime`

The x86-64 syscall number is **228**:

```console
grep '__NR_clock_gettime ' /usr/include/x86_64-linux-gnu/asm/unistd_64.h
```

### `my_clock_gettime()`

```C
int my_clock_gettime(clockid_t clkid, struct timespec *tp)
{
	return (int)my_syscall(SYS_clock_gettime, (long)clkid, (long)tp,
			       0, 0, 0, 0);
}
```

`clkid` is a small integer; `tp` is an address the kernel will write through.

### `my_time()`

```C
time_t my_time(time_t *tloc)
{
	struct timespec ts;

	my_clock_gettime(CLOCK_REALTIME, &ts);
	if (tloc != NULL)
		*tloc = ts.tv_sec;
	return ts.tv_sec;
}
```

`time()` reports only whole seconds, so it reads `CLOCK_REALTIME` and keeps `tv_sec`, discarding the nanoseconds — it truncates rather than rounds.
The dual interface, returning the value *and* optionally storing it through a pointer, is inherited from V7 Unix and kept for compatibility; nobody would design it that way now.

This mirrors how glibc implements `time()` internally: a thin wrapper over `clock_gettime(CLOCK_REALTIME, ...)`.

### The interesting part: the vDSO

Run both versions under `strace` and count:

```console
$ strace -e trace=clock_gettime ./clock_gettime_demo
clock_gettime(CLOCK_REALTIME, {tv_sec=1787504569, tv_nsec=869923648}) = 0
clock_gettime(CLOCK_REALTIME, {tv_sec=1787504569, tv_nsec=869974694}) = 0
```

Two calls, as expected — one per function in `main()`.

Now the same program written against libc's `clock_gettime()`:

```console
$ strace -e trace=clock_gettime ./libc_version
(nothing)
```

**No system call at all.**

`clock_gettime` is called so often that Linux exposes it through the **vDSO** (virtual dynamic shared object): a small shared library the kernel maps into every process, containing code that reads the current time out of a page of memory the kernel keeps updated.
libc calls that code, which never crosses into kernel mode.

The vDSO is visible in every dynamically linked binary:

```console
$ ldd ./clock_gettime_demo
	linux-vdso.so.1 (0x000073db16fc1000)
	...
```

Note it has no path — it is not a file on disk anywhere.

So the raw-syscall version in this exercise is *slower* than libc's, and measurably so.
That is not a defect in the exercise; it is the point.
The same trade appeared in session 01 with buffering: the fast path wins by **avoiding** the expensive operation rather than by performing it faster.

### `CLOCK_REALTIME` versus `CLOCK_MONOTONIC`

`CLOCK_REALTIME` can jump.
NTP steps it, administrators set it, and it can move **backwards**.
Timing a duration with it produces negative elapsed times and bugs that surface twice a year.
`CLOCK_MONOTONIC` cannot jump and is the correct choice for measuring intervals; `CLOCK_REALTIME` is for timestamps that must mean something to a human.

## References

* `man 2 clock_gettime`, `man 2 clock_getres`, `man 3 time`
* `man 7 vdso` — what the vDSO is and which calls it accelerates
* `man 7 time` — the available clocks and their semantics

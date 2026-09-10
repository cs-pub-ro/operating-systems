# Exercise: The `nanosleep` System Call

**Tools:** GCC, strace, time

## Goal

Reference solution for the `nanosleep` wrapper and the `sleep()` built on top of it.
This is the first task where a system call takes **pointers**, and where the kernel writes back into the caller's memory.

## Background

The full three-layer pattern applies:

```text
  my_sleep()   -->   my_nanosleep()   -->   my_syscall()   -->   kernel
```

`nanosleep` describes durations with a `timespec`:

```C
struct timespec {
	time_t tv_sec;   /* whole seconds        */
	long   tv_nsec;  /* nanoseconds [0, 1e9) */
};
```

```C
int nanosleep(const struct timespec *req, struct timespec *rem);
```

* `req` — how long to sleep.
* `rem` — if a signal interrupts the sleep, the kernel writes the leftover time here.
  `NULL` if the caller does not care.

## Build & Run

```console
make
./sleepdemo
```

```text
Sleeping for 2 seconds...
Woke up!
```

## Results and Explanations

### `SYS_nanosleep`

The x86-64 syscall number for `nanosleep` is **35**:

```console
grep '__NR_nanosleep ' /usr/include/x86_64-linux-gnu/asm/unistd_64.h
```

### `my_nanosleep()`

Both parameters are pointers, and the syscall convention passes every argument as a machine word, so each is cast to `long`:

```C
long my_nanosleep(const struct timespec *req, struct timespec *rem)
{
	return my_syscall(SYS_nanosleep, (long)req, (long)rem, 0, 0, 0, 0);
}
```

A `NULL` `rem` casts to `0`, which is exactly the "do not report the remainder" value the kernel expects — no special case is needed.

The cast is not a trick to silence the compiler; it *is* the calling convention.
The kernel receives a number, treats it as an address in the caller's address space, validates it, and reads or writes through it.

### `my_sleep()`

```C
unsigned int my_sleep(unsigned int seconds)
{
	struct timespec req;

	req.tv_sec = (time_t)seconds;
	req.tv_nsec = 0;

	my_nanosleep(&req, NULL);

	return 0;
}
```

Both fields must be set.
`tv_nsec` is not zeroed for you, and a garbage value there is either a very long sleep or an immediate `EINVAL` — the kernel rejects `tv_nsec` outside `[0, 999999999]`, returning `-22`.

This version always returns 0.
A real `sleep()` returns the number of seconds left unslept, which means looping while the kernel reports `EINTR` and feeding `rem` back in as the next `req`.

### Checking it

```console
$ time ./sleepdemo
Sleeping for 2 seconds...
Woke up!

real	0m2.000s
```

```console
$ strace -e trace=nanosleep ./sleepdemo
nanosleep({tv_sec=2, tv_nsec=0}, NULL)  = 0
Sleeping for 2 seconds...
Woke up!
+++ exited with 0 +++
```

`strace` decodes the structure, which makes it easy to confirm both fields hold what was intended.

### Two things worth explaining

**The elapsed time is never less than requested, and usually slightly more.**
`nanosleep` guarantees *at least* the requested duration.
The kernel makes the process runnable again once the deadline passes, but the process still has to be scheduled onto a CPU, and that takes a little longer.
A sleep that could return early would be far harder to build on than one that overshoots slightly.

**The `strace` line appears before the program's own output**, even though the program clearly prints first.
This is not a reordering: the program's stdout is a pipe, so libc buffers it until exit, while `strace` writes to the terminal immediately.
It is the session 01 buffering lesson showing up in a debugging tool, and it catches people out regularly.

## References

* `man 2 nanosleep`, `man 2 clock_nanosleep`, `man 3 sleep`
* `man 7 signal` — `EINTR` and interrupted system calls
* `man 2 syscall` — return-value and error conventions

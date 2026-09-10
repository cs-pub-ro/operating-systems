# Exercise: The `nanosleep` System Call

**Tools:** GCC, strace, time

## Goal

Implement `nanosleep(2)`, a system call that takes pointer arguments, and build a libc-style `sleep()` on top of it.
Afterwards you will be able to pass structures to the kernel and reason about what a syscall's return value means.

## Background

Same three-layer pattern as the [write demo](../demo-puts-write) and the [getpid exercise](../01-getpid):

```text
  my_sleep()   -->   my_nanosleep()   -->   my_syscall()   -->   kernel
```

`nanosleep` describes durations with a `timespec` (see `man 2 nanosleep`):

```C
struct timespec {
	time_t tv_sec;   /* whole seconds        */
	long   tv_nsec;  /* nanoseconds [0, 1e9) */
};
```

To sleep for 2 seconds, `tv_sec = 2` and `tv_nsec = 0`.
For half a second, `tv_sec = 0` and `tv_nsec = 500000000`.

The prototype is:

```C
int nanosleep(const struct timespec *req, struct timespec *rem);
```

* `req` — how long to sleep.
* `rem` — if a signal interrupts the sleep, the kernel writes the leftover time here.
  Pass `NULL` if you do not care.

Unlike `getpid`, this call takes **pointers**.
The syscall convention passes every argument as a plain machine word, so think about what has to happen to a pointer before it can go into a register.

## Your Task

Open `main.c` and complete the three TODOs.

1. **`SYS_nanosleep`** — define the correct x86-64 syscall number.
   Find it the same way you found `getpid`'s.
1. **`my_nanosleep()`** — the syscall wrapper.
   Forward the two pointers as the first two arguments, `0` for the rest.
1. **`my_sleep()`** — build a `struct timespec` for the requested number of seconds and call `my_nanosleep()` with it, passing `NULL` for `rem`.
   Set **both** fields of the structure.

## Build & Run

```console
make
./sleepdemo
```

## Check Your Work

* The program should print its first line, pause visibly, then print the second.
  If there is no pause, the syscall is not happening; if the pause is wildly wrong, look at `tv_nsec`.
* Measure it:

  ```console
  time ./sleepdemo
  ```

  Real time should be a little **over** the requested duration, never under.
  Be ready to explain to the teaching assistant why "a little over" is the expected result rather than a defect.
* Inspect the call:

  ```console
  strace -e trace=nanosleep ./sleepdemo
  ```

  You should see one `nanosleep` line, and `strace` will decode the structure you passed — check that both fields hold what you intended.
* Look carefully at the *order* of the lines in the `strace` output compared to what the program prints when run normally.
  Something looks out of sequence.
  Work out why before asking; it is not a reordering, and you met the cause in session 01.

> **Note:** a real `sleep()` loops on `my_nanosleep()`, feeding `rem` back in to finish the sleep after a signal interruption.
> Returning 0 unconditionally is fine here.

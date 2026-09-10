# Instructor Notes: The `nanosleep` System Call

## Purpose

The first task where a system call takes **pointers**, and where the kernel writes back into the caller's memory.
Conceptually the biggest step in the session.

## Expected answers

`SYS_nanosleep` is **35** on x86-64.
The wrapper casts both pointers to `long`; `my_sleep()` fills a `struct timespec` and passes `NULL` for `rem`.

## Common mistakes

* **Leaving `tv_nsec` uninitialised.**
  An automatic `struct timespec` is not zeroed.
  The symptom is either an immediate return with `-22` (`EINVAL`, because `tv_nsec` must be in `[0, 999999999]`) or an absurdly long sleep.
  This is the single most common failure here, and it is a good one to let happen.
* **Passing the structure by value**, or passing `req` without `&`.
  Usually a compile error, occasionally not.
* **Worrying about the `(long)` casts.**
  Students often think the cast is a hack. It is the calling convention: the kernel receives a number and treats it as an address.
* **Assuming `NULL` needs a special case.**
  It casts to 0, which is exactly what the kernel reads as "do not report the remainder".

## Points to hammer

* **The elapsed time is never *less* than requested.**
  `nanosleep` guarantees *at least* the requested duration; the kernel makes the process runnable at the deadline, but it still has to be scheduled.
  Students read the couple of milliseconds of overshoot as sloppiness — it is a guarantee being honoured.
* **The kernel writes into the caller's memory through `rem`.**
  It validates the address first; a bad pointer is an error return, not a fault inside the kernel.
  This is one reason a syscall costs more than a function call.
* **`EINTR` is a fact of life.**
  Any blocking call can return early because a signal arrived.

## The `strace` ordering puzzle

The exercise README deliberately asks students to explain why `strace` prints the `nanosleep` line *before* the program's first `printf` output.

It is **not** a reordering.
The program's stdout is a pipe, so libc buffers it until exit; `strace` writes to the terminal immediately.
It is the session 01 buffering material appearing inside a debugging tool, and it is worth the two minutes.

Do not give this away in advance — the surprise is what makes it stick.

## Verified failure modes

Useful if a student wants to probe the edges; all measured on x86-64 Linux:

| Situation | Return |
| --- | --- |
| `tv_nsec = 1500000000` | `-22` (`EINVAL`) |
| Bad `req` pointer | `-14` (`EFAULT`) |
| Interrupted by `SIGALRM` | `-4` (`EINTR`), `rem` ≈ 29.000032063 for a 30 s sleep |
| Bad `rem` pointer, sleep **not** interrupted | `0` — the kernel never writes through it |

That last row is worth knowing: a garbage `rem` goes undetected unless the sleep is actually interrupted.

Note that interrupting requires a **handler** to be installed.
Without one, the default action for `SIGALRM` terminates the process instead of returning `EINTR`.

## Practical notes

* The default sleep is 2 seconds; with a room full of students running it repeatedly that is fine, but anyone experimenting with 30-second sleeps should be reminded they can `Ctrl-C`.
* `time ./sleepdemo` reporting `2.000s` or `2.002s` are both correct results.

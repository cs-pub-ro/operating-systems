# Instructor Notes: `clock_gettime` and `time`

## Purpose

Mechanically this is `nanosleep` again with different arguments, and strong students will finish it fast.
The real content is the **vDSO**, which the exercise is engineered to make them discover.

## Expected answers

`SYS_clock_gettime` is **228** on x86-64.
`my_clock_gettime()` forwards `clkid` and `tp`; `my_time()` reads `CLOCK_REALTIME` and keeps `tv_sec`.

This task is also the first with a **separate header**, so the declarations in `my_time.h` must match the definitions.
A mismatched declaration is a good, cheap lesson if it happens.

## The vDSO — the point of the exercise

The exercise README deliberately says students may see *fewer* `clock_gettime` lines than expected "or none at all", and asks them to compare with a libc version.

Measured here:

```console
$ strace -e trace=clock_gettime ./clock_gettime_demo   # raw syscall version
clock_gettime(CLOCK_REALTIME, {tv_sec=..., tv_nsec=...}) = 0
clock_gettime(CLOCK_REALTIME, {tv_sec=..., tv_nsec=...}) = 0

$ strace -e trace=clock_gettime ./libc_version
(nothing at all)
```

Linux maps the **vDSO** into every process: a small kernel-generated shared object containing code that reads the time from a page the kernel keeps updated.
libc calls that code and never changes privilege level.

Show it with `ldd`:

```console
$ ldd ./clock_gettime_demo
	linux-vdso.so.1 (0x000073db16fc1000)
```

Note it has **no path** — it is not a file on disk.
Students find this genuinely surprising, and it is worth letting them look for the file and fail.

**The student's raw-syscall version is slower than libc's.**
Say this plainly.
It is not a defect in the exercise; it is the same trade as buffering in session 01 — the fast path wins by *avoiding* the expensive operation rather than performing it faster.

Also worth noting: not every syscall can be accelerated this way.
The vDSO only works for read-only operations needing no privilege.
Anything that changes kernel state must still cross the boundary.

## Secondary discussion: which clock

`CLOCK_REALTIME` can jump — NTP steps it, administrators set it, it can move **backwards**.
Durations measured with it can come out negative.
`CLOCK_MONOTONIC` cannot jump and is the correct choice for any interval.

If time allows, have someone measure a sleep with `CLOCK_REALTIME` while stepping the clock backwards on a machine they may safely disturb.

## The skeleton does not compile until task 1 is done

Worth knowing before a student reports it as broken.

`my_time.h` in the work directory has no declarations — adding them *is* task 1 — so `main.c` fails with:

```text
error: implicit declaration of function 'my_clock_gettime'
```

On GCC 14 and later this is a hard **error**, not a warning, because implicit function declarations were removed in C23.
The message points straight at the missing declaration, so it is a reasonable way to start the exercise, but say so if anyone is thrown by a skeleton that will not build at all.
The other tasks in this session all compile from the skeleton and simply return placeholder values.

## Common mistakes

* **Forgetting the declarations in `my_time.h`**, or writing them with a mismatched signature.
* **Printing `tv_sec` with the wrong conversion.**
  `time_t` is not necessarily `long`; `main.c` casts explicitly, and students copying the pattern should notice why.
* **Expecting `strace` to show libc's call** and concluding their own code is broken.
  That confusion *is* the lesson — let them reach it, then explain.

## Practical notes

* `date +%s` is the cross-check for the absolute value.
* Nothing here is timing-sensitive, but the vDSO comparison needs a second small program written against libc; consider having it ready.

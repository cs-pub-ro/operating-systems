# Instructor Notes: Session 02 — The Operating System Interface

Notes for preparing and running the session.
Per-task notes are in `INSTRUCTOR.md` inside each task directory.

## Hard prerequisite: x86-64

**The inline assembly in this session is x86-64 Linux only.**
It will not build on an ARM laptop, and it will not work correctly in an emulated or cross-architecture VM.
There is no fallback in this material.

Check the lab hardware before the session.
Students on Apple Silicon need an x86-64 VM or a remote machine, and that is worth arranging in advance rather than discovering at the start.

Also check where the syscall table header lives on the lab image: `/usr/include/x86_64-linux-gnu/asm/unistd_64.h` on Debian and Ubuntu, `/usr/include/asm/unistd_64.h` elsewhere.
Both paths are mentioned in the exercise, but knowing which one applies saves time.

## Shape of the session

The demo comes first and is not optional: it produces the `my_syscall()` function that every later task reuses **verbatim**.
Get it right and the rest of the session is variations on a theme; rush it and students spend the afternoon confused about registers.

Students never write assembly.
`my_syscall()` is given, read together, and explained.

## The through-line

The session builds one mechanism and complicates it three times:

1. **`demo-puts-write`** — a syscall is one instruction crossing a hardware-enforced privilege boundary, with a register convention and an error convention.
1. **`01-getpid`** — the number is an **ABI**: architecture-specific and fixed forever.
1. **`02-nanosleep`** — arguments can be addresses; the kernel reads and writes caller memory through them, after validating them.
1. **`bonus-clock_gettime`** — the rule then breaks: the hottest calls are served from the **vDSO** without entering the kernel, so libc is *faster* than the raw syscall.

That inversion is the payoff, and it rhymes with session 01: the fast path wins by **avoiding** the expensive operation.
If a strong group only reaches one bonus, make it `bonus-clock_gettime`.

## Three details students always ask about

* **Why `R10` for argument 4** and not `RCX`, when the C calling convention uses `RCX`?
  Because the `syscall` instruction stores the return address in `RCX`, destroying it.
  The kernel ABI deviates from the C ABI at exactly that one slot.
* **Why `rcx`, `r11`, `memory` in the clobber list?**
  `RCX` and `R11` are destroyed by the instruction (return address and saved flags).
  `"memory"` because the kernel may write into the caller's buffers, so the compiler must not keep stale values in registers across the call.
* **How does one register carry a result *and* an error?**
  Linux reserves `-4095..-1` for negated `errno` values.
  libc's wrappers test that range, set `errno`, and return `-1`.
  Demonstrating this once explains what `errno` actually *is* — most students have never thought about it.

## Recurring theme: `strace` output ordering

In every task, `strace` prints the syscall line *before* the program's own `printf` output.
It is **not** a reordering: the program's stdout is a pipe and libc buffers it until exit, while `strace` writes to the terminal immediately.

This is the session 01 buffering lesson resurfacing inside a debugging tool.
`02-nanosleep` makes it most striking, and its README deliberately asks students to explain it.
Do not give it away in advance.

## Verified reference values

All measured on x86-64 Linux while preparing this material:

| Fact | Value |
| --- | --- |
| `SYS_write` / `SYS_getpid` / `SYS_nanosleep` / `SYS_clock_gettime` | 1 / 39 / 35 / 228 |
| `write` to a closed fd | `-9` (`EBADF`) |
| `nanosleep` with `tv_nsec = 1500000000` | `-22` (`EINVAL`) |
| `nanosleep` with a bad `req` pointer | `-14` (`EFAULT`) |
| `nanosleep` interrupted by `SIGALRM` | `-4` (`EINTR`) |
| `clock_gettime` syscalls under `strace`, raw version | 2 |
| `clock_gettime` syscalls under `strace`, libc version | **0** (vDSO) |
| `printfdemo` write calls / characters output | 225 / 225 |
| `printfdemo` write calls with a 4096-byte buffer added | 1 |

## Errata worth knowing

* The old session README linked to a `printf/` directory at session top level.
  It never existed there — the library is inside `bonus-printf/`.
* The old solution files for `bonus-printf` and `bonus-clock_gettime` kept `TODO:` comments directly above the filled-in answers, which read as though the work were unfinished.
  These have been rewritten as explanations.

## Practical notes

* Nothing in this session is timing-sensitive, unlike session 01's linking bonus.
  It is safe on loaded lab machines and VMs — provided they are x86-64.
* `bonus-printf` is short (one line of code) and makes a good filler for anyone who finishes early, or a take-home task.
* The vDSO comparison in `bonus-clock_gettime` needs a second small program written against libc's `clock_gettime()`.
  Have it ready rather than writing it live.

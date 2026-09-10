# Instructor Notes: The `write` System Call

## What this demo sets up

Everything else in the session reuses `my_syscall()` verbatim.
Get this right and the three remaining tasks are variations; rush it and students spend the rest of the session confused about registers.

`my_syscall()` is **given**, not written by students.
No assembly experience is assumed anywhere in this session — the inline asm is read and explained, never authored.

## Sequencing

1. Establish the problem first: a user-mode process cannot write to a file descriptor by itself.
   It must ask the kernel.
1. Read `my_syscall()` together, register by register, against the table in the README.
1. Fill in `my_write()` — a mechanical forwarding exercise.
1. Fill in `my_puts()`.
   Point out that `strlen()` is unavailable: there is no libc below this point, so the length loop is written by hand.
1. Run under `strace` and count the calls.

## Points to hammer

* **`RAX` carries the number in and the result out.**
* **Argument 4 uses `R10`, not `RCX`.**
  The ordinary C calling convention uses `RCX`, but the `syscall` instruction destroys it — the hardware stores the return address there — so the kernel ABI deviates at exactly that one slot.
  This is the detail everyone asks about, and the answer is genuinely interesting.
* **`rcx`, `r11` and `memory` in the clobber list.**
  `RCX` and `R11` because the instruction destroys them; `"memory"` because the kernel may write into the caller's buffers and the compiler must not keep stale values in registers across the call.
* **`strace` intercepts system calls, not function calls.**
  Anything visible crossed the privilege boundary; anything invisible did not.
  This is the verification tool for the whole session.

## Things worth showing

* **Four `write` calls for two lines**, because `my_puts()` writes the string and the newline separately.
  A neat hook back to session 01's buffering demo, and forward to `bonus-printf`, which does one call per *character*.
* **The error convention.**
  `my_syscall(SYS_write, 99, ...)` on a closed descriptor returns `-9` — negated `EBADF`.
  There is only one register for the result, so Linux reserves `-4095..-1` for errors, and libc's job is to split that into a return value plus `errno`.
  Showing this once explains what `errno` actually *is*.
* **`objdump -d demo`** — the wrapper compiles to a handful of `mov`s and one `syscall`. Students are usually surprised how little there is.

## Known wart in the code

`my_write()` and `my_puts()` ignore the return value.
`write` is allowed to write fewer bytes than requested — routine on pipes and sockets — so correct code loops.
Harmless here, but say so out loud; otherwise students copy the pattern into code where it matters.

## Practical notes

* The inline assembly is **x86-64 Linux only**.
  On an ARM laptop or in an emulated VM this will not build or will build and misbehave.
  Check the room's hardware before the session; there is no fallback in this material.
* Nothing here is timing-sensitive.

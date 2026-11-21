# Instructor Notes: Transfers That Never End

## Purpose

The first task whose symptom is nothing at all, and the one where students learn to look at a stuck program instead of restarting it.
The fix is four lines; the time goes into `ps` and GDB, and that is the intended use of it.

## Expected answers

Both locks taken in an order that does not depend on the direction of the transfer: by address, as in the reference, with `from < to`.
The unlock order does not matter.

## Things students get wrong

* **Fixing it before looking at it.**
  Many will know "lock ordering" from the lecture and type it in at once.
  Ask for the drawing of step 3 of the task anyway: which thread, which lock, held or wanted.
* **`gdb -p $(pidof chall)`.**
  Refused: `ptrace_scope` is 1 on Ubuntu, so only a parent may trace.
  The task says to start the program from GDB, `run 0`, then Ctrl-C.
* **Unlocking `from` before locking `to`.**
  No deadlock, and the flag, because the final balances do not show it.
  For a moment the money is in neither account; `FURTHER.md` has a question about a total that makes this visible.
  Do not accept it: the comment at the top of `bank.c` says why a transfer holds both locks.
* **A global lock.**
  The flag.
  The task asks to keep one mutex per account; the last check of the README is the discussion.
* **Ordering by something that is the same for both**, or comparing `from->balance`.
  Balances change.
* **Reading the backtrace wrong**: "thread 2 holds `to`".
  A thread at line 62 is waiting for `to` and holds `from`.

## Verified reference values

| Fact | Value |
| --- | --- |
| Skeleton | time-out on every run, within the first transfers |
| `ps -L` on the stuck program | 9 threads, all `Sl`, 0.0 % CPU, `futex_wait_queue` |
| Reference, `make test` | the flag, 20 runs out of 20; 0.06 to 0.08 s a run |
| One global mutex | the flag; 0.06 to 0.07 s |
| `trylock` and back off, 20 runs | 20 flags; 0.08 to 0.10 s, `user` about 0.2 s |
| Proof passed to `flag_print()` | 799992, 1257144, 685712, 1257152 |

## Practical notes

* The frame number of `bank_transfer()` in the backtrace is 4 with glibc 2.41; it can differ with another version, so tell students to look for the function name.
* GDB may ask about `debuginfod`; answer `n`.
* `./chall 0` has to be killed by hand: `kill $(pidof chall)`.
* `flag.h` is regenerated with `../utils/gen_flag.py flag 799992 1257144 685712 1257152 > flag.h`.

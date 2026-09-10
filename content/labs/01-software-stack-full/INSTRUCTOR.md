# Instructor Notes: Session 01 — The Software Stack

Notes for preparing and running the session.
Per-task notes are in `INSTRUCTOR.md` inside each task directory.

## Shape of the session

Demos first, together with the class; then core exercises, individually or in teams; bonuses for those who finish or as take-home work.

Not all demos need to be presented — pick what fits the pace of your group.
Deliberately no fixed minute budget is published to students: groups move at different speeds and different assistants prefer different rhythms.

If you present only one demo, make it **`demo-printf-vs-write`**.
It reaches the session's central idea fastest and sets up the system-call discussion that opens session 02.

## The through-line

Three tasks make the same argument with different material, and saying so explicitly helps it land:

1. **`demo-printf-vs-write`** — the buffered library beats the raw system call, because it *avoids* the expensive operation rather than doing it faster.
1. **`demo-copy-string`** and **`01-string-functions`** — hand-tuned SIMD in glibc's `strcat` cannot beat keeping track of a length, because the missing length is a property of the *interface*, not the implementation.
1. **`bonus-static-vs-dynamic`** — static linking wins both benchmarks and is still the wrong default, because the cost that matters is not the one being timed.

In each case the naive question ("which is faster?") has no answer.
The useful question is "which cost am I choosing to pay?".
Students who leave with only that are in good shape.

## Dependencies between tasks

* `bonus-static-vs-dynamic` needs a **working** `01-string-functions` solution: the student copies their own `mystring.c` / `mystring.h` into it.
  `main.c` there does not check correctness, so a broken `my_strcat` still produces plausible timings.
  Confirm `make test` passed first.
* `bonus-per-stream-cipher-exec` reuses the commands from `02-stream-ciphers` and assumes they are fresh.

## Measurement discipline

Two of the tasks are timing-sensitive and both are easy to get wrong:

* **Always redirect output to `/dev/null`** in `demo-printf-vs-write`, or the terminal is being timed.
* **Interleave and repeat** in `bonus-static-vs-dynamic`; the effect is smaller than run-to-run noise.
  The standard to insist on is that ranges for two binaries must not overlap.

All published numbers are Ubuntu 24.04 / gcc 13.3 / x86-64.
Insist on ratios and on the shape of a column, never on digits.
On loaded lab machines or shared VMs the `bonus-static-vs-dynamic` numbers may be unusable; fall back to discussing the reference numbers.

## Build flags that are load-bearing

* `01-string-functions` compiles with **`-fno-builtin`**.
  Without it GCC recognises the standard function names, inlines or folds them, and the benchmark measures the compiler.
* `demo-printf-vs-write` compiles at **`-O0`**.
  Higher levels may turn `printf("%s", line)` into `fputs`, muddying the comparison.
* Separate `.o` files in `01-string-functions` prevent cross-file inlining, so `bench.c` really makes a call.

## Errata worth knowing before you teach

* **Vigenere is not self-inverse.** Older material claimed running it twice with the same key returns the plaintext.
  It does not — `./cipher vigenere key "Rijvs, Uyvjn!"` gives `Bmhfw, Sizhx!`.
  Decryption needs the inverse key `qwc`.
  Affects `02-stream-ciphers` and `bonus-per-stream-cipher-exec`.
* **`copy-string-improved.c` offsets are 6, 6, 8.** An earlier version used 6, 6, 7 and silently built a *different* string than the `strcat` version it was compared against.
  If a student's numbers look too good, check the offsets.

## Failures to let students hit

Two error messages in this session are worth more than any explanation, so do not pre-empt them:

* `error while loading shared libraries: libcipher.so` in `02-stream-ciphers` — the `-L` versus loader-path confusion, which they will meet for the rest of their careers.
* The `setvbuf` reversal in `demo-printf-vs-write` — let the class commit to "`write` is faster, obviously" before commenting out one line.

# Instructor Notes: Implement `strlen`, `strcpy`, `strcat`, `memcpy`

## What students touch

Only `mystring.c`.
`mystring.h`, `test_mystring.c`, `bench.c` and the `Makefile` are provided and should not be modified.

## Common mistakes

* **Forgetting to copy the `'\0'` in `my_strcpy`.**
  The result is not a string.
  The test suite catches it, but the error message is easier to interpret if students already know to look for it.
* **Returning the wrong pointer.**
  `strcpy` and `strcat` return `dest`, not the end of it.
  Easy to overlook and explicitly checked.
* **Dereferencing `void *` in `my_memcpy`.**
  This does not compile, which is the useful outcome: it forces the `unsigned char *` conversation.
  `unsigned char` is the right type because it is exactly one byte with no padding or trap representations.
* **`n == 0` in `my_memcpy`.**
  `while (n-- > 0)` handles it without a special case; `while (n--)` written with a signed type does not.

The test suite pre-fills every buffer with `0xAA` and guards the region past the writable area, so overruns are caught rather than silently tolerated.

## Sequencing

Insist on `make test` passing before `make bench` is run at all.
Timing a wrong answer is not a measurement, and the benchmark will happily produce a beautiful table for broken code.

## Reading the benchmark table

The absolute numbers are irrelevant and vary by machine.
Two things matter:

1. **`my_strcat` takes 4× longer every time N doubles.** That is the signature of O(N²).
   `my_memcpy` merely doubles: O(N).
1. **The ratio column grows without bound.** It is not a constant.
   That is what "different complexity" means, and it is the sentence students should leave with.

Point at the `libc strcat` column deliberately.
It is hand-written SIMD, ~18× faster than the naive loop, and *still* 4× per doubling.
A better constant factor cannot buy a better algorithm.

## Practical notes

* `-fno-builtin` in the `Makefile` is load-bearing.
  Without it GCC recognises the standard function names and inlines or folds them, and the benchmark measures the compiler.
* Each translation unit is compiled to a separate `.o` on purpose, so `bench.c` really calls into `mystring.c` the way a library call works, with no cross-file inlining.
* The largest N takes a couple of seconds; if hardware is slow, drop the last row rather than the whole run — the shape needs at least four or five doublings to be convincing.

## Where this leads

`bonus-static-vs-dynamic` reuses the student's `mystring.c` directly, so a working solution here is a prerequisite for that bonus.

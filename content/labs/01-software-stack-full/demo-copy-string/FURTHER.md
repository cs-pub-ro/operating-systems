# Going Further: Copy String

## Things to try

1. Increase the number of fragments from 4 to 16 and rerun both.
   Does the ratio stay the same?
   Predict first.

   The ratio grows.
   `strcat`'s rescanning cost is quadratic in the *number of fragments*, while the `strcpy` version stays linear, so adding fragments hurts one program much more than the other.

1. Replace the hardcoded offsets in `copy-string-improved.c` with a running `size_t len` variable updated after each `strcpy()`.
   Same speed?
   Why?

   Essentially the same.
   Tracking the length in a variable is exactly what `strcat` cannot do, and it costs one addition per call.
   The lesson is that the fix is *keeping* the length, not hardcoding it.

1. Compile both with `-O2` and rerun.
   GCC knows what `strcat` and `strcpy` mean and may fold constant-length copies away entirely.
   Check the disassembly before believing a suspiciously fast result.

1. Rewrite `copy-string-improved` using `memcpy()` and a single trailing `'\0'`.
   Is it faster still?

   Slightly: `memcpy` is told the length outright, so it need not test every byte for the terminator, and glibc's version is heavily vectorised.

## Discussion points

* `strcat(dst, src)` cannot know where `dst` ends, because a C string does not carry its length.
  So it looks — on every single call.
  Across the four calls that is 38 characters scanned to write 25, repeated 100 000 000 times.
* The improved version is not using a faster function.
  It is using the *same* library, having simply declined to throw away information it already had.
* For four fragments this is a constant-factor win.
  The exercise `01-string-functions` scales the same idea up until the constant factor becomes a complexity class: appending N chunks in a loop is O(N²).
* The offsets are the accumulated lengths of the *preceding* fragments: 6, then 6, then 8.
  Getting one wrong produces a wrong string rather than a crash, which is worth pointing out — it is the kind of bug that survives testing.

## References

* `man 3 strcat`, `man 3 strcpy`, `man 3 memcpy`
* Joel Spolsky, [Back to Basics](https://www.joelonsoftware.com/2001/12/11/back-to-basics/) — the origin of the "Shlemiel the painter" description of repeated `strcat`

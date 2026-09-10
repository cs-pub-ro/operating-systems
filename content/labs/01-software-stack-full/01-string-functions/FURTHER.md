# Going Further: Implement `strlen`, `strcpy`, `strcat`, `memcpy`

## Questions to answer

* You append 1000 chunks and it takes 2 ms.
  Roughly how long for 4000?

  About 32 ms.
  Two doublings, each costing 4×.
  Reading this off the table rather than guessing is the point of the exercise.

* Why can `memcpy` copy through an embedded `'\0'` when `strcpy` cannot?

  `memcpy` is told `n` and stops when it has copied that many bytes.
  `'\0'` is just another byte to it.
  `strcpy` has no length parameter, so the terminator is the *only* thing that can stop it.

* glibc's `strcat` is hand-tuned assembly and is still far slower than the byte-at-a-time `my_memcpy` column.
  Explain that in one sentence.

  It has a much better constant factor but the same complexity, because the missing length is a property of the interface rather than of the implementation.

## Things to try

1. Remove `-fno-builtin` from the `Makefile` and rerun `make bench`.

   Several columns collapse.
   GCC recognises the standard names and replaces calls with inline SIMD, or folds constant-length cases away at compile time.
   `objdump -d` shows there is no call left to measure.
   The benchmark is then measuring the compiler, which is why the flag is there.

1. Implement `my_strncpy`, then read `strncpy(3)` carefully.

   It does not null-terminate when the source is at least `n` bytes long, and it pads with `'\0'` to the full `n` when the source is shorter.
   Both behaviours surprise people, and both cause real bugs.

1. Implement `my_memmove` and construct an input for which `my_memcpy` gives the wrong answer.

   Overlapping regions copied forwards, e.g. `memcpy(buf + 1, buf, 10)`.
   The first bytes written clobber source bytes not yet read.
   `memmove` copies backwards when the regions overlap that way.

1. Time `my_strlen` against glibc's `strlen` on a 1 MB string.

   glibc wins by roughly an order of magnitude, reading many bytes per instruction.
   That is what a constant factor *can* buy — and the benchmark table shows what it cannot.

## Discussion points

* The benchmark, not the four functions, is the content of this exercise.
  The functions take ten minutes; the table is what students should leave with.
* A C string does not carry its length.
  That is a property of the **interface**.
  No rewrite of `strcat` can fix it, which is why the `libc strcat` column still grows 4× per doubling despite being ~18× faster in absolute terms.
* The `my_memcpy` column is not faster because `memcpy` is a better function.
  It is faster because the *caller* tracks the offset and never has to search.
  The fix was to stop throwing information away.
* Same shape of argument as `demo-printf-vs-write`: the winner is decided by what work is *avoided*, not by how fast the work is done.

## References

* `man 3 strlen`, `man 3 strcpy`, `man 3 strcat`, `man 3 memcpy`, `man 3 memmove`
* Joel Spolsky, [Back to Basics](https://www.joelonsoftware.com/2001/12/11/back-to-basics/) — "Shlemiel the painter's algorithm"

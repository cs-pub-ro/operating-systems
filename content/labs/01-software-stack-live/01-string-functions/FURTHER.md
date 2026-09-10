# Going Further: Implement `strlen`, `strcpy`, `strcat`, `memcpy`

Optional.
Work through these once `make test` passes and you have read the benchmark table.

## Questions to answer

* You append 1000 chunks and it takes 2 ms.
  Roughly how long for 4000?
  Read the answer off the benchmark table rather than guessing.
* Why can `memcpy` copy through an embedded `'\0'` when `strcpy` cannot?
* glibc's `strcat` is written in hand-tuned assembly, and in the benchmark it is still far slower than your byte-at-a-time `my_memcpy` column.
  Explain that in one sentence.

## Things to try

1. Remove `-fno-builtin` from the `Makefile` and rerun `make bench`.
   Several columns will collapse.
   Use `objdump -d` to find out what the compiler did before you conclude that the code got faster.
1. Implement `my_strncpy`, then read `strncpy(3)` carefully.
   It does not do what most people assume, and the difference is a classic source of bugs.
1. Implement `my_memmove` and construct an input for which `my_memcpy` gives the wrong answer but `my_memmove` does not.
1. Time `my_strlen` against glibc's `strlen` on a 1 MB string.
   The ratio is a good illustration of what a better constant factor *can* buy — and the benchmark table shows what it cannot.

## Discussion points

The benchmark is the interesting part of this exercise, not the four functions.

* A C string does not carry its length.
  That is a property of the **interface**, not of any implementation.
  No rewrite of `strcat` can fix it, which is why the `libc strcat` column still grows 4× per doubling despite being ~18× faster in absolute terms than the naive loop.
* The `my_memcpy` column is not faster because `memcpy` is a better function.
  It is faster because the *caller* keeps track of the offset and therefore never has to search for the end.
  The fix was to stop throwing information away.
* This is the same shape of argument as the `printf` vs `write` demo: the winner is decided by what work is *avoided*, not by how fast the work is done.

## References

* `man 3 strlen`, `man 3 strcpy`, `man 3 strcat`, `man 3 memcpy`, `man 3 memmove`
* Joel Spolsky, [Back to Basics](https://www.joelonsoftware.com/2001/12/11/back-to-basics/) — "Shlemiel the painter's algorithm"

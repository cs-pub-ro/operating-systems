# Going Further: Implement `strlen()`, `strcpy()`, `strcat()`, `memcpy()`

## Questions to answer

* Why can `memcpy()` copy through an embedded `'\0'` when `strcpy()` cannot?

  `memcpy()` is told `n` and stops when it has copied that many bytes.
  `'\0'` is just another byte to it.
  `strcpy()` has no length parameter, so the terminator is the *only* thing that can stop it.

* You append a 16-byte chunk to an initially empty string, 1000 times in a row.
  Roughly how many bytes does `my_strcat()` read just to find where to write?
  And for 2000 appends?

  Call *i* scans the `16 × i` bytes already there, so the total is `16 × (0 + 1 + … + 999)` ≈ `8 × 1000²` = 8 million bytes.
  For 2000 appends it is ≈ 32 million: twice the work produces four times the scanning.
  That is the signature of a quadratic loop, and [`demo-copy-string`](../demo-copy-string) measures it.

* What does `my_strcat()` do if `dest` does not have room for `src`?
  Who is responsible for preventing that?

  It writes past the end of `dest` regardless: it has no way of knowing how large `dest` is.
  The caller is responsible, which is why `strcat()` is a classic source of buffer overflows and why bounded variants exist.

## Things to try

1. Add checks of your own to `main.c`.

   Good candidates are the ones the provided checks miss: `my_strlen("ab\0cd")` must return 2; five `my_strcat()` calls in a row must build `"ababababab"`; `my_memcpy(buf + 3, "xy", 2)` must leave `buf[0]` to `buf[2]` untouched.
   Pre-filling `buf` with a byte such as `0xAA` (`memset(buf, 0xAA, sizeof(buf))`) and checking that the bytes past the copied area still hold it catches functions that write too much.

1. Implement `my_strncpy()`, then read `strncpy(3)` carefully.

   It does not null-terminate when the source is at least `n` bytes long, and it pads with `'\0'` to the full `n` when the source is shorter.
   Both behaviours surprise people, and both cause real bugs.

1. Implement `my_memmove()` and construct an input for which `my_memcpy()` gives the wrong answer.

   Overlapping regions copied forwards, e.g. `my_memcpy(buf + 1, buf, 10)`.
   The first bytes written clobber source bytes not yet read.
   `memmove()` copies backwards when the regions overlap that way.

1. Add `printf("%zu\n", strlen("hello"));` to `main()` and look for a call to `strlen()` with `objdump -dr main.o`.

   There is none, even without optimisation: GCC treats `strlen()` as a builtin and computes the length of a string literal at compile time.
   With `-fno-builtin` in `CFLAGS`, the call (an `R_X86_64_PLT32` relocation against `strlen`) reappears.
   This is why benchmarks of libc functions have to be built with `-fno-builtin`: otherwise they measure the compiler.

## Discussion points

* A C string does not carry its length.
  That is a property of the **interface**.
  No rewrite of `strcat()`, however well tuned, can stop it from searching for the end of `dest`.
* Keeping the length is the fix.
  A caller that tracks the offset never has to search: the information was there all along and the interface threw it away.
* Same shape of argument as `demo-printf-vs-write`: the winner is decided by what work is *avoided*, not by how fast the work is done.

## References

* `man 3 strlen`, `man 3 strcpy`, `man 3 strcat`, `man 3 memcpy`, `man 3 memmove`, `man 3 strncpy`
* Joel Spolsky, [Back to Basics](https://www.joelonsoftware.com/2001/12/11/back-to-basics/) — "Shlemiel the painter's algorithm"

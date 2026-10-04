# Going Further: Implement `strlen()`, `strcpy()`, `strcat()`, `memcpy()`

Optional.
Work through these once every check in `./main` passes.

## Questions to answer

* Why can `memcpy()` copy through an embedded `'\0'` when `strcpy()` cannot?
* `my_strcat()` has to find the end of `dest` before it can copy anything.
  You append a 16-byte chunk to an initially empty string, 1000 times in a row.
  Roughly how many bytes does `my_strcat()` read in total just to find where to write?
  And for 2000 appends?
* What does `my_strcat()` do if `dest` does not have room for `src`?
  Who is responsible for preventing that: the function or its caller?

## Things to try

1. Add checks of your own to `main.c`: a string with an embedded `'\0'` for `my_strlen()`, five `my_strcat()` calls in a row, a `my_memcpy()` to `buf + 3` that must leave `buf[0]` to `buf[2]` untouched.
1. Implement `my_strncpy()`, then read `strncpy(3)` carefully.
   It does not do what most people assume, and the difference is a classic source of bugs.
1. Implement `my_memmove()` and construct an input for which `my_memcpy()` gives the wrong answer but `my_memmove()` does not.
1. Add `printf("%zu\n", strlen("hello"));` to `main()`, rebuild, and look for a call to `strlen()` with `objdump -dr main.o`.
   Is there one?
   Now add `-fno-builtin` to `CFLAGS` in the `Makefile`, rebuild, and look again.

## References

* `man 3 strlen`, `man 3 strcpy`, `man 3 strcat`, `man 3 memcpy`, `man 3 memmove`, `man 3 strncpy`
* Joel Spolsky, [Back to Basics](https://www.joelonsoftware.com/2001/12/11/back-to-basics/) — "Shlemiel the painter's algorithm"

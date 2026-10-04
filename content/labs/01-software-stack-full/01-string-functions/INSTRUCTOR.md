# Instructor Notes: Implement `strlen()`, `strcpy()`, `strcat()`, `memcpy()`

## What students touch

`mystring.c` and `main.c`.
Each has four `TODO` sections, numbered to match: `TODO 1` is `my_strlen()` in both files, and so on.
`mystring.h` and the `Makefile` are provided and should not be modified.

Push for one function at a time: implement, call, `make`, `./main`, then move to the next.
Students who write all four before building get a wall of failures and no idea which one to look at first.

## Common mistakes

* **Calling the libc function instead of their own in `main.c`.**
  `len = strlen("hello")` passes the check just as well as `len = my_strlen("hello")`.
  Glance at `main.c` before accepting "all passed".
* **Forgetting to copy the `'\0'` in `my_strcpy()`.**
  The result is not a string.
  The empty-string check catches it (`buf` stays `"abcde"`), but the `"hello"` check does not: `"hello"` exactly overwrites `"abcde"`, whose terminator is already in place.
  A student whose first check fails and second passes has usually made this mistake.
* **Returning the wrong pointer.**
  `strcpy()` and `strcat()` return `dest`, not the end of it.
  Easy to overlook, and every check tests `ret == buf`.
* **Dereferencing `void *` in `my_memcpy()`.**
  This does not compile, which is the useful outcome: it forces the `unsigned char *` conversation.
  `unsigned char` is the right type because it is exactly one byte with no padding or trap representations.
* **`n == 0` in `my_memcpy()`.**
  `while (n-- > 0)` handles it without a special case; `while (n--)` written with a signed type does not.

## The `TODO 4` checks

`4a`, `4b` and `4c` share one buffer and build on each other.
`4c` compares 8 bytes after copying 7, and passes only because `buf` was zero-initialised past the `"a"` it started with.
Students sometimes read this as a bug in the check; it is a good prompt to ask which byte the 8th one is and where it came from.

## The point to land

The four functions are a few lines each.
What students should leave with is the cost hidden in `my_strcat()`: it rescans `dest` on every call, so appending in a loop is quadratic.
Ask "how much work is step 1 of `my_strcat()`, and does it depend on `dest` or on `src`?" — the comment in the skeleton asks the same thing.
`demo-copy-string` is where that cost is measured; if it was not run at the start of the session, this is the moment to point back at it.

## Where this leads

`bonus-static-vs-dynamic` reuses the student's `mystring.c` directly, so a working solution here is a prerequisite for that bonus.

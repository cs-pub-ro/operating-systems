# Exercise: Implement `strlen()`, `strcpy()`, `strcat()`, `memcpy()`

**Tools:** GCC, Make

## Goal

Reference solution and explanation for the string-functions exercise in [`01-string-functions`](../../01-software-stack-live/01-string-functions).
Implement four of the C library's string functions from scratch, `strlen()`, `strcpy()`, `strcat()` and `memcpy()`, and check each one from `main()` as it is written.

Two files differ from the work directory:

* `mystring.c` holds the four implementations.
* `main.c` holds the calls that fill in its `TODO` sections.

`mystring.h` and the `Makefile` are provided and are not modified.

## Background

A C string is a byte sequence terminated by `'\0'` and it does **not** carry its length.
Any function that needs the length has to go and find it, byte by byte.
This is a property of the *interface*, not of any implementation, which is why it cannot be optimised away.

`memcpy()` is the counterexample in the same header: it is told `n`, knows nothing about `'\0'`, and therefore never has to search for anything.

The program is built from two separately compiled object files, `mystring.o` and `main.o`, linked into the `main` executable.
`main.c` includes `mystring.h` for the declarations; the definitions only meet the calls at link time.

## Build & Run

```console
make
./main
```

The work is done one function at a time: implement the `TODO` in `mystring.c`, fill in the matching `TODO` in `main.c`, then rebuild and rerun.
The checks in `main.c` compare against fixed expected values, so calling the libc function alongside yours, as the task suggests, is a way of seeing the expected value for yourself rather than a requirement.

## Results and Explanations

### The output

With all four functions implemented and all calls filled in:

```text
 [PASSED] strlen: empty string
 [PASSED] strlen: hello string
 [PASSED] strcpy: empty string
 [PASSED] strcpy: hello string
 [PASSED] strcat: empty string
 [PASSED] strcat: hello string
 [PASSED] memcpy: def byte array
 [PASSED] memcpy: def string
 [PASSED] memcpy: defghij string
```

Before anything is filled in, every line reads `[FAILED]`: the variables the checks look at are initialised to values that cannot pass (`len = 0xFF`, `ret = NULL`, `buf = "abcde"`).
This is deliberate, so a check passes only once the call that should change its variable has actually been made.

### The four functions

**`my_strlen()`** walks to the `'\0'` and returns the distance covered.
The terminator is not counted, so the loop stops *on* it rather than after it.

**`my_strcpy()`** puts the assignment in the loop condition:

```C
while ((*d++ = *src++) != '\0')
	;
```

The byte is copied first and the copied value tested second, so the `'\0'` is written and *then* ends the loop.
Copying the terminator is what makes `dest` a string rather than a pile of bytes.
The return value is `dest`, not the end of it — easy to get wrong, and every check in `main.c` tests `ret == buf` for exactly that reason.

**`my_strcat()`** finds the end of `dest` and copies `src` there:

```C
my_strcpy(dest + my_strlen(dest), src);
```

One line, and it hides a cost — see below.

**`my_memcpy()`** takes typed pointers first, because `void *` can be neither dereferenced nor advanced:

```C
unsigned char *d = dest;
const unsigned char *s = src;

while (n-- > 0)
	*d++ = *s++;
```

`unsigned char` is the right choice: exactly one byte, no padding and no trap representations.
`n` is the only stopping condition, so an embedded `'\0'` is copied straight through, and `while (n-- > 0)` handles `n == 0` without a special case.

### The calls in `main.c`

Each `TODO` is one call, stored in the variable the following check reads:

```C
len = my_strlen("hello");
ret = my_strcpy(buf, "hello");
ret = my_strcat(buf, "hello");
ret = my_memcpy(buf, "def", 4);
```

The three `my_memcpy()` checks build on each other, in the same buffer:

* `TODO 4a` copies 3 bytes of `"def"`: the letters only, no terminator.
* `TODO 4b` copies 4 bytes, which includes the `'\0'` of the literal `"def"`, so `buf` now holds a string.
* `TODO 4c` copies 7 bytes of `"defghij"`, overwriting that `'\0'`.
  The check compares 8 bytes, and passes because `buf[7]` was zero from the initialiser: `my_memcpy()` wrote exactly 7 bytes and did not need to.

### What `my_strcat()` costs

`my_strlen(dest)` rescans the whole of `dest` on **every** call, because a C string does not carry its length.
Appending a 16-byte chunk to an initially empty string, call *i* first walks `16 × i` bytes to find where to write 16 more.
Appending N chunks scans ≈ `8N²` bytes in order to copy `16N` bytes of data: the loop is quadratic, not linear.

The fix is not a faster loop — it is not throwing the length away.
A caller that remembers the offset itself and uses `my_memcpy()` (or `my_strcpy()`) at that offset does linear work.
[`demo-copy-string`](../demo-copy-string) measures exactly this difference.

## References

* `man 3 strlen`, `man 3 strcpy`, `man 3 strcat`, `man 3 memcpy`, `man 3 memmove`
* Joel Spolsky, [Back to Basics](https://www.joelonsoftware.com/2001/12/11/back-to-basics/) — "Shlemiel the painter's algorithm"

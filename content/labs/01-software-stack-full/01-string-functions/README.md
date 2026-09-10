# Exercise: Implement `strlen`, `strcpy`, `strcat`, `memcpy`

**Tools:** GCC, Make

## Goal

Reference solution and explanation for the string-functions exercise in [`01-string-functions`](../../01-software-stack-work/01-string-functions).
The point of the exercise is not the four functions themselves — they are a few lines each — but what the benchmark then shows about `strcat()`.

Only `mystring.c` differs from the work directory.
`mystring.h`, `test_mystring.c`, `bench.c` and the `Makefile` are provided and are not modified.

## Background

A C string is a byte sequence terminated by `'\0'` and it does **not** carry its length.
Any function that needs the length has to go and find it.
This is a property of the *interface*, not of any implementation, which is why it cannot be optimised away.

`memcpy()` is the counterexample in the same header: it is told `n`, knows nothing about `'\0'`, and therefore never has to search for anything.

The `Makefile` compiles with `-fno-builtin`.
Without it, GCC recognises `strlen`/`strcpy`/`memcpy` by name and will happily replace calls with inline SIMD or fold them away at compile time — which would measure the compiler, not the code.
Each translation unit is also compiled to a separate `.o` on purpose, so that `bench.c` really does call into `mystring.c` the way a library call works, with no cross-file inlining.

## Build & Run

```console
make test     # correctness
make bench    # then, and only then, speed
```

## Results and Explanations

### The four functions

**`my_strlen`** walks to the `'\0'` and returns the distance covered.
The terminator is not counted, so the loop stops *on* it rather than after it.

**`my_strcpy`** puts the assignment in the loop condition:

```C
while ((*d++ = *src++) != '\0')
	;
```

The byte is copied first and the copied value tested second, so the `'\0'` is written and *then* ends the loop.
Copying the terminator is what makes `dest` a string rather than a pile of bytes.
The return value is `dest`, not the end of it — easy to get wrong, and the test suite checks it.

**`my_strcat`** finds the end of `dest` and copies `src` there:

```C
my_strcpy(dest + my_strlen(dest), src);
```

One line, and it hides the whole point of the exercise — see below.

**`my_memcpy`** takes typed pointers first, because `void *` can be neither dereferenced nor advanced.
`unsigned char` is the right choice: exactly one byte, no padding and no trap representations.
`n` is the only stopping condition, so an embedded `'\0'` is copied straight through, and `while (n-- > 0)` handles `n == 0` without a special case.

### Why `my_strcat` is quadratic

`my_strlen(dest)` rescans the whole of `dest` on **every** call, because a C string does not carry its length.
By call *i* the string is already `16 × i` bytes long, so each call walks `16 × i` bytes just to find where to write 16 more.
Appending N chunks scans ≈ `8N²` bytes in order to copy `16N` bytes of data.

The fix is not a faster loop — it is not throwing the length away, which is exactly what the `my_memcpy` variant in `bench.c` does by tracking the offset itself.

### `make test`

```text
25/25 checks passed
All good. Now run: make bench
```

Every buffer in `test_mystring.c` is pre-filled with `0xAA` and has a guard area after the region the function is allowed to touch, so the tests also catch writing too much.

### `make bench`

Measured on one machine (times in ms; your numbers will differ, **the shape is the point**):

```text
       N     my_strcat     my_memcpy   libc strcat   libc memcpy     ratio
                                                                   cat/cpy
    1000         2.20          0.02          0.12          0.00      144.8x
    2000         8.51          0.03          0.41          0.00      291.9x
    4000        33.98          0.06          2.05          0.00      563.5x
    8000       124.42          0.10          6.13          0.00     1210.6x
   16000       479.91          0.24         28.07          0.01     1993.1x
   32000      1816.86          0.39         99.57          0.01     4713.7x
```

`my_strcat` takes 4× longer every time N doubles — the signature of O(N²).
`my_memcpy` merely doubles: O(N).
The ratio column is not a constant but grows without bound, which is what "different complexity" means.

Note the `libc strcat` column: hand-written, SIMD, about 18× faster than the byte loop — and *still* 4× per doubling.
A better constant factor cannot buy a better algorithm, because the missing length is a property of the interface, not of the implementation.

## References

* `man 3 strlen`, `man 3 strcpy`, `man 3 strcat`, `man 3 memcpy`, `man 3 memmove`
* Joel Spolsky, [Back to Basics](https://www.joelonsoftware.com/2001/12/11/back-to-basics/) — "Shlemiel the painter's algorithm"

# Exercise: Implement `strlen`, `strcpy`, `strcat`, `memcpy`

**Tools:** GCC, Make

## Goal

Implement four of the C library's string functions yourself, from scratch, and then measure them.
Afterwards you will be able to explain why appending to a C string in a loop is quadratic, and why no amount of hand-tuned assembly can fix that.

## Background

A C string is a sequence of bytes terminated by `'\0'`.
It does **not** carry its own length: nothing in the representation says where the string ends except the terminator itself.
Every function that needs the length must therefore go and find it, byte by byte.

`memcpy()` is different: it is told how many bytes to copy, knows nothing about `'\0'`, and takes `void *` rather than `char *`.

## Your Task

Open `mystring.c` and fill in the four TODOs.
That is the only file you change.

| Function | What it must do |
| --- | --- |
| `my_strlen` | Length up to, not including, the `'\0'` |
| `my_strcpy` | Copy a string, `'\0'` included; return `dest` |
| `my_strcat` | Append to the string already in `dest`; return `dest` |
| `my_memcpy` | Copy exactly `n` bytes; knows nothing about `'\0'`; return `dest` |

1. **Do not call anything from `<string.h>`** — that is the whole point.
   The header is deliberately not included.
1. `my_strcpy` must copy the `'\0'` as well, otherwise `dest` is not a string.
1. `my_memcpy` receives `void *`, which you can neither dereference nor advance.
   Assign it to an `unsigned char *` first.
1. Check the return values against the man pages: `strlen(3)`, `strcpy(3)`, `strcat(3)`, `memcpy(3)`.
   They are easy to get wrong and the test suite checks them.

## Build & Run

Write a couple of tests of your own first, then run the provided suite:

```console
make test
```

Once every check passes, measure:

```console
make bench
```

Both benchmarked columns append the same 16-byte chunk N times, one using `my_strcat`, the other using `my_memcpy` with an offset the caller tracks itself.

## Check Your Work

`make test` reports a count of passed checks and refuses to be quiet about failures.
All of them must pass before the benchmark means anything: timing a wrong answer is not a measurement.

In `make bench`, look at the *shape* of each column as N doubles, not at the absolute numbers.
One of the two columns should grow much faster than the other.
Work out from the measurement, on your own, what the growth factor per doubling is for each, then decide which complexity class each one belongs to.
Discuss your reading of the table with the teaching assistant — the numbers themselves differ from machine to machine, the conclusion does not.

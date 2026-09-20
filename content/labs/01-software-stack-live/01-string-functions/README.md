# Exercise: Implement `strlen()`, `strcpy()`, `strcat()`, `memcpy()`

**Tools:** GCC, Make

## Goal

Implement four of the C library's string functions yourself, from scratch: `strlen()`, `strcpy()`, `strcat()`, `memcpy()`.

## Background

A C string is a sequence of bytes terminated by `'\0'`.
It does **not** carry its own length: nothing in the representation says where the string ends except the terminator itself.
Every function that needs the length must therefore go and find it, byte by byte.

`memcpy()` is different: it is told how many bytes to copy, knows nothing about `'\0'`, and takes `void *` rather than `char *`.

## Directory Contents

- `my_string.c`: where to implement the four string functions.
- `my_string.h`: header file with the declaration of the functions in `my_string.c`, included in `main.c`.
- `main.c`: contains the `main()` function where to implement calls (and tests) to the four string functions.
- `Makefile`: build the program.
- `README.md`: this file.
- `FURTHER.md`: optional further exercises and instructions, to be worked on either at home or, if time allows it, after the lab session.

## Build & Run

Build with:

```console
make
```

Run with:

```console
./main
```

Initially, the program will do nothing, as no functions are implemented.

## Your Tasks

Open `mystring.c` and `main.c` and fill in the four TODOs in each file.

Implement and test one function at a time.
Implement the function in `mystring.c`, implement the call and test in `main.c`.

1. Implement `my_strlen()` in the `TODO 1` section in `my_string.c`.
   It counts the number of characters up to, not including, the `NUL`-terminator (`\0`).

   Call `my_strlen()` (and `strlen()`) in the `TODO 1` section in `main.c`.
   Build and run the `
   Check to see if the result is the same.

1. Implement `my_strcpy()` in the `TODO 2` section in `my_string.c`.
   It copies the `src` string to the `dest` string, with the `NUL`-terminator included.
   It returns `dest`.

   Call `my_strcpy()` (and `strcpy()`) in the `TODO 2` section in `main.c`.
   Check to see if the result is the same.

1. Implement `my_strcat()` in the `TODO 3` section in `my_string.c`.
   It appends the `src` string to the `dest` string, with the `NUL`-terminator included.
   It returns `dest`.

   Call `my_strcat()` (and `strcat()`) in the `TODO 3` section in `main.c`.
   Check to see if the result is the same.

1. Implement `my_memcpy()` in the `TODO 4` section in `my_string.c`.
   It coppies exactly `n` bytes from `src` to `dest`.
   It returns `dest`.
   `my_memcpy` receives `void *`, which you can neither dereference nor advance.
   Assign it to an `unsigned char *` first.

   Call `my_memcpy()` (and `memcpy()`) in the `TODO 4` section in `main.c`.
   Check to see if the result is the same.

## Check Your Work

At the end, all TODOs are filled (both in `my_string.c` and in `main.c`).
And all tests in the `main()` function in `main.c` pass.

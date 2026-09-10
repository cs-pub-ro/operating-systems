# Bonus: Stream Ciphers — One Executable per Cipher

**Tools:** GCC, `ar`

## Goal

Split the combined cipher program into two independent programs, one per cipher, and build each of them in all four link formats.
This is the same linking exercise as before, but now you also decide *what goes into the library* — and that choice is visible in the result.

## Background

In [`02-stream-ciphers`](../02-stream-ciphers) a single executable handled both ciphers: `main.c` took the cipher name as its first argument and dispatched to `caesar()` or `vigenere()`.
Both cipher implementations were linked into every build, whether or not a given run used them.

Here, each program uses exactly one cipher, so its library should contain exactly one object file.

## Your Task

The cipher implementations `caesar.c` / `caesar.h` and `vigenere.c` / `vigenere.h` are already in this directory, unchanged.

1. Write `caesar_main.c`.
   Start from `main.c` in `02-stream-ciphers/`, include only `caesar.h`, and remove everything that refers to the Vigenere cipher.
   The program now takes two arguments, `<shift> <text>` — the cipher-name argument is gone, because there is nothing left to choose.

1. Write `vigenere_main.c` the same way, for `<key> <text>`.

1. Build the Caesar program from `caesar_main.c` and `caesar.c` in all four formats, named `caesar`, `caesar-static`, `caesar-dyn`, `caesar-static-lib`.
   The libraries are `libcaesar.so` and `libcaesar.a`, and they must contain only `caesar.o`.

1. Build the Vigenere program from `vigenere_main.c` and `vigenere.c` the same way, producing `vigenere`, `vigenere-static`, `vigenere-dyn`, `vigenere-static-lib`, `libvigenere.so` and `libvigenere.a`.

## Build & Run

```console
./caesar <shift> <text>
./vigenere <key> <text>
```

The `-dyn` variants need the loader to be told where your `.so` lives.

## Check Your Work

* All eight executables must run and produce correct output.
  Encrypt then decrypt and confirm you get the original text back.
* Argument handling changed: check that running an executable with the wrong number of arguments prints a usage message and exits with a non-zero status, rather than reading past the end of `argv`.
* Compare `nm libcaesar.a` with the equivalent from the previous exercise.
  The Vigenere symbols must not be there.
  If they are, you archived the wrong object files.
* Compare the sizes of `caesar-static` here and `cipher-static` from the previous exercise.
  Predict the direction of the difference before measuring, then explain the size you actually get.

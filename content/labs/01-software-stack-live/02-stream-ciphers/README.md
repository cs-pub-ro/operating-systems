# Exercise: Stream Ciphers — Four Ways to Link the Same Program

**Tools:** GCC, `ar`, `ldd`, `nm`

## Goal

Take one unchanged set of C source files and produce four different executables from it: dynamically linked, statically linked, linked against a shared library you build, and linked against a static library you build.
Afterwards you will know what `-L`, `-l`, `-fPIC`, `-shared`, `-static` and `ar` each contribute, and why `LD_LIBRARY_PATH` sometimes has to be set.

## Background

The code is already written and needs no changes:

* `caesar.c` / `caesar.h` — the `caesar()` function shifts every letter by a fixed integer offset.
* `vigenere.c` / `vigenere.h` — the `vigenere()` function shifts each letter by the value of the corresponding character of a repeating key.
* `main.c` — parses the command line and calls one of the two.

Applying Caesar with `-3` undoes Caesar with `3`.
Vigenere is not so obliging: this implementation only shifts forward, so decrypting needs a key whose letters are the additive inverses modulo 26 of the original key's letters.
Work out that inverse key yourself — it gives you a cheap correctness check for every executable you build.

Linking is what turns object files into a program.
The linker can copy the machine code it needs into the executable (static linking), or it can leave a note saying "find `caesar` at run time" and let the dynamic loader resolve it (dynamic linking).

## Your Task

Build the program four times, one per line of the table.
Use `gcc` directly, not a `Makefile` — the point is to see the commands.

| # | Result | Name to use |
| --- | --- | --- |
| 1 | Dynamically-linked executable, all sources compiled together | `cipher` |
| 2 | Statically-linked executable, all sources compiled together | `cipher-static` |
| 3 | Shared library `libcipher.so` from `caesar.c` + `vigenere.c`, then an executable from `main.c` linked against it | `cipher-dyn` |
| 4 | Static library `libcipher.a` from `caesar.c` + `vigenere.c`, then an executable from `main.c` linked against it | `cipher-static-lib` |

Hints, in the order you will need them:

1. `-static` asks for a fully statically linked executable.
1. A shared library needs `-fPIC` when compiling and `-shared` when linking.
1. A static library is built with `ar rcs libNAME.a obj1.o obj2.o` — `ar` is an *archiver*, not a linker.
1. `-L<dir>` tells the linker where to look; `-l<name>` asks for `lib<name>.so` or `lib<name>.a`.
   The `lib` prefix and the extension are supplied by the linker, which is why the file must be called `libcipher.a` and not `cipher.a`.
1. `-L` says nothing to the *run-time* loader.
   When `cipher-dyn` refuses to start, read the error message carefully before looking anything up.

## Build & Run

Every executable takes the same arguments, whichever way it was linked:

```console
./cipher caesar <shift> <text>
./cipher vigenere <key> <text>
```

Quote `<text>` if it contains spaces.
A negative `<shift>` decrypts.

## Check Your Work

* All four executables must produce byte-identical output for the same arguments.
  If one of them differs, you linked something you did not mean to link.
* Encrypt a sentence and then decrypt it; you must get the original back.
  Non-letter characters must pass through unchanged.
  If running Vigenere twice with the same key does not give you the original text, that is not a bug — re-read the *Background* section.
* Compare the four files with `ls -l` and with `ldd`.
  Two of them should list a `libc.so.6` dependency, one should list your own library as well, and one should not be a dynamic executable at all.
  Predict which is which *before* running `ldd`, then check.
* `nm -u cipher-dyn` should show at least one undefined symbol that `nm -u cipher-static-lib` does not.
  Explain to the teaching assistant what "undefined" means here and who is expected to define it.

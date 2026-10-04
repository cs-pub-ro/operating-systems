# Exercise: Stream Ciphers — Four Ways to Link the Same Program

**Tools:** GCC, Make, `ar`, `ldd`, `nm`

## Goal

Take one unchanged set of C source files and produce four different executables from it: dynamically linked, statically linked, linked against a shared library, and linked against a static library.
Then write the `Makefile` rules that build them.
Afterwards you will know what `-L`, `-l`, `-static` and `LD_LIBRARY_PATH` each contribute, without a walkthrough to follow.

## Background

The code is already written and needs no changes:

* `caesar.c` / `caesar.h` — the `caesar()` function shifts every letter by a fixed integer offset.
* `vigenere.c` / `vigenere.h` — the `vigenere()` function shifts each letter by the value of the corresponding character of a repeating key.
* `main.c` — parses the command line and calls one of the two.

Applying Caesar with `-3` undoes Caesar with `3`.
Vigenere is not so obliging: this implementation only shifts forward, so decrypting needs a key whose letters are the additive inverses modulo 26 of the original key's letters.
Work out that inverse key yourself — it gives you a cheap correctness check for every executable you build.

The `Makefile` already builds the two libraries from `caesar.c` and `vigenere.c`: the static `libcipherstatic.a` and the shared `libcipherdyn.so`.
They are built exactly the way `libxorstatic.a` and `libxordyn.so` were in [`02-xor-encryption`](../02-xor-encryption).

## Your Task

1. Build the libraries with `make`.
   Read the commands it prints, and look inside both libraries with `ar t`, `nm` and `nm -D`.

1. Build the program four times **by hand**, with `gcc`, one per line of the table:

   | # | Result | Name to use |
   | --- | --- | --- |
   | 1 | Dynamically-linked executable, all sources compiled together | `cipher` |
   | 2 | Statically-linked executable (`-static`), all sources compiled together | `cipher-static` |
   | 3 | Executable from `main.o`, linked against `libcipherdyn.so` | `cipher-dyn` |
   | 4 | Executable from `main.o`, linked against `libcipherstatic.a` | `cipher-static-lib` |

   For rows 3 and 4, use `-L.` and put `-l<name>` at the end of the command.
   Running `cipher-dyn` needs `LD_LIBRARY_PATH`; work out why from the error message before setting it.

1. Add a rule for each executable to the `Makefile`, in the `TODO 1` to `TODO 4` sections, then add the executables to `all` (`TODO 5`).
   Each rule lists the files the executable is built from as its prerequisites, and runs the command you typed by hand.

1. Check that the `Makefile` builds everything from scratch:

   ```console
   make clean
   make
   ```

## Build & Run

Every executable takes the same arguments, whichever way it was linked:

```console
./cipher caesar <shift> <text>
./cipher vigenere <key> <text>
```

Quote `<text>` if it contains spaces.
A negative `<shift>` decrypts.

For example:

```console
$ ./cipher caesar 13 solrulzforever
fbyehymsberire

$ ./cipher vigenere syscall solrulzforever
kmdtuwkxmjgvpc
```

## Check Your Work

* All four executables must produce byte-identical output for the same arguments.
  If one of them differs, you linked something you did not mean to link.
* Encrypt a sentence and then decrypt it; you must get the original back.
  Non-letter characters must pass through unchanged.
  If running Vigenere twice with the same key does not give you the original text, that is not a bug — re-read the *Background* section.
* Compare the four files with `ls -l` and with `ldd`.
  Predict, *before* running `ldd`, which of them depend on `libc.so.6`, which one also depends on `libcipherdyn.so`, and which one is not a dynamic executable at all.
  Then explain the sizes.
* `nm -u cipher-dyn` should show undefined symbols that `nm -u cipher-static-lib` does not.
  Explain to the teaching assistant what "undefined" means here and who resolves those symbols, and when.
* After `make clean`, a plain `make` builds both libraries and all four executables, and running `make` again rebuilds nothing.

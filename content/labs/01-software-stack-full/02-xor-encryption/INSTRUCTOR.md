# Instructor Notes: XOR Encryption — Build and Use a Library

## What this exercise is

A guided walkthrough, not a problem: the code and the `Makefile` are complete, and the README gives every command.
It exists so that `03-stream-ciphers` can be done unassisted.
Students who skip it tend to spend `03-stream-ciphers` guessing at flags.

The live README is longer than the usual limit, deliberately: it is a sequence of commands, and every one of them is there to be run.

## What to insist on

* **Read every error before moving on.**
  Three errors are part of the walkthrough, and each one teaches one thing:
  * `undefined reference to 'xor_encrypt'` from `gcc -o xor main.o` — somebody has to provide the definition.
  * `cannot find -lxorstatic` — the linker does not search `.` unless told to with `-L.`.
  * `undefined reference` again, with `-L. -lxorstatic` *before* `main.o` — the linker reads left to right.
* **The loader error is the point of the second half.**
  `./xor-dyn` fails with `error while loading shared libraries: libxordyn.so`.
  Let students read it and connect it to `-L.` before they reach `LD_LIBRARY_PATH` in the README.
* **`U` versus `T`.**
  Have students say out loud who resolves `xor_encrypt` in each executable, and when: the linker, at build time, for `xor-static-lib`; the loader, at every start, for `xor-dyn`.
  The `LD_DEBUG=bindings` line is the loader admitting to it.

## Things students get wrong

* Reusing `xor.o` for the shared library.
  On a distribution that builds PIE by default (Ubuntu does), `xor.o` is already position-independent, so `gcc -shared -o libxordyn.so xor.o` works and hides the reason for `-fPIC`.
  Worth a sentence: the separate `xor_pic.o` is there because it would not work everywhere.
* Expecting `file` to tell `xor-static-lib` and `xor-dyn` apart.
  Both are "dynamically linked" (against libc).
  The difference is visible only in `ldd` and `nm`.
* Expecting the wrong argument order to work for the `.so` and only fail for the `.a`.
  On Ubuntu, `--as-needed` is the default, so `-L. -lxordyn main.o` fails too.
  On distributions without it, it may link; the rule "libraries last" holds either way.

## Practical notes

* Ubuntu 25.04 / GCC 14.2 / x86-64 produced the reference output.
  Addresses, build IDs and the PID in the `LD_DEBUG` line will differ.
* The ciphertext of `"Hello, World!"` with key `key` contains `00` (`'e' ^ 'e'`), which is why `main.c` prints hex.
  A good question to ask if anyone wonders why it does not just print the string.
* Nothing here is timing-sensitive.

## Where this leads

`03-stream-ciphers` repeats the walkthrough with two source files instead of one, without the commands, and with the executable rules of the `Makefile` left to write.

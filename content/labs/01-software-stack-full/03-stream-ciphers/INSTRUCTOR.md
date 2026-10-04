# Instructor Notes: Stream Ciphers — Four Ways to Link the Same Program

## What this exercise is

Not a cryptography exercise.
The cipher code is complete and students change no source at all.
The subject is the linker, and the ciphers are a pretext that happens to give a cheap correctness check.

It is the unassisted repetition of `02-xor-encryption`.
The libraries are already built by the `Makefile`, so the work is the four executables: by hand first, then as `Makefile` rules.
Students who get stuck on a command should be sent back to the matching step of `02-xor-encryption` rather than given the answer.

Insist on `gcc` invoked by hand before the `Makefile` rules are written.
The rules are only meaningful once the student knows which command each one stands for.

## The failure to let happen

`./cipher-dyn` will refuse to start:

```text
./cipher-dyn: error while loading shared libraries: libcipherdyn.so: cannot open shared object file: No such file or directory
```

Students who did `02-xor-encryption` have seen this, and should fix it themselves.
The explanation to draw out, if needed: `-L.` spoke to the *linker* at build time and said nothing to the *loader* at run time.

## Checks worth insisting on

* All four executables produce byte-identical output.
  A difference means something unintended got linked.
* Have students predict the `ldd` output before running it.
  Three builds list `libc.so.6`, one of those also lists `libcipherdyn.so`, and one (`cipher-static`) reports "not a dynamic executable".
* `nm -u cipher-dyn` shows `caesar` and `vigenere` as undefined (`U`); `nm -u cipher-static-lib` does not.
  Make them say out loud what "undefined" means and who is expected to define it, and when.
* `cipher` and `cipher-static-lib` are the same size.
  Ask why before telling them: the same object code ends up in both, and it does not matter whether it came from the command line or from an archive.
* `make clean && make` rebuilds everything, and a second `make` does nothing.
  A second `make` that relinks something means a rule's target name does not match the file it produces.

## Things students get wrong

* Putting `-lcipherstatic` or `-lcipherdyn` before `main.o`: `undefined reference`.
  The walkthrough covered this; point back at it.
* Writing `-l libcipherdyn.so` or `-llibcipherdyn`.
  The linker adds the `lib` prefix and the extension itself.
* Rules for `cipher-dyn` and `cipher-static-lib` that list `caesar.c` and `vigenere.c` as prerequisites and compile them.
  The result works but defeats the point: the executable must be built from `main.o` and the library.
* Forgetting `TODO 5`: the rules exist but plain `make` builds only the libraries.

## Known trap in the material

Older versions of this README claimed that running the Vigenere program a second time with the same key returns the original text.
**It does not.**
This implementation only shifts forward:

```console
$ ./cipher vigenere key "Hello, World!"
Rijvs, Uyvjn!
$ ./cipher vigenere key "Rijvs, Uyvjn!"
Bmhfw, Sizhx!
```

Decryption requires the inverse key `qwc`.
If a student reports that decryption "does not work", they have found a real asymmetry, not a bug in their build — and it is a good moment to discuss why Caesar avoids the problem.

## Practical notes

* The `-fPIC` item in `FURTHER.md` does not produce a linker error on Ubuntu, because GCC there defaults to PIE; the answer explains why.
  Do not promise students an error.
* `caesar()` normalises the shift with `((shift % 26) + 26) % 26` because C's `%` can return a negative result.
  Worth pointing at if anyone asks why the modulo looks redundant.
* Nothing here is timing-sensitive, so this exercise is safe on slow or loaded machines.

## Where this leads

`bonus-per-stream-cipher-exec` reuses these exact commands and adds the `.a`-versus-`.so` extraction semantics.
`bonus-static-vs-dynamic` measures what the two link kinds cost.

# Instructor Notes: Stream Ciphers — Four Ways to Link the Same Program

## What this exercise is

Not a cryptography exercise.
The cipher code is complete and students change no source at all.
The subject is the linker, and the ciphers are a pretext that happens to give a cheap correctness check.

Insist on `gcc` invoked by hand rather than a `Makefile`.
The whole point is that `gcc file.c` normally hides compiling and linking behind one invisible step.

## The failure to let happen

`./cipher-dyn` will refuse to start:

```text
./cipher-dyn: error while loading shared libraries: libcipher.so:
cannot open shared object file: No such file or directory
```

**Do not pre-empt this.**
It is the single most common linking error students will meet for the rest of their careers, and meeting it here, with a one-line cause, is worth more than a warning in advance.
Let them read the message before offering `LD_LIBRARY_PATH`.

The explanation to draw out: `-L.` spoke to the *linker* at build time and said nothing to the *loader* at run time.

## Checks worth insisting on

* All four executables produce byte-identical output.
  A difference means something unintended got linked.
* Have students predict the `ldd` output before running it.
  Two builds list `libc.so.6`, one of those also lists `libcipher.so`, and two report "not a dynamic executable".
* `nm -u cipher-dyn` shows `caesar` as undefined (`U`); `nm -u cipher-static-lib` does not.
  Make them say out loud what "undefined" means and who is expected to define it.
* The statically linked binaries are roughly two orders of magnitude larger.
  Ask what the extra bytes are before telling them.

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

* `-Wl,-Bstatic` without a matching `-Wl,-Bdynamic` makes the linker try to link libc statically too, and it will complain.
  This trips people up and is followed up properly in `bonus-static-vs-dynamic`.
* `caesar()` normalises the shift with `((shift % 26) + 26) % 26` because C's `%` can return a negative result.
  Worth pointing at if anyone asks why the modulo looks redundant.
* Nothing here is timing-sensitive, so this exercise is safe on slow or loaded machines.

## Where this leads

`bonus-per-stream-cipher-exec` reuses these exact commands and adds the `.a`-versus-`.so` extraction semantics.
`bonus-static-vs-dynamic` measures what the two link kinds cost.

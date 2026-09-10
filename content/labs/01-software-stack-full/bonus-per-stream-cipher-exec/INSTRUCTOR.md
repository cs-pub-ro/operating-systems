# Instructor Notes: Stream Ciphers — One Executable per Cipher

## What this adds over `02-stream-ciphers`

The linking commands are identical.
What is new is that each library now contains exactly **one** object file, which makes the difference between an archive and a shared object observable with `nm`.

If a student has already done `02-stream-ciphers`, the mechanical part of this exercise takes ten minutes.
The value is in the two experiments under *Going Further*, so steer them there rather than letting them stop at "eight binaries built".

## The two `main()` files

`caesar_main.c` and `vigenere_main.c` are each a copy of `main.c` with the other cipher's include, branch and usage text removed.
Two things must change together:

* `argc` is now checked against **3**, not 4.
* Every `argv` index shifts down by one, because the cipher-name argument is gone.

Students who change one but not the other get a program that reads past the end of `argv`.
This usually does **not** crash — `argv` is followed by a NULL and then the environment — so it passes a casual test.
Worth calling out as a general lesson about argument validation.

## Checks worth insisting on

* `nm libcaesar.a` must define `caesar` and nothing else.
  Vigenere symbols there mean the wrong objects were archived.
* Encrypt then decrypt for every one of the eight binaries.
  Remember that Vigenere needs the inverse key `qwc`, not `key` — see the instructor notes for `02-stream-ciphers`.
* Wrong argument counts must produce a usage message and a non-zero exit status.

## Practical notes

* The size comparison is worth doing live: `caesar-static` 856 800 bytes versus `cipher-static` 861 360.
  Ask for a prediction first; most people expect a much larger saving from removing half the functionality.
* The `libboth.a` versus `libboth.so` experiment is the single most valuable thing in this directory.
  If time allows only one thing, do that.
* Nothing here is timing-sensitive.

## Where this leads

`bonus-static-vs-dynamic` measures what the two link kinds cost at run time and start-up.
Together the two bonuses cover what a library *is* and what it *costs*.

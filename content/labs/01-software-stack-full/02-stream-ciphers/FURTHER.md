# Going Further: Stream Ciphers — Four Ways to Link the Same Program

## Things to try

1. Delete `libcipher.a` and rerun `cipher-static-lib`; then delete `libcipher.so` and rerun `cipher-dyn`.

   `cipher-static-lib` is unaffected: the code was copied into it at link time and the archive is irrelevant afterwards.
   `cipher-dyn` dies at start-up, because the `.so` is a separate file it genuinely needs at run time.

1. Link with `-Wl,-rpath,'$ORIGIN'` instead of setting `LD_LIBRARY_PATH`, then look with `readelf -d`.

   A `RUNPATH` entry appears in the dynamic section.
   `$ORIGIN` is expanded by the loader to the directory containing the executable, so the program becomes relocatable without an environment variable.
   This is what most real projects ship.

1. Both `libcipher.a` and `libcipher.so` exist and you pass `-lcipher`.
   Which is picked, and how do you force the other?

   The `.so`.
   Force the archive with `-Wl,-Bstatic -lcipher -Wl,-Bdynamic`, remembering to switch back so libc is still linked dynamically.

1. Rebuild `libcipher.so` *without* `-fPIC` on x86-64 and read the error.

   The linker reports a relocation that cannot be used when making a shared object, and suggests recompiling with `-fPIC`.
   It is complaining about absolute addresses baked into code that must be mappable anywhere.

1. `strace -e trace=openat ./cipher-dyn caesar 3 hi` — watch the loader search.

   Several failed `openat` calls across the standard directories precede the successful one (or the failure).
   This is the start-up cost of dynamic linking, made visible.

## Discussion points

* `-L` and `-l` speak to the **linker**, at build time.
  They say nothing to the **loader**, at run time.
  Almost every "error while loading shared libraries" is a confusion between those two moments, and it is worth naming explicitly.
* `.` is deliberately absent from the loader's search path.
  Ask what would happen on a shared machine if it were present: any writable directory becomes a code-injection vector.
* An archive is a bag of object files the linker takes *from*, one member at a time, only as needed.
  A shared object is linked as a unit.
  This is invisible here because both ciphers are used; `bonus-per-stream-cipher-exec` makes it visible with `nm`.
* This `vigenere()` only ever shifts forward, so it is **not** self-inverse.
  Decryption needs a key whose letters are the additive inverses modulo 26 of the original key's letters — `qwc` for `key`.
  Caesar sidesteps the issue because a negative shift is accepted directly.
  Having students try `./cipher vigenere key` twice and watch it fail is more instructive than telling them.

## References

* `man 1 gcc`, `man 1 ld`, `man 1 ar`, `man 1 nm`, `man 1 ldd`, `man 1 readelf`
* `man 8 ld.so` — the loader's search order, `LD_LIBRARY_PATH`, `RPATH`/`RUNPATH`
* Ulrich Drepper, [How To Write Shared Libraries](https://www.akkadia.org/drepper/dsohowto.pdf)

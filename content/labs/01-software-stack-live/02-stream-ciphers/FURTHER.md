# Going Further: Stream Ciphers — Four Ways to Link the Same Program

Optional.
Work through these once all four executables build and run correctly.

## Things to try

1. Delete `libcipher.a` and rerun `cipher-static-lib`.
   Then delete `libcipher.so` and rerun `cipher-dyn`.
   Explain both outcomes in one sentence each.
1. Link with `-Wl,-rpath,'$ORIGIN'` instead of setting `LD_LIBRARY_PATH`.
   What changed inside the executable?
   Look with `readelf -d`.
1. Both `libcipher.a` and `libcipher.so` exist in the directory and you pass `-lcipher`.
   Which one does the linker pick, and how do you force the other?
1. Rebuild `libcipher.so` *without* `-fPIC` on x86-64 and read the linker error.
   What is it actually complaining about?
1. Run `strace -e trace=openat ./cipher-dyn caesar 3 hi` and watch the loader search for the library.
   How many places does it look before it finds it — or gives up?

## Discussion points

* `-L` and `-l` speak to the **linker**, at build time.
  They say nothing to the **loader**, at run time.
  Almost every "error while loading shared libraries" is a confusion between those two moments.
* `.` is deliberately not on the loader's search path.
  Ask yourself what would happen on a shared machine if it were.
* An archive (`.a`) is a bag of object files that the linker takes *from*, one member at a time, only as needed.
  A shared object (`.so`) is linked as a unit.
  This difference is not visible in this exercise because both ciphers are used; `bonus-per-stream-cipher-exec` makes it visible.
* Vigenere here only ever shifts forward, so it is not self-inverse.
  Decryption needs a key whose letters are the additive inverses modulo 26 of the original key's letters.
  Caesar avoids the issue because a negative shift is accepted directly.

## References

* `man 1 gcc`, `man 1 ld`, `man 1 ar`, `man 1 nm`, `man 1 ldd`, `man 1 readelf`
* `man 8 ld.so` — the loader's search order, `LD_LIBRARY_PATH`, `RPATH`/`RUNPATH`
* Ulrich Drepper, [How To Write Shared Libraries](https://www.akkadia.org/drepper/dsohowto.pdf)

# Going Further: Stream Ciphers — One Executable per Cipher

## Things to try

1. Build `caesar-static-lib` while `libcaesar.so` also exists.
   Does `-static` still do what you expect?
   What if you drop it?

   `-static` disables shared-library resolution entirely, so the archive is picked regardless.
   Drop it and the linker prefers `libcaesar.so`, producing a binary that will not start without `LD_LIBRARY_PATH`.
   This is a compact demonstration of why `-Wl,-Bstatic` / `-Wl,-Bdynamic` exists.

1. Put both objects in one archive and link only the Caesar program against it:

   ```console
   ar rcs libboth.a caesar.o vigenere.o
   gcc -Wall -o caesar-both caesar_main.c -L. -lboth
   nm caesar-both | grep -E 'caesar|vigenere'
   ```

   `vigenere` is **not** in the executable.
   The linker pulls members out of an archive one at a time, only if they resolve an undefined symbol, and nothing references `vigenere`.

   Now the same with a shared object:

   ```console
   gcc -Wall -fPIC -shared -o libboth.so caesar.c vigenere.c
   nm -D libboth.so | grep -E 'caesar|vigenere'
   ```

   Both symbols are present and the whole library is mapped at run time whether or not it is called.
   **An archive is a bag you take from; a shared object is linked as a unit.**
   This is the main practical distinction between the two library kinds.

1. Write a `Makefile` for all eight executables and both pairs of libraries.

   Harder than it looks: the object for the shared build must be compiled `-fPIC` and the one for the archive need not, so they cannot be the same file.
   Two distinct object files per cipher, with distinct names, is the clean answer.

1. Add a third cipher and count how much of the build description you touch.

1. Compare `readelf -d caesar-dyn` with `readelf -d caesar-both-dyn` and look at the `NEEDED` entries.

## Discussion points

* Measured sizes here: `caesar-static` is 856 800 bytes against `cipher-static`'s 861 360 — dropping an entire cipher saved about 4.5 kB out of 850 kB, half a percent.
  Statically linked libc dominates both by two orders of magnitude.
  Students who predicted a large difference should be asked what fraction of the binary their own code actually is.
* The dynamically linked builds tell the opposite story: 16 432 bytes for `caesar` against 16 352 for `caesar-dyn`, with the whole of libc shared and outside the file.
* The argument handling changed when the cipher-name argument disappeared: `argc` must be checked against 3, not 4, and every `argv` index shifts down by one.
  Getting this wrong reads past the end of `argv` and will usually *not* crash, which is a good reminder of why the check matters.

## References

* `man 1 ar`, `man 1 nm`, `man 1 ld`, `man 1 readelf`
* `man 8 ld.so`

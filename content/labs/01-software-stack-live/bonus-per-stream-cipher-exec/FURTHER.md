# Going Further: Stream Ciphers — One Executable per Cipher

Optional.
Work through these once all eight executables build and run correctly.

## Things to try

1. Build `caesar-static-lib` while `libcaesar.so` also exists in the directory.
   Does `-static` still do what you expect?
   What if you drop `-static`?
1. Put both `caesar.o` and `vigenere.o` in one archive and link `caesar_main.c` against it:

   ```console
   ar rcs libboth.a caesar.o vigenere.o
   gcc -Wall -o caesar-both caesar_main.c -L. -lboth
   nm caesar-both | grep -E 'caesar|vigenere'
   ```

   Is `vigenere` pulled into the executable?
   Now build a `libboth.so` from both sources and inspect it with `nm -D`.
   Explain the difference.
1. Write a `Makefile` that builds all eight executables and both pairs of libraries, with correct dependencies.
   This is harder than it sounds: the object file for the shared build must be compiled `-fPIC` and the one for the archive need not, so they cannot be the same file.
1. Add a third cipher and count how much of your build description you have to touch.
1. Compare `readelf -d caesar-dyn` with `readelf -d caesar-both-dyn` and look at the `NEEDED` entries.

## Discussion points

* The archive-versus-shared-object experiment above is the main practical distinction between the two library kinds.
  The linker extracts members from an archive **only if they resolve an undefined symbol**, so unused code never enters the executable.
  A shared object is mapped as a whole, used or not.
* Compare the size of `caesar-static` here with `cipher-static` from `02-stream-ciphers`.
  Dropping an entire cipher changes the binary by well under one percent, because statically linked libc dominates both.
  If you predicted a large difference, ask yourself what fraction of the binary your own code actually is.
* The argument handling changed when the cipher-name argument disappeared: `argc` must now be checked against 3, not 4, and every `argv` index shifts down by one.
  Getting this wrong reads past the end of `argv`, which will usually *not* crash — a good reminder of why the check matters.

## References

* `man 1 ar`, `man 1 nm`, `man 1 ld`, `man 1 readelf`
* `man 8 ld.so`

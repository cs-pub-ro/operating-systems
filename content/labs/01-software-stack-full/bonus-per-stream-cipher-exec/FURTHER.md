# Going Further: Stream Ciphers — One Executable per Cipher

## Things to try

1. Compare `ls -l caesar caesar-static-lib caesar-dyn`.
   Which two are the same size, and why?

   `caesar` and `caesar-static-lib`, 16 432 bytes each.
   Both contain the same `caesar.o` code and both take libc from `libc.so.6`; whether `caesar.o` was named on the command line or extracted from `libcaesarstatic.a` leaves no trace in the result.
   `caesar-dyn` is 80 bytes smaller: it holds a reference to `caesar`, not its code.

1. Put both objects in one archive and link only the Caesar program against it:

   ```console
   ar rcs libbothstatic.a caesar.o vigenere.o
   gcc -o caesar-both caesar_main.o -L. -lbothstatic
   nm caesar-both | grep -E 'caesar|vigenere'
   ```

   `vigenere` is **not** in the executable.
   The linker pulls members out of an archive one at a time, only if they resolve an undefined symbol, and nothing references `vigenere`.

   Now the same with a shared object:

   ```console
   gcc -shared -o libbothdyn.so caesar_pic.o vigenere_pic.o
   gcc -o caesar-both-dyn caesar_main.o -L. -lbothdyn
   nm -D libbothdyn.so | grep -E 'caesar|vigenere'
   ```

   Both symbols are present and the whole library is mapped at run time whether or not it is called.
   **An archive is a bag you take from; a shared object is linked as a unit.**
   This is the main practical distinction between the two library kinds.

1. Write a `Makefile` for all eight executables and both pairs of libraries.

   The `Makefile` of `03-stream-ciphers` is the template: one `_pic.o` and one plain `.o` per cipher, since the shared build needs `-fPIC` and the archive does not, and one rule per library and per executable.
   Each library rule depends on exactly one object file, which is the point of this exercise made explicit.

1. Add a third cipher and count how much of the build description you touch.

1. Compare `readelf -d caesar-dyn` with `readelf -d caesar-both-dyn` and look at the `NEEDED` entries.

   `caesar-dyn` needs `libcaesardyn.so`, `caesar-both-dyn` needs `libbothdyn.so`, and both need `libc.so.6`.
   The executable records the whole library by name, never the individual functions it uses from it: at run time `caesar-both-dyn` maps all of `libbothdyn.so`, Vigenere included.

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

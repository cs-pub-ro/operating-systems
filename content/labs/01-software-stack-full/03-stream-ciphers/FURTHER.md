# Going Further: Stream Ciphers — Four Ways to Link the Same Program

## Things to try

1. Delete `libcipherstatic.a` and rerun `cipher-static-lib`; then delete `libcipherdyn.so` and rerun `cipher-dyn`.

   `cipher-static-lib` is unaffected: the code was copied into it at link time and the archive is irrelevant afterwards.
   `cipher-dyn` dies at start-up, because the `.so` is a separate file it genuinely needs at run time.

1. Link with `-Wl,-rpath,'$ORIGIN'` instead of setting `LD_LIBRARY_PATH`, then look with `readelf -d`.

   ```console
   $ gcc -o cipher-rpath main.o -L. -lcipherdyn -Wl,-rpath,'$ORIGIN'
   $ readelf -d cipher-rpath | grep -i path
    0x000000000000001d (RUNPATH)            Library runpath: [$ORIGIN]
   ```

   A `RUNPATH` entry appears in the dynamic section.
   `$ORIGIN` is expanded by the loader to the directory containing the executable, so the program finds its library without an environment variable, wherever the directory is moved.
   This is what most real projects ship.
   The single quotes matter: without them the shell expands `$ORIGIN` to an empty string first.

1. Link `cipher-static-lib` with `-static` as well, and compare the result with `cipher-static`.

   ```console
   $ gcc -static -o cipher-static-lib-full main.o -L. -lcipherstatic
   $ ls -l cipher-static cipher-static-lib-full
   -rwxrwxr-x 1 student student 861360 Oct  4 17:32 cipher-static
   -rwxrwxr-x 1 student student 861360 Oct  4 17:33 cipher-static-lib-full
   ```

   The same size, and the same code.
   Once everything is static, it makes no difference whether the cipher object files were named on the command line or pulled out of an archive: either way the linker copies them in.

1. Remove `-fPIC` from the two `_pic.o` rules and rebuild `libcipherdyn.so`.

   It still builds and works.
   Ubuntu's GCC is configured with `--enable-default-pie`: every object file is compiled as position-independent code by default, to make executables relocatable for address-space layout randomisation.
   `-fPIC` is still the flag to write — it states the requirement, and a compiler without that default, or an object with absolute references to global data, would make the link fail with a `relocation ... can not be used when making a shared object; recompile with -fPIC` error.

1. `strace -e trace=openat ./cipher-dyn caesar 3 hi` — watch the loader search.

   The loader first opens `/etc/ld.so.cache`, then tries `libcipherdyn.so` in the standard directories, including a `glibc-hwcaps/` subdirectory for each CPU feature level.
   Here it made 16 failed `openat()` calls before giving up.
   With `LD_LIBRARY_PATH=.` the search starts in `.` and the first attempt succeeds.

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

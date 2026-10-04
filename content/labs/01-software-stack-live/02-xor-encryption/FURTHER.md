# Going Further: XOR Encryption — Build and Use a Library

Optional.
Work through these once both executables run and you can explain the walkthrough.

## Things to try

1. Build a fully static executable, libc included:

   ```console
   gcc -static -o xor-static main.o -L. -lxorstatic
   ```

   Compare it with `xor-static-lib` using `ls -l`, `file` and `ldd`.
   Where do the extra bytes come from?
1. Run `readelf -d xor-dyn | grep NEEDED`.
   This is what `ldd` reads before it goes looking for the libraries.
   Is there a path anywhere in it?
1. Encrypt a text using the text itself as the key, e.g. `./xor-static-lib key key`.
   Then encrypt `aaaaaa` with the key `abc`.
   What do the outputs tell an attacker who knows, or guesses, part of the plaintext?
1. Rename `libxordyn.so` to `libxorstatic.so`, so that both libraries have the same name apart from the extension, and link with `-lxorstatic` again (without `-static`).
   Which of the two did the linker take?
   Check with `ldd`.

## References

* `man 1 readelf`, `man 1 ld`
* `man 8 ld.so`

# Going Further: XOR Encryption — Build and Use a Library

## Things to try

1. Build a fully static executable, libc included, and compare it with `xor-static-lib`.

   ```console
   $ gcc -static -o xor-static main.o -L. -lxorstatic
   $ ls -l xor-static xor-static-lib
   -rwxrwxr-x 1 student student 856864 Oct  4 17:29 xor-static
   -rwxrwxr-x 1 student student  16488 Oct  4 17:29 xor-static-lib
   $ ldd xor-static
   	not a dynamic executable
   ```

   About fifty times larger.
   `-static` makes the linker take libc from `libc.a` as well, so every libc function the program uses — and everything those use in turn — is copied in.
   `file` reports `statically linked`, with no interpreter: the kernel starts it directly, without a loader.

1. `readelf -d xor-dyn | grep NEEDED`

   ```text
    0x0000000000000001 (NEEDED)             Shared library: [libxordyn.so]
    0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
   ```

   Names only, no paths.
   The linker records which libraries are needed; finding them is left entirely to the loader.
   That is the whole reason `LD_LIBRARY_PATH` is needed for `xor-dyn`.

1. Encrypt the key with itself, and a repeated letter with a short key.

   ```console
   $ ./xor-static-lib key key
   encrypted: 00 00 00
   decrypted: key
   $ ./xor-static-lib abc aaaaaa
   encrypted: 00 03 02 00 03 02
   decrypted: aaaaaa
   ```

   `p ^ k == c` also means `p ^ c == k`: anyone who knows a piece of plaintext and the matching ciphertext recovers that piece of the key.
   And a repeating key shows through as a repeating pattern in the ciphertext.
   Repeating-key XOR is a fine exercise in linking and a poor cipher.

1. Give the shared library the same base name as the static one, and link with `-lxorstatic`.

   ```console
   $ mv libxordyn.so libxorstatic.so
   $ gcc -o xor-which main.o -L. -lxorstatic
   $ ldd xor-which | grep xor
   	libxorstatic.so => not found
   ```

   The linker took the `.so`: given the choice, it prefers a shared library over an archive.
   A program meant to contain its library code ends up depending on a file at run time, and nothing at link time says so.
   This is why the two libraries in this session have different names.

## References

* `man 1 readelf`, `man 1 ld`
* `man 8 ld.so`

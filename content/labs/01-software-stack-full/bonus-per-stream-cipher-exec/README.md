# Bonus: Stream Ciphers — One Executable per Cipher

**Tools:** GCC, `ar`, `nm`

## Goal

Reference solution for the per-cipher executable bonus.
The linking commands are the same as in `02-stream-ciphers`; what is new is that each library now contains exactly one object file, which makes the difference between an archive and a shared object observable.

## Background

In `02-stream-ciphers` a single executable handled both ciphers: `main.c` took the cipher name as its first argument and dispatched.
Both cipher implementations ended up linked into every build.

Here the dispatch is gone.
Two new `main()` files are added:

* `caesar_main.c` — `main()` for the Caesar-only executable; takes `<shift> <text>`.
* `vigenere_main.c` — `main()` for the Vigenere-only executable; takes `<key> <text>`.

Each is a copy of `main.c` with the other cipher's include, branch and usage text removed, and with `argv` indices shifted down by one because the cipher-name argument no longer exists.
`argc` must now be checked against 3, not 4.

## Build & Run

### Caesar executables

```console
# 1. Dynamically-linked executable
gcc -Wall -o caesar caesar_main.c caesar.c

# 2. Statically-linked executable
gcc -Wall -static -o caesar-static caesar_main.c caesar.c

# 3. Shared library + dynamically-linked executable
gcc -Wall -fPIC -shared -o libcaesar.so caesar.c
gcc -Wall -o caesar-dyn caesar_main.c -L. -lcaesar

# 4. Static library + statically-linked executable
gcc -Wall -c -o caesar.o caesar.c
ar rcs libcaesar.a caesar.o
gcc -Wall -static -o caesar-static-lib caesar_main.c -L. -lcaesar
```

### Vigenere executables

```console
# 1. Dynamically-linked executable
gcc -Wall -o vigenere vigenere_main.c vigenere.c

# 2. Statically-linked executable
gcc -Wall -static -o vigenere-static vigenere_main.c vigenere.c

# 3. Shared library + dynamically-linked executable
gcc -Wall -fPIC -shared -o libvigenere.so vigenere.c
gcc -Wall -o vigenere-dyn vigenere_main.c -L. -lvigenere

# 4. Static library + statically-linked executable
gcc -Wall -c -o vigenere.o vigenere.c
ar rcs libvigenere.a vigenere.o
gcc -Wall -static -o vigenere-static-lib vigenere_main.c -L. -lvigenere
```

### Running

```console
./caesar <shift> <text>
./vigenere <key> <text>
```

All four variants of each executable accept the same arguments.

```console
$ ./caesar 3 "Hello, World!"
Khoor, Zruog!
$ ./caesar -3 "Khoor, Zruog!"
Hello, World!
$ LD_LIBRARY_PATH=. ./vigenere-dyn key "Hello, World!"
Rijvs, Uyvjn!
$ ./vigenere-static-lib qwc "Rijvs, Uyvjn!"
Hello, World!
```

As in the previous exercise, `qwc` is the inverse of the key `key`: this `vigenere()` only shifts forward, so decryption needs the additive inverse of every key letter modulo 26.

## Results and Explanations

### The libraries really are smaller

```console
nm libcaesar.a
nm libvigenere.a
```

`libcaesar.a` defines `caesar` and nothing else; `libvigenere.a` defines `vigenere` and nothing else.
If Vigenere symbols show up in `libcaesar.a`, the wrong object files were archived.

### `.a` and `.so` differ in what gets pulled in

This is the practical distinction between the two library kinds, and it is worth demonstrating.

Archive both objects into a single `libboth.a` and link only the Caesar program against it:

```console
ar rcs libboth.a caesar.o vigenere.o
gcc -Wall -o caesar-both caesar_main.c -L. -lboth
nm caesar-both | grep -E 'caesar|vigenere'
```

`vigenere` is **not** in the executable.
The linker pulls members out of an archive *one at a time, only if they resolve an undefined symbol*.
Nothing references `vigenere`, so that member is never extracted.

Now do the same with a shared object:

```console
gcc -Wall -fPIC -shared -o libboth.so caesar.c vigenere.c
gcc -Wall -o caesar-both-dyn caesar_main.c -L. -lboth
nm -D libboth.so | grep -E 'caesar|vigenere'
```

`vigenere` is present in the `.so` and is mapped into the process at run time whether or not it is called.
A shared object is linked as a **unit**; an archive is a **bag** you take from.

### Sizes

`caesar-static` is smaller than `cipher-static` from the previous exercise — measured here, 856 800 bytes against 861 360, a difference of about 4.5 kB out of 850 kB.
Dropping a cipher saved half a percent, because the statically linked libc dominates both by two orders of magnitude.
Students who predict a large difference should be asked what fraction of the binary they think their own code actually is.

The dynamically linked builds tell the opposite story: 16 432 bytes for `caesar` against 16 352 for `caesar-dyn`, with the whole of libc shared and outside the file.

### `-static` with a `.so` present

`gcc -static ... -L. -lcaesar` with both `libcaesar.a` and `libcaesar.so` in the directory picks the archive, because `-static` disables shared-library resolution entirely.
Drop `-static` and the linker prefers `libcaesar.so`, producing a binary that will not start without `LD_LIBRARY_PATH` — which is a compact demonstration of why `-Wl,-Bstatic`/`-Wl,-Bdynamic` exists.

## References

* `man 1 ar`, `man 1 nm`, `man 1 ld`
* `man 8 ld.so`

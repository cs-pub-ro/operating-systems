# Bonus: Stream Ciphers — One Executable per Cipher

**Tools:** GCC, `ar`, `nm`

## Goal

Reference solution for the per-cipher executable bonus.
The linking commands are the same as in `03-stream-ciphers`; what is new is that each library now contains exactly one object file, which makes the difference between an archive and a shared object observable.

## Background

In `03-stream-ciphers` a single executable handled both ciphers: `main.c` took the cipher name as its first argument and dispatched.
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

# 3. Shared library + executable linked against it
gcc -Wall -fPIC -c -o caesar_pic.o caesar.c
gcc -shared -o libcaesardyn.so caesar_pic.o
gcc -Wall -c -o caesar_main.o caesar_main.c
gcc -o caesar-dyn caesar_main.o -L. -lcaesardyn

# 4. Static library + executable linked against it
gcc -Wall -c -o caesar.o caesar.c
ar rcs libcaesarstatic.a caesar.o
gcc -o caesar-static-lib caesar_main.o -L. -lcaesarstatic
```

### Vigenere executables

```console
# 1. Dynamically-linked executable
gcc -Wall -o vigenere vigenere_main.c vigenere.c

# 2. Statically-linked executable
gcc -Wall -static -o vigenere-static vigenere_main.c vigenere.c

# 3. Shared library + executable linked against it
gcc -Wall -fPIC -c -o vigenere_pic.o vigenere.c
gcc -shared -o libvigeneredyn.so vigenere_pic.o
gcc -Wall -c -o vigenere_main.o vigenere_main.c
gcc -o vigenere-dyn vigenere_main.o -L. -lvigeneredyn

# 4. Static library + executable linked against it
gcc -Wall -c -o vigenere.o vigenere.c
ar rcs libvigenerestatic.a vigenere.o
gcc -o vigenere-static-lib vigenere_main.o -L. -lvigenerestatic
```

### Running

```console
./caesar <shift> <text>
./vigenere <key> <text>
```

All four variants of each executable accept the same arguments.
As in `03-stream-ciphers`, the `-static-lib` variants take the cipher code from the archive and libc from `libc.so.6`, and the `-dyn` variants need `LD_LIBRARY_PATH=.` to start.

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
$ nm libcaesarstatic.a

caesar.o:
0000000000000000 T caesar
                 U __ctype_b_loc
$ nm libvigenerestatic.a

vigenere.o:
                 U __ctype_b_loc
                 U strlen
                 U tolower
0000000000000000 T vigenere
```

`libcaesarstatic.a` defines `caesar` and nothing else; `libvigenerestatic.a` defines `vigenere` and nothing else.
If Vigenere symbols show up in `libcaesarstatic.a`, the wrong object files were archived.

### `.a` and `.so` differ in what gets pulled in

This is the practical distinction between the two library kinds, and it is worth demonstrating.

Archive both objects into a single `libbothstatic.a` and link only the Caesar program against it:

```console
$ ar rcs libbothstatic.a caesar.o vigenere.o
$ gcc -o caesar-both caesar_main.o -L. -lbothstatic
$ nm caesar-both | grep -E 'caesar|vigenere'
00000000000012e7 T caesar
```

`vigenere` is **not** in the executable.
The linker pulls members out of an archive *one at a time, only if they resolve an undefined symbol*.
Nothing references `vigenere`, so that member is never extracted.

Now do the same with a shared object:

```console
$ gcc -shared -o libbothdyn.so caesar_pic.o vigenere_pic.o
$ gcc -o caesar-both-dyn caesar_main.o -L. -lbothdyn
$ nm -D libbothdyn.so | grep -E 'caesar|vigenere'
0000000000001159 T caesar
00000000000012a0 T vigenere
```

`vigenere` is present in the `.so` and is mapped into the process at run time whether or not it is called.
A shared object is linked as a **unit**; an archive is a **bag** you take from.

### Sizes

`caesar-static` is smaller than `cipher-static` from `03-stream-ciphers` — measured here, 856 800 bytes against 861 360, a difference of about 4.5 kB out of 850 kB.
Dropping a cipher saved half a percent, because the statically linked libc dominates both by two orders of magnitude.
Students who predict a large difference should be asked what fraction of the binary they think their own code actually is.

The dynamically linked builds tell the opposite story: 16 432 bytes for `caesar` against 16 352 for `caesar-dyn`, with the whole of libc shared and outside the file.
`caesar-static-lib` and `caesar-both` are 16 432 bytes too, exactly the size of `caesar`: the same `caesar.o` is linked in each, whether it was named on the command line, taken from `libcaesarstatic.a`, or picked out of `libbothstatic.a` without its Vigenere neighbour.

### Why the libraries have different names

Each cipher has two libraries, and they are named differently — `libcaesarstatic.a` and `libcaesardyn.so` — rather than `libcaesar.a` and `libcaesar.so`.
With a shared base name, `-lcaesar` would pick the `.so` whenever both files are present, and `caesar-static-lib` would silently end up depending on a library at run time.
Separate names make every `-l` refer to exactly one file.

## References

* `man 1 ar`, `man 1 nm`, `man 1 ld`
* `man 8 ld.so`

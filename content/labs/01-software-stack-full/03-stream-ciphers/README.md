# Exercise: Stream Ciphers — Four Ways to Link the Same Program

**Tools:** GCC, Make, `ar`, `ldd`, `nm`, `readelf`

## Goal

Reference solution for the stream-ciphers exercise in [`03-stream-ciphers`](../../01-software-stack-live/03-stream-ciphers).
Produce four different executables from one unchanged set of C source files — dynamically linked, statically linked, linked against a shared library, and linked against a static library — first by hand, then with `Makefile` rules.
The code is a pretext; the subject is the linker.

Only the `Makefile` differs from the work directory: its `TODO` sections hold the rules for the four executables.

## Background

Two classical stream ciphers are already implemented, and no source code changes are needed:

* **Caesar** (`caesar.c`, `caesar.h`) — shifts every letter by a fixed integer offset.
* **Vigenere** (`vigenere.c`, `vigenere.h`) — shifts each letter by the value of the corresponding character of a repeating key.
* `main.c` includes both headers, parses the command line and dispatches.

Building a program is two distinct steps that `gcc` normally hides: compiling each `.c` into an object file, and *linking* those object files plus any libraries into one executable.
The linker can copy the code it needs into the executable (static linking), or record "resolve `caesar` at run time" and leave the job to the dynamic loader `ld.so` (dynamic linking).

Every step here was done once, on a single source file, in [`02-xor-encryption`](../02-xor-encryption); that walkthrough explains `-L.`, the position of `-l`, `LD_LIBRARY_PATH`, `file`, `ldd` and `nm` in detail.
This exercise repeats it with two library source files and no instructions.

The provided `Makefile` builds the two libraries:

```console
$ make
gcc -Wall -Wextra -c -o caesar.o caesar.c
gcc -Wall -Wextra -c -o vigenere.o vigenere.c
ar rcs libcipherstatic.a caesar.o vigenere.o
gcc -Wall -Wextra -fPIC -c -o caesar_pic.o caesar.c
gcc -Wall -Wextra -fPIC -c -o vigenere_pic.o vigenere.c
gcc -shared -o libcipherdyn.so caesar_pic.o vigenere_pic.o
```

The two libraries have different names, `libcipherstatic.a` and `libcipherdyn.so`, so that `-lcipherstatic` and `-lcipherdyn` each name exactly one file.
Had both been called `libcipher`, `-lcipher` would always pick the `.so`.

## Build & Run

### 1. Dynamically-linked executable, all sources compiled together

```console
gcc -Wall -o cipher main.c caesar.c vigenere.c
```

"Dynamically linked" refers to libc: `printf()` and friends still come from `libc.so.6` at run time.
The cipher code itself is compiled straight into the executable.

### 2. Statically-linked executable

```console
gcc -Wall -static -o cipher-static main.c caesar.c vigenere.c
```

`-static` makes the linker take libc from `libc.a` as well, so the executable needs nothing at run time.

### 3. Executable linked against the shared library

```console
gcc -Wall -c -o main.o main.c
gcc -o cipher-dyn main.o -L. -lcipherdyn
LD_LIBRARY_PATH=. ./cipher-dyn caesar 3 "Hello, World!"
```

### 4. Executable linked against the static library

```console
gcc -o cipher-static-lib main.o -L. -lcipherstatic
./cipher-static-lib caesar 3 "Hello, World!"
```

The cipher code is copied out of `libcipherstatic.a`; libc stays dynamic, as in `cipher` and `cipher-dyn`.
Of the four executables, `cipher-dyn` and `cipher-static-lib` differ only in where the cipher code comes from — which is the comparison the exercise is about.

### The `Makefile` rules

Each command above becomes a rule, with the files it reads as prerequisites:

```make
all: libcipherstatic.a libcipherdyn.so \
     cipher cipher-static cipher-dyn cipher-static-lib

cipher: main.c caesar.c vigenere.c caesar.h vigenere.h
	$(CC) $(CFLAGS) -o $@ main.c caesar.c vigenere.c

cipher-static: main.c caesar.c vigenere.c caesar.h vigenere.h
	$(CC) $(CFLAGS) -static -o $@ main.c caesar.c vigenere.c

cipher-dyn: main.o libcipherdyn.so
	$(CC) -o $@ main.o -L. -lcipherdyn

cipher-static-lib: main.o libcipherstatic.a
	$(CC) -o $@ main.o -L. -lcipherstatic
```

Listing the library as a prerequisite of the executable is what makes `make` relink `cipher-dyn` when `caesar.c` changes: `caesar.c` → `caesar_pic.o` → `libcipherdyn.so` → `cipher-dyn`.
The headers are prerequisites of `cipher` and `cipher-static` for the same reason, since those two compile the sources directly.

```console
$ make clean
$ make
gcc -Wall -Wextra -c -o caesar.o caesar.c
gcc -Wall -Wextra -c -o vigenere.o vigenere.c
ar rcs libcipherstatic.a caesar.o vigenere.o
gcc -Wall -Wextra -fPIC -c -o caesar_pic.o caesar.c
gcc -Wall -Wextra -fPIC -c -o vigenere_pic.o vigenere.c
gcc -shared -o libcipherdyn.so caesar_pic.o vigenere_pic.o
gcc -Wall -Wextra -o cipher main.c caesar.c vigenere.c
gcc -Wall -Wextra -static -o cipher-static main.c caesar.c vigenere.c
gcc -Wall -Wextra -c -o main.o main.c
gcc -o cipher-dyn main.o -L. -lcipherdyn
gcc -o cipher-static-lib main.o -L. -lcipherstatic
$ make
make: Nothing to be done for 'all'.
```

### Running

All four executables take the same arguments:

```console
./cipher caesar <shift> <text>
./cipher vigenere <key> <text>
```

| Argument | Description |
| --- | --- |
| `shift` | Integer offset; positive encrypts, negative decrypts |
| `key` | Letters only (case-insensitive), used as the Vigenere key |
| `text` | The string to process (quote it if it contains spaces) |

```console
$ ./cipher caesar 13 solrulzforever
fbyehymsberire
$ ./cipher vigenere syscall solrulzforever
kmdtuwkxmjgvpc
$ ./cipher caesar 3 "Hello, World!"
Khoor, Zruog!
$ ./cipher caesar -3 "Khoor, Zruog!"
Hello, World!
$ ./cipher vigenere key "Hello, World!"
Rijvs, Uyvjn!
$ ./cipher vigenere qwc "Rijvs, Uyvjn!"
Hello, World!
```

`qwc` is the *inverse* of `key`: each letter replaced by its additive inverse modulo 26 (`k`=10 becomes `q`=16, `e`=4 becomes `w`=22, `y`=24 becomes `c`=2).
See the note on decryption below.

## Results and Explanations

The output below was produced on Ubuntu 25.04 with GCC 14.2 on x86-64.

### Inside the libraries

```console
$ ar t libcipherstatic.a
caesar.o
vigenere.o
$ nm libcipherstatic.a

caesar.o:
0000000000000000 T caesar
                 U __ctype_b_loc

vigenere.o:
                 U __ctype_b_loc
                 U strlen
                 U tolower
0000000000000000 T vigenere
$ nm -D libcipherdyn.so | grep -v ' w '
0000000000001159 T caesar
                 U __ctype_b_loc@GLIBC_2.3
                 U strlen@GLIBC_2.2.5
                 U tolower@GLIBC_2.2.5
00000000000012a0 T vigenere
```

The archive keeps the two object files separate, each with its own symbol table.
The shared object is one unit, exporting both functions.
Both need libc (`__ctype_b_loc` is what `isupper()` and friends expand to): neither library is complete on its own.

### The failure everybody hits

```text
$ ./cipher-dyn caesar 3 "Hello"
./cipher-dyn: error while loading shared libraries: libcipherdyn.so: cannot open shared object file: No such file or directory
```

This is expected and it is the single most common linking error there is.
`-L.` spoke to the linker at build time.
It said nothing to the **loader** at run time.
`ld.so` searches the directories in its cache and the system library directories; `.` is deliberately not among them — running whatever `libcipherdyn.so` happens to sit in the current directory would be an excellent way to get a program hijacked.

Three fixes:

```console
LD_LIBRARY_PATH=. ./cipher-dyn caesar 3 "Hello"            # for this run only
gcc -o cipher-rpath main.o -L. -lcipherdyn -Wl,-rpath,'$ORIGIN'
sudo cp libcipherdyn.so /usr/local/lib/ && sudo ldconfig    # system-wide
```

`readelf -d cipher-rpath` shows the `RUNPATH` entry, `$ORIGIN`, that the second fix records in the executable.

### What to look at afterwards

```console
$ ls -l cipher cipher-static cipher-dyn cipher-static-lib
-rwxrwxr-x 1 student student  16624 Oct  4 17:32 cipher
-rwxrwxr-x 1 student student  16424 Oct  4 17:32 cipher-dyn
-rwxrwxr-x 1 student student 861360 Oct  4 17:32 cipher-static
-rwxrwxr-x 1 student student  16624 Oct  4 17:32 cipher-static-lib
$ ldd cipher
	linux-vdso.so.1 (0x0000793cff381000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x0000793cff000000)
	/lib64/ld-linux-x86-64.so.2 (0x0000793cff383000)
$ ldd cipher-static
	not a dynamic executable
$ ldd cipher-dyn
	linux-vdso.so.1 (0x00007f2e43627000)
	libcipherdyn.so => not found
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f2e43200000)
	/lib64/ld-linux-x86-64.so.2 (0x00007f2e43629000)
$ ldd cipher-static-lib
	linux-vdso.so.1 (0x00007a81a22bd000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007a81a2000000)
	/lib64/ld-linux-x86-64.so.2 (0x00007a81a22bf000)
```

* `cipher`, `cipher-dyn` and `cipher-static-lib` all depend on `libc.so.6`; only `cipher-dyn` also depends on `libcipherdyn.so`.
* `cipher-static` is "not a dynamic executable": it has no loader and no dependencies.
* `cipher` and `cipher-static-lib` are the same size, because they hold the same code: whether `caesar.o` came from the command line or out of an archive makes no difference once it is linked.
* `cipher-dyn` is the smallest, by the size of the cipher code it does not contain.
* `cipher-static` is about fifty times larger than the others, because it carries its own copy of every part of libc it uses.

```console
$ nm -u cipher-dyn | grep -E 'caesar|vigenere'
                 U caesar
                 U vigenere
$ nm -u cipher-static-lib | grep -E 'caesar|vigenere'
$
```

`cipher-dyn` has `caesar` and `vigenere` as **undefined** (`U`) symbols: the loader resolves them in `libcipherdyn.so` at every start.
In `cipher-static-lib` they are not undefined, because the linker resolved them at link time by copying the code in.
Both still list libc functions (`strdup`, `fprintf`, …) as undefined: those are resolved by the loader in `libc.so.6`, for every executable except `cipher-static`.

### The ciphers themselves

Caesar shifts each letter by a constant, modulo 26, leaving non-letters unchanged:

```text
encrypt: C = (P + shift) mod 26
decrypt: P = (C - shift) mod 26
```

Vigenere repeats the key over the plaintext, skipping non-letters, and shifts each letter by the alphabetic index of the corresponding key character:

```text
encrypt: C_i = (P_i + K_{i mod len(key)}) mod 26
decrypt: P_i = (C_i - K_{i mod len(key)} + 26) mod 26
```

Note that `caesar()` normalises the shift with `((shift % 26) + 26) % 26`, because C's `%` can return a negative result and `'a' + negative` would leave the alphabet.
Note that `vigenere()` as implemented only ever shifts **forward**, so running the program twice with the same key does **not** return the original text — it shifts forward again.
Decryption requires passing the inverse key, whose letters are the additive inverses modulo 26 of the original key's letters.
Caesar, by contrast, is decrypted by negating the shift, and `main.c` accepts a negative `<shift>` for exactly that reason.

An alternative design — adding a `decrypt` flag to `vigenere()` — would remove the need to compute the inverse key by hand.

## References

* `man 1 gcc`, `man 1 ld`, `man 1 ar`, `man 1 nm`, `man 1 ldd`, `man 1 readelf`
* `man 8 ld.so` — the loader's search order, `LD_LIBRARY_PATH`, `RPATH`/`RUNPATH`
* Ulrich Drepper, [How To Write Shared Libraries](https://www.akkadia.org/drepper/dsohowto.pdf)

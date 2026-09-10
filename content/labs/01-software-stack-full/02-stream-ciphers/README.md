# Exercise: Stream Ciphers — Four Ways to Link the Same Program

**Tools:** GCC, `ar`, `ldd`, `nm`, `readelf`

## Goal

Produce four different executables from one unchanged set of C source files: dynamically linked, statically linked, linked against a shared library, and linked against a static library.
The code is a pretext; the subject is the linker.

## Background

Two classical stream ciphers are already implemented, and no source code changes are needed:

* **Caesar** (`caesar.c`, `caesar.h`) — shifts every letter by a fixed integer offset.
* **Vigenere** (`vigenere.c`, `vigenere.h`) — shifts each letter by the value of the corresponding character of a repeating key.
* `main.c` includes both headers, parses the command line and dispatches.

Building a program is two distinct steps that `gcc` normally hides: compiling each `.c` into machine code, and *linking* those pieces plus any libraries into one executable.
The linker can copy the code it needs into the executable (static linking), or record "resolve `caesar` at run time" and leave the job to the dynamic loader `ld.so` (dynamic linking).

The exercise is worth doing by hand precisely because `gcc file.c` does all of it in one invisible step.

## Build & Run

### 1. Dynamically-linked executable, all sources compiled together

```console
gcc -Wall -o cipher main.c caesar.c vigenere.c
```

"Dynamically linked" here refers to libc: `printf()` and friends still come from `libc.so.6` at run time.

### 2. Statically-linked executable

```console
gcc -Wall -static -o cipher-static main.c caesar.c vigenere.c
```

`-static` bakes libc into the binary as well.

### 3. Shared library + dynamically-linked executable

```console
gcc -Wall -fPIC -shared -o libcipher.so caesar.c vigenere.c
gcc -Wall -o cipher-dyn main.c -L. -lcipher
LD_LIBRARY_PATH=. ./cipher-dyn caesar 3 "Hello, World!"
```

### 4. Static library + statically-linked executable

```console
gcc -Wall -c -o caesar.o caesar.c
gcc -Wall -c -o vigenere.o vigenere.c
ar rcs libcipher.a caesar.o vigenere.o
gcc -Wall -static -o cipher-static-lib main.c -L. -lcipher
./cipher-static-lib caesar 3 "Hello, World!"
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

### What each flag does

* `-static` — link everything, libc included, into the executable.
* `-fPIC` — **P**osition-**I**ndependent **C**ode.
  A shared object may be mapped at a different address in every process that loads it, so it cannot contain hardcoded absolute addresses; it reaches its own data through a table instead.
* `-shared` — produce a shared object rather than an executable.
* `ar rcs libcipher.a *.o` — `ar` is an *archiver*, not a linker.
  A `.a` is a bag of `.o` files with an index, closer to a `.tar` than to a program.
  Prove it with `ar t libcipher.a` and `ar x libcipher.a`.
* `-L.` — where the **linker** should look, at build time.
* `-lcipher` — link a library named `cipher`, i.e. look for `libcipher.so` first, then `libcipher.a`.
  The `lib` prefix and the extension are supplied *by the linker*; this is why the file must be called `libcipher.a` and not `cipher.a`.

### The failure everybody hits

```text
$ ./cipher-dyn caesar 3 "Hello"
./cipher-dyn: error while loading shared libraries: libcipher.so:
cannot open shared object file: No such file or directory
```

This is expected and it is the single most common linking error there is.
`-L.` spoke to the linker at build time.
It said nothing to the **loader** at run time.
`ld.so` searches `/lib`, `/usr/lib` and a few configured places; `.` is deliberately not among them — running whatever `libcipher.so` happens to sit in the current directory would be an excellent way to get a program hijacked.

Three fixes:

```console
LD_LIBRARY_PATH=. ./cipher-dyn caesar 3 "Hello"          # for this run only
gcc -Wall -o cipher-rpath main.c -L. -lcipher -Wl,-rpath,'$ORIGIN'
sudo cp libcipher.so /usr/local/lib/ && sudo ldconfig     # system-wide
```

`readelf -d cipher-rpath` shows the `RUNPATH` entry that the third-party-free version relies on.

### What to look at afterwards

```console
ls -l cipher cipher-static cipher-dyn cipher-static-lib
ldd cipher cipher-dyn cipher-static-lib
ldd cipher-static
nm -u cipher-dyn | grep -E 'caesar|vigenere'
nm -u cipher-static-lib | grep -E 'caesar|vigenere'
```

* `cipher` and `cipher-dyn` list `libc.so.6`; `cipher-dyn` additionally lists `libcipher.so`.
* `cipher-static` and `cipher-static-lib` report "not a dynamic executable".
* `cipher-dyn` has `caesar` as an **undefined** (`U`) symbol: "find this at run time".
  In the statically linked builds it is not undefined, because the code is already inside the binary.
* The statically linked binaries are roughly two orders of magnitude larger, because they carry their own copy of libc.

### Which library wins when both exist

If `libcipher.a` and `libcipher.so` are both in the directory and you pass `-lcipher`, the linker prefers the `.so`.
To force the archive without going fully static, bracket the flag:

```console
gcc -Wall -o cipher-forced main.c -L. -Wl,-Bstatic -lcipher -Wl,-Bdynamic
```

Forgetting the trailing `-Wl,-Bdynamic` makes the linker try to link libc statically too, and it will complain.
This is followed up in the `bonus-static-vs-dynamic` exercise.

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

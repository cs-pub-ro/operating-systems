# Exercise: XOR Encryption — Build and Use a Library

**Tools:** GCC, Make, `ar`, `file`, `ldd`, `nm`

## Goal

Reference output and explanation for the walkthrough in [`02-xor-encryption`](../../01-software-stack-live/02-xor-encryption).
Build a static library and a shared library from the same source file, link a program against each, and follow the symbol `xor_encrypt` from *undefined* to *resolved* — at link time for one executable, at load time for the other.
Nothing is written in this exercise; it is the training ground for [`03-stream-ciphers`](../03-stream-ciphers), where the same steps are done unassisted.

## Background

The directory holds the same files in both halves of the session:

* `xor.c` / `xor.h` — `xor_encrypt()` XORs every byte of a buffer with the bytes of a repeating key.
* `main.c` — encrypts its `<text>` argument, prints the bytes in hexadecimal, then decrypts them again with the same call.
* `Makefile` — the commands of the walkthrough, as rules.

XOR is its own inverse: `(p ^ k) ^ k == p`, so `xor_encrypt()` both encrypts and decrypts.
The ciphertext is printed in hexadecimal because it can contain any byte value — `'e' ^ 'e'` is `0x00`, which would end a C string.

A **static library** (`.a`) is an archive of object files.
At link time the linker copies the members it needs into the executable, and the archive plays no further part.
A **shared library** (`.so`) remains a separate file.
The executable records only its name, and the dynamic **loader** (`ld.so`) finds it, maps it and resolves the symbols each time the program starts.

The libraries have different names, `libxorstatic.a` and `libxordyn.so`, so there is never any doubt about which one `-l` picks.
Given `-lxor` with both `libxor.a` and `libxor.so` present, the linker would take the `.so`.

## Build & Run

By hand, in the order of the walkthrough:

```console
gcc -Wall -c -o main.o main.c
gcc -Wall -c -o xor.o xor.c
ar rcs libxorstatic.a xor.o
gcc -o xor-static-lib main.o -L. -lxorstatic

gcc -Wall -fPIC -c -o xor_pic.o xor.c
gcc -shared -o libxordyn.so xor_pic.o
gcc -o xor-dyn main.o -L. -lxordyn
```

Or with the `Makefile`, which runs the same commands:

```console
make
```

Then:

```console
$ ./xor-static-lib key "Hello, World!"
encrypted: 23 00 15 07 0a 55 4b 32 16 19 09 1d 4a
decrypted: Hello, World!
$ LD_LIBRARY_PATH=. ./xor-dyn key "Hello, World!"
encrypted: 23 00 15 07 0a 55 4b 32 16 19 09 1d 4a
decrypted: Hello, World!
```

## Results and Explanations

The output below was produced on Ubuntu 25.04 with GCC 14.2 on x86-64.
Addresses and build IDs will differ on your machine.

### Object files, and the undefined symbol

```console
$ file main.o xor.o
main.o: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
xor.o:  ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
$ nm main.o
                 U fprintf
                 U free
00000000000000ae T main
                 U malloc
                 U memcpy
                 U perror
                 U printf
0000000000000035 t print_hex
                 U stderr
                 U strlen
0000000000000000 t usage
                 U xor_encrypt
$ nm xor.o
                 U strlen
0000000000000000 T xor_encrypt
```

An object file is *relocatable*: machine code with holes in it, which the linker fills in.
`main.o` calls `xor_encrypt` but does not define it, so `nm` lists it as `U` (undefined).
`xor.o` defines it, as `T` (in the text, i.e. code, section).
Lowercase `t` (`usage`, `print_hex`) means a `static` function, local to its file and invisible to the linker's symbol resolution.

`main.o` on its own cannot become a program:

```console
$ gcc -o xor main.o
/usr/bin/ld: main.o: in function `main':
main.c:(.text+0x17e): undefined reference to `xor_encrypt'
/usr/bin/ld: main.c:(.text+0x1bc): undefined reference to `xor_encrypt'
collect2: error: ld returned 1 exit status
```

`undefined reference` is the linker saying that an `U` symbol was left with no `T` to match it.
There are two references because `main()` calls `xor_encrypt()` twice.
`printf`, `malloc` and the rest are also `U`, but they did not produce errors: `gcc` passes `-lc` to the linker on its own, and libc defines them.

### The static library

```console
$ ar rcs libxorstatic.a xor.o
$ ar t libxorstatic.a
xor.o
$ file libxorstatic.a
libxorstatic.a: current ar archive
$ nm libxorstatic.a

xor.o:
                 U strlen
0000000000000000 T xor_encrypt
```

`ar` is an *archiver*, not a linker: `r` inserts (or replaces) members, `c` creates the archive, `s` writes an index of the symbols.
`file` sees an `ar` archive, not ELF, and `nm` lists the symbols member by member.
`ar x libxorstatic.a` would extract `xor.o` back out, unchanged.

### Linking against it: `-L.`, `-l`, and their order

```console
$ gcc -o xor-static-lib main.o -lxorstatic
/usr/bin/ld: cannot find -lxorstatic: No such file or directory
collect2: error: ld returned 1 exit status
$ gcc -o xor-static-lib -L. -lxorstatic main.o
/usr/bin/ld: main.o: in function `main':
main.c:(.text+0x17e): undefined reference to `xor_encrypt'
/usr/bin/ld: main.c:(.text+0x1bc): undefined reference to `xor_encrypt'
collect2: error: ld returned 1 exit status
$ gcc -o xor-static-lib main.o -L. -lxorstatic
$ ./xor-static-lib key "Hello, World!"
encrypted: 23 00 15 07 0a 55 4b 32 16 19 09 1d 4a
decrypted: Hello, World!
```

* `-lxorstatic` means "a library named `xorstatic`": the linker turns it into `libxorstatic.so` or `libxorstatic.a`, adding the prefix and the extension itself.
  That is why the file has to be called `libxorstatic.a`.
* The linker searches a fixed list of system directories (`/usr/lib/x86_64-linux-gnu`, `/usr/lib`, …).
  The current directory is not on it, hence `cannot find`.
  `-L.` adds `.` to the list.
* The linker processes its arguments **left to right**, keeping a list of symbols that are still undefined.
  When it reaches an archive, it extracts only the members that define a symbol on that list *at that moment*.
  In the second attempt the archive comes first, when nothing is undefined yet, so nothing is taken from it; by the time `main.o` adds `xor_encrypt` to the list, the archive has already been passed and is not revisited.
  Put libraries **after** the object files that use them, always.

The order matters for the shared library too, on distributions such as Ubuntu that link with `--as-needed` by default: a `.so` seen before anything needs it is dropped, and the second attempt fails the same way with `-lxordyn`.

```console
$ nm xor-static-lib | grep xor_encrypt
00000000000013f7 T xor_encrypt
$ file xor-static-lib
xor-static-lib: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=f2baa7740e6a7e610aa9df179cf9cfcce45bd9ba, for GNU/Linux 3.2.0, not stripped
$ ldd xor-static-lib
	linux-vdso.so.1 (0x0000782d0bd11000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x0000782d0ba00000)
	/lib64/ld-linux-x86-64.so.2 (0x0000782d0bd13000)
```

`xor_encrypt` is now `T`, with an address: the code of `xor.o` was copied into the executable, and the symbol was **resolved at link time**.
The executable is still *dynamically linked* — but only against libc, which `ldd` lists along with the loader itself (`ld-linux-x86-64.so.2`) and the kernel-provided `linux-vdso.so.1`.
Our library does not appear: there is nothing left to load from it, and deleting `libxorstatic.a` now would change nothing.

### The shared library

```console
$ gcc -Wall -fPIC -c -o xor_pic.o xor.c
$ gcc -shared -o libxordyn.so xor_pic.o
$ file libxordyn.so
libxordyn.so: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, BuildID[sha1]=f3a2e20929ff3e809bde3fb140d6eb274a50cb54, not stripped
$ nm -D libxordyn.so
                 w __cxa_finalize@GLIBC_2.2.5
                 w __gmon_start__
                 w _ITM_deregisterTMCloneTable
                 w _ITM_registerTMCloneTable
                 U strlen@GLIBC_2.2.5
0000000000001119 T xor_encrypt
```

`-fPIC` produces **position-independent code**.
A shared library is mapped at a different address in every process that loads it, so its code cannot contain absolute addresses.
It is compiled into its own object file, `xor_pic.o`, rather than reusing `xor.o`.
`-shared` makes the linker produce a shared object instead of an executable.

`file` reports an ELF *shared object*, and `nm -D` lists its **dynamic** symbols: the ones it exports (`xor_encrypt`) and the ones it needs from elsewhere (`strlen`, from libc).
The shared library has undefined symbols of its own, and they are resolved at load time just like the executable's.
The `w` entries are *weak* references added by the toolchain's start-up code; a weak symbol that nobody defines is simply left as zero, and they can be ignored here.

### Linking against it, and running it

```console
$ gcc -o xor-dyn main.o -L. -lxordyn
$ ./xor-dyn key "Hello, World!"
./xor-dyn: error while loading shared libraries: libxordyn.so: cannot open shared object file: No such file or directory
$ ldd xor-dyn
	linux-vdso.so.1 (0x0000766315f4d000)
	libxordyn.so => not found
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x0000766315c00000)
	/lib64/ld-linux-x86-64.so.2 (0x0000766315f4f000)
```

The link succeeded: the linker found `libxordyn.so` through `-L.`, checked that it defines `xor_encrypt`, and recorded the library's name in the executable.
It did **not** copy the code, and it did not record *where* it found the library.

The error comes from the loader, at run time, before `main()` starts.
The loader searches its own list of directories: those configured in `/etc/ld.so.conf` (and cached in `/etc/ld.so.cache`), then the system library directories.
`-L.` was an instruction to the linker and is long gone.
`.` is deliberately not on the loader's list: otherwise any program run from a directory someone else can write to would load whatever `libxordyn.so` they left there.

`LD_LIBRARY_PATH` is an environment variable holding a colon-separated list of directories that the loader searches **before** its default ones.
Setting it for a single command affects only that command:

```console
$ LD_LIBRARY_PATH=. ldd xor-dyn
	linux-vdso.so.1 (0x0000765d69686000)
	libxordyn.so => ./libxordyn.so (0x0000765d69676000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x0000765d69400000)
	/lib64/ld-linux-x86-64.so.2 (0x0000765d69688000)
$ LD_LIBRARY_PATH=. ./xor-dyn key "Hello, World!"
encrypted: 23 00 15 07 0a 55 4b 32 16 19 09 1d 4a
decrypted: Hello, World!
```

It is a development and debugging aid.
Programs that are installed put their libraries in the standard directories, or record a search path in the executable at link time (`-Wl,-rpath`), so that nobody has to set anything.

### The symbol is resolved at load time

```console
$ file xor-dyn
xor-dyn: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=463d94b35db38d4507f68562b04fa9ab702e9bf5, for GNU/Linux 3.2.0, not stripped
$ nm xor-dyn | grep xor_encrypt
                 U xor_encrypt
$ LD_DEBUG=bindings LD_LIBRARY_PATH=. ./xor-dyn key hi 2>&1 | grep xor_encrypt
    239600:	binding file ./xor-dyn [0] to ./libxordyn.so [0]: normal symbol `xor_encrypt'
```

`file` cannot tell `xor-dyn` from `xor-static-lib`: both are dynamically linked executables with the same interpreter.
The difference is in the symbols.
In `xor-dyn`, `xor_encrypt` is still `U`, exactly as in `main.o`: the executable contains a call to it, but not its code.
`LD_DEBUG=bindings` makes the loader report every symbol it resolves; the line above is the loader binding `xor_encrypt` in `xor-dyn` to the definition in `libxordyn.so`, while the process starts.
The number at the start is the process ID.

### Summary

| File | `file` says | `xor_encrypt` | Resolved | Needs at run time |
| --- | --- | --- | --- | --- |
| `main.o` | relocatable | `U` | not yet | — |
| `xor.o` | relocatable | `T` | — | — |
| `libxorstatic.a` | `ar` archive | `T` (in `xor.o`) | — | — |
| `libxordyn.so` | shared object | `T` | — | `libc.so.6` |
| `xor-static-lib` | pie executable, dynamically linked | `T` | at link time | `libc.so.6` |
| `xor-dyn` | pie executable, dynamically linked | `U` | at load time | `libxordyn.so`, `libc.so.6` |

### The `Makefile`

The `Makefile` holds exactly the commands above, one rule per file:

* `xor.o` → `libxorstatic.a` → `xor-static-lib`, and `xor_pic.o` → `libxordyn.so` → `xor-dyn`.
* Two object files are built from `xor.c`, because the shared library needs `-fPIC` and the archive does not.
  They must have different names, or one would overwrite the other.
* Each executable depends on its library, so editing `xor.c` and running `make` rebuilds the library and relinks the executable.

`03-stream-ciphers` provides a `Makefile` with the library rules already written, and asks for the executable rules to be added after building them by hand.

## References

* `man 1 gcc`, `man 1 ld`, `man 1 ar`, `man 1 nm`, `man 1 ldd`, `man 1 file`
* `man 8 ld.so` — the loader's search order, `LD_LIBRARY_PATH`, `LD_DEBUG`
* Ulrich Drepper, [How To Write Shared Libraries](https://www.akkadia.org/drepper/dsohowto.pdf)

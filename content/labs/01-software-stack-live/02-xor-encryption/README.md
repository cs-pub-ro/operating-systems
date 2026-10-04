# Exercise: XOR Encryption — Build and Use a Library

**Tools:** GCC, Make, `ar`, `file`, `ldd`, `nm`

## Goal

Build a static library and a shared library from the same source file, link a program against each, and follow a symbol from *undefined* to *resolved*.
This is a guided walkthrough: there is no code to write, only commands to run and output to read.
Everything you do here, you will do on your own in [`03-stream-ciphers`](../03-stream-ciphers).

## Background

`xor_encrypt()` (in `xor.c` / `xor.h`) XORs every byte of a buffer with the bytes of a repeating key.
XOR is its own inverse, so the same call with the same key also decrypts.
`main.c` encrypts its `<text>` argument, prints the result in hexadecimal (it can hold any byte value, `00` included), then decrypts it again.

A **static library** (`.a`) is an archive of object files; the linker copies what it needs out of it *into* the executable.
A **shared library** (`.so`) stays a separate file; the executable only records its name, and the **loader** maps it in each time the program starts.

To keep the two apart, the libraries have different names: `libxorstatic.a` and `libxordyn.so`.

## Your Task

Run every command, and read every output before moving on.

1. Compile each source file to an object file, and look at the symbols in each:

   ```console
   gcc -Wall -c -o main.o main.c
   gcc -Wall -c -o xor.o xor.c
   file main.o xor.o
   nm main.o
   nm xor.o
   ```

   `U` means *undefined*: used here, defined somewhere else.
   `T` means *defined here*, in the code (text) section.
   Find `xor_encrypt` in both outputs.

1. Try to make an executable from `main.o` alone, with `gcc -o xor main.o`, and read the error.
   Someone has to provide `xor_encrypt`.

1. Build the static library and look inside it:

   ```console
   ar rcs libxorstatic.a xor.o
   ar t libxorstatic.a
   file libxorstatic.a
   nm libxorstatic.a
   ```

1. Link `main.o` against it, in three attempts:

   ```console
   gcc -o xor-static-lib main.o -lxorstatic
   gcc -o xor-static-lib -L. -lxorstatic main.o
   gcc -o xor-static-lib main.o -L. -lxorstatic
   ```

   `-lxorstatic` asks for a file named `libxorstatic.a` (or `libxorstatic.so`): the linker adds the `lib` prefix and the extension.
   `-L.` adds the current directory to the places the linker searches; without it, only the system directories are searched.
   The linker reads its arguments **left to right** and takes from a library only the symbols that are undefined *so far*.
   Explain why only the third attempt works, then run `./xor-static-lib key "Hello, World!"`.

1. Check where `xor_encrypt` ended up, and what the executable depends on:

   ```console
   nm xor-static-lib | grep xor_encrypt
   file xor-static-lib
   ldd xor-static-lib
   ```

1. Build the shared library — position-independent code (`-fPIC`), linked with `-shared` — and look at it:

   ```console
   gcc -Wall -fPIC -c -o xor_pic.o xor.c
   gcc -shared -o libxordyn.so xor_pic.o
   file libxordyn.so
   nm -D libxordyn.so
   ```

1. Link against it, again with `-L.` and with `-l` at the end, and run the result:

   ```console
   gcc -o xor-dyn main.o -L. -lxordyn
   ./xor-dyn key "Hello, World!"
   ldd xor-dyn
   ```

   Read the error message, and the `not found` in the `ldd` output.
   `-L.` was for the linker, at build time; it told the loader nothing.
   `LD_LIBRARY_PATH` is the environment variable that adds directories to the **loader**'s search, at run time:

   ```console
   LD_LIBRARY_PATH=. ldd xor-dyn
   LD_LIBRARY_PATH=. ./xor-dyn key "Hello, World!"
   ```

1. Check where `xor_encrypt` is now, and watch the loader resolve it:

   ```console
   nm xor-dyn | grep xor_encrypt
   LD_DEBUG=bindings LD_LIBRARY_PATH=. ./xor-dyn key hi 2>&1 | grep xor_encrypt
   ```

1. Read the `Makefile`, match each rule to a command you typed, then rebuild everything with it:

   ```console
   make clean
   make
   ```

## Check Your Work

* Both executables print the same encrypted bytes for the same key and text, and both decrypt back to the text.
* For each of `xor.o`, `libxorstatic.a`, `libxordyn.so`, `xor-static-lib` and `xor-dyn`, you can say what `file` reports and why.
* You can say which of the two executables `ldd` shows depending on `libxordyn.so`, and why the other one does not need it.
* `xor_encrypt` is `U` in `main.o` and in `xor-dyn`, but `T` in `xor-static-lib`.
  Explain to the teaching assistant who resolves it in each case, and when: at link time, or at load time.
* You can explain why `-l` goes after the object files, why `-L.` is needed, and why `LD_LIBRARY_PATH` is needed for `xor-dyn` but not for `xor-static-lib`.

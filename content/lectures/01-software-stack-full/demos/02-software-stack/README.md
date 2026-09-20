# Demo: Hello, World at Five Heights of the Stack

The same fourteen bytes, printed by five programs written at five different levels of the software stack.
They do the same thing, and what it costs them to do it differs by three orders of magnitude.

## Goal

Make the layers of the stack visible and countable.
By the end you should be able to look at a program and say roughly what is underneath it, and be able to measure that rather than guess.

## Background

The programs, from the bottom up:

| File | Built as | What is below it |
| --- | --- | --- |
| `hello-nolibc.asm` | `nasm` + `ld` | nothing but the kernel |
| `hello.asm` | `nasm` + `gcc` | the C runtime start-up and the dynamic loader |
| `hello.c` | `gcc` | libc: `puts()`, buffered streams, locales |
| `hello.cpp` | `g++` | the C++ standard library, on top of libc |
| `hello.py` | `python3` | the CPython interpreter, on top of libc |
| `hello_flask.py` | `flask` | a web framework, on top of CPython |

`hello-nolibc.asm` and `hello.asm` both end in the same `syscall` instruction with `1` in `rax`, which is `write()` on x86-64 Linux.
The difference between them is not the message, it is the entry point: `_start` means the kernel jumps straight into your code, while `main` means the kernel jumps into libc's start-up code, which sets up the C runtime and only then calls you.

Everything higher up eventually reaches the same `write()`.
What each layer adds is not a different way to reach the kernel; it is everything that happens on the way there.

## Build and run

```console
make            # builds the four compiled versions
make run        # runs all of them, plus the Python one
make strace     # counts the system calls each of them makes
```

The Flask version is separate, because it does not exit:

```console
pip install flask
flask --app hello_flask run --port 8080
curl http://localhost:8080/
```

A plain HTTP server with no framework at all is one command, and is worth showing next to it:

```console
python3 -m http.server 8080
```

## Results and explanations

### How many system calls does it take to print one line?

```text
$ make strace
./hello-nolibc         2 system calls
./hello-asm            30 system calls
./hello-c              35 system calls
./hello-cpp            65 system calls
python3 hello.py       6155 system calls
```

Run `strace ./hello-nolibc` and read the whole trace.
It is three lines long, and one of them is the `execve()` that started the program.

```console
$ strace ./hello-nolibc
execve("./hello-nolibc", ["./hello-nolibc"], 0x7ffeb1b99270 /* 71 vars */) = 0
write(1, "Hello, World!\n", 14)         = 14
exit(0)                                 = ?
+++ exited with 0 +++
```

`strace -c` counts two rather than three, because `exit()` never returns and so is never counted as completed.

Now run `strace ./hello-c` and read that one.
The `write()` is still there, near the end, and everything before it is the dynamic loader finding `libc.so.6`, mapping it, applying relocations, and libc setting up standard streams and thread-local storage.
Twenty-eight system calls of start-up for one system call of work.

`hello-cpp` roughly doubles it, because there are three more shared libraries to find and map (`libstdc++`, `libm`, `libgcc_s`), and the C++ runtime has its own initialisation.

`python3 hello.py` makes over six thousand.
Almost all of them are `openat()`, `stat()` and `read()` calls, because starting CPython means finding and loading the interpreter's own module tree.
Nothing about printing a string got harder; what grew is what has to exist before the first line of your program runs.

### What does it cost?

| Version | Size | Shared libraries | Start-to-exit |
| --- | ---: | ---: | ---: |
| `hello-nolibc` | 8 888 B | 0 | ≈ 0.25 ms |
| `hello-asm` | 15 712 B | 1 | ≈ 0.35 ms |
| `hello-c` | 16 032 B | 1 | ≈ 0.35 ms |
| `hello-cpp` | 16 568 B | 4 | ≈ 0.70 ms |
| `hello.py` | -- | -- | ≈ 32 ms |

Numbers from Ubuntu 24.04 on x86-64; yours will differ, the ordering will not.

A hundred-fold difference in start-up time between C and Python, for a program that does nothing.
This is why a shell script that calls `python3` in a loop is slow, and why the same Python code inside one long-running process is perfectly fine.
The cost is paid per *process*, not per line of work.

### And yet nobody writes `hello-nolibc`

Look at what the 8 888-byte version does not have.

* No buffering: every `write()` is a system call, where `printf()` would batch.
* No portability: the `syscall` numbers and the argument registers are x86-64 Linux, and nothing else.
* No error handling: `write()` may write fewer bytes than asked, and the program ignores it.
* No formatting, no locale, no wide characters, no `%d`.
* No way to grow: the first time it needs to read a file, sort a list or parse an argument, all of that has to be written by hand.

`hello.c` buys all of that for 7 KB and 33 extra system calls, once.
`hello.py` buys an entire library ecosystem for 32 ms of start-up.
`hello_flask.py` buys HTTP, routing, request parsing and a development server for one decorator.

That is the shape of the whole lecture: every layer costs something measurable and buys something you would otherwise have to build.

## Going further

* Link `hello.c` statically with `gcc -static -o hello-static hello.c`, then count its system calls with `strace -c ./hello-static`.
  The loader's work disappears -- 35 calls become 17 -- and the binary grows from 16 KB to about 800 KB.
  Session 01 of the lab measures this trade in [`bonus-static-vs-dynamic`](../../../../labs/01-software-stack-full/bonus-static-vs-dynamic).
* Replace `puts()` with `write(1, "Hello, World!\n", 14)` in `hello.c` and compare the traces.
  The start-up cost does not move: it was never about the call you make.
* Run `strace -f python3 -m http.server 8080` in one terminal and `curl localhost:8080` in another, and find the `accept4()`, `recvfrom()` and `sendto()` calls that serve the request.
  That is the socket API of session 11, from the outside.
* Count the system calls of the Flask version the same way and explain the difference against `http.server`.
* `ltrace ./hello-c` shows the *library* calls rather than the system calls, which is the layer directly above.

## References

* `man 2 syscall`, `man 2 write`, `man 1 strace`, `man 1 ltrace`
* [Linux x86-64 system call table](https://filippo.io/linux-syscall-table/)
* [Flask quickstart](https://flask.palletsprojects.com/en/stable/quickstart/)
</content>

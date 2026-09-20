# Demo: Hello, World at Five Heights

The same fourteen bytes, printed by programs written at five different levels of the stack.

## Run

```console
cd ../../../01-software-stack-full/demos/02-software-stack
make
make strace
```

```text
./hello-nolibc         2 system calls
./hello-asm            30 system calls
./hello-c              35 system calls
./hello-cpp            65 system calls
python3 hello.py       6155 system calls
```

Then read two traces in full:

```console
strace ./hello-nolibc
strace ./hello-c
```

And, one layer higher again:

```console
python3 -m http.server 8080
```

## Ask

* The whole trace of `hello-nolibc` is three lines. What are the other thirty-three calls in `hello-c` doing?
* All five end in the same `write()`. So what exactly is the extra cost buying?
* Why does nobody write the two-system-call version?

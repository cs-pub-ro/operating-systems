# Session 01: The Software Stack

This session is about what sits between a C program and the kernel, and how such a program is built and linked.

## Learning objectives

By the end of this session you should be able to:

* Explain the software layers between a C program and the kernel: application, the standard C library (libc), and system calls.
* Implement basic string-handling functions typically part of libc (`strlen()`, `strcpy()`, `strcat()`, `memcpy()`) and reason about their algorithmic cost.
* Compare buffered (`printf()`) and unbuffered (`write()`) output functions, and explain the buffering trade-off from measured data.
* Build a C program as a dynamically-linked executable, a statically-linked executable, and against a shared or a static library.
* Explain the difference between static linking (`.a`, `ar`) and dynamic linking (`.so`).

## Prerequisites and required tools

* Prior knowledge of C syntax.
* A Linux environment with `gcc`, `make`, `ar`, `ldd`, `nm`, `objdump`, `strace` and `time` installed.
* Comfort with the command line: running commands, redirecting output, reading `man` pages.

Check that your system has all it needs for the lab, by downloading and running the [`check-prerequisites.sh` script](https://github.com/cs-pub-ro/operating-systems-sessions/blob/master/scripts/check-prerequisites.sh):

```console
wget -O check-prerequisites.sh http://raw.githubusercontent.com/cs-pub-ro/operating-systems-sessions/refs/heads/master/scripts/check-prerequisites.sh
chmod a+x check-prerequisites.sh
./check-prerequisites.sh
```

The script installs nothing.
It reports what is missing and prints the command that installs it on your distribution.

If something is missing, be sure to install and configure it.

## Getting the lab archive

Download [`01-software-stack.zip`](https://github.com/cs-pub-ro/operating-systems-sessions/raw/lab-archives/01-software-stack.zip), then unzip it and change into the directory it creates:

```console
wget -O 01-sotfware-stack.zip https://github.com/cs-pub-ro/operating-systems-sessions/raw/lab-archives/01-software-stack.zip
unzip 01-software-stack.zip
cd 01-software-stack/
```

Work inside that directory for the rest of the session.

## Exercise order

Each exercise has a directory.
Inside each exercise directory there is `README.md` file with instructions about the exercise.
There are three types of exercises that are to be worked on in order.

Demos come first, solved together with the teaching assistant.
Core exercises are then solved individually or in teams, in the numeric order shown.
Bonus exercises are optional: start them if you finish the core exercises, or take them home.

| Order | Exercise | Type | Objective |
| --- | --- | --- | --- |
| 1 | [`demo-printf-vs-write`](demo-printf-vs-write) | Demo | See why `printf()` can be faster *or* slower than `write()`, depending on buffering. |
| 2 | [`demo-copy-string`](demo-copy-string) | Demo | Compare `strcat()`-based and `strcpy()`-based string building. |
| 3 | [`01-string-functions`](01-string-functions) | Core | Implement `strlen()`, `strcpy()`, `strcat()` and `memcpy()` from scratch, then measure them. |
| 4 | [`02-stream-ciphers`](02-stream-ciphers) | Core | Build the same program as a dynamic executable, a static executable, a shared library and a static library. |
| 5 | [`bonus-static-vs-dynamic`](bonus-static-vs-dynamic) | Bonus | Package your string functions as `libmystring` and measure static vs dynamic call and start-up cost. |
| 6 | [`bonus-per-stream-cipher-exec`](bonus-per-stream-cipher-exec) | Bonus | Split the cipher program into one dedicated executable per cipher, in all four link formats. |

`bonus-static-vs-dynamic` reuses your solution to `01-string-functions`, and `bonus-per-stream-cipher-exec` reuses the commands from `02-stream-ciphers`, so do the core exercises first.

Where there is also a `FURTHER.md`, it holds **optional** extensions and questions to dig into once the task is done.
Go through it only after completing all other exercises.

# Demos

The programs and commands demonstrated during the lecture, one directory per part of it.

Each demo is small on purpose: it makes one point, and it is meant to be run rather than read.
The write-up in each directory says what to expect, what actually happens, and why.

| Demo | Part of the lecture | What it shows |
| --- | --- | --- |
| [`00-pitch/`](00-pitch) | [00. Pitch](../README.md#00-pitch-everything-is-a-process) | Hundreds of processes, one program on seven cores, a process with 56 threads. |
| [`01-run-apps/`](01-run-apps) | [01. Running an application](../README.md#01-running-an-application) | The threads of a process, sharing one address space. |
| [`03-threads/`](03-threads) | [03. Threads](../README.md#03-threads) | The instruction pointer and stack pointer of each thread, and the stack each one gets. |
| [`04-process-ops/`](04-process-ops) | [04. Process operations](../README.md#04-process-operations) | Creating, waiting for and ending a process; zombies and orphans. |
| [`05-thread-ops/`](05-thread-ops) | [05. Thread operations](../README.md#05-thread-operations) | Creating threads from a function and collecting what they return. |
| [`06-fork-exec/`](06-fork-exec) | [06. fork() and exec()](../README.md#06-fork-and-exec) | Process creation by hand, and the one system call under all of it. |

## Running them

Every demo that needs building has a `Makefile`, so `make` inside its directory is enough.
The tools the demos need, beyond a C compiler and `make`, are:

* `ps`, `pmap` and `pstree` (`procps`, `psmisc`), to read processes and threads from outside
* `strace`, to see the system calls process and thread creation make
* `ffmpeg` built with `libx264`, and `htop`, for the pitch's multi-threaded program

Several demos wait at prompts, or run a long `sleep`, so that `ps` and `pmap` can be run on them from a second terminal; they are marked as such in their READMEs.
`utils/utils.h` holds the `DIE()` macro the C sources share.

The numbers quoted in the write-ups were measured on one machine (Ubuntu, Linux 6.14, glibc 2.41, x86-64, 14 cores).
PIDs, thread ids and addresses differ from run to run and from machine to machine; the shapes do not.

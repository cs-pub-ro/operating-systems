# Demos

The programs demonstrated during the lecture, one directory per part of it.

Each demo is small on purpose: it makes one point, and it is meant to be run rather than read.
The write-up in each directory says what to expect, what actually happens, and why the two differ.

| Demo | Part of the lecture | What it shows |
| --- | --- | --- |
| [`00-pitch/`](00-pitch) | [00. Pitch](../README.md#00-pitch-why-do-we-need-an-operating-system) | Even a bare `Hello, World!` runs mostly kernel instructions. |
| [`01-make-os/`](01-make-os) | [01. What makes an OS](../README.md#01-what-makes-an-operating-system) | The smallest specialised OS is still hundreds of kilobytes. |
| [`02-os-interface/`](02-os-interface) | [02. The OS interface](../README.md#02-the-operating-system-interface) | Talking to the kernel directly, and what the crossing costs. |
| [`03-privileged-domain/`](03-privileged-domain) | [03. Privileged domains](../README.md#03-privileged-and-unprivileged-domains) | Privileged instructions fault in user mode; the boundary is in silicon. |
| [`04-optimize-os-interface/`](04-optimize-os-interface) | [04. Optimizing the interface](../README.md#04-optimizing-the-os-interface) | Two ways to pay the system-call tax less: buffering, and `sendfile()`. |

## Running them

Every demo that needs building has a `Makefile`, so `make` inside its directory is enough.
The tools the demos need, beyond a C compiler and `make`, are:

* `nasm` and `ld`, for the assembly programs in `00-pitch/`, `02-os-interface/` and `03-privileged-domain/`
* `perf` (`linux-tools`), to count retired instructions -- needs `sudo`
* `strace`, to see the system calls a program makes
* `docker` or a QEMU/Unikraft toolchain, for `01-make-os/` (see its README for the full requirement list)

`perf` is the only hard dependency beyond the compiler toolchain, and only the instruction-count outputs need it; the timings print without it.

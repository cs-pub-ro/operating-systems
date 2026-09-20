# Demos

The programs demonstrated during the lecture, one directory per part of it.

Each demo is small on purpose: it makes one point, and it is meant to be run rather than read.
The write-up in each directory says what to expect, what actually happens, and why the two differ.

| Demo | Part of the lecture | What it shows |
| --- | --- | --- |
| [`00-pitch/`](00-pitch) | [00. Pitch](../README.md#00-pitch-four-small-surprises) | Four programs that do not behave the way their source code suggests. |
| [`02-software-stack/`](02-software-stack) | [02. The Software Stack](../README.md#02-the-software-stack) | The same message printed from five different heights of the stack. |
| [`04-versus/`](04-versus) | [04. Trade-offs](../README.md#04-trade-offs-what-a-layer-costs-you) | What a security guarantee costs in CPU time. |
| [`06-software-interaction/`](06-software-interaction) | [06. Interaction](../README.md#06-interaction-between-software-components) | A four-container web application talking over three different protocols. |

## Running them

Every demo that needs building has a `Makefile`, so `make` inside its directory is enough.
The tools the demos need, beyond a C compiler and `make`, are:

* `nasm` and `ld`, for the assembly versions in `02-software-stack/`
* `strace`, to count the system calls a program makes
* `python3`, and `flask` for the framework example
* `libssl-dev` (`openssl-devel` on Fedora), for `04-versus/`
* `docker` with the Compose plugin, for `06-software-interaction/`

None of the demos need root, except for whatever your Docker installation requires.
</content>
</invoke>

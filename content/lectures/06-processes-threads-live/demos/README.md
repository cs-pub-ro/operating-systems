# Demos

The programs and commands run during the lecture, one directory per part.
Each holds the sources, the commands to run, and the question to ask about the result.

| Demo | Shows |
| --- | --- |
| [`00-pitch/`](00-pitch) | Hundreds of processes, one program on seven cores, a 56-thread process. |
| [`01-run-apps/`](01-run-apps) | The threads of a process, sharing one address space. |
| [`03-threads/`](03-threads) | The IP and SP of each thread, and the stack each one gets. |
| [`04-process-ops/`](04-process-ops) | Creating, waiting for and ending a process; zombies and orphans. |
| [`05-thread-ops/`](05-thread-ops) | Threads created from a function, and what they return. |
| [`06-fork-exec/`](06-fork-exec) | Process creation by hand, and the one call under all of it. |

Every demo with a `Makefile` builds with `make`.
`utils/utils.h` holds the shared `DIE()` macro.

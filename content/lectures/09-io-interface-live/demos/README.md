# Demos

The programs and commands run during the lecture, one directory per part.
Each holds the sources, the commands to run, and the question to ask about the result.

| Demo | Shows |
| --- | --- |
| [`00-pitch/`](00-pitch) | How much I/O a process does; one megabyte written four ways. |
| [`01-process-outside/`](01-process-outside) | The channels a process has open. |
| [`02-io-interface/`](02-io-interface) | Open, read, write, close, on a file and on a FIFO. |
| [`03-file-descriptor-table/`](03-file-descriptor-table) | How large the table is, and which entry a new channel gets. |
| [`04-channel-types/`](04-channel-types) | One process with every kind of channel; one message through five of them. |
| [`05-channel-internals/`](05-channel-internals) | Open permissions; who shares a file pointer. |
| [`06-file-channel-ops/`](06-file-channel-ops) | The file pointer and the size after each call; size against space. |

Every demo that has sources builds with `make`.
`utils/utils.h` holds the shared `DIE()` macro.

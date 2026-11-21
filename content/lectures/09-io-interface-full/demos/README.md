# Demos

The programs and commands run during the lecture, one directory per part.
Each demo has a `README.md` with what it shows, how to build and run it, the output to expect and what the output means.

| Demo | Shows |
| --- | --- |
| [`00-pitch/`](00-pitch) | How much I/O a process does, and one megabyte written four ways, from 0.3 ms to 10 seconds. |
| [`01-process-outside/`](01-process-outside) | The I/O channels a process has open, listed with `lsof`. |
| [`02-io-interface/`](02-io-interface) | The same calls, open, read, write, close, on a file and on a FIFO. |
| [`03-file-descriptor-table/`](03-file-descriptor-table) | How many entries the file descriptor table has, and which one a new channel gets. |
| [`04-channel-types/`](04-channel-types) | One process with a channel of every kind, and five pairs of programs that talk through one kind each. |
| [`05-channel-internals/`](05-channel-internals) | The permissions of a channel against those of the file; the file pointer after `open()`, `dup()` and `fork()`. |
| [`06-file-channel-ops/`](06-file-channel-ops) | What each call does to the file pointer and to the size; a file of 20 GiB that takes 4 KiB. |

Every demo that has sources builds with `make`.
`utils/utils.h` holds the shared `DIE()` macro.

The numbers in the READMEs were measured on a desktop with 24 CPUs and an NVMe disk, running Linux 6.14 with an ext4 file system.
Yours will differ; the order of magnitude between them is what to look at.

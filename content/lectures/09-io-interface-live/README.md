# Session 09: I/O Interface

The plan of the ninth lecture, the demos run during it, and the points worth writing down.

This is the page used while the lecture is delivered.
The full version -- the same argument in prose, with the diagrams, the reference output and the reading -- is [`09-io-interface-full/`](../09-io-interface-full).

Lectures 03 to 08 stayed inside the process: memory, threads, who runs when, and what happens when several run over the same data.
This lecture is about the way out: one megabyte that takes between a third of a millisecond and ten seconds to write, and the interface every byte crosses, from a number in the process to a table to a structure in the kernel.
It is the first lecture on I/O: this one is the interface and the file, lecture 10 is communication between processes, and lecture 11 is the network.

## What the lecture answers

1. **How much I/O does a process do, and how long does it take to write a megabyte?**
   A hundred read calls a second, for days; and 0.3 ms, 0.8 ms, 40 ms or 10 s, by where the data is when the call returns.
1. **What does a process need from outside, and what carries it?**
   Everything but CPU and memory; I/O channels, file-like to devices and socket-like to processes.
1. **Which operations does a process have, and what does it hold on to?**
   Create, open, read, write, stat, control, close, delete; a file descriptor, a small integer.
1. **What is a file descriptor a number of?**
   An index in a per-process table in the kernel, with a maximum size, filled from the lowest free entry.
1. **Which channels are there, and how do the two ends find each other?**
   Files, pipes, FIFOs, sockets; through a path, a port, or inheritance.
1. **What does the kernel remember about an open file?**
   Open permissions, a file pointer, a reference count, and which file it is.
1. **What does each call do to the file?**
   It changes the file pointer, the size, or both; and the size is not the space.

## Plan

| Part | Question | Demo | Figure |
| --- | --- | --- | --- |
| 00. Pitch | How long does it take to write a megabyte? | [`00-pitch/`](demos/00-pitch) | [the storyline](media/00-pitch/storyline.svg), [four writes](media/00-pitch/four-writes.svg) |
| 01. Processes and the outside world | What carries bytes in and out? | [`01-process-outside/`](demos/01-process-outside) | [inside and outside](media/01-process-outside/process-outside.svg), [two families](media/01-process-outside/two-families.svg) |
| 02. The process I/O interface | Which operations, and what handle? | [`02-io-interface/`](demos/02-io-interface) | [the life of a channel](media/02-io-interface/operations.svg) |
| 03. The file descriptor table | What is a descriptor a number of? | [`03-file-descriptor-table/`](demos/03-file-descriptor-table) | [the table](media/03-file-descriptor-table/fd-table.svg) |
| 04. Types of I/O channels | How do the two ends meet? | [`04-channel-types/`](demos/04-channel-types) | [five channels](media/04-channel-types/channel-types.svg) |
| 05. File channel internals | What does the kernel remember? | [`05-channel-internals/`](demos/05-channel-internals) | [inside a channel](media/05-channel-internals/open-file.svg), [open, dup, fork](media/05-channel-internals/open-dup-fork.svg) |
| 06. File channel operations | What does each call change? | [`06-file-channel-ops/`](demos/06-file-channel-ops) | [a file, seen from a process](media/06-file-channel-ops/logical-view.svg), [seven calls](media/06-file-channel-ops/file-ops-steps.svg), [size is not space](media/06-file-channel-ops/sparse-file.svg) |
| 07. Conclusion | What should survive the week? | -- | -- |

## Storyline / Narrative

The lecture follows one thread from start to finish, and the figure below walks through it, station by station: [the storyline](media/00-pitch/storyline.svg).

1. **The hook:** one megabyte, one file, four programs that differ in one line.
   A third of a millisecond, and ten seconds: a factor of 35,000, and all four were told "written".
1. **Inside and outside:** a process is memory and threads, sealed off on purpose.
   What it works on and what it works for are outside; a browser made 84 million read calls in nine days.
1. **Channels:** whatever crosses, crosses on an I/O channel, carried by the kernel.
   Bytes, and two verbs: read and write.
1. **Two families:** a device that keeps data, or another process.
   A file can be read twice and never makes you wait; what comes down a pipe is gone once read.
1. **One interface:** create, open, read, write, stat, control, close, delete.
   Create and delete are about the thing; open and close are about your connection to it.
1. **The handle:** `open()` takes a name and returns a number, and the name is never used again.
   Why 3?
1. **The table:** because 0, 1 and 2 were taken. The number is an index in a per-process table in the kernel.
   It has an end, and a new channel gets the lowest free entry: close 0, open a file, and that file is the standard input.
1. **Meeting points:** a file, devices, a pipe, a FIFO and sockets, side by side in one table.
   The other end finds a channel through a path, a port, or by being born with the descriptor.
1. **Inside a channel:** open permissions, a file pointer, a reference count, the file.
   Permissions are checked once, at `open()`; two opens give two pointers; `dup()` and `fork()` share one.
1. **A file, seen from here:** a row of bytes, a size and a pointer.
   The size belongs to the file, the pointer to the channel.
1. **Moving the numbers:** read and write move the pointer, `lseek()` sets it, `ftruncate()` sets the size.
   A file of 20 GiB that takes 4 KiB: the size is one number, the space another.
1. **What should survive the week:** a number, an index in a table, a pointer to a channel that remembers how it was opened, where it is, and which file it is.
   Next time: the other family, where the far end is a process that answers back.

## Points to capture

Ten things to have in your notes when you leave.

1. **I/O channel:** the connection between a process and something outside it. It carries bytes, with read and write.
1. **File-like:** to a device; the data stays, has a size, can be re-read. **Socket-like:** to a process; the data passes once, and a read may wait.
1. **The I/O interface:** create, open, read, write, stat, control, close, delete. Create and delete concern the thing; open and close concern the channel.
1. **File descriptor:** the integer `open()` returns and every other call takes. 0, 1 and 2 are the standard input, output and error.
1. **File descriptor table:** per process, in the kernel; a descriptor is an index in it, and an entry points to a channel. A new channel gets the lowest free entry.
1. **The table has a maximum size:** `ulimit -n`, 1,024 by default; beyond it `open()` fails with `EMFILE`.
1. **The two ends of a channel meet through** a path (file, FIFO, Unix socket), a port (network socket), or inheritance (pipe; and 0, 1, 2).
1. **A file channel holds:** open permissions, the file pointer, a reference count, a reference to the file. Permissions are checked once, at `open()`.
1. **Two `open()` calls:** two channels, two file pointers. **`dup()` and `fork()`:** two descriptors, one channel, one file pointer. `close()` drops one reference.
1. **A file is an array of bytes** with a size, in the file, and a pointer, in the channel. `read()` and `write()` move the pointer; `lseek()` sets it; `ftruncate()` sets the size; the size is not the space on disk.

## Demos

Each directory below holds the sources, the commands to run and the question to ask about the result.

| Demo | Shows |
| --- | --- |
| [`00-pitch/process-io`](demos/00-pitch/process-io) | A shell: 5,252 read calls. A browser: 84 million. |
| [`00-pitch/write-layers`](demos/00-pitch/write-layers) | One megabyte: 0.3 ms, 0.8 ms, 40 ms, 10,500 ms. |
| [`01-process-outside/lsof`](demos/01-process-outside/lsof) | A shell with four channels, a browser with 1,022, of several types. |
| [`02-io-interface/file`](demos/02-io-interface/file) | `open()` returns 3, and the name is not used again. |
| [`02-io-interface/fifo`](demos/02-io-interface/fifo) | The same calls on a FIFO: `open()` and `read()` wait. |
| [`03-file-descriptor-table/fdtsize`](demos/03-file-descriptor-table/fdtsize) | 1,021 files opened, then *too many open files*. |
| [`03-file-descriptor-table/lowest-fd`](demos/03-file-descriptor-table/lowest-fd) | Close 4, open: 4. Close 0, open: 0. |
| [`04-channel-types/channel-list`](demos/04-channel-types/channel-list) | Eleven entries of one table: a file, devices, a pipe, a FIFO, three sockets. |
| [`04-channel-types/comm-channels`](demos/04-channel-types/comm-channels) | One message through a pipe, a FIFO, a Unix socket, TCP and UDP. |
| [`05-channel-internals/open-perm`](demos/05-channel-internals/open-perm) | A writable file that cannot be written through a read-only channel; an untouchable file that an open channel still writes. |
| [`05-channel-internals/file-pointer`](demos/05-channel-internals/file-pointer) | Two opens: "0123", "0123". `dup()` and `fork()`: "0123", "4567". |
| [`06-file-channel-ops/file-ops`](demos/06-file-channel-ops/file-ops) | Seven calls, and the pointer and the size after each. |
| [`06-file-channel-ops/truncate`](demos/06-file-channel-ops/truncate) | A file of 20 GiB that takes 4 KiB. |

## Slides

The deck delivered in the room is [`slides/io-interface-live.html`](slides/io-interface-live.html), rendered from [`slides/io-interface-live.qmd`](slides/io-interface-live.qmd).
It is deliberately thin: the diagrams, the demo results, and nothing that is better said than read.
The [full deck](../09-io-interface-full/slides) carries the same structure with the detail filled in.

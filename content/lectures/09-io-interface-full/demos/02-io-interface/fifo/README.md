# Demo: I/O Operations on a FIFO

The calls of the [file demo](../file) used again, on a FIFO: a channel whose other end is a process.

## Goal

See that the interface is the same, open, read, write, close on a file descriptor, and that what the calls do depends on what is at the other end.

## Background

A **FIFO**, or named pipe, is a name in the file system with no data behind it.
A process that opens it for writing and a process that opens it for reading are connected: what the first writes, the second reads, once, in the order it was written.

| Program | What it does |
| --- | --- |
| `receive_fifo` | creates `fifo_channel` with `mkfifo()`, opens it for reading, reads until the other end is closed, closes |
| `send_fifo` | opens `fifo_channel` for writing, writes a message, closes |

Lecture 10 comes back to pipes and FIFOs as a means of communication.
Here the FIFO is only the second thing the interface is tried on.

## Build and run

Two terminals, in this directory.

```console
make
./receive_fifo        # first terminal; it waits
ls -l fifo_channel    # second terminal
./send_fifo           # second terminal
```

## Results and explanations

The first terminal, before the sender is started:

```text
$ ./receive_fifo
mkfifo("fifo_channel") done
open("fifo_channel", O_RDONLY) ...
```

The second terminal:

```text
$ ls -l fifo_channel
prw-r--r-- 1 student student 0 Nov 21 18:55 fifo_channel
$ ./send_fifo
open("fifo_channel", O_WRONLY) = 3
write(3, message, 13) = 13
close(3) = 0
```

And the first terminal goes on:

```text
open("fifo_channel", O_RDONLY) = 3
read(3, buffer, 255) = 13: Hello, FIFO!
read(3, buffer, 255) = 0: the other end was closed
close(3) = 0
```

Set this beside the output of the file demo.

| | File | FIFO |
| --- | --- | --- |
| created with | `open(O_CREAT)` | `mkfifo()` |
| `ls -l` shows | `-`, and a size of 13 | `p`, and a size of 0, always |
| `open()` | returns at once | waits until the other end is opened too |
| `read()` with nothing to read | returns 0: the end of the file | waits for the other end to write |
| `read()` returns 0 when | the file pointer reached the size | the other end closed |
| the data, after it is read | is still in the file | is gone |
| the calls after `open()` | `read()`, `write()`, `close()` on a descriptor | the same |

The last row is the reason the interface exists: a program that reads from descriptor 3 does not have to know which of the two columns it is in.
The rows above it are the reason the lecture sorts channels into two families.

## Going further

* Run `./send_fifo` first, with no receiver.
  What happens if `fifo_channel` does not exist? And if it is left over from a previous run?
* Start `./receive_fifo`, and in the other terminal run `echo hello > fifo_channel` instead of the sender.
  Then try `cat fifo_channel` as the receiver, with `./send_fifo`.
  What does this say about which programs can use a FIFO?
* While `receive_fifo` waits in `open()`, look at it with `ps -o pid,state,wchan:20,comm -p $(pidof receive_fifo)`.
  Which state of lecture 07 is it in?
* Run `stat fifo_channel` and `stat` on a regular file, and compare the first lines.

## References

* `man 7 fifo`, `man 3 mkfifo`, `man 7 pipe`
* Kerrisk, *The Linux Programming Interface*, chapter 44, *Pipes and FIFOs*

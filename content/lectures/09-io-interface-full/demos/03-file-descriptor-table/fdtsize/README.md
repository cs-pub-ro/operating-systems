# Demo: The Size of the File Descriptor Table

A program that opens the same file again and again, never closes anything, and counts how far it gets.

## Goal

See that every `open()` takes an entry in a table that belongs to the process, that the table has a maximum size, and that the maximum is a limit set on the process.

## Background

`fdtsize.c` reads the limit with `getrlimit(RLIMIT_NOFILE)`, then calls `open("/dev/null", O_RDONLY)` in a loop until it fails.
It prints the error, how many times `open()` worked, and the first and the last descriptor it got.

`RLIMIT_NOFILE` is the resource limit on open file descriptors: one more than the largest descriptor the process may have.
In a shell it is read and set with `ulimit -n`.
A process inherits its limits from its parent, so a limit set in a shell holds for the programs started from it.

## Build and run

```console
make
ulimit -n
./fdtsize
(ulimit -n 64; ./fdtsize)
```

The parentheses run the last command in a subshell, so that the lowered limit does not stay with your shell.

## Results and explanations

```text
$ ulimit -n
1024
$ ./fdtsize
limit of open file descriptors: 1024
open() failed: Too many open files
opened 1021 file descriptors, from 3 to 1023
$ (ulimit -n 64; ./fdtsize)
limit of open file descriptors: 64
open() failed: Too many open files
opened 61 file descriptors, from 3 to 63
```

1,021 and not 1,024, because the program started with three entries taken: 0, 1 and 2.
The descriptors it got are 3, 4, 5 and so on up to 1023, with none skipped: they are consecutive entries of one table.

The file was the same every time.
Opening it 1,021 times made 1,021 channels and used 1,021 entries, so an entry stands for an `open()`, and the file behind it is another matter.

The error is `EMFILE`, *too many open files*.
It is about this process: every other process on the machine can still open files, and so could this one if it closed one.

1,024 is the usual default.
Some terminals and desktops start their shells with a larger limit, and then `./fdtsize` prints a larger count; the subshell with `ulimit -n 64` behaves the same everywhere.

The limit is on the size the table may grow to.
The kernel starts every process with a small table, 64 entries on Linux, and replaces it with a larger one when the process needs more.

A program that runs into this limit by accident has a leak: it opens channels on some path through its code and does not close them.
For a server that keeps running, it is the I/O version of the memory leak of lecture 03, and it ends the same way, with an error on a call that used to work.

## Going further

* Add a `close(fd)` inside the loop, after the `open()`.
  How far does the program get now? Stop it with `Ctrl+C`.
* Run `ulimit -Hn` for the hard limit.
  Raise the soft limit to it with `ulimit -n`, in a subshell, and run the program again.
* Run `cat /proc/sys/fs/file-nr` for the number of channels open on the whole machine, and `cat /proc/sys/fs/file-max` for the limit on that.
* Start `./fdtsize` under `gdb`, break on the line that prints the result, and from another terminal run `ls /proc/$(pidof fdtsize)/fd | wc -l`.

## References

* `man 2 getrlimit`, under `RLIMIT_NOFILE`
* `man 1 bash`, under `ulimit`
* `man 2 open`, under `EMFILE` and `ENFILE`

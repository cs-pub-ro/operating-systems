# Demo: The Size of the File Descriptor Table

A program that opens `/dev/null` in a loop and never closes anything.

## Run

```console
make
ulimit -n
(ulimit -n 1024; ./fdtsize)
(ulimit -n 64; ./fdtsize)
```

## Ask

* Why 1,021 and not 1,024?
* The same file was opened every time. What does an entry of the table stand for?
* Whose limit is this: the file's, the program's, the machine's?
* What kind of bug makes a real program hit it?

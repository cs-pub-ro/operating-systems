# Demo: I/O Operations on a File

Two programs that use a file through the calls of the I/O interface, and print every call with what it returned.

## Goal

Follow the life of a channel to a file, call by call, and see that after `open()` the file is known to the program only as a small number.

## Background

| Program | What it does |
| --- | --- |
| `write_file` | creates `file_channel` and opens it for writing, writes a message, closes |
| `read_file` | opens `file_channel` for reading, asks for its size, reads until the end, closes |

`open()` does two jobs when it is given `O_CREAT`: it creates the file if it does not exist, and it opens a channel to it.
What it returns is a **file descriptor**: an integer that stands for the channel in every later call.

## Build and run

```console
make
./write_file
ls -l file_channel
./read_file
rm file_channel
```

## Results and explanations

```text
$ ./write_file
open("file_channel", O_WRONLY | O_CREAT | O_TRUNC) = 3
write(3, message, 13) = 13
close(3) = 0
$ ls -l file_channel
-rw-r--r-- 1 student student 13 Nov 21 18:55 file_channel
$ ./read_file
open("file_channel", O_RDONLY) = 3
fstat(3) = 0: a file of 13 bytes
read(3, buffer, 255) = 13: Hello, file!
read(3, buffer, 255) = 0: the end of the file
close(3) = 0
```

`open()` returned 3, in both programs.
The name of the file appears in one call, `open()`; `write()`, `fstat()`, `read()` and `close()` are given the 3 and nothing else.
Whatever the kernel needs to know, which file, where in it, whether writing is allowed, it finds starting from that number.

Why 3?
Because 0, 1 and 2 were taken before `main()` started, by the standard input, output and error.
Part 03 of the lecture shows the table these numbers index.

`read()` asked for 255 bytes and got 13: a read returns what there is, up to what was asked.
The second `read()` returned 0, which is how the end of a file is reported.
It returned at once: a file does not make its reader wait for more.

Between the two programs the file went on existing, with nobody connected to it.
Creating and deleting are about the file; opening and closing are about a channel to it, and the two have separate lives.

## Going further

* Run `./read_file` before `./write_file`, with no `file_channel` there.
  Which call fails, and with what error?
* Run `./write_file` twice, then `./read_file`.
  Why is the file still 13 bytes? Remove `O_TRUNC`, change the message to a shorter one and try again.
* Run `strace ./read_file` and find the five calls.
  What does the program open before `file_channel`, and which descriptor does each of those get?
* Add a second `open()` to `read_file.c`, without closing the first.
  What does it return?

## References

* `man 2 open`, `man 2 read`, `man 2 write`, `man 2 close`, `man 2 fstat`, `man 2 unlink`
* Kerrisk, *The Linux Programming Interface*, chapter 4, *File I/O: The Universal I/O Model*

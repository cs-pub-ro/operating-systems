# File Descriptor Operations

File descriptors are the primary means of referencing files in our system.
They are created, deleted, and manipulated through file interface operations, namely `open()`, `close()` `read()`, `write()`, and `lseek()`.
From a programmer's perspective, file descriptors are simply indexes into the process's **File Descriptor Table**, which maintains a list of all currently open files for that process.

In this section, we will focus on how to utilize file descriptors to perform the same operations that `FILE` allows, and more.
If you want to delve deeper into file descriptors, we recommend exploring [this guide on the **File Descriptor Table**](../guides/fd-table/README.md).

## `open()`

All processes start with three default file descriptors, inherited from the process's parent:

- `stdin` (standard input): 0
- `stdout` (standard output): 1
- `stderr` (standard error): 2

To create new file descriptors (i.e. open new files), a process can use the [`open()`](https://man7.org/linux/man-pages/man2/open.2.html) system call.
It receives the path to the file, some flags which are akin to the `mode` string passed to `fopen()`.
An optional `mode` parameter that denotes the file's permissions if the `open` must create it can also be provided.
If you use `O_CREAT`, just remember to also pass `0644` (`rw-r--r--` in octal, denoted by the first `0`), or permissions more restrictive.

Some other useful flags for `open()` are:

- `O_APPEND`: place file cursor at the end
- `O_CLOEXEC`: close the file descriptor when `exec()` is called.
   This is useful because child processes inherit the file descriptors, and this can lead to security problems.
- `O_TRUNC`: truncate the file to length 0.

## `close()`

Once you are done with a file descriptor you should call `close()` to free its **open file structure**.
This is similar to how you free memory once you are done with it.

## `read()` and `write()`

```c
read_bytes = read(fd, buf, num_bytes);
written_bytes = write(fd, buf, num_bytes);
```

As you know, verifying the return code of system calls is the way to go in general.
This is even more apparent when dealing with I/O syscalls, namely `read()` and `write()`, which return the number of bytes read or written.

Syscalls returning the number of bytes might seem redundant, but once you hear about partial I/O operations, it is of utmost importance.
If your process was interrupted by a signal while reading or writing, it is up to you to continue from where it left off.

**Remember: It is mandatory that we always use `read()` and `write()` inside `while` loops.**
Higher-level functions like `fread()` and `fwrite()` also use `while` loops when calling `read()` and `write()` respectively.
You can practice this by [implementing your own `cat` command](../drills/tasks/my-cat/README.md).

In the following sections, we'll use file descriptors and `read()` and `write()` to interact with some inter-process-communication mechanisms, such as pipes.

## `lseek()`

As you know, reading or writing from a file always continues from where it left off.
Most of the time you would read from a file monotonically so it makes sense to keep the interface clean and handle bookkeeping in the back.

For cases when you selectively update the file or jump around fetching data, or making updates, we have [`lseek`](https://man7.org/linux/man-pages/man2/lseek.2.html).

```c
off_t lseek(int fd, off_t offset, int whence);
```

Its parameters are pretty intuitive: `fd` stands for the file descriptor and `offset` stands for the offset.
The `whence` directive explains what `offset` is relative to, and has the following values:

- `SEEK_SET`: the file offset is set to offset bytes.
- `SEEK_CUR`: The file offset is set to its current location plus offset bytes.
- `SEEK_END`: the file offset is set to the size of the file plus offset bytes.

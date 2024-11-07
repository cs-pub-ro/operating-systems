# File Descriptors

You've most likely had to deal with files in the past.
The most common command that works with files is `cat`.
For a quick refresher, let's write something to a file, and then read its contents.

You’ve likely worked with files before;
now it’s time to see what happens behind the scenes.
The most common way to read a file in Linux is by using the `cat` command.
For a quick refresher, let’s do a demo by writing some text to a file and then reading it back.

```console
student@os:~/$ echo "OS Rullz!"  # Print 'OS Rullz!'
OS Rullz!
student@os:~/$ echo "OS Rullz!" > newfile.txt  # redirect the output to newfile.txt
# Let's check the contents of newfile.txt
student@os:~/$ cat newfile.txt
OS Rullz!
```

If we were to implement this in C, we would use the `FILE` structure and write something like this:

```c
FILE *f = fopen("newfile.txt", "r");
if (!f) {...} // handle error

char buf[1024];
int rc = fread(buf, 1, sizeof(buf), f);
if (rc < 0) {...} // handle error

printf("%s\n", buf);
```

For a complete example, check out this guide on [file operations in C, Python, and Java](../guides/simple-file-operations/README.md).

## `FILE` Operations Explained

The `FILE` structure is not the most straightforward method for performing file operations.
It is part of `libc` and functions as a handler for working with files.
This is not particular to C, as most programming languages offer similar handlers.

Running `strace cat newfile.txt` reveals that `fopen()` wraps `open()` (or `openat`), `fread()` wraps `read()`, and `fclose()` wraps `close()`.
As you can see, the `FILE`-related functions are just syscalls prefixed with `f-`.

| `FILE` Operation    | Syscall                                                                     | Description                                   |
|---------------------|-----------------------------------------------------------------------------|-----------------------------------------------|
| `fopen()`           | [`open()`](https://man7.org/linux/man-pages/man2/open.2.html)               | Opens a file and returns a file pointer.      |
| `fclose()`          | [`close()`](https://man7.org/linux/man-pages/man2/close.2.html)             | Closes the file associated with the pointer.  |
| `fread()`           | [`read()`](https://man7.org/linux/man-pages/man2/read.2.html)               | Reads data from the file into a buffer.       |
| `fwrite()`          | [`write()`](https://man7.org/linux/man-pages/man2/write.2.html)             | Writes data from a buffer to the file.        |
| `fseek()`           | [`lseek()`](https://man7.org/linux/man-pages/man2/lseek.2.html)             | Moves the file position indicator.            |
| `truncate()`        | [`ftruncate()`](https://man7.org/linux/man-pages/man2/ftruncate.2.html)     | Truncates the file to a specified length.     |

The main distinction between `FILE` operations and their corresponding system calls is that the latter use a **file descriptor** to reference a file.
**File descriptors** are simply indexes into the process's **File Descriptor Table**, which is the list of all currently open files for that process.

This concept is not entirely new, as each process has three default channels: `stdin`, `stdout`, and `stderr`.
These are, in fact, the first three entries in every process’s **File Descriptor Table**.

[Quiz: Test your intuition by finding the file descriptor of `stderr`](../drills/questions/stderr-fd.md)

Let's translate our previous example to illustrate how this change affects the implementation:

```c
int fd = open("newfile.txt", O_RDONLY)
if (fd < 0) {...} // handle error

char buf[1024];
int rc = read(fd, buf, sizeof(buf));  // Not complete, should've used a while loop
if (rc < 0) {...} // handle error

buf[rc] = '\0'; // Null-terminate the buffer
printf("%s\n", buf);
```

To better understand the **file descriptor** API, you can either [keep reading about file descriptor operations](../reading/fd-operations.md) or checkout [this guide on reading Linux directories](../guides/reading-linux-dirs/README.md).

If you're interested in understanding how `libc` utilizes file descriptors to simplify common operations, check out [this guide](../guides/libc-FILE-struct/README.md).

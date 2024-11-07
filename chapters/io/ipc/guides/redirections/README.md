# Redirections

In the [File Descriptors section](../../../file-descriptors/reading/file-descriptors.md), we mentioned redirections such as `echo "OS Rullz!" > newfile.txt`.
We said `file.txt` has to be opened at some point.
Let’s explore the relevant system calls (`open()`, `openat()`) to see this in action:

```console
student@os:~/.../guides/redirections$ strace -e trace=open,openat,execve,dup2 -f sh -c "ls > file.txt"
execve("/usr/bin/sh", ["sh", "-c", "ls > file.txt"], 0x7fffe1383e78 /* 36 vars */) = 0
openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
openat(AT_FDCWD, "/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
openat(AT_FDCWD, "file.txt", O_WRONLY|O_CREAT|O_TRUNC, 0666) = 3
dup2(3, 1)                              = 1
strace: Process 77547 attached
[pid 77547] execve("/usr/bin/ls", ["ls"], 0x55ebb9b2dbf8 /* 36 vars */) = 0
[...]
```

Notice that we used `sh -c` to run `ls > file.txt`.
Running `strace -e trace=open,openat,execve,dup2 -f ls > file.txt` would instead redirect the `strace` output to `file.txt`, hiding any system calls related to `file.txt`.
This happens because, as we discussed earlier, redirection is transparent for the process being redirected.
The process still writes to its `stdout`, but `stdout` itself is now directed to the specified file.

Remember how processes are created using `fork()` and `exec()`, as shown in this diagram:

![Launching a new command in Bash](../../media/fork-exec.svg)

In our case, the main process is `sh -c "ls > file.txt"`.
In the `strace` output, we see it opens `file.txt` on file descriptor `3`, then uses [`dup2(3, 1)`](https://man7.org/linux/man-pages/man2/dup.2.html) to redirect file descriptor `1` to the same **open file structure**.
It then **forks** a child process and calls `execve()`.

`execve` replaces the virtual address space (VAS) of the current process but retains the [file descriptor table](../../../file-descriptors/guides/fd-table/README.md).
This preserve the `stdout` of the parent process, thus the redirection to `file.txt` remains effective in the new process as well.

## `dup()/dup2()` - Atomic IO

If you're not familiar with the [`dup()` syscall](https://man7.org/linux/man-pages/man2/dup.2.html), it essentially creates a new file descriptor pointing to an existing **open file structure**.
Unlike `open()`, as discussed in the [file descriptor table guide](../../../file-descriptors/guides/fd-table/README.md), `dup()` doesn’t create a fresh open file structure.

The `dup2(old_fd, new_fd)` variant closes `new_fd` before making it point to the same open file structure as `old_fd`.
While this might seem like a combination of `close(new_fd)` and `open(old_fd)`, `dup2()` is actually atomic, which prevents race conditions.

To see why atomicity matters, review the code in `support/redirect_parallel.c`, compile it, and run it.
<!-- markdownlint-disable-next-line MD101 -->
You’ll find that `redirect_stderr_file.txt` contains `Message for STDOUT`, and `redirect_stdout_file.txt` contains `Message for STDERR`.
Investigate the code to understand where the race condition occurred.

While a `mutex` around the `close()` and `open()` sequence could fix this, it can make the code cumbersome.
Instead, follow the `FIXME` comments for a more elegant solution using `dup2()`.

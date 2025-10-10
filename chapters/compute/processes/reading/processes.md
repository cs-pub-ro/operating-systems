# Processes

A process is simply a running program.
Let's take the `ls` command as a trivial example.
`ls` is a **program** on your system.
It has a binary file which you can find and inspect with the help of the `which` command:

```console
student@os:~$ which ls
/usr/bin/ls

student@os:~$ file /usr/bin/ls
/usr/bin/ls: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=6e3da6f0bc36b6398b8651bbc2e08831a21a90da, for GNU/Linux 3.2.0, stripped
```

When you run it, the `ls` binary stored **on the disk** at `/usr/bin/ls` is read by another application called the **loader**.
The loader spawns a **process** by copying some contents of `/usr/bin/ls` into memory (for example the `.text`, `.rodata` and `.data` sections).
Using `strace`, we can see the [`execve`](https://man7.org/linux/man-pages/man2/execve.2.html) system call:

```console
student@os:~$ strace -s 100 ls -a  # -s 100 limits strings to 100 bytes instead of the default 32
execve("/usr/bin/ls", ["ls", "-a"], 0x7fffa7e0d008 /* 61 vars */) = 0
[...]
write(1, ".  ..  content\tCONTRIBUTING.md  COPYING.md  .git  .gitignore  README.md  REVIEWING.md\n", 86.  ..  content CONTRIBUTING.md  COPYING.md  .git  .gitignore  README.md  REVIEWING.md
) = 86
close(1)                                = 0
close(2)                                = 0
exit_group(0)                           = ?
+++ exited with 0 +++
```

Look at its parameters:

- the path to the **program**: `/usr/bin/ls`
- the list of arguments: `"ls", "-a"`
- the environment variables: the rest of the syscall's arguments

`execve` invokes the loader to load the VAS of the `ls` process **by replacing that of the existing process**.
All subsequent syscalls are performed by the newly spawned `ls` process.
We will get into more details regarding `execve` [towards the end of this lab](./guides/system-dissected.md).

![Loading of `ls` Process](../media/loading-of-ls-process.svg)

## Fork

Up to now we've been creating processes using various high-level APIs, such as `Popen()`, `Process()` and `system()`.
Yes, despite being a C function, as you've seen from its man page, `system()` itself calls 2 other functions: `fork()` to create a process and `execve()` to execute the given command.
As you already know from the [Software Stack](reading/libc.md) chapter, library functions may call one or more underlying system calls or other functions.
Now we will move one step lower on the call stack and call `fork()` ourselves.

`fork()` creates one child process that is _almost_ identical to its parent.
We say that `fork()` returns **twice**: once in the parent process and once more in the child process.
This means that after `fork()` returns, assuming no error has occurred, both the child and the parent resume execution from the same place: the instruction following the call to `fork()`.
What's different between the two processes is the value returned by `fork()`:

- **child process**: `fork()` returns 0
- **parent process**: `fork()` returns the PID of the child process (> 0)
- **on error**: `fork()` returns -1, only once, in the initial process

Therefore, the typical code for handling a `fork()` is available in `create-process/support/fork.c`.
Take a look at it and then run it.
Notice what each of the two processes prints:

- the PID of the child is also known by the parent
- the PPID of the child is the PID of the parent

Unlike `system()`, who also waits for its child, when using `fork()` we must do the waiting ourselves.
In order to wait for a process to end, we use the [`waitpid()`](https://linux.die.net/man/2/waitpid) syscall.
It places the exit code of the child process in the `status` parameter.
This argument is actually a bit-field containing more information than merely the exit code.
To retrieve the exit code, we use the `WEXITSTATUS` macro.
Keep in mind that `WEXITSTATUS` only makes sense if `WIFEXITED` is true, i.e. if the child process finished on its own and wasn't killed by another one or by an illegal action (such as a segfault or illegal instruction) for example.
Otherwise, `WEXITSTATUS` will return something meaningless.
You can view the rest of the information stored in the `status` bit-field [in the man page](https://linux.die.net/man/2/waitpid).

**Moral of the story**: Usually the execution flow is:

1. `fork()`, followed by

1. `wait()` (called by the parent)

1. `exit()`, called by the child.

The order of last 2 steps may be swapped.

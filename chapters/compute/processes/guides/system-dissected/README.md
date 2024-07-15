# `system` Dissected

You already know that `system` calls `fork()` and `execve()` to create the new process.
Let's see how and why.
First, we run the following command to trace the `execve()` syscalls used by `sleepy_creator`.
We'll leave `fork()` for later.

```console
student@os:~/.../sleepy/support$ strace -e execve -ff -o syscalls ./sleepy_creator
```

At this point, you will get two files whose names start with `syscalls`, followed by some numbers.
Those numbers are the PIDs of the parent and the child process.
Therefore, the file with the higher number contains logs of the `execve` and `clone` syscalls issued by the parent process, while
the other logs those two syscalls when made by the child process.
Let's take a look at them.
The numbers below will differ from those on your system:

```console
student@os:~/.../sleepy/support:$ cat syscalls.2523393  # syscalls from parent process
execve("sleepy_creator", ["sleepy_creator"], 0x7ffd2c157758 /* 39 vars */) = 0
--- SIGCHLD {si_signo=SIGCHLD, si_code=CLD_EXITED, si_pid=2523394, si_uid=1052093, si_status=0, si_utime=0, si_stime=0} ---
+++ exited with 0 +++

student@os:~/.../sleepy/support:$ cat syscalls.2523394  # syscalls from child process
execve("/bin/sh", ["sh", "-c", "sleep 10"], 0x7ffd36253be8 /* 39 vars */) = 0
execve("/usr/bin/sleep", ["sleep", "10"], 0x560f41659d40 /* 38 vars */) = 0
+++ exited with 0 +++
```

[Quiz](../drills/questions/who-calls-execve-parent.md)

Now notice that the child process doesn't simply call `execve("/usr/bin/sleep" ...)`.
It first changes its virtual address space (VAS) to that of a `bash` process (`execve("/bin/sh" ...)`) and then that `bash` process switches its VAS to `sleep`.
Therefore, calling `system(<some_command>)` is equivalent to running `<some_command>` in the command-line.

**Moral of the story**: When spawning a new command, the call order is:

- parent: `fork()`, `exec()`, `wait()`
- child: `exit()`

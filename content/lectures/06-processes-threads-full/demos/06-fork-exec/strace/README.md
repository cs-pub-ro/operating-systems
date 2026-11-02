# Demo: Tracing Process Creation

Trace `fork()`+`exec()` and `posix_spawn()`, and find the same two system calls under both.

## Goal

See that process creation, however it is written, comes down to one system call to create the process (`clone`/`clone3`) and one to load the program (`execve`).

## Background

`strace -f` follows a program and its children and prints the system calls they make.
Tracing only `clone`, `clone3` and `execve` shows the skeleton of process creation.

## Run

Build the two programs first, then trace each:

```console
make -C ../fork-exec
make -C ../../04-process-ops/posix_spawn
strace -f -e clone,clone3,execve ../fork-exec/fork_exec
strace -f -e clone,clone3,execve ../../04-process-ops/posix_spawn/posix_spawn
```

## What it shows

```text
$ strace -f -e clone,clone3,execve ../fork-exec/fork_exec
execve("../fork-exec/fork_exec", [...], ...) = 0
clone(child_stack=NULL, flags=CLONE_CHILD_CLEARTID|CLONE_CHILD_SETTID|SIGCHLD, ...) = 105189
[pid 105189] execve("/usr/bin/sleep", ["/usr/bin/sleep", "100"], NULL) = 0

$ strace -f -e clone,clone3,execve ../../04-process-ops/posix_spawn/posix_spawn
clone3({flags=CLONE_VM|CLONE_VFORK|CLONE_CLEAR_SIGHAND, exit_signal=SIGCHLD, ...}) = 105405
[pid 105405] execve("/usr/bin/sleep", ["/usr/bin/sleep", "100"], NULL) = 0
```

Both make the child with `clone`/`clone3` and load `/usr/bin/sleep` with `execve`.
`fork()` is a `clone` with no sharing flags; `posix_spawn()` is a `clone3` plus `execve` wrapped in a library call.
Trace a threaded program the same way and the thread-creating `clone3` carries `CLONE_VM`, which keeps the address space shared: the one flag that separates a thread from a process.

## Ask

* `fork()`+`exec()` and `posix_spawn()` produce the same two calls. What, then, is the difference between them?
* Which flag would you expect to see on the `clone3` that creates a thread rather than a process?

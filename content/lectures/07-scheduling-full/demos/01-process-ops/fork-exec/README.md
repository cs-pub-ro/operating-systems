# Demo: fork() and exec() by Hand

Process creation written out: `fork()` to make a copy, `exec()` to replace its program.

## Goal

See what `posix_spawn()` does underneath: a `fork()` that returns twice and an `exec()` that does not return.

## Background

[`fork()`](https://man7.org/linux/man-pages/man2/fork.2.html) creates a new process as a copy of the caller and returns twice: `0` in the child, the child's PID in the parent.
[`execve()`](https://man7.org/linux/man-pages/man2/execve.2.html) replaces the calling process's program with one loaded from an executable, and does not return on success.
`fork_exec.c` forks, the child `execve()`s `/usr/bin/sleep`, and the parent `waitpid()`s.

## Build and run

```console
make
./fork_exec
```

## Results and explanations

```text
$ ./fork_exec
PID: 105188, parent PID: 11471, child PID: 105189
Process exited with status 0
Process exited successfully.
```

The `switch` on the return value of `fork()` is how each process tells which it is: the `0` branch is the child and `execve()`s; the `default` branch is the parent and waits.
The child's address space, a copy at the `fork()`, is entirely replaced by `sleep` at the `execve()`, which is why no code after `execve()` in the child's branch ever runs.

## Going further

* Remove the `execve()` and the child runs the parent's code from the point of the `fork()`: that is `fork()` on its own, two processes running the same program.
* Print something in both branches before the `execve()`: it appears twice, once per process, from the single `printf()` in the source.

## References

* `man 2 fork`, `man 2 execve`, `man 2 waitpid`

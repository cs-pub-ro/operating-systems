# Demo: Tracing Process Creation

## Run

```console
make -C ../fork-exec
make -C ../../04-process-ops/posix_spawn
strace -f -e clone,clone3,execve ../fork-exec/fork_exec
strace -f -e clone,clone3,execve ../../04-process-ops/posix_spawn/posix_spawn
```

## Ask

* Both produce the same two system calls. What, then, is the difference between `fork`+`exec` and `posix_spawn`?
* Which flag on `clone3` would make the child a thread instead of a process?

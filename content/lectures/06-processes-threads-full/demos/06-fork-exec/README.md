# Demo: fork() and exec()

| Demo | What it shows |
| --- | --- |
| [`fork-exec/`](fork-exec) | Process creation by hand: `fork()` to copy, `exec()` to replace the program. |
| [`strace/`](strace) | `fork()`+`exec()` and `posix_spawn()` trace to the same two calls: `clone`/`clone3` and `execve`. |

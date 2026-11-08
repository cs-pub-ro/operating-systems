# Demo: Processes, Recapped

The lecture 06 demos, copied here.

* [`posix_spawn/`](posix_spawn) --- create a child, wait, read its status.
* [`fork-exec/`](fork-exec) --- `fork()` to copy, `exec()` to replace.
* [`zombie/`](zombie) --- an ended child not yet waited for.
* [`orphan/`](orphan) --- a child whose parent ended, adopted by init.

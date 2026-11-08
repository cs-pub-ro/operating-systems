# Demo: Processes, Recapped

The process demos of lecture 06, copied here so that the recap has its programs at hand.

| Demo | What it shows |
| --- | --- |
| [`posix_spawn/`](posix_spawn) | Creating a child process from an executable, waiting for it, and reading its exit status. |
| [`fork-exec/`](fork-exec) | Process creation by hand: `fork()` to copy, `exec()` to replace the program. |
| [`zombie/`](zombie) | A finished child that has not been waited for: a zombie, `Z` and `<defunct>`. |
| [`orphan/`](orphan) | A child whose parent ended first: an orphan, re-parented to the init process. |

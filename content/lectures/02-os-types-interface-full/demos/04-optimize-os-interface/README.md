# Demo: Optimizing the OS Interface

Two demos for part 04, on the two directions you can move work to avoid the cost of system calls measured in part 02.

| Demo | Direction | What it shows |
| --- | --- | --- |
| [`fwrite/`](fwrite) | into user space | Buffering in the C library turns thousands of one-byte system calls into a handful of big ones. |
| [`sendfile/`](sendfile) | into kernel space | `sendfile()` copies a file to a socket without the bytes ever entering user space, beating a read/send loop. |

The two demos are the same idea from opposite ends.
A system call is expensive, so either batch many logical operations into one call (buffer in user space), or push the whole job across the boundary once and let the kernel do it (move into kernel space).

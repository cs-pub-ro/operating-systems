# Demo: The System Call Interface

Two demos for part 02, on how a program crosses into the kernel and what that crossing costs.

| Demo | What it shows |
| --- | --- |
| [`syscalls/`](syscalls) | A program that talks to the kernel directly, in assembly, through nothing but the `syscall` instruction. |
| [`syscall-overhead/`](syscall-overhead) | The same trivial operation as a real system call and as a plain function call: the system call is roughly seventy times slower. |

The first makes the interface concrete; the second puts a price on using it.
Together they set up part 04, which is entirely about avoiding that price.

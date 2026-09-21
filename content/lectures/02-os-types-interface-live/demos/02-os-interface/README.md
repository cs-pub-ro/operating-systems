# Demo: The System Call Interface

Two demos for this part: how a program crosses into the kernel, and what the crossing costs.

* [`syscalls/`](syscalls) -- a program that uses nothing but the `syscall` instruction.
* [`syscall-overhead/`](syscall-overhead) -- the same trivial write as a system call and as a function call.

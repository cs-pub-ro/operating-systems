# Demo: Run-Time Allocation

Two demos for part 05, on how the dynamic areas change size and who asks the kernel.

| Demo | What it shows |
| --- | --- |
| [`allocation/`](allocation) | The stack growing by itself, the heap growing and shrinking with `malloc()`/`free()`, a mapping appearing and disappearing -- watched through `pmap`. |
| [`malloc-kb/`](malloc-kb) | Ten `malloc()` calls under `strace`: six `brk()`s for small blocks, ten `mmap()`s for large ones. |

The first is the view from the address space; the second is the view from the system-call boundary.

# Demo: What We Already Know

Two demos for the recap, both about what lecture 03 ended with: allocation is a change to the list of areas, and `malloc()` makes it through `brk()` or `mmap()`.

| Demo | What it shows |
| --- | --- |
| [`memory-ops/`](memory-ops) | Four megabytes allocated in one call and in a thousand, with `malloc()` and with `mmap()`, under `pmap`: a new area, a larger area, a merged area. |
| [`malloc-size/`](malloc-size) | The same two shapes under `strace`: one `mmap()` for the single call, thirty-five `brk()`s for the thousand. |

Both wait at prompts, for a second terminal.

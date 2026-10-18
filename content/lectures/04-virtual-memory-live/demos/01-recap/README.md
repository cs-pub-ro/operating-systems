# Demo: What We Already Know

| Demo | Shows |
| --- | --- |
| [`memory-ops/`](memory-ops) | 4 MB four ways under `pmap`: a new area, a grown heap, a thousand `mmap()`s merged into four areas. |
| [`malloc-size/`](malloc-size) | One `malloc()` is one `mmap()`; a thousand are 35 `brk()`s. |

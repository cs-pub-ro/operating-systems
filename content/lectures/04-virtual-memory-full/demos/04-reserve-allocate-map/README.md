# Demo: Reserve, Allocate, Map

Two demos for part 04: physical memory arrives at the first access, one page at a time.

| Demo | What it shows |
| --- | --- |
| [`reserve-allocate/`](reserve-allocate) | Reserve 4 MB, touch half the pages: `RSS` goes up by 2 MB, and 512 page faults happened. |
| [`page-faults/`](page-faults) | The same, counted from inside: 0 faults for the `mmap()`, 1024 for the first write to each page, 0 for the second. |

The first waits at prompts, for a second terminal; the second just prints.

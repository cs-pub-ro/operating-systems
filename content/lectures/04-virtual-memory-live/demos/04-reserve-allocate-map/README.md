# Demo: Reserve, Allocate, Map

| Demo | Shows |
| --- | --- |
| [`reserve-allocate/`](reserve-allocate) | Reserve 4 MB, touch 512 pages: `RSS` +2 MB, 512 page faults. |
| [`page-faults/`](page-faults) | 0 faults for `mmap()`, 1024 for the first write to each page, 0 for the second. |

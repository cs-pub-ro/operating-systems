# Demo: The Page Fault

| Demo | What it shows |
| --- | --- |
| [`segfault/`](segfault) | Eight accesses to one page: six succeed, one is `SEGV_ACCERR`, and the out-of-bounds ones are `SEGV_MAPERR`. |
| [`major-fault/`](major-fault) | The same 64 MB file read once from disk, 16,384 major faults, and once from the page cache, 1,024 minor ones. |

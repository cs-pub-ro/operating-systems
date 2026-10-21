# Demo: The Page Fault

| Demo | Shows |
| --- | --- |
| [`segfault/`](segfault) | Eight accesses to one page: `SEGV_ACCERR` for the wrong access, `SEGV_MAPERR` for the wrong address. |
| [`major-fault/`](major-fault) | The same file read from disk (16,384 major faults) and from the page cache (1,024 minor). |

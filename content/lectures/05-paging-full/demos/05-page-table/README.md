# Demo: Storing the Page Table

| Demo | What it shows |
| --- | --- |
| [`table-size/`](table-size) | `VmPTE`: 60 KB of page tables for the shell, 8 MB for a browser, against 256 GB for a flat table. |
| [`tlb/`](tlb) | A walk that misses the TLB on 92% of its accesses, and the same walk on 2 MB pages that misses on none. |

# Demo: Storing the Page Table

| Demo | Shows |
| --- | --- |
| [`table-size/`](table-size) | `VmPTE`: 60 KB for the shell, 8 MB for a browser, against 256 GB flat. |
| [`tlb/`](tlb) | 92% TLB misses walking 512 MB, almost none on 2 MB pages. |

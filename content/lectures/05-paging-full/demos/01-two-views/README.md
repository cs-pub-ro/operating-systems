# Demo: Two Views of One Address Space

| Demo | What it shows |
| --- | --- |
| [`zones-and-pages/`](zones-and-pages) | The shell's address space counted both ways: 33 zones, 2,600 pages, 1,100 of them present. |
| [`reserve-allocate/`](reserve-allocate) | `mmap()` edits the list of zones and nothing else; the first touch of each page edits the page table and nothing else. |

The second waits at prompts, for a second terminal.

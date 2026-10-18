# Demo: Virtual Memory and Physical Memory

Two demos for part 03, both read through `ps -o vsz,rss`.

| Demo | What it shows |
| --- | --- |
| [`show-mem/`](show-mem) | Every process has two sizes, and the virtual one is always larger: a shell, a browser, and "Hello, World!". |
| [`reserve-mem/`](reserve-mem) | Three `mmap()` calls of 4 MB each raise the virtual size by 12 MB and the resident size by nothing. |

Both wait at prompts, for a second terminal.

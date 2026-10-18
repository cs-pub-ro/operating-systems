# Demo: Pages and the Page Table

One demo for part 05, with two programs in it.

| Demo | What it shows |
| --- | --- |
| [`pagemap/`](pagemap) | A process reading its own page table through `/proc/self/pagemap`: entries indexed by virtual page number, a present bit that flips at the first touch, frame numbers that bear no relation to the page numbers, and one frame of libc shared by two processes. |

The frame numbers need `sudo`; everything else does not.

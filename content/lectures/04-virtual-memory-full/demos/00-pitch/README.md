# Demo: Addresses Are Not Places

Three demos for the pitch, each one impossible if an address were a location in RAM.

| Demo | What it shows |
| --- | --- |
| [`browser-vas-size/`](browser-vas-size) | A browser process with 1.5 TB of memory on a machine with 64 GB of RAM. |
| [`allocate-10TB/`](allocate-10TB) | A program that takes 10 TB with `mmap()` in a blink, and uses none of it. |
| [`same-address/`](same-address) | Two processes that keep a variable at the same address and disagree about its value. |

Run them in that order: the first two say "there is more memory than there is", the third says "the same address is not the same byte".
Both halves of the lecture come out of those two observations.

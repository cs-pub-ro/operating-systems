# Demo: Why Care About Memory?

Four demos for the pitch, one per reason memory matters.

| Demo | What it shows |
| --- | --- |
| [`memory-use/`](memory-use) | Memory is what runs out: a browser process holding over a gigabyte. |
| [`buffer-cache/`](buffer-cache) | Memory you do not see is working for you: the buffer cache, and what dropping it costs. |
| [`cache-memory/`](cache-memory) | Where data sits decides speed: the same loop nine times slower when it misses the cache. |
| [`memory-leak/`](memory-leak) | Memory you forget to free is gone: a 40-byte leak, found with `valgrind`. |

Together they cover functionality and efficiency, performance, correctness, and the way a small mistake compounds.
Security is left for lab 05, where the write past the end of a buffer becomes an exploit.

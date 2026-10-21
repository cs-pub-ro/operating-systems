# Demo: Memory Sharing

| Demo | What it shows |
| --- | --- |
| [`uss-pss-rss/`](uss-pss-rss) | `RSS`, `PSS` and `USS` for one process, area by area, from `/proc/<pid>/smaps` and `smem`. |
| [`uss-pss-rss-multiple/`](uss-pss-rss-multiple) | Ten processes from one executable or from ten, static or dynamic, and what each metric says. |
| [`fork-cow/`](fork-cow) | `fork()` shares 64 MB at no cost; the child reads it with 0 faults and writes it with 16,384. |

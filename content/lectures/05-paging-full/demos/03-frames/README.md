# Demo: Where Frames Come From

| Demo | What it shows |
| --- | --- |
| [`page-cache/`](page-cache) | The code of every running program is in the page cache; `fincore` says which pages of a file are. |
| [`swap/`](swap) | 256 MB written inside a 64 MB cgroup: 190 MB go to swap, and reading them back takes 8,400 major faults and two seconds. |

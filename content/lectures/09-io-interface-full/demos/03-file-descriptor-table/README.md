# Demo: The File Descriptor Table

| Demo | What it shows |
| --- | --- |
| [`fdtsize/`](fdtsize) | A program that opens files until `open()` refuses: the table has a maximum size, and it is a limit of the process. |
| [`lowest-fd/`](lowest-fd) | Which entry a new channel gets: the lowest one that is free, including 0. |

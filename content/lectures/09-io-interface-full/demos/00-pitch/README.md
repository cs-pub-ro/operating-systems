# Demo: The Pitch

| Demo | What it shows |
| --- | --- |
| [`process-io/`](process-io) | The counters the kernel keeps for every process: bytes read and written, and the system calls that moved them. |
| [`write-layers/`](write-layers) | One megabyte written to a file four ways, with `fwrite()`, `write()`, `O_DIRECT` and `O_DIRECT` with `O_SYNC`: 0.3 ms, 0.8 ms, 40 ms and 10 seconds. |

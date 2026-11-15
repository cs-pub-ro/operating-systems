# Demo: Problems with Synchronization

| Demo | What it shows |
| --- | --- |
| [`granularity/`](granularity) | The same counter under the same mutex, locked once per addition or once per thread: 308 ms against 3 ms. |
| [`deadlock/`](deadlock) | Two threads and two locks taken in opposite orders: a program that stops, with nothing running and nothing failing. |
| [`toctou/`](toctou) | A check and an update that are each under the lock, and a result that is still wrong, because they are not under the lock together. |

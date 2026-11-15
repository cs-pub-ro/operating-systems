# Demo: Problems with Synchronization

* [`granularity/`](granularity) --- one mutex, taken once per addition or once per thread.
* [`deadlock/`](deadlock) --- two threads, two locks, opposite orders.
* [`toctou/`](toctou) --- a check and an update, each under the lock, and a wrong result.

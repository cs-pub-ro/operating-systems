# Demo: Contention in the Kernel

Each worker maps a page, touches it and unmaps it, 50,000 times.
No worker uses anything another worker uses.

## Run

```console
make
./map_unmap threads 1
./map_unmap threads 8
./map_unmap processes 8
\time -v ./map_unmap threads 8
```

## Ask

* There are more CPUs than workers. How long should eight workers take, compared with one?
* The source has no lock and no shared variable. What do eight threads share that eight processes do not?
* Where is the time spent: user or system? What are the voluntary context switches?

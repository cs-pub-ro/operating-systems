# Demo: `fork()` and Copy-on-Write

## Run

```console
make
./fork_cow
```

## Ask

* After `fork()` the child's `Pss` is half its `Rss`. What did `fork()` copy, and what did it not?
* Reading 64 MB cost 0 faults. Writing it cost 16,384. What happens in each of those?
* The parent's `p[0]` is still 1. Whose frames did the child write to?

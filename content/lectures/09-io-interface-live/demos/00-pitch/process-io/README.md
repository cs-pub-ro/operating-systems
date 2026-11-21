# Demo: How Much I/O a Process Does

The counters the kernel keeps for every process.
`rchar` and `wchar` are bytes; `syscr` and `syscw` are read and write system calls.

## Run

```console
cat /proc/$$/io
cat /proc/$(ps -e -o pid= --sort rss | tail -1 | tr -d ' ')/io
```

## Ask

* How many read calls has the shell made? And the largest process on the machine?
* How many is that for every second it has been running?
* Why is `read_bytes`, what came from the disk, so much smaller than `rchar`?

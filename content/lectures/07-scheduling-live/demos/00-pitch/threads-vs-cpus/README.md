# Demo: Threads Against CPUs

## Run

```console
nproc
ps -e --no-headers | wc -l
ps -e -L --no-headers | wc -l
ps -e -L -o state --no-headers | sort | uniq -c
```

## Ask

* Thousands of threads, a couple of dozen CPUs. Where are the threads that are not running?
* Why are so few in `R`, on a machine that feels busy?

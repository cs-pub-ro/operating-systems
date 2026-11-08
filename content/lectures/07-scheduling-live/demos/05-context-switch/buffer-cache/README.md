# Demo: Context Switches and the Page Cache

## Run

```console
sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches'
\time -v find /usr/share > /dev/null
\time -v find /usr/share > /dev/null
```

## Ask

* 26,865 voluntary switches, then 1. What happened 26,865 times in the first run and never in the second?
* Is `find` an I/O-bound or a CPU-bound thread? Does the answer depend on the run?

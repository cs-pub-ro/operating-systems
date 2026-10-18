# Demo: Reserving Costs Nothing

Three `mmap()` calls of 4 MB, three `munmap()`s, `ps` at every step.

## Run

Two terminals.
First:

```console
make
./reserve_mem
```

Second, at every prompt:

```console
ps -o pid,vsz,rss,cmd -p $(pidof reserve_mem)
pmap -x $(pidof reserve_mem) | grep -E 'anon|total'
```

## Ask

* `VSZ` moves by 4,096 KB a step. What does `RSS` do, seven times in a row?
* The three zones have different permissions. Why are they three lines rather than one?
* What did the kernel write down for each `mmap()`, and what did it *not* do?

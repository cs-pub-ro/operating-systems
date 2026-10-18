# Demo: Touch Half, Pay for Half

Reserve 4 MB, write one byte into each of the first 512 pages, unmap.

## Run

Two terminals.
First:

```console
make
./reserve_allocate
```

Second, at every prompt:

```console
ps -o pid,vsz,rss,cmd -p $(pidof reserve_allocate)
awk '{print "minor faults:", $10}' /proc/$(pidof reserve_allocate)/stat
pmap -x $(pidof reserve_allocate) | grep 4096
```

## Ask

* Before the touch step: what will `RSS` be afterwards?
* It went up by 2,048 KB, and the fault count by 512. What is one fault?
* Which of the three steps -- reserve, allocate, map -- did `mmap()` do, and which did the writes do?

# Demo: Memory You Do Not See Is Working for You

The kernel keeps recently read files in memory.
Show how much; do not drop it on the machine you are projecting from.

## Run

```console
free -h
```

On your own machine, before the lecture, if you want the cold/warm start timings:

```console
sync; echo 3 | sudo tee /proc/sys/vm/drop_caches
time firefox --version
time firefox --version
```

## Ask

* 25 GB used, 4.7 GB free, 31 GB `buff/cache`. Who is using the 31 GB?
* Is that memory wasted? What happens to it when a program needs it?
* Why is the second start of a program faster than the first?

# Demo: Two Sizes for Every Process

`VSZ` and `RSS` for three programs.

## Run

```console
ps -o pid,vsz,rss,cmd -p $$
ps -o pid,vsz,rss,comm -p $(pgrep -f chrom | tail -1)
make
./hello
```

In a second terminal, while `hello` waits:

```console
ps -o pid,vsz,rss,cmd -p $(pidof hello)
```

## Ask

* Which column is never smaller than the other? Why can it not be?
* A one-line program has 2.7 MB of address space. What is in it?
* The browser's ratio is in the thousands; `hello`'s is 1.6. What decides the ratio?

# Demo: More Resident Memory Than Memory

## Run

```console
ps -eo rss= | awk '{ s += $1 } END { print s / 1024 " MB" }'
free -m
smem -tk -c "uss pss rss" | tail -1
```

## Ask

* 58 GB of `RSS` on a machine with 61 GB, of which 41 GB are used. Who is counting what twice?
* `smem`'s `PSS` total is 34 GB. What does `PSS` do with a page that two processes share?

# Demo: Memory Is What Runs Out

Sort the processes by resident memory.

## Run

```console
ps -e -o pid,comm,rss --sort -rss | head -10
```

## Ask

* Which program is at the top, and how many times does it appear?
* `chrome` on disk is a few hundred megabytes. Where does a 1.6 GB process come from?
* What runs out first on your laptop: the CPU or the memory?

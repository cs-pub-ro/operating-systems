# Demo: A Browser With 1.5 TB of Memory

Ask `ps` how large a browser is.

## Run

```console
ps -e -o pid,vsz,rss,comm --sort -vsz | head -6
```

## Ask

* 1,544,448,496 KB: how many terabytes, and how much RAM does this machine have?
* The second number, `RSS`, is 880 MB. What could the first one be measuring, if not memory?
* Four of the top five are the same kind of program. Which kind?

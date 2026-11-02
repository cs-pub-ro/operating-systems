# Demo: Processes and Threads in the System

## Run

```console
ps -e --no-headers | wc -l
ps -e -o comm --no-headers | sort -u | wc -l
ps -e -L --no-headers | wc -l
ps -e -o pid,comm,nlwp --sort -nlwp | head
```

## Ask

* There are more threads than processes. What does that tell you about where threads live?
* Several processes share a name. Same program, or same process?

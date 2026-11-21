# Demo: List Open Files

The I/O channels of a process: `FD` is the number of each, `TYPE` and `NAME` say what is at the other end.

## Run

```console
lsof -p $$ -a -d 0-1023
ls -l /proc/$$/fd
lsof -p $(ps -e -o pid= --sort rss | tail -1 | tr -d ' ') -a -d 0-1023
```

## Ask

* What do channels 0, 1 and 2 of the shell lead to?
* How many channels does the large process have, and of which types?
* Which of them lead to data that stays, and which to another process?
* Is its channel 0 a terminal? Who decided?

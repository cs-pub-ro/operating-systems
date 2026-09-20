# Demo: The Same Command, Three Times

## Run

```console
\time -v find /usr/share > /dev/null
\time -v find /usr/share > /dev/null
\time -v find /usr/share > /dev/null
```

The first run takes seconds; the next ones take a fraction of one.

For a cold first run, drop the caches beforehand (needs root):

```console
sync
echo 3 | sudo tee /proc/sys/vm/drop_caches
```

## Ask

* The program, the filesystem and the system calls are identical. What is different?
* Look at *Voluntary context switches*: tens of thousands, then one. What was the process waiting for?
* Where did the data go, and who put it there?

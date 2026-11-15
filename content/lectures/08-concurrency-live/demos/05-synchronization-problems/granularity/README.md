# Demo: Granularity of a Critical Section

A hundred threads each add 1 to a shared counter 100,000 times, under one mutex.

## Run

```console
make
./granularity-coarse
./granularity-fine
\time -v ./granularity-fine
```

## Ask

* Both are correct. How many times does each take the lock?
* Where does the fine-grained version spend its time: user or system?
* When would the coarse-grained version be the worse choice?

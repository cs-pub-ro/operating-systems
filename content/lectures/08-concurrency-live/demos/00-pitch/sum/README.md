# Demo: One Sum, Six Programs

Every program adds the numbers 1 to 1,000, 40,000 times over.

## Run

```console
make
./sum_serial
./sum_threads
./sum_threads
./sum_threads
make run
```

`make run` runs all six.
Compare two of the sources with `diff sum_threads.c sum_partition.c`.

## Ask

* `sum_threads` is wrong, and differently wrong each time. What happened to the missing additions?
* It is also slower than one thread. What are eight cores doing?
* Which program is both right and faster than `sum_serial`, and what does it not have that the others do?
* The last three are right. Which is slowest, and where does its time go: `\time -v ./sum_spinlock`, `\time -v ./sum_mutex`?

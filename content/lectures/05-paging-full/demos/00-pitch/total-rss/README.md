# Total Resident Set Size

The resident set size (RSS) is the total physical memory that is mapped to a process.

We find the total amount of the RSS (all RSS values for all processes), using:

```console
$ ps -e -o rss | paste -s -d '+' | bc
18566407
```

However, if we investigate the actual memory used by the system, we find that the amount of used memory is less than that (`10110992` in our case):

```console
$ free
               total        used        free      shared  buff/cache   available
Mem:        62098756    10110992    39620724      636960    13707008    51987764
Swap:       83886076           0    83886076
```

This is becauase RSS is the physical memory mapped to a process.
But that physical memory may be mapped to multiple process - it's shared memory.
So the RSS metric reports shared memory multiple times.

A better metric is PSS (Proportional Set Size) or USS (Unique Set Size).
We will discuss them later.

Read more [here](https://www.baeldung.com/linux/process-memory-management).

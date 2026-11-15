# Multithreaded Sum

When having multiple threads use a global variable, the results are inconsistent.
Multiple thread contend on writing to the shared global variable.
The resulting concurrent accesses cause inconsistent results.

To showcase the demo, first build it:

```console
make
```

Now run it multiple times and see the results being different / inconsistent:

```console
$ ./sum_threads
sum is: 507672

$ ./sum_threads
sum is: 721374

$ ./sum_threads
sum is: 568508
```

This is because the way threads are scheduled in multiple CPUs resulting in concurrent access to the shared global variable `sum`.

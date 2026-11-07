# Measure Waiting Time

This demo measures the waiting time - the time a thread spends in a ready queue, waiting to be scheduled on a CPU.

First, build it:

```console
make
```

Now run the `waiting_time` executable binary with a number of threads as argument:

```console
./waiting_time 8
./waiting_time 16
./waiting_time 32
./waiting_time 64
./waiting_time 128
```

The moment a thread yields the CPU it is put in a ready queue and waits to be re-scheduled on a CPU.
Notice that, as the number of threads increases, so does the larger waiting times.
This is because more threads compete on using CPUs, so there are more of them and they spend more time in a ready queue.

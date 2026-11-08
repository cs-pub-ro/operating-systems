# Demo: Threads Against CPUs

How many threads the machine has, how many CPUs, and how many threads are running right now.

## Goal

See the problem the scheduler solves in three numbers: thousands of threads, a couple of dozen CPUs, and a handful of threads that are actually running.

## Background

Every process has at least one thread, and `ps -L` lists threads rather than processes.
The last column of `ps -o state` is the thread's state in one letter: `R` for running or ready, `S` for sleeping (blocked), `D` for an uninterruptible sleep, `I` for an idle kernel thread, `Z` for a zombie.
`nproc` prints the number of CPUs the kernel can schedule on.

## Build and run

Nothing to build.

```console
nproc
ps -e --no-headers | wc -l
ps -e -L --no-headers | wc -l
ps -e -L -o state --no-headers | sort | uniq -c
```

## Results and explanations

```text
$ nproc
24
$ ps -e --no-headers | wc -l
739
$ ps -e -L --no-headers | wc -l
4614
$ ps -e -L -o state --no-headers | sort | uniq -c
    259 I
      6 R
   4349 S
```

739 processes hold 4,614 threads, on a machine with 24 CPUs.
At most 24 threads can be running at any instant; here 6 are running or waiting for a CPU, and 4,349 are sleeping, waiting for an event: input, a packet, a timer, a child.
The 259 `I` threads are idle kernel threads, which exist to do kernel work when there is some.

The gap between 4,614 and 24 is why the CPUs have to be shared in time, and the 6 is how little competition there is for them on an idle desktop.
Run the histogram again while compiling something with `make -j` and the `R` count climbs past the number of cores.

## Going further

* `ps -e -L -o pid,lwp,comm,state | grep ' R$'` names the running threads; one of them is `ps` itself.
* `top` and `htop` show the same histogram live, as "running" in the summary line.
* On a server under load, `D` is the state to watch: threads stuck on a slow disk or network file system.

## References

* `man 1 ps`, section `PROCESS STATE CODES`
* `man 1 nproc`

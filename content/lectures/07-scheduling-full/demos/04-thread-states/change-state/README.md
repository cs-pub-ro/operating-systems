# Change Thread States

This demo lists the state of a thread / process while running extensively and then sleeping it.

First, build it:

```console
make
```

Now run the `change_state` executable binary:

```console
./change_state
```

In another console, monitor the state of the thread and the CPU and elapsed time:

```console
$ ps -o pid,comm,state,etime,cputime $(pidof change_state)
    PID COMMAND         S     ELAPSED     TIME
 111862 change_state    S       00:11 00:00:03
```

In the first console go step by step, and also monitor the updated state in the second console:

```console
$ ./change_state
 * Entering a CPU intensive phase
 -- Press ENTER to continue ...
 * Entering a CPU intensive phase
 -- Press ENTER to continue ...
 * Entering a CPU intensive phase
 -- Press ENTER to continue ...
```

You'll notice that the thread goes to a running state and then to a sleeping state and back and forth.
Running state updates the CPU time and elapsed time.
Sleeping state only updates the elapsed time.

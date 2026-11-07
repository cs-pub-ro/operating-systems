# Show Context Switches

This demo shows the variations of context switches for a given process / thread.
Use the demo in the [../../04-thread-states/change-state/](../../04-thread-states/change-state/) directory.

Run the program on a console:

```console
../../04-thread-states/change-state/change_state
```

In another console, monitor the voluntary and involuntary context-switches:

```console
ps -o pid,comm,state,etime,cputime $(pidof change_state)
```

In the first console go step by step:

```console
$ ./change_state
 * Entering a CPU intensive phase
 -- Press ENTER to continue ...
 * Entering a CPU intensive phase
 -- Press ENTER to continue ...
 * Entering a CPU intensive phase
 -- Press ENTER to continue ...
```

Monitor the updated state in the second console:

```console
$ cat /proc/$(pidof change_state)/task/$(pidof change_state)/sched | grep switches
nr_switches                                  :                    1
nr_voluntary_switches                        :                    1
nr_involuntary_switches                      :                    0

$ cat /proc/$(pidof change_state)/task/$(pidof change_state)/sched | grep switches
nr_switches                                  :                   88
nr_voluntary_switches                        :                    2
nr_involuntary_switches                      :                   86

$ cat /proc/$(pidof change_state)/task/$(pidof change_state)/sched | grep switches
nr_switches                                  :                  173
nr_voluntary_switches                        :                    3
nr_involuntary_switches                      :                  170
```

We notice that each time the thread waits, there is an voluntary context switch.
And there are about 80 involuntary context switches while the thread is running.

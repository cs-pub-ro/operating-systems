# Using Nice

The `nice` value is a static priority value that can be set by the user / administrator.
It can be used to affect the running priority of a process.

This demo showcases how the use of `nice` in a busy system affects the running time of a thread.

First, build the `cpu` binary executable:

```console
make
```

Now run the `start_all.sh` script to start 3 sets of processes.
Each sets consists of N processes, where N is the number of cores.
Each set corresponds to a given niceness value:
- `-20`: the least nice processes, that are going to be prioritized ahead of others
- `0`: the default nice value
- `+19`: the nicest processes, that are going to be de-prioritized

Run the script:

```console
./start_all.sh
```

What the CPUs being used by the 3xN processes:

```console
htop
```

Finally, see the results in the `pri-....txt` files.
See the elapsed time for all processes, and see the three groups of processes:
- First to complete are the processes with the `-20` nice value.
- Then come the processes with the `0` nice value.
- Finally come the processes with the `+19` nice value.

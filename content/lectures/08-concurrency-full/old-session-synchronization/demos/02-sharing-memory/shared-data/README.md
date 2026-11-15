# Sharing Memory: Processes vs Threads

Processes have individual address spaces, whereas threads (belonging to the same process) share the address space.
Because of that, updates to variables are not visible between processes, but are visibile between threads.

This demo showcases the propagation of variable modifications among threads, but not among processes.

First, build it:

```console
make
```

Run the resulting executables:

```console
$ ./process
data_var = 1
data_var = 1

$ ./thread
data_var = 1
data_var = 2
```

You can see that the increase of the variable in one process is not propagated in the other process.
But the increase in a thread is propagated in the other thread.

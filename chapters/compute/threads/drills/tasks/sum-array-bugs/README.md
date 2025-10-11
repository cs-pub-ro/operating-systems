# Wait for It

The process that spawns all the others and subsequently calls `waitpid` to wait for them to finish can also get their return codes.
Update the code in `sum-array-bugs/support/seg-fault/sum_array_processes.c` (or `chapters/compute/threads/drills/tasks/sum-array-bugs/support/seg-fault/sum_array_processes.c` if you are working directly in the repository) and modify the call to `waitpid` to obtain and investigate this return code.
Display an appropriate message if one of the child processes returns an error.

Remember to use the appropriate [macros](https://linux.die.net/man/2/waitpid) for handling the `status` variable that is modified by `waitpid()`, as it is a bit-field.
When a process runs into a system error, it receives a signal.
A signal is a means to interrupt the normal execution of a program from the outside.
It is associated with a number.
Use `kill -l` to find the full list of signals.

[Quiz](../../questions/seg-fault-exit-code.md)

So up to this point we've seen that one advantage of processes is that they offer better safety than threads.
Because they use separate virtual address spaces, sibling processes are better isolated than threads.
Thus, an application that uses processes can be more robust to errors than if it were using threads.

## Memory Corruption

Because they share the same address space, threads run the risk of corrupting each other's data.
Take a look at the code in `sum-array-bugs/support/memory-corruption/python/` (or `chapters/compute/threads/drills/tasks/sum-array-bugs/support/memory-corruption/python/` if you are working directly in the repository).
The two programs only differ in how they spread their workload.
One uses threads while the other uses processes.

Run both programs with and without memory corruption.
Pass any value as a third argument to trigger the corruption.

```console
student@os:~/.../sum-array-bugs/support/memory-corruption/python$ python3 memory_corruption_processes.py <number_of_processes>  # no memory corruption
[...]

student@os:~/.../sum-array-bugs/support/memory-corruption/python$ python3 memory_corruption_processes.py <number_of_processes> 1  # do memory corruption
[...]
```

The one using threads will most likely print a negative sum, while the other displays the correct sum.
This happens because all threads refer to the same memory for the array `arr`.
What happens to the processes is a bit more complicated.

[Later in this lab](../../../../copy-on-write/reading/copy-on-write.md), we will see that initially, the page tables of all processes point to the same physical frames or `arr`.
When the malicious process tries to corrupt this array by **writing data to it**, the OS duplicates the original frames of `arr` so that the malicious process writes the corrupted values to these new frames, while leaving the original ones untouched.
This mechanism is called **Copy-on-Write** and is an OS optimisation so that memory is shared between the parent and the child process, until one of them attempts to write to it.
At this point, this process receives its own separate copies of the previously shared frames.

Note that in order for the processes to share the `sums` dictionary, it is not created as a regular dictionary, but using the `Manager` module.
This module provides some special data structures that are allocated in **shared memory** so that all processes can access them.
You can learn more about shared memory and its various implementations [in this section](../../../../copy-on-write/drills/tasks/shared-memory/README.md).

If you're having difficulties solving this exercise, go through [this](../../../guides/sum-array-processes/README.md) reading material.

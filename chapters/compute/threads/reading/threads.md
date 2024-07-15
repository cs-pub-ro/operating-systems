# Threads

## Threads vs Processes

So why use the implementation that spawns more processes if it's slower than the one using threads?
The table below lists the differences between threads and processes.
Generally, if we only want to do some computing, we use threads.
If we need to drastically change the behaviour of the program, we need a new program altogether, or we need more than computing (e.g. communication on the network to create a computing cluster), we use processes.

| PROCESS                                              | THREAD                                                                  |
| :--------------------------------------------------- | :---------------------------------------------------------------------- |
| independent                                          | part of a process                                                       |
| collection of threads                                | shares VAS with other threads                                           |
| slower creation (new page table must be created)     | faster creation                                                         |
| longer context switch duration (TLB must be flushed) | shorter context switch duration (part of the same process, so same TLB) |
| ending means ending all threads                      | other threads continue when finished                                    |

### Safety

Compile and run the two programs in `sum-array-bugs/support/seg-fault/`, first with 2 processes and threads and then with 4.
They do the same thing as before: compute the sum of the elements in an array, but with a twist: each of them contains a bug causing a segfault.
Notice that `sum_array_threads` doesn't print anything with 4 threads, but merely a "Segmentation fault" message.
On the other hand, `sum_array_processes` prints a sum and a running time, albeit different from the sums we've seen so far.

The reason is that signals such as `SIGSEGV`, which is used when a segmentation fault happens affect the entire process that handles them.
Therefore, when we split our workload between several threads and one of them causes an error such as a segfault, that error is going to terminate the entire process.
The same thing happens when we use processes instead of threads: one process causes an error, which gets it killed, but the other processes continue their work unhindered.
This is why we end up with a lower sum in the end: because one process died too early and didn't manage to write the partial sum it had computed to the `results` array.

## Memory Layout of Multithreaded Programs

When a new thread is created, a new stack is allocated for a thread.
The default stack size if `8 MB` / `8192 KB`:

```console
student@os:~$ ulimit -s
8192
```

Enter the `multithreaded/support/` directory to observe the update of the memory layout when creating new threads.

Build the `multithreaded` executable:

```console
student@os:~/.../multithreaded/support$ make
```

Start the program:

```console
student@os:~/.../multithreaded/support$ ./multithreaded
Press key to start creating threads ...
[...]
```

And investigate it with `pmap` on another console, while pressing a key to create new threads.

As you can see, there is a new `8192 KB` area created for every thread, also increasing the total virtual size.

[Quiz](../drills/questions/thread-memory.md)

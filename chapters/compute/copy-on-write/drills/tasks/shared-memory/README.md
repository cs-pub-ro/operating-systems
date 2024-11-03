# Shared Memory

As you remember from the [Data chapter](../../../../../data/process-memory/reading/process-memory.md), one way to allocate a given number of pages is to use the `mmap()` syscall.
Let's look at its [man page](https://man7.org/linux/man-pages/man2/mmap.2.html), specifically at the `flags` argument.
Its main purpose is to determine the way in which child processes interact with the mapped pages.

[Quiz](../drills/questions/mmap-cow-flag.md)

Now let's test this flag, as well as its opposite: `MAP_SHARED`.
Compile and run the code in `shared-memory/support/shared_memory.c`.

1. See the value read by the parent is different from that written by the child.
Modify the `flags` parameter of `mmap()` so they are the same.

1. Create a semaphore in the shared page and use it to make the parent signal the child before it can exit.
Use the API defined in [`semaphore.h`](https://man7.org/linux/man-pages/man0/semaphore.h.0p.html).

    **Be careful!**
    The value written and read previously by the child and the parent, respectively, must not change.

    One way of creating a shared semaphore is to place it within a shared memory area, as we've just done.
    This only works between "related" processes.
    If you want to share a semaphore or other types of memory between any two processes, you need filesystem support.
    For this, you should use **named semaphores**, created using [`sem_open()`](https://man7.org/linux/man-pages/man3/sem_open.3.html).
    You'll get more accustomed to such functions in the [Application Interaction chapter].

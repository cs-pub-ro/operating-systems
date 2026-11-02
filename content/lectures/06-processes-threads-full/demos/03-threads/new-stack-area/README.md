# Demo: A New Stack per Thread

Create threads one at a time and watch a new stack zone appear in the address space for each.

## Goal

See that each thread adds its own stack to the shared address space: a new anonymous zone of about 8 MB per thread.

## Background

The threads of a process share the whole address space but each has its own stack.
`create_threads.c` creates three threads, pausing for `ENTER` before each, so that `pmap` can be run on the process from a second terminal between creations.

## Build and run

```console
make
./create_threads
```

In a second terminal, after each `ENTER`, look at the address space:

```console
pmap $(pidof create_threads)
ps -o pid,cmd,vsz,rss,nlwp $(pidof create_threads)
```

## Results and explanations

The default stack size is 8 MB:

```text
$ ulimit -s
8192
```

Each new thread adds an anonymous `rw---` zone of about that size.
After three threads, `pmap` shows them (here contiguous, so reported as one ~24 MB block) next to the main thread's `[ stack ]`:

```text
0000705b3b9fd000   24588K rw---   [ anon ]      three thread stacks
00007ffef8be2000     136K rw---   [ stack ]     main thread stack
```

The main thread's stack is the `[ stack ]` zone the kernel set up at start.
Every other thread's stack is ordinary anonymous memory, mapped at creation, one zone per thread.
`nlwp` in `ps` rises by one with each thread, and `vsz` by about 8 MB.

## Going further

* Set a smaller stack with `pthread_attr_setstacksize()` before `pthread_create()` and watch the new zones shrink.
* The stacks are reserved virtual memory: `rss` barely moves when a thread is created, because the pages are only touched as the thread uses its stack, the first-touch of lecture 04.

## References

* `man 3 pthread_attr_setstacksize`, `man 1 pmap`, `man 3 pthread_create`

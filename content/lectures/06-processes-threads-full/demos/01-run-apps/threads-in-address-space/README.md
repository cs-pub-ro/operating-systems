# Demo: Threads Share the Address Space

The threads of one process, each listed under `/proc`, all seeing the same memory.

## Goal

See that the threads of a process are listed individually by the kernel, and that they all share one and the same address space.

## Background

Linux schedules threads and calls each one a task.
Every thread of a process has a directory under `/proc/<pid>/task/`, and they all share the process's `/proc/<pid>/maps`.

## Run

Find a process with several threads, and take its PID:

```console
ps -e -o pid,comm,nlwp --sort -nlwp | head
```

List its threads, then compare the address space seen through the process and through one of its threads:

```console
ls /proc/<pid>/task
diff <(cat /proc/<pid>/maps) <(cat /proc/<pid>/task/<tid>/maps)
```

## What it shows

```text
$ ls /proc/15672/task | wc -l
56
$ ls /proc/15672/task | head -4
15672
15673
15674
15675
$ diff /proc/15672/maps /proc/15672/task/15674/maps && echo identical
identical
```

The process has fifty-six tasks, one per thread; the first, with the same number as the process, is the main thread.
The `diff` is empty: the address space seen through any thread is the same.
That is the definition of a thread: a flow of execution inside a shared address space.

## Ask

* The `maps` are identical through every thread. What does each thread then have of its own?
* The first task has the same id as the process. Which thread is that?

# Demo: Processes and Threads in the System

Count and list what is running: processes, the programs behind them, and the threads inside them.

## Goal

See that everything running is a process, that many processes come from the same few programs, and that some processes have one thread while others have many.

## Run

Count the processes, and the distinct programs they came from:

```console
ps -e --no-headers | wc -l
ps -e -o comm --no-headers | sort -u | wc -l
```

Count processes and threads together, and list the threads of each process:

```console
ps -e -L --no-headers | wc -l
ps -e -o pid,comm,nlwp --sort -nlwp | head
```

Pick out the processes that have more than one thread:

```console
ps -e -o pid,comm,nlwp --no-headers | awk '$3 > 1'
```

## What it shows

```text
$ ps -e --no-headers | wc -l
620
$ ps -e -o comm --no-headers | sort -u | wc -l
377
$ ps -e -L --no-headers | wc -l
3412
```

Six hundred and twenty processes, from three hundred and seventy-seven programs, with three thousand four hundred and twelve threads between them.
`nlwp` is the number of threads (light-weight processes) in a process: most have one, a few have dozens.
The system is a crowd of processes, some sharing a program, some single-threaded and some multi-threaded.

## Ask

* How can there be more threads than processes? What does that say about where threads come from?
* Several processes have the same name. Are they the same program, or the same process?

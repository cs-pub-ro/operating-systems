# Demo: A Zombie Process

A child that has finished but has not been waited for yet.

## Goal

See a zombie: a process that has ended but still has an entry in the table, because its parent has not called `wait()`.

## Background

When a process ends, the kernel keeps its entry and exit status until the parent collects them with `wait()`.
Between the two, the child is a **zombie**: dead, holding no memory, running nothing, but still listed.
`zombie.c` spawns a short `sleep`, then waits for a key before calling `waitpid()`, leaving a window in which the child has ended but is not yet waited for.

## Build and run

```console
make
./zombie
```

While it waits at the prompt, look for the child in a second terminal.

## Results and explanations

```text
$ ps -o pid,stat,cmd -C sleep
    PID STAT CMD
 222221 Z    [sleep] <defunct>
```

The `Z` state and the `<defunct>` in the command are the zombie.
The child finished, but its parent is paused before `waitpid()`, so the entry lingers.
Press `ENTER`, the parent calls `waitpid()`, and the entry is gone.

A parent that never waits leaks zombies; a long-running program that creates children must reap them, or their entries pile up.

## Going further

* Run `ps` again after pressing `ENTER`: the zombie is gone, reaped by the `waitpid()`.
* A zombie cannot be killed with a signal, because it is already dead; only a `wait()` from the parent removes it.

## References

* `man 2 wait`, `man 2 waitpid`, `man 7 signal` (`SIGCHLD`)

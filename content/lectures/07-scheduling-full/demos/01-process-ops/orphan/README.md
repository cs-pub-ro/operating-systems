# Demo: An Orphan Process

A child whose parent ends first, and is adopted by the init process.

## Goal

See an orphan: a running process whose parent has ended, re-parented to PID 1.

## Background

Every process has a parent.
If the parent ends while a child is still running, the child becomes an **orphan**, and the kernel re-parents it to the init process (PID 1, `systemd` on most desktops), which then waits for it when it ends.
`orphan.c` spawns `/usr/bin/sleep 100` and exits immediately, leaving the child running without its original parent.

## Build and run

```console
make
./orphan
```

Then, in a second terminal, look at the child's parent.

## Results and explanations

```text
$ ps -o pid,ppid,cmd -C sleep
    PID    PPID CMD
  24533    4984 /usr/bin/sleep 100
$ ps -o pid,cmd --no-headers -p 4984
   4984 /usr/lib/systemd/systemd --user
```

The child's parent PID is no longer the `orphan` process, which has ended, but a `systemd` process.
The init process adopted it.
This is why an orphan never stays a zombie: its adoptive parent reaps it the moment it ends.

## Going further

* `ps -o pid,ppid,cmd -C sleep` right after `./orphan` sometimes still shows the old parent for an instant, before the re-parenting; run it twice.
* Compare with the zombie demo: a zombie has a parent that will not wait; an orphan has a new parent that will.

## References

* `man 2 fork` (orphans and re-parenting), [init](https://en.wikipedia.org/wiki/Init), `man 1 systemd`
